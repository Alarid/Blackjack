<template>
  <div class="game">
    <Toast ref="toast" />

    <Dealer ref="dealer"
      :playerHand="playerHand"
      @endTurn="endTurn" />

    <Player ref="player"/>

    <b-modal id="gameoverModal"
      title="Game Over"
      size="sm"
      ok-title="Continue"
      ok-variant="success"
      ok-only
      @ok="quitGame">
      <p class="my-4">You ran out of money</p>
    </b-modal>
  </div>
</template>

<script>
import { bus } from '@/main';

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
    bus.$on('playerBlackjackImmediate', this.playerBlackjackImmediate);
    bus.$on('gameOver', this.gameOver);

    this.betweenTurnsDelay = this.$store.state.delays.betweenTurns;
  },
  beforeDestroy() {
    bus.$off();
  },
  data() {
    return {
      playerHand: 0,
      betweenTurnsDelay: null,
    };
  },
  methods: {
    // Begining of the turn
    beginTurn() {
      setTimeout(() => {
        this.$refs.dealer.dealCards().then(() => {
          this.$refs.player.play();
        });
      }, this.$store.state.delays.dealCardWait);
    },
    // Player stands
    playerStands() {
      this.endOfPlayerTurn(this.$refs.dealer.play);
    },
    // Player bust
    playerBust() {
      this.endOfPlayerTurn(this.endTurn);
    },
    // Player got exactly 21
    playerBlackjack() {
      this.$refs.toast.create('BLACKJACK !', 'bottom-center', 'success', this.betweenTurnsDelay);
      this.endOfPlayerTurn(this.endTurn);
    },
    // Player got blackjack after receiving his cards
    playerBlackjackImmediate() {
      // The dealer doesn't have an ace or a 10 visible : immediate win for the player
      if (!this.$refs.dealer.hasAceOr10) {
        this.$refs.toast.create('BLACKJACK !', 'bottom-center', 'success', this.betweenTurnsDelay);
        setTimeout(() => {
          this.$refs.player.win();
          this.$refs.toast.create('You Win !', 'bottom-center', 'success', this.betweenTurnsDelay);
          setTimeout(() => bus.$emit('endOfTurn'), this.betweenTurnsDelay);
        }, this.betweenTurnsDelay);
      } else {
        // If the dealer has an ace or a 10 visible in his hand ,
        // the win isn't immediate for the player (normal blackjack)
        this.playerBlackjack();
      }
    },
    // End of player's turn, reveal the dealer's card and call the callback
    endOfPlayerTurn(callback) {
      setTimeout(() => {
        this.$refs.dealer.revealHiddenCard();
        this.playerHand = this.$refs.player.handScore;
        setTimeout(callback, this.betweenTurnsDelay);
      }, this.$store.state.delays.dealCardWait);
    },
    // End the turn
    endTurn() {
      const dealerScore = this.$refs.dealer.handScore;
      if (dealerScore > 21 || (dealerScore < this.playerHand && this.playerHand < 22)) {
        this.$refs.player.win();
        this.$refs.toast.create('You Win !', 'bottom-center', 'success', this.betweenTurnsDelay);
      } else if ((dealerScore < 22 && dealerScore > this.playerHand) || this.playerHand > 21) {
        this.$refs.toast.create('Dealer Wins !', 'top-center', 'danger', this.betweenTurnsDelay);
        this.$refs.player.lose();
      } else if (dealerScore === this.playerHand) {
        this.$refs.toast.create('Push', 'top-center', 'warning', this.betweenTurnsDelay);
        this.$refs.player.push();
      } else {
        console.error(`Couldn't dertermine the issue of the game ${dealerScore}/${this.playerHand}`);
      }
      setTimeout(() => bus.$emit('endOfTurn'), this.betweenTurnsDelay);
    },
    // Game over
    gameOver() {
      setTimeout(() => this.$bvModal.show('gameoverModal'), this.betweenTurnsDelay);
    },
    // Quit the game and return to the home page
    quitGame() {
      this.$router.push('/');
    },
  },
  components: {
    Dealer,
    Player,
    Toast,
  },
};
</script>

<style scoped lang="scss">

</style>
