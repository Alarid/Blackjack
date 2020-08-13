<template>
  <BoardWrapper>
    <div class="home h-100 d-flex align-items-center justify-content-center">
      <img src="../assets/logo.png" alg="logo" class="mb-5 w-25 d-block">
      <a href="#" class="button d-block mb-5" @click="launchGame">
        <b-icon-play-fill/> Play
      </a>

      <Highscores v-if="atLeastOneHighscore"/>
    </div>
  </BoardWrapper>
</template>

<script>
import BoardWrapper from '@/components/BoardWrapper.vue';
import Highscores from '@/components/Highscores.vue';

export default {
  name: 'Home',
  computed: {
    atLeastOneHighscore() {
      return this.$store.state.highscores.length > 0;
    },
  },
  methods: {
    launchGame() {
      this.$router.push({ name: 'Game' });
    },
  },
  components: {
    BoardWrapper,
    Highscores,
  },
};
</script>

<style scoped lang="scss">
$color: #0cf;

.home {
  flex-direction: column;
}

.button {
    display: inline-block;
    padding: .75rem 2.25rem;
    border-radius: 10rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: .15rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $color;
        border-radius: 10rem;
        z-index: -2;
    }
    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: darken($color, 15%);
        transition: all .3s;
        border-radius: 10rem;
        z-index: -1;
    }
    &:hover {
        color: #fff;
        &:before {
            width: 100%;
        }
    }
}
</style>
