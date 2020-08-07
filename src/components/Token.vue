<template>
  <b-button :variant="variant" :size="size" :class="getClass">{{value}}</b-button>
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
      return `token border-${this.border} ${this.col}`;
    },
  },
};
</script>

<style scoped lang="scss">
@mixin box-shadow($value) {
  -webkit-box-shadow: $value;
  -moz-box-shadow: $value;
  box-shadow: $value;
}

.token {
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 100%;
  border-width: 5px;
  width: 80px;
  height: 80px;
  text-align: center;

  &:not(.no-shadow) {
    @include box-shadow(3px 3px 5px 2px rgba(0,0,0,0.6));
  }
  &.no-shadow {
    // Small shadow
    @include box-shadow(2px 2px 2px 2px rgba(0,0,0,0.6));
  }
}
</style>
