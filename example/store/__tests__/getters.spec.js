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

  test('should test "isAdminOld" action', () => {
    const results = getters.isAdminOld(mocks.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
});