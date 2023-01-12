import { actions, state as initState } from '../adminStore';

const mocks = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: initState(),  
};

/**
 * adminStore actions
 */
describe('AdminStore actions', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mocks.state = initState();
  });

  test('initAdmin', () => {
    const params = {};
    actions.initAdmin(mocks, params);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'setAdminName', null); /* TODO: fill commit args */
  });

  test('removeAdmin', () => {
    actions.removeAdmin(mocks);

    expect(mocks.commit).toHaveBeenNthCalledWith(1, 'removeAdminName');
  });
});