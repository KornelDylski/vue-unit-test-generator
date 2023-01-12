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

  test('initUser', () => {
    const params = {};
    actions.initUser(mocks, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'setUserName', null); /* TODO: fill commit args */
    expect(mocks.dispatch).toHaveBeenNthCalledWith(1, 'updatePriceCut');
  });

  test('removeUser', () => {
    actions.removeUser(mocks);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'removeUserName');
  });

  test('updatePriceCut', () => {
    const params = {
      reason: null, /* TODO: fill param */
    };
    actions.updatePriceCut({
      ...mocks,
      getters: {
        isUserOld: null, /* TODO: fill getter */
      },
    }, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'enablePriceCut');
    expect(mocks.commit).toHaveBeenNthCalledWith(2, 'disablePriceCut');
  });
});