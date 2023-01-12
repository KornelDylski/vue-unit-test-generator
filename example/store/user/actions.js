export async function initUser({ commit, dispatch }, name) {
  commit('setUserName', name);
  dispatch('updatePriceCut');
}

export const removeUser = ({ commit }) => {
  commit('removeUserName');
};

export const updatePriceCut = ({ getters, commit }, { reason }) => {
  if (getters.isUserOld) {
    commit('enablePriceCut');
  } else {
    commit('disablePriceCut');
  }
};
