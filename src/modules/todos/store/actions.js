import todosApi from '@/api/todosApi';

export const getAllTodos = async ({ commit }, priority) => {
  try {
    const response = await todosApi.get('/todos', {
      params: {
        limit: 250,
        offset: 0,
        priority,
      },
    });

    commit('setTodos', response.data);
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
