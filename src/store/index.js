import auth from '@/modules/auth/store';
import todos from '@/modules/todos/store';
import { createStore } from 'vuex';

export default createStore({
  modules: {
    auth,
    todos,
  },
});
