<template>
  <div class="player">
    <Bet ref="bet"
      :playerIsBetting="isBetting"
      @tokenRemoved="tokenRemoved"
      @betDone="betDone"
      @draw="needCard"/>

    <PlayerWallet ref="playerWallet"
      :initialCash="initialCash"
      :playerIsBetting="isBetting"
      @tokenBet="betToken"
      @clearBet="clearBet"/>

    <Hand ref="hand"
      class="player-cards"
      :cards="cards" />
  </div>
</template>

<script>
import PlayerWallet from '@/components/PlayerWallet.vue';
import Bet from '@/components/Bet.vue';
import Hand from '@/components/Hand.vue';

export default {
  name: 'Player',
  data() {
    return {
      isBetting: true,
      tokensBet: [],
      cards: [],
    };
  },
  props: {
    initialCash: { type: Number, default: 1000 },
  },
  methods: {
    betToken(val) {
      this.$refs.bet.add(this.$store.getters['tokens/token'](val));
    },
    tokenRemoved(val) {
      this.$refs.playerWallet.refundToken(val);
    },
    clearBet() {
      this.$refs.bet.clearBet();
    },
    betDone() {
      this.isBetting = false;
      this.$emit('betDone');
    },
    dealCard(card) {
      this.cards.push(card);
    },
    needCard() {
      this.$emit('needCard');
    },
  },
  components: {
    PlayerWallet,
    Bet,
    Hand,
  },
};
</script>

<style scoped lang="scss">

</style>
