<template>
  <div class="grid grid-cols-2">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="todosForm.title"
              id="title"
              name="title"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="todosForm.description"
              id="description"
              name="description"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="priority"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Priority</label
            >
          </div>
          <div class="mt-2">
            <select
              v-model="todosForm.priority"
              id="priority"
              name="priority"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden m-10">
      <div class="px-4 py-2 justify-center text-center">
        <h1 class="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
      </div>
      <div class="flex justify-center">
        <div
          :class="[
            'py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-l-md cursor-pointer',
            { 'bg-gray-400': filterPriority === 'ALL' },
          ]"
          @click="filterPriority = 'ALL'"
        >
          All
        </div>
        <div
          :class="[
            'py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer',
            { 'bg-gray-400': filterPriority === 'LOW' },
          ]"
          @click="filterPriority = 'LOW'"
        >
          Low
        </div>
        <div
          :class="[
            'py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer',
            { 'bg-gray-400': filterPriority === 'MEDIUM' },
          ]"
          @click="filterPriority = 'MEDIUM'"
        >
          Medium
        </div>
        <div
          :class="[
            'py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-r-md cursor-pointer',
            { 'bg-gray-400': filterPriority === 'HIGH' },
          ]"
          @click="filterPriority = 'HIGH'"
        >
          High
        </div>
      </div>

      <div v-if="getFilteredTodos.length === 0" class="text-center">
        You don't have todos yet!
      </div>
      <div class="w-full" v-else>
        <ul class="divide-y divide-gray-200 px-4">
          <li class="py-4" v-for="todo in getFilteredTodos" :key="todo.id">
            <div class="flex items-center">
              <input
                v-model="todo.completed"
                @click="markAsCompleted(todo)"
                type="checkbox"
                class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label :for="todo.id" :class="getPriorityColor(todo.priority)">{{
                todo.priority
              }}</label>
              <label
                :for="todo.id"
                :class="[
                  'ml-3 block',
                  'text-gray-900',
                  'w-full',
                  { 'line-through': todo.completed },
                ]"
              >
                <span class="text-lg font-medium w-full">{{ todo.title }}</span>
                <p class="w-full">{{ todo.description }}</p>
              </label>

              <button
                @click="onRemoveTodo(todo.id)"
                class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a.75.75 0 01.75.75V5h3.25a.75.75 0 110 1.5H6.25a.75.75 0 110-1.5H10V2.75A.75.75 0 0110 2zM5 7v10a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1H6a1 1 0 00-1 1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import useTodos from '../composables/useTodos';
import { watch } from 'vue';

export default {
  setup() {
    const {
      getTodos,
      getPriorityColor,
      todosForm,
      createTodo,
      removeTodo,
      updateTodo,
      filterPriority,
      getFilteredTodos,
    } = useTodos();

    getTodos('ALL');

    const onSubmit = async () => {
      const resp = await createTodo(todosForm.value);
      if (resp.ok) {
        todosForm.value = {
          title: '',
          description: '',
          priority: 'LOW',
        };
        getTodos('ALL');
        Swal.fire({
          icon: 'success',
          text: 'Todo created successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: resp.message,
        });
      }
    };

    const onRemoveTodo = async (id) => {
      const resp = await removeTodo(id);
      if (resp.ok) {
        getTodos();
        Swal.fire({
          icon: 'success',
          text: 'Todo removed successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: resp.message,
        });
      }
    };

    const onEditTodo = async (todo) => {
      const resp = await updateTodo(todo);
      if (resp.ok) {
        getTodos();
        Swal.fire({
          icon: 'success',
          text: 'Todo updated successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: resp.message,
        });
      }
    };

    const markAsCompleted = async (todo) => {
      const completedTodo = { ...todo, completed: !todo.completed };
      const resp = await updateTodo(completedTodo);
      if (resp.ok) {
        getTodos();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: resp.message,
        });
      }
    };

    watch(filterPriority, () => {
      getTodos(filterPriority.value);
    });

    return {
      getTodos,
      getPriorityColor,
      todosForm,
      onSubmit,
      onRemoveTodo,
      onEditTodo,
      markAsCompleted,
      filterPriority,
      getFilteredTodos,
    };
  },
};
</script>
