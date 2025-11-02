<template>
  <div class="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
    <RouterLink
      v-for="(lang, key) in tutorials"
      :key="key"
      :to="`/learn/${key}`"
      class="p-6 border rounded hover:bg-green-50"
    >
      <h2 class="text-xl font-bold mb-2">{{ lang.title }}</h2>
      <p class="text-sm text-gray-500">Start learning {{ key.toUpperCase() }}</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { tutorials } from './data/tutorials'
</script>
