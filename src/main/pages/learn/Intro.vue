<!-- src/main/pages/learn/languages/javascript/Intro.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">{{ lesson?.title }}</h1>
    <p v-if="lesson?.content" class="mb-6" v-html="lesson.content"></p>

    <div v-if="lesson?.example" class="bg-gray-100 border-l-4 border-green-500 p-4 mb-6">
      <h3 class="font-semibold mb-2">Example:</h3>
      <pre class="bg-white p-3 rounded overflow-x-auto text-sm">
{{ lesson.example }}
      </pre>
      <RouterLink
        :to="`/learn/${route.params.lang}/try?example=${lesson.path}`"
        class="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Try it Yourself »
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/consumables/useApi'

const route = useRoute()
const { get } = useApi()
const lesson = ref(null)

onMounted(async () => {
  const res = await get(`/lessons/${route.params.topic}`)
  lesson.value = res.data
})
</script>
