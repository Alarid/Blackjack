<template>
  <div class="cashout">
    <a href="#" class="text-success" v-b-modal.confirmCashout>
      $ Cashout
    </a>

    <b-modal id="confirmCashout"
      title="Cashout"
      size="sm"
      ok-title="Yes"
      ok-variant="success"
      cancel-title="No"
      @ok="cashout">
      <p class="my-4">Take cash and leave ?</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Cashout',
  methods: {
    cashout() {
      this.$emit('cashout');
    },
  },
};
</script>

<style scoped lang="scss">
.cashout {
  position: absolute;
  top: 15px;
  left: 15px;

  a {
    font-weight: bold;
    font-style: italic;
    font-size: 22pt;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
