import { state as initState } from '../adminStore';

const context = {
  state: initState(),  
};

/**
 * adminStore mutations
 */
describe('AdminStore mutations', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
});