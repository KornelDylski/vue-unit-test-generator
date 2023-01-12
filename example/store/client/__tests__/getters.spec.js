import { state as initState } from '../index';

const mocks = {
  state: initState(),
};

/**
 * client getters
 */
describe('Client getters', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });

  test('should test "isClientOld" action', () => {
    const results = getters.isClientOld(mocks.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
});