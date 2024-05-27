import store from '../index';

const { actions, state: initState } = store;

const context = {
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
    context.state = initState();
  });
});