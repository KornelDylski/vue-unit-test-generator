
export default {
  setUserName(state, userName) {
    state.userName = userName;
  },
  removeUserName(state) {
    state.userName = null;
  },
  enablePriceCut(state) {
    state.priceCut = true;
  },
  disablePriceCut(state) {
    state.priceCut = false;
  },
};
