import Vue from 'vue';
import Vuex from 'vuex';

import cardModule from './modules/cards';
import tokensModule from './modules/tokens';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    delays: {
      betweenTurns: 1500,
      dealCardWait: 500,
    },
  },
  modules: {
    cards: cardModule,
    tokens: tokensModule,
  },
});
