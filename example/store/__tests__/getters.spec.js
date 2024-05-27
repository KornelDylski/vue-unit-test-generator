import { state as initState } from '../adminStore';

const context = {
  state: initState(),
};

/**
 * adminStore getters
 */
describe('AdminStore getters', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
});