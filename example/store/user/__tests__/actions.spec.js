import actions from '../actions';
import initState from '../state';

const context = {
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
    context.state = initState();
  });
});