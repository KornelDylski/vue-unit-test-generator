function updateUserProfile({ commit, dispatch, state }, user) {
  const usersModule = state.users[user.module];

  commit('enableUserUpdate', { id: user.id });

  const userFound = usersModule.list.find((u) => u.id === user.id);
  if (userFound) {
    commit('setUserProfile', { profile: user.profile });

    return dispatch('logUpdateEvent', {
      change: 'profileUpdate',
      userId: user.id,
    });
  }

  commit('disableUserUpdate', { id: user.id });
  return null;
}
