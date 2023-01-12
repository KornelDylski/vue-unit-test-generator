const initState = () => ({
  adminName: null,
  age: 23,
});

const mutations = {
  setAdminName(state, adminName) {
    state.adminName = adminName;
  },
  removeAdminName(state) {
    state.adminName = null;
  },
};

const actions = {
  initAdmin({ state, commit }, value) {
    commit('setAdminName', value);
  },
  removeAdmin: ({ commit }) => {
    commit('removeAdminName');
  },
};

export default {
  state: initState,
  mutations,
  actions,
  getters: {
    isAdminOld(state) {
      return state.age > 50;
    },
  },
};
