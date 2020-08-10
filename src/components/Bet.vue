<template>
  <div class="bet w-100">
    <div class="tokens postion-relative">

      <!-- <transition-group name="add-token"> -->
        <Token v-for="(token, idx) in tokens" :key="idx"
          :variant="token.variant"
          :border="token.border"
          :value="token.value"
          @click.native="remove(idx, token.value)"
          :class="tokenClass(idx)"
          :style="{ transform: `translateY(-50%) translateX(-100%) translateX(-${idx * 2}px)` }"/>
      <!-- </transition-group> -->

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
    </div>
  </div>
</template>

<script>
import { bus } from '@/main';

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
  created() {
    bus.$on('tokenBet', (val) => this.add(this.$store.getters['tokens/token'](val)));
    bus.$on('clearBet', this.clearBet);
  },
  computed: {
    total() {
      return this.tokens.reduce((total, token) => total + token.value, 0);
    },
  },
  methods: {
    // Get the CSS classes of a token, depending on its index in the stack
    tokenClass(idx) {
      return {
        'stackable-token': true,
        'no-shadow': idx > 0,
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
    clearBet(noRefund = false) {
      if (!noRefund) {
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

.add-token-enter-active {
  transition: all 0.25s ease-out;
}

.add-token-leave-active {
  transition: all 0.25s ease-in;
}

.add-token-enter, .add-token-leave-to {
  margin-top: 300px;
}

.add-token-enter-to, .add-token-leave {
  margin-top: 0;
}
</style>
