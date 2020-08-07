<template>
  <div class="player">
    <Bet ref="bet"
      :playerIsBetting="isBetting"
      @tokenRemoved="tokenRemoved"
      @betDone="betDone"/>

    <Bank ref="bank"
      :playerIsBetting="isBetting"
      @tokenBet="betToken"
      @clearBet="clearBet"/>
  </div>
</template>

<script>
import Bank from '@/components/Bank.vue';
import Bet from '@/components/Bet.vue';

export default {
  name: 'Player',
  data() {
    return {
      isBetting: true,
      tokensBet: [],
    };
  },
  methods: {
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
    Bank,
    Bet,
  },
};
</script>

<style scoped lang="scss">

</style>
