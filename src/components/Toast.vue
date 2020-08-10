<template>
  <div class="toasts"></div>
</template>

<script>
export default {
  name: 'Toast',
  methods: {
    create(title, position, variant, delay) {
      this.$bvToast.toast(title, {
        title: false,
        toaster: `b-toaster-${position}`,
        // eslint-disable-next-line object-shorthand
        variant: variant,
        noCloseButton: true,
        headerClass: 'hidden',
        autoHideDelay: delay,
        solid: true,
        appendToast: true,
      });
    },
  },
};
</script>
