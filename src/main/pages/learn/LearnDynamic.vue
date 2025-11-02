<template>
  <div>
    <component
      :is="AsyncComponent"
      v-if="AsyncComponent"
    />
    <div v-else class="text-center text-gray-500 py-10">
      <p>Loading topic...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const AsyncComponent = ref(null)

const lang = computed(() => route.params.lang)
const topic = computed(() => route.params.topic)

// Dynamically import the component based on language and topic
async function loadComponent() {
  try {
    AsyncComponent.value = (await import(
      /* @vite-ignore */
      `./languages/${lang.value}/${capitalize(topic.value)}.vue`
    )).default
  } catch (err) {
    console.error('Topic not found:', err)
    AsyncComponent.value = () => import('./NotFoundTopic.vue')
  }
}

// Utility function for capitalization (Loops \u2192 Loops.vue)
function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

watch([lang, topic], loadComponent, { immediate: true })
</script>
