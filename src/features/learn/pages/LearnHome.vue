<!-- src/main/pages/learn/LearnHome.vue -->
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Choose a Language</h1>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error loading languages: {{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="lang in languages"
        :key="lang.slug"
        :to="`/learn/${lang.slug}`"
        class="p-6 border rounded hover:bg-green-50 transition-colors"
      >
        <h2 class="text-xl font-bold mb-2">{{ lang.name }}</h2>
        <p class="text-sm text-gray-500">
          {{ lang.description || `Start learning ${lang.name}` }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLearn } from '@/core/composables/useLearn'

const { languages, fetchLanguages, loading, error } = useLearn()

onMounted(() => {
  fetchLanguages()
})
</script>