<template>
  <div class="cashout">
    <a href="#" class="text-success" @click="cashout">
      $ Cashout
    </a>
  </div>
</template>

<script>
export default {
  name: 'Cashout',
  methods: {
    cashout() {
      console.log('cashout');
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
