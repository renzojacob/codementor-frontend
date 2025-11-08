<!-- src/main/pages/learn/TryItEditor.vue -->
<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="bg-gray-100 border-b px-4 py-2 flex justify-between items-center">
      <h2 class="text-lg font-semibold">Try It Editor - {{ languageName }}</h2>
      <button 
        @click="resetCode"
        class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        Reset
      </button>
    </div>

    <!-- Editor and Output -->
    <div class="flex flex-1">
      <!-- Editor -->
      <div class="w-1/2 border-r border-gray-300 flex flex-col">
        <div class="bg-gray-50 px-4 py-2 border-b text-sm font-medium">Editor</div>
        <textarea
          v-model="code"
          class="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Write your code here..."
        ></textarea>
      </div>

      <!-- Output -->
      <div class="w-1/2 flex flex-col">
        <div class="bg-gray-50 px-4 py-2 border-b text-sm font-medium">Output</div>
        <div class="flex-1 p-4 bg-white overflow-auto">
          <iframe
            v-if="supportsExecution"
            class="w-full h-full border-0"
            :srcdoc="getOutputHtml()"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
          <div v-else class="h-full flex items-center justify-center text-gray-500">
            <div class="text-center">
              <p class="mb-2">Execution not supported for {{ languageName }} yet</p>
              <p class="text-sm">(coming soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const code = ref('')

const languageName = computed(() => {
  const lang = route.params.lang
  if (lang === 'javascript') return 'JavaScript'
  if (lang === 'python') return 'Python'
  return lang?.charAt(0).toUpperCase() + lang?.slice(1) || 'Unknown'
})

const supportsExecution = computed(() => {
  return route.params.lang === 'javascript'
})

const getOutputHtml = () => {
  if (route.params.lang === 'javascript') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Output</title>
        <style>
          body { font-family: system-ui; padding: 20px; }
        </style>
      </head>
      <body>
        <script>
          try {
            ${code.value}
          } catch (error) {
            document.body.innerHTML = '<div style="color: red;">Error: ' + error.message + '</div>'
          }
        <\/script>
      </body>
      </html>
    `
  }
  return '<div>Unsupported language</div>'
}

const resetCode = () => {
  const example = route.query.example
  if (example === 'py1') {
    code.value = `print("Hello, World!")`
  } else {
    code.value = `console.log("Hello, World!")`
  }
}

onMounted(() => {
  resetCode()
})
</script>