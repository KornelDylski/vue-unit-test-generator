import { state as initState } from '../index';

const mocks = {
  state: initState(),  
};

/**
 * client mutations
 */
describe('Client mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });

  test('should test "setClientName" action', () => {
    const params = {};
    mutations.setClientName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('should test "removeClientName" action', () => {
    const params = {};
    mutations.removeClientName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
});