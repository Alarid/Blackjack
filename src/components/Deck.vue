<template>
  <div class="deck">
    <Toast ref="toast"/>
    <img alt="deck icon" src="../assets/deck.png">
    <span class="font-weight-bold">{{cards.length}}</span>
  </div>
</template>

<script>
import shuffle from 'shuffle-array';
import Toast from '@/components/Toast.vue';

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
  mounted() {
    const { deck } = this.$store.state;
    this.base = new Array(this.nbDecks).fill(deck).flat();
    this.shuffleDeck();
  },
  methods: {
    shuffleDeck() {
      this.$refs.toast.create('Shuffling', 'top-right', 'info', 2000);
      this.cards = this.base.slice();
      shuffle(this.cards);
      this.drawedCard = null;
    },
    drawCard() {
      if (this.cards.length === 0) {
        this.shuffleDeck();
      }
      this.drawedCard = this.cards.pop();
      this.drawedCard.hidden = false;
      return this.drawedCard;
    },
  },
  components: {
    Toast,
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
