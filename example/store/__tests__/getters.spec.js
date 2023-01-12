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

  test('isAdminOld', () => {
    const results = getters.isAdminOld(mocks.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
});