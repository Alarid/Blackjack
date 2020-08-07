export default {
  namespaced: true,
  state: {
    deck: [],
  },
  mutations: {
    fillDeck(state, cards) {
      state.deck = cards;
    },
  },
  getters: {
  },
  actions: {
    fillDeck(context) {
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
      context.commit('fillDeck', cards.flat());
    },
  },
};
