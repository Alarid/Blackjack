<template>
  <div class="dealer">
    <Toast ref="toast" />

    <Deck ref="deck" />

    <Hand ref="hand"
      class="dealer-cards"
      :cards="cards"
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
      cards: [],
    };
  },
  props: {
    showHandScore: { type: Boolean, required: true },
    dealCardWait: { type: Number, required: true },
    playerHand: { type: Number, required: true },
    betweenTurnsDelay: { type: Number, required: true },
  },
  created() {
    bus.$on('playerHit', this.dealCardToPlayer);
    bus.$on('endOfTurn', this.clearHand);
  },
  computed: {
    handScore() {
      return this.cards.reduce((total, c) => total + this.$refs.hand.getCardValue(c.value), 0);
    },
  },
  methods: {
    // Deal cards to player and self
    dealCards() {
      return new Promise((next) => this.dealCardToPlayer(next))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToSelf(next), this.dealCardWait)))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToPlayer(next), this.dealCardWait)))
        // eslint-disable-next-line max-len
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToSelf(next), this.dealCardWait)));
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
      if (this.cards.length === 0) {
        // First card is hidden
        card.hidden = true;
      }
      this.cards.push(card);

      // Bust
      if (this.handScore > 21) {
        this.$refs.toast.create('BUST', 'top-center', 'danger', 1000);
      }

      if (next) {
        next();
      }
    },
    // Player stand, dealer's turn to play
    play() {
      if (this.handScore <= 16 && this.handScore < this.playerHand) {
        this.dealCardToSelf();
        setTimeout(() => this.play(), this.betweenTurnsDelay);
      } else {
        this.$emit('endTurn');
      }
    },
    // Reveal the hidden card in dealer's hand
    revealHiddenCard() {
      // eslint-disable-next-line no-param-reassign
      this.cards = this.cards.map((card) => { card.hidden = false; return card; });
      this.$refs.hand.$forceUpdate();
    },
    // Remove cards from the hand
    clearHand() {
      this.cards = [];
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
