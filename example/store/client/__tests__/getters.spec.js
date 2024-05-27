import store from '../index';

const { getters, state: initState } = store;

const context = {
  state: initState(),
};

/**
 * client getters
 */
describe('Client getters', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
});