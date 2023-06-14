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
});