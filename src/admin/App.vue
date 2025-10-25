<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Import layouts
import AdminLayout from './layouts/AdminLayout.vue';

// Optional future layouts
// import AuthLayout from './layouts/AuthLayout.vue';

const route = useRoute();

// Dynamically choose layout based on route meta
const layout = computed(() => {
  switch (route.meta.layout) {
    case 'AdminLayout':
      return AdminLayout;
    // case 'AuthLayout':
    //   return AuthLayout;
    default:
      return AdminLayout; // fallback
  }
});
</script>
