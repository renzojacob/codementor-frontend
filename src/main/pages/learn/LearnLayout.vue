<!-- src/main/pages/learn/LearnLayout.vue -->
<template>
  <div class="flex h-screen bg-white text-gray-800">
    <!-- Sidebar Component -->
    <LessonSidebar :lang="lang" :lessons="lessons" :loading="loading" :languageTitle="languageTitle"
      :showSidebar="showSidebar" @toggle-sidebar="toggleSidebar" />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTutorials } from '@/consumables'
import LessonSidebar from './components/LessonSidebar.vue'

const route = useRoute()
const showSidebar = ref(false)
const lang = computed(() => route.params.lang)
const { lessons, fetchLessons, loading, error } = useTutorials()

const languageTitle = computed(() => {
  if (!lang.value) return 'Language'
  return lang.value.charAt(0).toUpperCase() + lang.value.slice(1)
})

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

// Load lessons dynamically when language changes
onMounted(() => {
  if (lang.value) fetchLessons(lang.value)
})

watch(lang, (newLang) => {
  if (newLang) fetchLessons(newLang)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>