<template>
  <div class="highscores w-50 mt-5 text-white p-3">
    <h3>Highscores</h3>
    <hr/>
    <b-row v-for="(score, idx) in highscores" :key="idx" class="justify-content-between">
      <b-col cols="auto">
        {{score.date | momentFilter}}
      </b-col>
      <b-col cols="auto">
        <b>$ {{score.score}}</b>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Highscores',
  computed: {
    highscores() {
      return this.$store.state.highscores;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss/vars';

.highscores {
  background-color: $wallet-bg;
  border-radius: $wallet-border-radius;
  border: $wallet-border;

  hr {
    border-top-color: white;
  }
}
</style>
