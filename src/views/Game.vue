<template>
  <BoardWrapper>
    <Game />
  </BoardWrapper>
</template>

<script>
import BoardWrapper from '@/components/BoardWrapper.vue';
import Game from '@/components/Game.vue';

export default {
  name: 'GamePage',
  components: {
    BoardWrapper,
    Game,
  },
};
</script>

<style scoped lang="scss">

</style>
