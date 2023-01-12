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

  test('setClientName', () => {
    const params = {};
    mutations.setClientName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('removeClientName', () => {
    const params = {};
    mutations.removeClientName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
});