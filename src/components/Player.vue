<template>
  <div class="player">
    <Cashout v-if="isBetting"/>

    <Toast ref="toast" />

    <Bet ref="bet"
      :playerIsBetting="isBetting" />

    <Actions ref="actions"
      v-show="isPlaying"
      @stand="stand"
      @double="double"/>

    <PlayerWallet ref="playerWallet"
      :initialCash="initialCash"
      :playerIsBetting="isBetting"
      :initialBet="lastBet" />

    <Hand ref="hand"
      class="player-cards"
      :cards="cards"
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
      cards: [],
      lastBet: 100, // initialzed with first bet
    };
  },
  props: {
    initialCash: { type: Number, default: 1000 },
  },
  computed: {
    handScore() {
      return this.cards.reduce((total, c) => total + this.$refs.hand.getCardValue(c.value), 0);
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
    // Receive card from dealer
    dealCard(c) {
      const card = c;
      card.hidden = false;
      this.cards.push(card);
      this.$nextTick(() => {
        // eslint-disable-next-line prefer-destructuring
        const score = this.$refs.hand.score;
        if (score > 21) {
          this.isPlaying = false;
          this.$refs.toast.create('BUST', 'bottom-center', 'danger', 1000);
          bus.$emit('playerBust', score);
        } else if (this.isPlaying && score === 21) {
          bus.$emit('playerBlackjack');
        }
      });
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
          this.$store.state.delays.betweenTurns);
      }, this.$store.state.delays.dealCardWait);
    },
    // Win the round
    win() {
      this.$refs.playerWallet.addCash(this.$refs.bet.total * 2);
      bus.$emit('clearBet', true);
    },
    // Round ended in push
    push() {
      this.$refs.playerWallet.addCash(this.lastBet);
      bus.$emit('clearBet', true);
    },
    // Lose the round
    lose() {
      bus.$emit('clearBet', true);
      if (this.$refs.playerWallet.money === 0) {
        // Game over
        console.log('game over');
        bus.$emit('gameOver');
        this.cards = [];
        this.showHandScore = false;
      }
    },
    // End of a turn, begining of a new one
    endOfTurn() {
      this.cards = [];
      this.isBetting = true;
      this.showHandScore = false;
      this.$refs.playerWallet.betValue(this.lastBet);
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
