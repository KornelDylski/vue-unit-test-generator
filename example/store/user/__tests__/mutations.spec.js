import initState from '../state';

const mocks = {
  state: initState(),  
};

/**
 * user mutations
 */
describe('User mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });

  test('setUserName', () => {
    const params = {};
    mutations.setUserName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('removeUserName', () => {
    const params = {};
    mutations.removeUserName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('enablePriceCut', () => {
    const params = {};
    mutations.enablePriceCut(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('disablePriceCut', () => {
    const params = {};
    mutations.disablePriceCut(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
});