<template>
  <div class="flex h-screen bg-white text-gray-800">
    <!-- Sidebar -->
    <aside
      class="w-64 border-r bg-gray-50 overflow-y-auto p-4 hidden md:block"
    >
      <h2 class="text-lg font-semibold mb-4">{{ languageData.title }}</h2>

      <nav class="space-y-2">
        <RouterLink
          v-for="topic in languageData.topics"
          :key="topic.path"
          :to="`/learn/${lang}/${topic.path}`"
          class="block px-2 py-1 rounded hover:bg-gray-200"
          active-class="bg-green-100 text-green-700 font-semibold"
        >
          {{ topic.label }}
        </RouterLink>
      </nav>
    </aside>

    <!-- Mobile Sidebar Toggle -->
    <button
      class="fixed top-3 left-3 z-50 md:hidden bg-green-600 text-white px-3 py-2 rounded"
      @click="showSidebar = !showSidebar"
    >
      ☰
    </button>

    <!-- Slide-in Sidebar for mobile -->
    <transition name="slide">
      <div
        v-if="showSidebar"
        class="fixed inset-0 bg-black/50 z-40"
        @click="showSidebar = false"
      >
        <aside
          class="absolute top-0 left-0 w-64 h-full bg-gray-50 border-r p-4"
          @click.stop
        >
          <h2 class="text-lg font-semibold mb-4">
            {{ languageData.title }}
          </h2>
          <nav class="space-y-2">
            <RouterLink
              v-for="topic in languageData.topics"
              :key="topic.path"
              :to="`/learn/${lang}/${topic.path}`"
              class="block px-2 py-1 rounded hover:bg-gray-200"
              active-class="bg-green-100 text-green-700 font-semibold"
              @click="showSidebar = false"
            >
              {{ topic.label }}
            </RouterLink>
          </nav>
        </aside>
      </div>
    </transition>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6 md:p-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { tutorials } from './data/tutorials'

const route = useRoute()
const showSidebar = ref(false)
const lang = computed(() => route.params.lang)
const languageData = computed(() => tutorials[lang.value] || tutorials.javascript)
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
