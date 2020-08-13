import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import momentFilter from '@/filters/momentFilter';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.filter('momentFilter', momentFilter);

// eslint-disable-next-line import/prefer-default-export
export const bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    // Initialise store
    this.$store.commit('initialiseStore');

    // Subscribe to store updates
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      localStorage.setItem('store', JSON.stringify(state));
    });

    // Fetch deck and preload card images
    this.$store.state.deck.forEach((card) => {
      const img = new Image();
      img.src = `images/cards/${card.image}`;
    });
    // Preload back card image too
    const img = new Image();
    img.src = 'images/cards/back.png';
  },
}).$mount('#app');
