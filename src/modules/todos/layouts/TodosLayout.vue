<template>
  <Navbar />  
  <router-view />
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  components: {
    Navbar: defineAsyncComponent(() => import('@/components/Navbar.vue')),
  },
};
</script>
