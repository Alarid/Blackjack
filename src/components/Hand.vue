<template>
  <div class="cards-area" v-show="cards.length > 0" >
    <div class="cards position-relative h-100" :style="style">
      <transition-group name="card" mode="out-in" :duration="500">
        <template v-for="(card, idx) in cards">
          <Card  :key="idx+1"
            :filename="card.image"
            :hidden="card.hidden"
            :idxInHand="idx" />
        </template>
      </transition-group>
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
      cards: [],
    };
  },
  props: {
    owner: { type: String, required: true },
    showScore: { type: Boolean, required: true },
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
    score() {
      const totalizer = (total, c) => total + this.getCardValue(c.value);
      return this.cards.filter((c) => !c.hidden).reduce(totalizer, 0);
    },
    privateScore() {
      return this.cards.reduce((total, c) => total + this.getCardValue(c.value), 0);
    },
    hasAceOr10() {
      const visibleCard = this.cards.filter((c) => !c.hidden).pop();
      return visibleCard.value === 'ace' || visibleCard.value === 10;
    },
  },
  methods: {
    addCard(card) {
      this.cards.push(card);
      this.$forceUpdate();
    },
    clear() {
      this.cards = [];
    },
    getCardValue(value) {
      // Not an ace, returning value
      if (value !== 'ace') {
        return parseInt(value); // eslint-disable-line radix
      }
      // Pair of aces = 12
      const nbAces = this.cards.filter((c) => c.value === 'ace').length;
      if (this.cards.length === 2 && nbAces === 2) {
        return 6;
      }
      // Only one ace in hand
      if (nbAces === 1) {
        // Value = 11 if the other cards's total <= 10
        return this.cards
          .filter((c) => c.value !== 'ace')
          .reduce((total, c) => total + c.value, 0) > 10 ? 1 : 11;
      }
      // If more than 1 ace + other cards, ace can only count as 1
      return 1;
    },
    revealHiddenCard() {
      // eslint-disable-next-line no-param-reassign
      this.cards = this.cards.map((card) => { card.hidden = false; return card; });
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

  .card-enter-active, .card-leave-active {
    transition: all 0.5s;
  }
  .card-enter {
    transform: translate(500px,-110vh) !important;
  }
  .card-leave-to {
    transform: translate(-500px,-110vh) !important;
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
