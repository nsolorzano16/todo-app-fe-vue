import { useStore } from 'vuex';
import { computed } from 'vue';

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    return await store.dispatch('auth/createUser', user);
  };

  const signInUser = async (user) => {
    return await store.dispatch('auth/signInUser', user);
  };

  const logout = async () => {
    return await store.dispatch('auth/logout');
  };

  return {
    createUser,
    signInUser,
    logout,
    email: computed(() => store.getters['auth/getEmail']),
  };
};

export default useAuth;
