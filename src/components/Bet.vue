<template>
  <div class="bet w-100">
    <div class="tokens postion-relative">

      <transition-group mode="out-in" name="token" :duration="500">
        <template v-for="(token, idx) in tokens">
          <Token :key="idx"
            :variant="token.variant"
            :border="token.border"
            :value="token.value"
            @click.native="remove(idx, token.value)"
            :class="tokenClass(idx, token.value)"
            :style="tokenStyle(idx)"/>
        </template>
      </transition-group>

      <div class="total"> {{animatedTotal}} $</div>

      <b-button
        variant="info"
        size="lg"
        class="px-5 py-3 deal-btn"
        :disabled="total<=0"
        v-if="playerIsBetting"
        @click="deal">
        DEAL
      </b-button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/main';
import gsap from 'gsap';

import Token from '@/components/Token.vue';

export default {
  name: 'bet',
  data() {
    return {
      tokens: [],
      total: 0,
      totalRender: 0,
    };
  },
  props: {
    value: { type: Number, default: 100 },
    playerIsBetting: { type: Boolean, required: true },
  },
  created() {
    bus.$on('tokenBet', (val) => this.add(this.$store.getters['tokens/token'](val)));
  },
  computed: {
    animatedTotal() {
      return this.totalRender.toFixed(0);
    },
  },
  watch: {
    // eslint-disable-next-line object-shorthand, func-names
    tokens: function () {
      bus.$emit('nbTokensInBet', this.tokens.length);
      this.total = this.tokens.reduce((total, token) => total + token.value, 0);
    },
    // eslint-disable-next-line object-shorthand, func-names
    total: function (newValue) {
      gsap.to(this.$data, { duration: 0.3, totalRender: newValue });
    },
  },
  methods: {
    // Get the CSS classes of a token, depending on its index in the stack
    tokenClass(idx, value) {
      // eslint-disable-next-line no-unused-vars
      const valueClassName = `value-${value}`;
      return ['stackable-token', idx > 0 ? 'no-shadow' : '', valueClassName];
      // return {
      //   'stackable-token': true,
      //   'no-shadow': idx > 0,
      // };
    },
    // Get the translate property for the token, depending on its index
    tokenStyle(idx) {
      return {
        transform: `translateY(-50%) translateX(-100%) translateX(-${Math.min(idx * 2, 10)}px)`,
      };
    },
    // Add a token to the bet
    add(token) {
      this.tokens.push(token);
    },
    // Remove a token from the bet
    remove(idx, val) {
      if (this.playerIsBetting) {
        this.tokens.splice(idx, 1);
        bus.$emit('tokenRemoved', val);
      }
    },
    // Clear the bet, refunding tokens to the player or not
    clearBet(refund) {
      if (refund) {
        this.tokens.forEach((token) => bus.$emit('tokenRemoved', token.value));
      }
      this.tokens = [];
    },
    // Finish the bet
    deal() {
      bus.$emit('betDone');
    },
  },
  components: {
    Token,
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/vars';

.bet {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  transform: translate(-50%,-50%);

  .stackable-token {
    position: absolute;
    left: 50%;
    top: 50%;

    &.token-enter-active, &.token-leave-active {
      transition: all 0.5s;
    }
    &.token-enter, &.token-leave-to {
      opacity: 0.5;
      $translateY: translateY(50vh)
        translateY(calc(-#{$bank-tokens-pb} - 5px - 2 * #{$token-width} - 2 * #{$token-mb}));

      &.value-100 {
        transform: translateX(-100px) $translateY !important;
      }
      &.value-50 {
        transform: translateX(-230px) $translateY !important;
      }
      &.value-25 {
        transform: translateX(-330px) $translateY !important;
      }
      &.value-5 {
        transform: translateX(-430px) $translateY !important;
      }
      &.value-1 {
        transform: translateX(-530px) $translateY !important;
      }
    }
    &.token-enter-to, &.token-leave {
      opacity: 1;
    }
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
