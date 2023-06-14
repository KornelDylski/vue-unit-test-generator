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
});