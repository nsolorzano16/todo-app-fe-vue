import store from '@/store';
const isAuthenticatedGuard = async (to, from, next) => {
  const authStatus = store.getters['auth/isLoggedIn'];
  if (authStatus === 'NOT_AUTHENTICATED' || authStatus === 'AUTHENTICATING') {
    next({ name: 'login' });
  } else {
    next();
  }
};
export default isAuthenticatedGuard;
