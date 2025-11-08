<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex-1 grid grid-cols-2 gap-4 p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '../../components/layout/Header.vue';
</script>
