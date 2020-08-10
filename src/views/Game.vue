<template>
  <BoardWrapper>
    <Toast ref="toast" />

    <Dealer ref="dealer"
      :showHandScore="showDealerHandScore"
      :dealCardWait="dealCardWait"
      :playerHand="playerHand"
      :betweenTurnsDelay="betweenTurnsDelay"
      @endTurn="endTurn" />

    <Player ref="player"/>
  </BoardWrapper>
</template>

<script>
import gameScore from '@/utils/gameScore';
import { bus } from '@/main';

import BoardWrapper from '@/components/BoardWrapper.vue';
import Dealer from '@/components/Dealer.vue';
import Player from '@/components/Player.vue';
import Toast from '@/components/Toast.vue';

export default {
  name: 'Game',
  created() {
    bus.$on('betDone', this.beginTurn);
    bus.$on('playerStand', this.playerStands);
    bus.$on('playerBust', this.playerBust);
    bus.$on('playerBlackjack', this.playerBlackjack);
  },
  data() {
    return {
      showDealerHandScore: false,
      dealCardWait: 500,
      betweenTurnsDelay: 1500,
      playerHand: 0,
    };
  },
  methods: {
    // Begining of the turn
    beginTurn() {
      this.$refs.dealer.dealCards().then(() => {
        this.showDealerHandScore = true;
        this.$refs.player.play();
      });
    },
    // Player stands
    playerStands() {
      this.endOfPlayerTurn(this.$refs.dealer.play);
    },
    // Player bust
    playerBust() {
      this.endOfPlayerTurn(this.endTurn);
    },
    // Player got lucky
    playerBlackjack() {
      this.$refs.toast.create('BLACKJACK !', 'bottom-center', 'success', this.betweenTurnsDelay);
      this.endOfPlayerTurn(this.endTurn);
    },
    // End of player's turn, reveal the dealer's card and call the callback
    endOfPlayerTurn(callback) {
      setTimeout(() => {
        this.$refs.dealer.revealHiddenCard();
        this.playerHand = this.$refs.player.handScore;
        setTimeout(callback, this.betweenTurnsDelay);
      }, this.dealCardWait);
    },
    // End the turn
    endTurn() {
      const dealerScore = this.$refs.dealer.handScore;
      let result;
      if (dealerScore > 21 || (dealerScore < this.playerHand && this.playerHand < 22)) {
        result = gameScore.PLAYER_WINS;
        this.$refs.toast.create('You Win !', 'bottom-center', 'success', this.betweenTurnsDelay);
      } else if (dealerScore < 22 && dealerScore > this.playerHand) {
        result = gameScore.DEALER_WINS;
        this.$refs.toast.create('Dealer Wins !', 'top-center', 'danger', this.betweenTurnsDelay);
      } else if (dealerScore === this.playerHand) {
        result = gameScore.DRAW;
        this.$refs.toast.create('Game is a draw', 'center-center', 'warning', this.betweenTurnsDelay);
      } else {
        result = gameScore.NO_WINNERS;
      }
      setTimeout(() => this.resetBoard(result), this.betweenTurnsDelay);
    },
    // Reset the board for the next turn
    resetBoard(result) {
      this.showDealerHandScore = false;
      bus.$emit('endOfTurn', result);
    },
  },
  components: {
    BoardWrapper,
    Dealer,
    Player,
    Toast,
  },
};
</script>

<style scoped lang="scss">

</style>
