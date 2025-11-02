<template>
  <div class="flex h-screen">
    <textarea
      v-model="code"
      class="w-1/2 h-full border-r border-gray-300 p-4 font-mono text-sm"
    ></textarea>
    <iframe
      v-if="lang === 'javascript'"
      class="w-1/2 h-full"
      :srcdoc="code"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>

    <div v-else class="w-1/2 h-full flex items-center justify-center text-gray-500">
      <p>Execution not supported for {{ lang }} yet (coming soon)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lang = computed(() => route.params.lang)
const code = ref('')

onMounted(() => {
  const ex = route.query.example
  if (ex === 'py1') code.value = `print("Hello, World!")`
  else code.value = `console.log("Hello, World!")`
})
</script>
