<template>
  <img
    :src="src"
    alt="card"
    class="bg-white playing-card"
    :style="style" />
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      offset: 50,
    };
  },
  props: {
    filename: { type: String, required: true },
    idxInHand: { type: Number, required: true },
    hidden: { type: Boolean, required: false, default: false },
  },
  computed: {
    src() {
      return `images/cards/${this.hidden ? 'back.png' : this.filename}`;
    },
    xOffset() {
      return this.idxInHand * this.offset;
    },
    degree() {
      return `${this.idxInHand % 2 === 0 ? '-' : '+'}3deg`;
    },
    style() {
      return {
        // eslint-disable-next-line max-len
        transform: `translateY(-50%) translateX(-50%) translateX(${this.xOffset}px) rotate(${this.degree})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/mixins';

.playing-card {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 220px;
  border-radius: 0.50rem;

  @include box-shadow(0 0 5px 5px rgba(0,0,0,0.6));
}
</style>
