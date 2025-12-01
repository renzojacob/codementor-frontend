<!-- src/features/learn/pages/LearnHome.vue -->
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Choose a Language</h1>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error loading languages: {{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="lang in languages"
        :key="lang.slug"
        :to="getLanguageRoute(lang.slug)"
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLearn } from '@/core/composables/useLearn'

const route = useRoute()
const { languages, fetchLanguages, loading, error } = useLearn()

// Determine if we're in the app (authenticated) context or public context
const isAppContext = computed(() => route.path.startsWith('/app'))

const getLanguageRoute = (langSlug) => {
  if (isAppContext.value) {
    // Authenticated route
    return `/app/learn/${langSlug}`
  } else {
    // Public route  
    return `/learn/${langSlug}`
  }
}

onMounted(() => {
  fetchLanguages()
})
</script>