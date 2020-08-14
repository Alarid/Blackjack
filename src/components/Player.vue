<template>
  <div class="player">
    <Cashout
      v-if="isBetting"
      @cashout="cashout"/>

    <Toast ref="toast" />

    <PlayerWallet ref="playerWallet"
      :initialCash="initialCash"
      :playerIsBetting="isBetting"
      :initialBet="lastBet"
      @clearBet="clearBet"/>

    <Bet ref="bet"
      :playerIsBetting="isBetting" />

    <Actions ref="actions"
      v-show="isPlaying"
      @stand="stand"
      @double="double"/>

    <Hand ref="hand"
      class="player-cards"
      :showScore="showHandScore"
      owner="Player" />
  </div>
</template>

<script>
import { bus } from '@/main';

import PlayerWallet from '@/components/PlayerWallet.vue';
import Bet from '@/components/Bet.vue';
import Hand from '@/components/Hand.vue';
import Actions from '@/components/Actions.vue';
import Toast from '@/components/Toast.vue';
import Cashout from '@/components/Cashout.vue';

export default {
  name: 'Player',
  data() {
    return {
      isBetting: true,
      isPlaying: false,
      showHandScore: false,
      lastBet: 100, // initialzed with first bet
    };
  },
  props: {
    initialCash: { type: Number, default: 1000 },
  },
  computed: {
    handScore() {
      return this.$refs.hand.score;
    },
    money() {
      return this.$refs.playerWallet.money;
    },
  },
  created() {
    bus.$on('betDone', this.betDone);
    bus.$on('dealCard', this.dealCard);
    bus.$on('endOfTurn', this.endOfTurn);
  },
  methods: {
    // Bet is done, dealer will start dealing cards
    betDone() {
      this.isBetting = false;
      this.lastBet = this.$refs.bet.total;
    },
    // Clear tokens in bet
    clearBet(refund = true) {
      this.$refs.bet.clearBet(refund);
    },
    // Receive card from dealer
    dealCard(c) {
      const card = c;
      card.hidden = false;
      this.$refs.hand.addCard(card);
      if (this.handScore > 21) {
        this.isPlaying = false;
        this.$refs.toast.create('BUST', 'bottom-center', 'danger', 1000);
        bus.$emit('playerBust', this.handScore);
      } /** else if (this.isPlaying && this.handScore === 21) {
        this.isPlaying = false;
        bus.$emit('playerBlackjack');
      } */
    },
    // Player's turn begin
    play() {
      this.showHandScore = true;
      // Blackjack from draw
      if (this.$refs.hand.score === 21) {
        bus.$emit('playerBlackjackImmediate');
      } else {
        // Starts playing
        this.isPlaying = true;
      }
    },
    // Stand
    stand() {
      this.isPlaying = false;
      bus.$emit('playerStand', this.$refs.hand.score);
    },
    // Double
    double() {
      this.$refs.playerWallet.betValue(this.lastBet);
      this.isPlaying = false;
      setTimeout(() => {
        bus.$emit('playerHit');
        setTimeout(() => bus.$emit('playerStand', this.$refs.hand.score),
          this.$store.state.delays.dealCardWait);
      }, this.$store.state.delays.dealCardWait);
    },
    // Win the round
    win() {
      this.$refs.playerWallet.addCash(this.$refs.bet.total * 2);
      this.clearBet(false);
    },
    // Round ended in push
    push() {
      this.clearBet();
    },
    // Lose the round
    lose() {
      this.clearBet(false);
      if (this.money === 0) {
        // Game over
        bus.$emit('gameOver');
        this.$refs.hand.clear();
        this.showHandScore = false;
      }
    },
    // End of a turn, begining of a new one
    endOfTurn() {
      this.$refs.hand.clear();
      this.isBetting = true;
      this.showHandScore = false;
      setTimeout(() => this.$refs.playerWallet.betValue(this.lastBet),
        this.$store.state.delays.dealCard);
    },
    // Player wants to cash out
    cashout() {
      this.clearBet();
      this.$store.commit('saveHighscore', this.money);
      this.$router.push('/');
    },
  },
  components: {
    PlayerWallet,
    Bet,
    Hand,
    Actions,
    Toast,
    Cashout,
  },
};
</script>

<style scoped lang="scss">

</style>
