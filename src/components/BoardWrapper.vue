<template>
  <div class="rounded board-wrapper shadow-sm container position-relative">
    <div class="board-bg w-100 h-100"></div>

    <div class="board-content text-white h-100 w-100 position-absolute">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardWrapper',
};
</script>

<style scoped lang="scss">
.board-wrapper {
  height: 100vh;
  border: 2px solid rgba(0,0,0,1);
  padding: 5px;

  .board-bg {
    background-image: url('../assets/background.webp');
    background-size: cover;
    filter: blur(4px);
    -webkit-filter: blur(4px);
  }

  .board-content {
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
    z-index: 2;
    top: 0;
    left: 0;
    padding: 15px;
  }
}
</style>
