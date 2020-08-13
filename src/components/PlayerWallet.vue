<template>
  <div class="wallet">
    <div class="wallet-header d-inline-block">
      <p>Bank: <strong>{{ animatedMoney }} $</strong></p>

      <b-button
        variant="info"
        size="sm"
        class="mx-auto d-block w-75 mt-2"
        v-if="showAllIn"
        @click="allIn"> All in </b-button>

      <b-button
        variant="info"
        size="sm"
        class="mx-auto d-block w-75 mt-2"
        v-if="showClearBet"
        @click="clearBet"> Clear bet </b-button>
    </div>

    <div class="tokens" v-if="playerIsBetting">
      <Token v-for="(token, idx) in tokens" :key="idx"
        :variant="token.variant"
        :border="token.border"
        :value="token.value"
        v-show="isTokenVisible(token.value)"
        @click.native="betToken(token.value)"/>
    </div>
  </div>
</template>

<script>
import { bus } from '@/main';
import gsap from 'gsap';

import Token from '@/components/Token.vue';

export default {
  name: 'PlayerWallet',
  data() {
    return {
      money: this.initialCash,
      renderMoney: this.initialCash,
    };
  },
  props: {
    initialCash: { type: Number, required: true },
    playerIsBetting: { type: Boolean, default: true },
    initialBet: { type: Number, required: true },
  },
  computed: {
    animatedMoney() {
      return this.renderMoney.toFixed(0);
    },
    tokens() {
      return this.$store.getters['tokens/all'];
    },
    availableTokens() {
      return this.tokens.filter((token) => token.value <= this.money);
    },
    showAllIn() {
      return this.playerIsBetting && this.money > 0;
    },
    showClearBet() {
      return this.playerIsBetting && this.money === 0;
    },
  },
  watch: {
    // eslint-disable-next-line func-names, object-shorthand
    money: function (newValue) {
      gsap.to(this.$data, { duration: 0.3, renderMoney: newValue });
    },
  },
  mounted() {
    bus.$on('tokenRemoved', this.refundToken);
    setTimeout(() => this.betValue(this.initialBet), this.$store.state.delays.dealCard);
  },
  methods: {
    // A token is visible only if its value is contained in the remaining money
    isTokenVisible(val) {
      return this.money - val >= 0;
    },
    // Bet a token, if its available
    betToken(val) {
      if (this.isTokenVisible(val)) {
        this.money -= val;
        bus.$emit('tokenBet', val);
      }
    },
    // Refund a token's money
    refundToken(val) {
      this.money += val;
    },
    // All in !!
    allIn() {
      this.tokens.slice().sort((t1, t2) => t2.value - t1.value).forEach((token) => {
        while (this.availableTokens.filter((t) => t.value === token.value).length > 0) {
          this.betToken(token.value);
        }
      });
    },
    // Bet tokens to reach desired value
    betValue(value) {
      let remaining = value;
      const test = this.availableTokens.slice().sort((t1, t2) => t2.value - t1.value);
      test.forEach((token) => {
        while (token.value <= remaining) {
          this.betToken(token.value);
          remaining -= token.value;
        }
      });
    },
    // Clear the bet
    clearBet() {
      this.$emit('clearBet');
    },
    // Add money to the wallet
    addCash(cash) {
      this.money += cash;
    },
  },
  components: {
    Token,
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/vars';

.wallet {
  position: absolute;
  bottom: 0;
  left: 15px;
  width: calc(6 * #{$token-width});

  .wallet-header {
    background-color: $wallet-bg;
    border-radius: $wallet-border-radius $wallet-border-radius 0 0;
    border: $wallet-border;
    border-bottom: unset;
    padding: 15px;
    width: 30%;
    transform: translateY(1px);

    p {
      margin-bottom: 0;
      font-size: 14pt;
    }
  }

  .tokens {
    padding: $bank-tokens-pt 15px $bank-tokens-pb;
    background-color: #11354F;
    border: 1px solid black;
    border-radius: 0 0.5rem 0 0;
    min-height: calc(#{$token-width} * 2 + #{$token-mb} * 2 + #{$bank-tokens-pt}
      + #{$bank-tokens-pb} + 5px);
  }
}
</style>
