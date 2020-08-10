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
  methods: {
    // Hit : ask for another card
    hit() {
      bus.$emit('playerHit');
    },
    // Stand : end of player's turn
    stand() {
      this.$emit('stand');
    },
  },
};
</script>

<style scoped lang="scss">
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

    &.hit-btn {
      transform: translate(-50%,-50%) translateX(-250px);
    }

    &.stand-btn {
      transform: translate(-50%,-50%) translateX(250px);
    }
  }
}
</style>
