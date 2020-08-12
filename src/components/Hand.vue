<template>
  <div class="cards-area" v-if="cards.length > 0" >
    <div class="cards position-relative h-100" :style="style">
      <Card v-for="(card, idx) in cards" :key="idx"
        :filename="card.image"
        :hidden="card.hidden"
        :idxInHand="idx" />
    </div>

    <div v-if="showScore">
      <div class="score d-flex align-items-center rounded-circle">
        <span class="d-block mx-auto"> {{ score }}</span>
      </div>

      <div class="owner-name">
        {{ owner }}
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Hand',
  data() {
    return {
      cardsOffet: 20,
      score: 0,
    };
  },
  props: {
    cards: { type: Array, required: true },
    owner: { type: String, required: true },
    showScore: { type: Boolean, required: true },
  },
  watch: {
    // eslint-disable-next-line object-shorthand, func-names
    cards: function (newCards) {
      const totalizer = (total, c) => total + this.getCardValue(c.value);
      this.score = newCards.filter((c) => !c.hidden).reduce(totalizer, 0);
    },
  },
  computed: {
    offset() {
      return this.cards.length * this.cardsOffet;
    },
    style() {
      return {
        transform: `translateX(-${this.offset}px)`,
      };
    },
    isSoft17() {
      return this.score === 17 && this.cards.filter((c) => c.value === 'ace').length === 1;
    },
  },
  methods: {
    getCardValue(value) {
      // Not an ace, returning value
      if (value !== 'ace') {
        return parseInt(value); // eslint-disable-line radix
      }
      // Computing the ace's
      const otherCardsTotal = this.cards
        .filter((c) => c.value !== 'ace')
        .reduce((total, c) => total + c.value, 0);
      return otherCardsTotal > 10 || otherCardsTotal === 0 ? 1 : 11;
    },
  },
  components: {
    Card,
  },
};
</script>

<style scoped lang="scss">
$margin: 15px;
$score-radius: 80px;

.cards-area {
  position: absolute;
  left: 50%;
  height: 40%;
  z-index: -1;

  &.player-cards {
    bottom: $margin;
  }

  &.dealer-cards {
    top: $margin;
  }

  .score {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) translateX(250px);
    width: $score-radius;
    height: $score-radius;
    font-weight: bold;
    font-size: 22pt;
    background-color: rgba(0,0,0,0.5);
    text-align: center;
  }

  .owner-name {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) translateX(350px);
    font-weight: bold;
    font-size: 18pt;
  }
}
</style>
