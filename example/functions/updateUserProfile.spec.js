import { state, user } from './mocks';

describe('updateUserProfile', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
  });

  test('commits enable, set, and dispatch when user found', () => {
    updateUserProfile({ commit, dispatch, state }, user);

    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, 'enableUserUpdate', {
      id: user.id,
    });
    expect(commit).toHaveBeenNthCalledWith(2, 'setUserProfile', {
      profile: user.profile,
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('logUpdateEvent', {
      change: 'profileUpdate',
      userId: user.id,
    });
  });

  test('commits disable and returns null when user not found', () => {
    state.users.module1.list = [{ id: 2 }];

    const result = updateUserProfile({ commit, dispatch, state }, user);

    expect(commit).toHaveBeenCalledWith('disableUserUpdate', { id: user.id });
    expect(result).toBeNull();
  });
});
