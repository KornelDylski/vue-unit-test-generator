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

  test('initClient', () => {
    const params = {};
    actions.initClient(mocks, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'setClientName', null); /* TODO: fill commit args */
  });

  test('removeClient', () => {
    actions.removeClient(mocks);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'removeClientName');
  });
});