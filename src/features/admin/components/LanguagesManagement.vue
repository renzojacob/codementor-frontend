<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Languages Management</h1>
        <p class="text-gray-600 mt-2">Manage programming languages available on the platform</p>
      </div>
      <div class="flex gap-3">
        <button @click="$emit('export', 'languages')"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
        <button @click="$emit('show-language-form')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Language
        </button>
      </div>
    </div>

    <!-- Tab Navigation -->
    <TabNavigation :active-view="'languages'" @view-changed="$parent.setActiveView" />

    <!-- Languages Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="language in languages" :key="language.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ language.name }}</h3>
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {{ language.total_lessons || 0 }} lessons
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ language.description }}</p>

        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500 font-mono">{{ language.slug }}</span>
          <div class="flex gap-2">
            <button @click="$emit('edit-language', language)" class="p-2 text-gray-400 hover:text-blue-600 transition"
              title="Edit Language">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button @click="$emit('delete-language', language)" class="p-2 text-gray-400 hover:text-red-600 transition"
              title="Delete Language">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TabNavigation from './TabNavigation.vue'

defineProps({
  languages: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['show-language-form', 'edit-language', 'delete-language', 'export'])
</script>