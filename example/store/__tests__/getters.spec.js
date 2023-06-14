import { state as initState } from '../adminStore';

const mocks = {
  state: initState(),
};

/**
 * adminStore getters
 */
describe('AdminStore getters', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });
});