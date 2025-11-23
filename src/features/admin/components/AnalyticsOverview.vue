<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Learning Analytics</h1>
        <p class="text-gray-600 mt-2">Overview of learning content and usage statistics</p>
      </div>
      <button @click="$emit('export', 'analytics')"
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Analytics
      </button>
    </div>

    <!-- Tab Navigation -->
    <TabNavigation :active-view="'analytics'" @view-changed="$parent.setActiveView" />

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.languages || 0 }}</div>
            <div class="text-sm text-gray-500">Languages</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.lessons || 0 }}</div>
            <div class="text-sm text-gray-500">Lessons</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.sections || 0 }}</div>
            <div class="text-sm text-gray-500">Sections</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.sectionsWithCode || 0 }}</div>
            <div class="text-sm text-gray-500">Code Examples</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lessons per Language -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Lessons per Language</h3>
      <div class="space-y-3">
        <div v-for="item in analytics.lessonsPerLanguage || []" :key="item.name"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span class="font-medium text-gray-700">{{ item.name }}</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {{ item.lesson_count }} lessons
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TabNavigation from './TabNavigation.vue'

defineProps({
  analytics: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['export'])
</script>