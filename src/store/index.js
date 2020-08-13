/* eslint-disable radix */
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
    highscores: [],
    nbHighscoresKept: 5,
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
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      } else {
        const colors = ['clubs', 'diamonds', 'hearts', 'spades'];
        const heads = ['jack', 'queen', 'king', 'ace'];
        const cards = [];

        colors.forEach((color) => {
          let start = 2;
          cards.push([...Array(9)].fill(null)
            // eslint-disable-next-line no-plusplus
            .map(() => ({ value: start, image: `${start++}_of_${color}.png` }))
            .concat(heads.map((head) => ({ value: (head === 'ace' ? head : 10), image: `${head}_of_${color}.png` }))));
        });
        state.deck = cards.flat();
      }
    },
    // Save the highscore of the player
    saveHighscore(state, score) {
      // Get local copy of state highscores to add the new one
      const scores = state.highscores.slice();
      scores.push({ date: new Date(), score });
      // Sort by highscore and keep only <nbHighscoresKept>
      scores.sort((s1, s2) => parseInt(s2.score) - parseInt(s1.score));
      if (scores.length > state.nbHighscoresKept) {
        scores.pop();
      }
      // Save the top X highscores
      state.highscores = scores;
    },
  },
});
