<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <span
        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >TodoApp</span
      >
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li @click="handleLogout">
            <a
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
  import useAuth from '@/modules/auth/composables/useAuth';
  import { useRouter } from 'vue-router'; 
export default {
  name: 'AppSidebar',

  setup() {
    const { logout,email } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
      await logout();
      router.push({ name: 'login' });

    };
    return {handleLogout,email };
  },
};
</script>
