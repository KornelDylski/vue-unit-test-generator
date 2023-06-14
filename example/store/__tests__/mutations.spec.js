import { state as initState } from '../adminStore';

const mocks = {
  state: initState(),  
};

/**
 * adminStore mutations
 */
describe('AdminStore mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });
});