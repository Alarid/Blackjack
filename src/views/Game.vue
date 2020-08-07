<template>
  <BoardWrapper>
    <Deck ref="deck"/>

    <Player/>
  </BoardWrapper>
</template>

<script>
import BoardWrapper from '@/components/BoardWrapper.vue';
import Deck from '@/components/Deck.vue';
import Player from '@/components/Player.vue';

export default {
  name: 'Game',
  data() {
    return {

    };
  },
  methods: {

  },
  components: {
    BoardWrapper,
    Deck,
    Player,
  },
};
</script>

<style scoped lang="scss">

</style>
