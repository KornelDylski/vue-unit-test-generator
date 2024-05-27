import { actions, state as initState } from '../adminStore';

const context = {
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
    context.state = initState();
  });
});