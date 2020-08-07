<template>
  <BoardWrapper>
    <Deck ref="deck"/>

    <Bet ref="bet"
      :playerIsBetting="playerIsBetting"
      @tokenRemoved="tokenRemoved"
      @betDone="betDone"/>

    <Bank ref="bank"
      :playerIsBetting="playerIsBetting"
      @tokenBet="betToken"
      @clearBet="clearBet"/>
  </BoardWrapper>
</template>

<script>
import BoardWrapper from '@/components/BoardWrapper.vue';
import Deck from '@/components/Deck.vue';
import Bank from '@/components/Bank.vue';
import Bet from '@/components/Bet.vue';

export default {
  name: 'Game',
  data() {
    return {
      playerIsBetting: true,
      tokensBet: [],
    };
  },
  methods: {
    askForBet() {
      this.playerIsBetting = true;
    },
    betToken(val) {
      this.$refs.bet.add(this.$store.getters['tokens/token'](val));
    },
    tokenRemoved(val) {
      this.$refs.bank.refundToken(val);
    },
    clearBet() {
      this.$refs.bet.clearBet();
    },
    betDone() {
      this.playerIsBetting = false;
    },
  },
  components: {
    BoardWrapper,
    Deck,
    Bank,
    Bet,
  },
};
</script>

<style scoped lang="scss">

</style>
