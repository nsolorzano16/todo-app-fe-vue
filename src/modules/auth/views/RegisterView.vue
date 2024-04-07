<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="fullName"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Full Name</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userForm.fullName"
              id="fullName"
              name="fullName"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userForm.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userForm.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <div class="mt-4 text-right">
        <p class="text-sm text-gray-600">
          Go to
          <router-link
            :to="{ name: 'login' }"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useAuth from '../composables/useAuth';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; 
export default {
  setup() {
    const { createUser } = useAuth();
    const router = useRouter();
    const userForm = ref({
      email: '',
      password: '',
      fullName: '',
    });

    return {
      userForm,
      onSubmit: async () => {
        const resp = await createUser(userForm.value);
        if (resp.ok) {
          userForm.value = {
            email: '',
            password: '',
            fullName: '',
          };
          router.push({name:'todosList'})


        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: resp.message,
          });
        }
      },
    };
  },
};
</script>
