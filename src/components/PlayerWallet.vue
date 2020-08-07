<template>
  <div class="wallet w-50">
    <div class="wallet-header d-inline-block">
      <p>Bank: <strong>{{ money }} $</strong></p>

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
import Token from '@/components/Token.vue';

export default {
  name: 'PlayerWallet',
  data() {
    return {
      money: this.initialCash,
    };
  },
  props: {
    initialCash: { type: Number, required: true },
    playerIsBetting: { type: Boolean, default: true },
  },
  computed: {
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
  mounted() {
    this.betToken(100);
  },
  methods: {
    isTokenVisible(val) {
      return this.money - val >= 0;
    },
    betToken(val) {
      if (this.isTokenVisible(val)) {
        this.money -= val;
        this.$emit('tokenBet', val);
      }
    },
    refundToken(val) {
      this.money += val;
    },
    allIn() {
      this.tokens.slice().sort((t1, t2) => t2.value > t1.value).forEach((token) => {
        while (this.availableTokens.filter((t) => t.value === token.value).length > 0) {
          this.betToken(token.value);
        }
      });
    },
    clearBet() {
      this.$emit('clearBet');
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

  .wallet-header {
    background-color: #11354F;
    border-radius: 0.5rem 0.5rem 0 0;
    border: 1px solid black;
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
