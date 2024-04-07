export default {
  name: 'todos',
  component: () =>
    import(
      /* webpackChunkName: "todos" */ '@/modules/todos/layouts/TodosLayout.vue'
    ),
  children: [
    {
      path: '',
      name: 'todosList',
      component: () =>
        import(
          /* webpackChunkName: "todos-view" */ '@/modules/todos/views/TodosView.vue'
        ),
    },
  ],
};
