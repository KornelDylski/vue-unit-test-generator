import { actions, state as initState } from '../index';

const mocks = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: initState(),  
};

/**
 * client actions
 */
describe('Client actions', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mocks.state = initState();
  });

  test('should test "initClient" action', () => {
    const params = {};
    actions.initClient(mocks, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'setClientName'); /* TODO: fill commit args */
  });

  test('should test "removeClient" action', () => {
    actions.removeClient(mocks);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'removeClientName'); /* TODO: fill commit args */
  });
});