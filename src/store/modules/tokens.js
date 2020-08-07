export default {
  namespaced: true,
  state: {
    tokens: [
      { value: 1, variant: 'light', border: 'info' },
      { value: 5, variant: 'red' },
      { value: 25, variant: 'green' },
      { value: 50, variant: 'blue' },
      { value: 100, variant: 'dark' },
      { value: 500, variant: 'purple' },
      { value: 1000, variant: 'gold' },
    ],
    colors: {
      light: '#FFFFFF',
      red: '#AE0F28',
      green: '#00A333',
      blue: '#6D7C8A',
      dark: '#17232E',
      purple: '#75498F',
      gold: '#E6AE03',
    },
  },
  getters: {
    all(state) {
      return state.tokens;
    },
    token: (state) => (value) => state.tokens.filter((t) => t.value === value).pop(),
    tokenColor: (state) => (variant) => state.colors[variant],
  },
};
