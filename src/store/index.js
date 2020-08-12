import Vue from 'vue';
import Vuex from 'vuex';

import tokensModule from './modules/tokens';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    delays: {
      betweenTurns: 2000,
      dealCardWait: 500,
    },
    save: {
      highscore: 0,
    },
    deck: [],
  },
  modules: {
    tokens: tokensModule,
  },
  mutations: {
    // Initialise store from localstorage if found
    // Otherwise fill the deck with cards
    initialiseStore(state) {
      const store = localStorage.getItem('store');
      if (store) {
        console.log('Initializing store from local storage');
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      } else {
        console.log('filling deck for the first time');
        const colors = ['clubs', 'diamonds', 'hearts', 'spades'];
        const heads = ['jack', 'queen', 'king', 'ace'];
        const cards = [];

        colors.forEach((color) => {
          let start = 2;
          cards.push([...Array(9)].fill(null)
            // eslint-disable-next-line no-plusplus
            .map(() => ({ value: start, image: `${start++}_of_${color}.png` }))
            .concat(heads.map((head) => ({ value: (head === 'ace' ? 11 : 10), image: `${head}_of_${color}.png` }))));
        });
        state.deck = cards.flat();
      }
    },
    // Save the highscore of the player
    saveHighscore(state, score) {
      if (score > state.save.highscore) {
        state.save.highscore = score;
      }
    },
  },
});
