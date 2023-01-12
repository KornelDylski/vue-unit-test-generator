const initState = () => ({
  clientName: null,
  age: 23,
});

const mutations = {
  setClientName(state, clientName) {
    state.clientName = clientName;
  },
  removeClientName(state) {
    state.clientName = null;
  },
};

const actions = {
  initClient({ state, commit }, value) {
    commit('setClientName', value);
  },
  removeClient: ({ commit }) => {
    commit('removeClientName');
  },
};

export default {
  state: initState,
  mutations,
  actions,
  getters: {
    isClientOld(state) {
      return state.age > 50;
    },
  },
};
