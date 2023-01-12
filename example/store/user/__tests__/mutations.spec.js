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

  test('should test "setUserName" action', () => {
    const params = {};
    mutations.setUserName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('should test "removeUserName" action', () => {
    const params = {};
    mutations.removeUserName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('should test "enablePriceCut" action', () => {
    const params = {};
    mutations.enablePriceCut(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('should test "disablePriceCut" action', () => {
    const params = {};
    mutations.disablePriceCut(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
});