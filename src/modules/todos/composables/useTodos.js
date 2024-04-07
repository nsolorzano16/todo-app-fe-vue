import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import todosApi from '@/api/todosApi';
const useTodos = () => {
  const filterPriority = ref('ALL');
  const store = useStore();

  const todosForm = ref({
    title: '',
    description: '',
    priority: 'LOW',
  });

  const getTodos = async (priority) => {
    return await store.dispatch('todos/getAllTodos', priority);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW':
        return 'text-green-600 m-2'; // Change to your desired color class for low priority
      case 'MEDIUM':
        return 'text-yellow-600 m-2'; // Change to your desired color class for medium priority
      case 'HIGH':
        return 'text-red-600 m-2'; // Change to your desired color class for high priority
      default:
        return '';
    }
  };

  const createTodo = async (todo) => {
    try {
      const resp = await todosApi.post('/todos', todo);
      return {
        ok: true,
        data: resp.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'An error has occurred creating the todo please try again',
      };
    }
  };

  const removeTodo = async (id) => {
    try {
      const resp = await todosApi.delete(`/todos`, {
        params: {
          id,
        },
      });
      return {
        ok: true,
        data: resp.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'An error has occurred removing the todo please try again',
      };
    }
  };

  const updateTodo = async ({
    title,
    description,
    priority,
    completed,
    id,
  }) => {
    try {
      const resp = await todosApi.patch(
        `/todos`,
        {
          title,
          description,
          priority,
          completed,
        },
        {
          params: {
            id,
          },
        }
      );
      return {
        ok: true,
        data: resp.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'An error has occurred updating the todo please try again',
      };
    }
  };

  const getFilteredTodos = computed(() => store.getters['todos/getAllTodos']);

  return {
    getTodos,
    getPriorityColor,
    createTodo,
    todosForm,
    removeTodo,
    updateTodo,
    filterPriority,
    getFilteredTodos,
  };
};

export default useTodos;
