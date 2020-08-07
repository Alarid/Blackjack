export default {
  namespaced: true,
  state: {
    tokens: [
      { value: 1, variant: 'light', border: 'info' },
      { value: 5, variant: 'danger' },
      { value: 25, variant: 'success' },
      { value: 50, variant: 'dark' },
      { value: 100, variant: 'primary' },
    ],
  },
  getters: {
    all(state) {
      return state.tokens;
    },
    token: (state) => (value) => state.tokens.filter((t) => t.value === value).pop(),
  },
};
