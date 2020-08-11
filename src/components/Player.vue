<template>
  <div class="player">
    <Toast ref="toast" />

    <Bet ref="bet"
      :playerIsBetting="isBetting" />

    <Actions ref="actions"
      v-if="isPlaying"
      @stand="stand"/>

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
import gameScore from '@/utils/gameScore';

import PlayerWallet from '@/components/PlayerWallet.vue';
import Bet from '@/components/Bet.vue';
import Hand from '@/components/Hand.vue';
import Actions from '@/components/Actions.vue';
import Toast from '@/components/Toast.vue';

export default {
  name: 'Player',
  data() {
    return {
      isBetting: true,
      isPlaying: false,
      showHandScore: false,
      tokensBet: [],
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
    // End of a turn, begining of a new one
    endOfTurn(result) {
      if (result === gameScore.PLAYER_WINS) {
        // Player wins
        this.$refs.playerWallet.addCash(this.$refs.bet.total * 2);
      } else if (result === gameScore.DRAW || result === gameScore.PUSH) {
        // Game is a draw or no winners
        this.$refs.playerWallet.addCash(this.lastBet);
      }
      bus.$emit('clearBet', true);
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
  },
};
</script>

<style scoped lang="scss">

</style>
