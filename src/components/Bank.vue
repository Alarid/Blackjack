<template>
  <div class="bank w-50">
    <div class="bank-header d-inline-block">
      <p>Bank: <strong>{{ money }} $</strong></p>
      <b-button variant="info" size="sm" class="mx-auto d-block w-75 mt-2" v-if="playerIsBetting"
        @click="allIn">
        All in
      </b-button>
    </div>
    <div class="tokens" v-if="playerIsBetting">
      <Token v-for="(token, idx) in availableTokens" :key="idx"
        :variant="token.variant" :border="token.border" :value="token.value"
        @click.native="betToken(token.value)"/>
    </div>
  </div>
</template>

<script>
import Token from '@/components/Token.vue';

export default {
  name: 'Bank',
  data() {
    return {
      money: this.initialCash,
    };
  },
  props: {
    initialCash: { type: Number, default: 1000 },
    playerIsBetting: { type: Boolean, default: true },
  },
  computed: {
    tokens() {
      return this.$store.getters['tokens/all'];
    },
    availableTokens() {
      return this.tokens.filter((token) => token.value <= this.money);
    },
  },
  mounted() {
    this.betToken(100);
  },
  methods: {
    betToken(val) {
      this.money -= val;
      this.$emit('tokenBet', val);
    },
    refundToken(val) {
      this.money += val;
    },
    isTokenVisible(val) {
      return this.money - val < 0;
    },
    allIn() {
      console.log('all in');
    },
  },
  components: {
    Token,
  },
};
</script>

<style scoped lang="scss">
.bank {
  position: absolute;
  bottom: 0;
  left: 15px;

  .bank-header {
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
    padding: 30px 15px 15px;
    background-color: #11354F;
    border: 1px solid black;
    border-radius: 0 0.5rem 0 0;
  }
}
</style>
