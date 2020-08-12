import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// eslint-disable-next-line import/prefer-default-export
export const bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    // Fetch deck and preload card images
    this.$store.dispatch('cards/fillDeck').then(() => {
      this.$store.state.cards.deck.forEach((card) => {
        const img = new Image();
        // eslint-disable-next-line import/no-dynamic-require, global-require
        img.src = require(`@/assets/cards/${card.image}`);
      });
    });
  },
}).$mount('#app');
