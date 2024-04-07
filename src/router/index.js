import { createRouter, createWebHashHistory } from 'vue-router';
import authRouter from '../modules/auth/router';
import todosRouter from '../modules/todos/router';
import isAuthenticatedGuard from '../modules/auth/router/auth-guard';

const routes = [
  {
    path: '/',
    ...authRouter,
  },
  {
    path: '/todos',
    beforeEnter: [isAuthenticatedGuard],
    ...todosRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
