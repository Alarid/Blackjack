<template>
  <div class="dealer">
    <Toast ref="toast" />

    <Deck ref="deck" />

    <Hand ref="hand"
      class="dealer-cards"
      :showScore="showHandScore"
      owner="Dealer" />
  </div>
</template>

<script>
import Promise from 'promise';
import { bus } from '@/main';

import Deck from '@/components/Deck.vue';
import Hand from '@/components/Hand.vue';
import Toast from '@/components/Toast.vue';

export default {
  name: 'Dealer',
  data() {
    return {
      isPlaying: false,
      betweenTurnsDelay: null,
      dealCardWait: null,
      showHandScore: false,
    };
  },
  props: {
    playerHand: { type: Number, required: true },
  },
  created() {
    bus.$on('playerHit', this.dealCardToPlayer);
    bus.$on('endOfTurn', this.clearHand);

    this.betweenTurnsDelay = this.$store.state.delays.betweenTurns;
    this.dealCardWait = this.$store.state.delays.dealCardWait;
  },
  computed: {
    handScore() {
      return this.$refs.hand.privateScore;
    },
    shouldKeepPlaying() {
      return (this.handScore <= 16 /** && this.handScore <= this.playerHand */)
        || this.$refs.hand.isSoft17;
    },
    hasAceOr10() {
      return this.$refs.hand.hasAceOr10;
    },
  },
  methods: {
    // Deal cards to player and self
    dealCards() {
      this.isPlaying = false;
      return new Promise((next) => this.dealCardToPlayer(next))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToSelf(next), this.dealCardWait)))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToPlayer(next), this.dealCardWait)))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToSelf(next), this.dealCardWait)))
        .then(() => new Promise((next) => { this.showHandScore = true; next(); }));
    },
    // Deal a card to the player
    dealCardToPlayer(next) {
      bus.$emit('dealCard', this.$refs.deck.drawCard());
      if (next) {
        next();
      }
    },
    // Deal a card to self
    dealCardToSelf(next) {
      const card = this.$refs.deck.drawCard();
      if (this.$refs.hand.cards.length === 0) {
        // First card is hidden
        card.hidden = true;
      }
      this.$refs.hand.addCard(card);

      // Bust
      if (this.handScore > 21) {
        this.$refs.toast.create('BUST', 'top-center', 'danger', 1000);
      } /** else if (this.handScore === 21 && this.isPlaying) {
        // BLACKJACK !
        this.blackjack();
      } */

      if (next) {
        next();
      }
    },
    // Player stand, dealer's turn to play
    play() {
      this.isPlaying = true;
      if (this.shouldKeepPlaying) {
        this.dealCardToSelf();
        setTimeout(() => this.play(), this.betweenTurnsDelay);
      } else {
        this.$emit('endTurn');
      }
    },
    // Reveal the hidden card in dealer's hand
    revealHiddenCard() {
      this.$refs.hand.revealHiddenCard();
      // this.$refs.hand.$forceUpdate();
      /** if (this.handScore === 21) {
        this.blackjack();
      } */
    },
    // Remove cards from the hand
    clearHand() {
      this.$refs.hand.clear();
      this.showHandScore = false;
    },
    // Blackjack popup
    blackjack() {
      this.$refs.toast.create('BLACKJACK !', 'top-center', 'danger', this.betweenTurnsDelay);
    },
  },
  components: {
    Deck,
    Hand,
    Toast,
  },
};
</script>

<style scoped lang="scss">

</style>
