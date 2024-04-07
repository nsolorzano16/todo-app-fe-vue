import todosApi from '@/api/todosApi';

export const createUser = async ({ commit }, user) => {
  try {
    const response = await todosApi.post('/auth/register', {
      ...user,
    });

    commit('loginUser', response.data);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'An error has occurred please try again',
    };
  }
};

export const signInUser = async ({ commit }, user) => {
  try {
    const response = await todosApi.post('/auth/login', {
      ...user,
    });

    commit('loginUser', response.data);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'An error has occurred please try again',
    };
  }
};

export const logout = async ({ commit }) => {
  commit('logoutUser');
  return {
    ok: true,
    message: 'successfully logged out ',
  };
};
