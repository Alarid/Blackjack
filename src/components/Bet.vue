<template>
  <div class="bet w-100">
    <div class="tokens postion-relative">

      <Token v-for="(token, idx) in tokens" :key="idx"
        :variant="token.variant"
        :border="token.border"
        :value="token.value"
        @click.native="remove(idx, token.value)"
        :class="tokenClass(idx)"
        :style="{ transform: `translateY(-50%) translateX(-100%) translateX(-${idx * 2}px)` }"/>

      <div class="total"> {{total}} $</div>

      <b-button
        variant="info"
        size="lg"
        class="px-5 py-3 deal-btn"
        :disabled="total<=0"
        v-if="playerIsBetting"
        @click="deal">
        DEAL
      </b-button>

      <b-button
        variant="info"
        size="lg"
        class="px-5 py-3 draw-btn"
        v-if="!playerIsBetting"
        @click="draw">
        Draw
      </b-button>
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
    playerIsBetting: { type: Boolean, required: true },
  },
  computed: {
    total() {
      return this.tokens.reduce((total, token) => total + token.value, 0);
    },
  },
  methods: {
    tokenClass(idx) {
      return {
        'stackable-token': true,
        'no-shadow': idx > 0,
      };
    },
    add(token) {
      this.tokens.push(token);
    },
    remove(idx, val) {
      if (this.playerIsBetting) {
        this.$emit('tokenRemoved', val);
        this.tokens.splice(idx, 1);
      }
    },
    clearBet() {
      this.tokens.forEach((token) => this.$emit('tokenRemoved', token.value));
      this.tokens = [];
    },
    deal() {
      this.$emit('betDone');
    },
    draw() {
      console.log('draw');
      this.$emit('draw');
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
  height: 200px;
  transform: translate(-50%,-50%);

  .stackable-token {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .total {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%,-50%);
    font-size: 16pt;
    font-weight: bold;
  }

  .deal-btn, .draw-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(100%,-50%);
  }
}
</style>
