<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8">
      <button 
        @click="$emit('view-changed', 'languages')"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
          activeView === 'languages' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        Languages
      </button>
      <button 
        @click="$emit('view-changed', 'lessons')"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
          activeView === 'lessons' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        Lessons
      </button>
      <button 
        @click="$emit('view-changed', 'sections')"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
          activeView === 'sections' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        Sections
      </button>
      <button 
        @click="$emit('view-changed', 'analytics')"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
          activeView === 'analytics' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        Analytics
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  activeView: {
    type: String,
    required: true
  }
})

defineEmits(['view-changed'])
</script>