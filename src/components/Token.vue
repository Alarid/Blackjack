<template>
  <b-button
    :size="size"
    :class="getClass"
    :style="{ backgroundColor: bgColor }">
    {{value}}
  </b-button>
</template>

<script>
export default {
  name: 'Token',
  props: {
    variant: { type: String, required: true },
    size: { type: String, default: 'lg' },
    col: { type: String, default: 'col-auto' },
    border: { type: String, default: 'light' },
    value: { type: Number },
  },
  computed: {
    getClass() {
      return `token border-${this.border} ${this.col} ${this.textColor}`;
    },
    bgColor() {
      return this.$store.getters['tokens/tokenColor'](this.variant);
    },
    textColor() {
      return this.variant === 'light' ? 'text-dark' : 'text-white';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/mixins';
@import '@/scss/vars';

.token {
  margin-right: $token-mr;
  margin-bottom: $token-mb;
  border-radius: 100%;
  border-width: $token-border-width;
  width: $token-width;
  height: $token-width;
  text-align: center;
  font-weight: bold;

  &:not(.no-shadow) {
    @include box-shadow(3px 3px 5px 2px rgba(0,0,0,0.6));
  }
  &.no-shadow {
    // Small shadow
    @include box-shadow(2px 2px 2px 2px rgba(0,0,0,0.6));
  }
}
</style>
