<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Layouts
import PublicLayout from './layouts/PublicLayout.vue';
import ChallengeLayout from './layouts/ChallengeLayout.vue';

const route = useRoute();

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'ChallengeLayout':
      return ChallengeLayout;
    default:
      return PublicLayout;
  }
});
</script>
