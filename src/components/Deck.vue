<template>
  <div class="deck">
    <img alt="deck icon" src="../assets/deck.png">
    <span class="font-weight-bold">{{cards.length}}</span>
  </div>
</template>

<script>
import shuffle from 'shuffle-array';

export default {
  name: 'Deck',
  data() {
    return {
      base: [],
      cards: [],
      drawedCard: null,
    };
  },
  computed: {
    cardImage() {
      return this.drawedCard.image;
    },
  },
  props: {
    nbDecks: { type: Number, default: 2 },
  },
  created() {
    this.$store.dispatch('cards/fillDeck').then(() => {
      const { deck } = this.$store.state.cards;
      this.base = new Array(this.nbDecks).fill(deck).flat();
      this.shuffleDeck();
    });
  },
  methods: {
    shuffleDeck() {
      this.cards = this.base.slice();
      shuffle(this.cards);
      this.drawedCard = null;
    },
    drawCard() {
      if (this.cards.length === 0) {
        this.shuffleDeck();
      }
      this.drawedCard = this.cards.pop();
      return this.drawedCard;
    },
  },
};
</script>

<style scoped lang="scss">
.deck {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
