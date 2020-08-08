<template>
  <div class="dealer">
    <Deck ref="deck" />

    <Hand ref="hand"
      class="dealer-cards"
      :cards="cards"
      owner="Dealer" />
  </div>
</template>

<script>
import Deck from '@/components/Deck.vue';
import Promise from 'promise';
import Hand from '@/components/Hand.vue';

export default {
  name: 'Dealer',
  data() {
    return {
      cards: [],
      dealCardWait: 500,
      turn: ['Player', 'Self'],
      turnCounter: 0,
    };
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
        .then(() => new Promise((next) => setTimeout(() => this.dealCardToSelf(next), this.dealCardWait)))
        .then(() => this.$emit('cardsDealt'));
    },
    // Deal a card to the player
    dealCardToPlayer(next) {
      this.$emit('dealCard', this.$refs.deck.drawCard());
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
      if (next) {
        next();
      }
    },
  },
  components: {
    Deck,
    Hand,
  },
};
</script>

<style scoped lang="scss">

</style>
