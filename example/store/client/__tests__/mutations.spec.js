import { state as initState } from '../index';

const mocks = {
  state: initState(),  
};

/**
 * client mutations
 */
describe('Client mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });
});