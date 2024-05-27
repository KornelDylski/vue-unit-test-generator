import store from '../index';

const { mutations, state: initState } = store;

const context = {
  state: initState(),  
};

/**
 * client mutations
 */
describe('Client mutations', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
});