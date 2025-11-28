<!-- src/components/PreferencesDropdown.vue -->
<template>
  <div class="p-4 bg-gray-800 border border-gray-600 rounded-xl shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-white">
        <i class="fas fa-cog mr-2 text-blue-400"></i>
        Preferences
      </h3>
      <button 
        @click="$emit('close')"
        class="text-gray-400 hover:text-white transition-colors"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Response Style -->
    <div class="mb-4">
      <h4 class="text-xs font-medium text-gray-300 mb-2">Response Style</h4>
      <div class="space-y-1">
        <button 
          v-for="style in responseStyles"
          :key="style.id"
          @click="$emit('update:responseStyle', style.id)"
          class="w-full p-2 text-left bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          :class="selectedResponseStyle === style.id ? 'ring-1 ring-blue-500' : ''"
        >
          <i :class="style.icon" class="text-blue-400 text-sm w-4"></i>
          <div class="flex-1">
            <p class="text-xs font-medium text-white">{{ style.name }}</p>
            <p class="text-xs text-gray-400">{{ style.description }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Code Formatting -->
    <div class="mb-4">
      <h4 class="text-xs font-medium text-gray-300 mb-2">Code Formatting</h4>
      <div class="space-y-2">
        <label class="flex items-center gap-2 p-1 cursor-pointer">
          <input 
            type="checkbox" 
            :checked="preferences.syntaxHighlighting"
            @change="updatePreference('syntaxHighlighting', $event.target.checked)"
            class="rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500"
          >
          <i class="fas fa-code text-blue-400 text-sm w-4"></i>
          <span class="text-xs text-white">Syntax Highlighting</span>
        </label>
        
        <label class="flex items-center gap-2 p-1 cursor-pointer">
          <input 
            type="checkbox" 
            :checked="preferences.lineNumbers"
            @change="updatePreference('lineNumbers', $event.target.checked)"
            class="rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500"
          >
          <i class="fas fa-list-ol text-blue-400 text-sm w-4"></i>
          <span class="text-xs text-white">Line Numbers</span>
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2 pt-2 border-t border-gray-700">
      <button 
        @click="savePreferences"
        class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
      >
        Save Preferences
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  preferences: Object,
  selectedResponseStyle: String,
  responseStyles: Array
})

const emit = defineEmits(['update:preferences', 'update:responseStyle', 'close'])

const updatePreference = (key, value) => {
  const newPrefs = { ...$props.preferences, [key]: value }
  emit('update:preferences', newPrefs)
}

const savePreferences = () => {
  console.log('Preferences saved')
  emit('close')
}
</script>