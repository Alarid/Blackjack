<template>
  <div class="cards-area" v-if="cards.length > 0" >
    <div class="cards position-relative h-100" :style="style">
      <Card v-for="(card, idx) in cards" :key="idx"
        :filename="card.image"
        :idxInHand="idx" />
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
    };
  },
  props: {
    cards: { type: Array, required: true },
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
  },
  components: {
    Card,
  },
};
</script>

<style scoped lang="scss">
$margin: 15px;

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
}
</style>
