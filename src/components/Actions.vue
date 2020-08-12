<template>
  <div class="actions w-100">
    <div class="position-relative h-100">
      <b-button
        variant="success"
        size="lg"
        class="px-5 py-3 hit-btn action-btn"
        @click="hit">
        <b-icon-file-plus/> Hit
      </b-button>

      <b-button
        variant="success"
        size="lg"
        class="rounded-circle action-btn double-btn"
        v-if="!hasHit"
        :style="doubleStyle"
        @click="double">
        X 2 Double
      </b-button>

      <b-button
        variant="success"
        size="lg"
        class="px-5 py-3 stand-btn action-btn"
        @click="stand">
        <b-icon-hand-thumbs-up/> Stand
      </b-button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/main';

export default {
  name: 'Actions',
  data() {
    return {
      hasHit: false,
      nbTokens: 1,
    };
  },
  created() {
    bus.$on('nbTokensInBet', (nb) => { this.nbTokens = nb; });
    bus.$on('endOfTurn', this.endOfTurn);
  },
  computed: {
    doubleStyle() {
      return {
        transform: `translate(-100%,-50%) translateX(-${5 + Math.min(2 * this.nbTokens, 10) - 2}px)`,
      };
    },
  },
  methods: {
    // Hit : ask for another card
    hit() {
      this.hasHit = true;
      bus.$emit('playerHit');
    },
    // Stand : end of player's turn
    stand() {
      this.$emit('stand');
    },
    // Double : x 2 on the bet, get another card and end the turn
    double() {
      this.hasHit = true;
      this.$emit('double');
    },
    // End of a turn
    endOfTurn() {
      this.hasHit = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/vars';
$double-btn-radius: calc(#{$token-width} - 2 * #{$token-border-width});

.actions {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  transform: translate(-50%,-50%);

   .action-btn {
    position: absolute;
    top: 50%;
    left: 50%;

    &.double-btn {
      z-index: 2000;
      width: $double-btn-radius;
      height: $double-btn-radius;
      // transform: translate(-100%,-50%) translateX(-#{$token-border-width});
    }

    &.hit-btn {
      transform: translate(-50%,-50%) translateX(-250px);
    }

    &.stand-btn {
      transform: translate(-50%,-50%) translateX(250px);
    }
  }
}
</style>
