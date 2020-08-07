<template>
  <BoardWrapper>
    <Dealer ref="dealer"
      @dealCard="dealCard"/>

    <Player ref="player"
      @betDone="betDone"
      @needCard="playerNeedCard"/>
  </BoardWrapper>
</template>

<script>
import BoardWrapper from '@/components/BoardWrapper.vue';
import Dealer from '@/components/Dealer.vue';
import Player from '@/components/Player.vue';

export default {
  name: 'Game',
  data() {
    return {

    };
  },
  methods: {
    betDone() {
      this.$refs.dealer.dealCards()
        .then(() => console.log('cards dealt'));
    },
    dealCard(card) {
      this.$refs.player.dealCard(card);
    },
    playerNeedCard() {
      this.$refs.dealer.dealCardToPlayer();
    },
  },
  components: {
    BoardWrapper,
    Dealer,
    Player,
  },
};
</script>

<style scoped lang="scss">

</style>
