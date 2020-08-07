<template>
  <div class="bet">
    <div class="tokens postion-relative">
      <Token v-for="(token, idx) in tokens" :key="idx"
        :variant="token.variant" :border="token.border" :value="token.value"
        @click.native="remove(idx, token.value)" class="stackable-token"
        :style="{ transform: `translateY(-50%) translateX(-50%) translateX(-${idx * 2}px)` }"/>

      <div class="total"> {{total}} $</div>

      <b-button variant="info" size="lg" id="dealBtn" class="px-5 py-3">DEAL</b-button>
    </div>
  </div>
</template>

<script>
import Token from '@/components/Token.vue';

export default {
  name: 'bet',
  data() {
    return {
      tokens: [],
    };
  },
  props: {
    value: { type: Number, default: 100 },
  },
  computed: {
    total() {
      return this.tokens.reduce((total, token) => total + token.value, 0);
    },
  },
  methods: {
    add(token) {
      this.tokens.push(token);
    },
    remove(idx, val) {
      this.$emit('tokenRemoved', val);
      this.tokens.splice(idx, 1);
    },
    clearBet() {
      this.tokens.forEach((token) => this.$emit('tokenRemoved', token.value));
      this.tokens = [];
    },
  },
  components: {
    Token,
  },
};
</script>

<style scoped lang="scss">
.bet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 200px;
  transform: translate(-50%,-50%);

  .stackable-token {
    position: absolute;
    top: 50%;
    left: 25%;
  }
  .total {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 16pt;
    font-weight: bold;
  }

  #dealBtn {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-50%,-50%);
  }
}
</style>
