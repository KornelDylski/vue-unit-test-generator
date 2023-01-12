import { state as initState } from '../adminStore';

const mocks = {
  state: initState(),  
};

/**
 * adminStore mutations
 */
describe('AdminStore mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });

  test('should test "setAdminName" action', () => {
    const params = {};
    mutations.setAdminName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });

  test('should test "removeAdminName" action', () => {
    const params = {};
    mutations.removeAdminName(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
});