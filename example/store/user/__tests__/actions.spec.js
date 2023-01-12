import actions from '../actions';
import initState from '../state';

const mocks = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: initState(),  
};

/**
 * user actions
 */
describe('User actions', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mocks.state = initState();
  });

  test('should test "initUser" action', () => {
    const params = {};
    actions.initUser(mocks, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'setUserName'); /* TODO: fill commit args */
    expect(mocks.dispatch).toHaveBeenNthCalledWith(1, 'updatePriceCut'); /* TODO: fill dispatch args */
  });

  test('should test "removeUser" action', () => {
    actions.removeUser(mocks);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'removeUserName'); /* TODO: fill commit args */
  });

  test('should test "updatePriceCut" action', () => {
    const params = {};
    actions.updatePriceCut({
      ...mocks,
      getters: {
        isUserOld: null, /* TODO: fill getter */
      },
    }, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'enablePriceCut'); /* TODO: fill commit args */
    expect(mocks.commit).toHaveBeenNthCalledWith(2, 'disablePriceCut'); /* TODO: fill commit args */
  });
});