import initState from '../state';

const mocks = {
  state: initState(),
};

/**
 * user getters
 */
describe('User getters', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });

  test('isUserOld', () => {
    const results = getters.isUserOld(mocks.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
});