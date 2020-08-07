import Vue from 'vue';
import Vuex from 'vuex';

import cardModule from './modules/cards';
import tokensModule from './modules/tokens';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cards: cardModule,
    tokens: tokensModule,
  },
});
