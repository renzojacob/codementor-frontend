<!-- src/main/pages/learn/components/LessonContent.vue -->
<template>
  <!-- Loading -->
  <div v-if="loading" class="text-gray-500 text-center py-10">
    Loading lesson...
  </div>

  <!-- Lesson Content -->
  <article v-else-if="lesson" class="prose prose-lg max-w-3xl mx-auto px-6 md:px-10 py-10 leading-relaxed">
    <!-- 🔗 Breadcrumbs -->
    <nav class="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
      <RouterLink to="/" class="hover:text-blue-600 transition-colors">Home</RouterLink>
      <i class="fas fa-angle-right text-xs"></i>
      <RouterLink to="/learn" class="hover:text-blue-600 transition-colors">Learn</RouterLink>
      <i class="fas fa-angle-right text-xs"></i>
      <RouterLink :to="`/learn/${props.lang}`" class="hover:text-blue-600 transition-colors capitalize">
        {{ props.lang }}
      </RouterLink>
      <i class="fas fa-angle-right text-xs"></i>
      <span class="font-semibold text-gray-700">{{ lesson.title }}</span>
    </nav>

    <!-- Table of Contents -->
    <ul class="mb-6 text-sm text-gray-500">
  <li v-for="(s, i) in lesson.sections" :key="i">
    <a :href="`#section-${i}`" class="hover:text-blue-600">{{ s.subtitle }}</a>
  </li>
</ul>


    <!-- Title -->
    <h1 class="text-4xl font-bold mb-6 text-gray-900">
      {{ lesson.title }}
    </h1>

    <p v-if="lesson.description" class="text-gray-600 mb-8">
      {{ lesson.description }}
    </p>

    <!-- Sections -->
    <section :id="`section-${i}`" v-for="(section, i) in lesson.sections" :key="i" class="mb-10 border-b border-gray-100 pb-8">
      <h2 v-if="section.subtitle" class="text-2xl font-semibold mb-3 text-gray-900">
        {{ section.subtitle }}
      </h2>

      <div v-if="section.content" class="text-gray-700 mb-4 prose max-w-none" v-html="md.render(section.content)"></div>

      <!-- Code Example -->
      <div v-if="section.code" class="bg-gray-900 text-gray-100 rounded-lg p-5 overflow-x-auto">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-gray-300 font-medium">Interactive Example</span>
          </div>
          <span class="text-xs font-mono bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
            {{ props.lang }}
          </span>
        </div>

        <pre
          class="text-sm font-mono text-gray-200 bg-gray-800/50 rounded-lg p-4 border border-gray-700 backdrop-blur-sm mb-4">{{ section.code }}</pre>

        <div class="flex justify-end">
          <RouterLink v-if="section.exampleId" :to="`/learn/${props.lang}/try?example=${section.exampleId}`"
            class="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium group glow-effect">
            <i class="fas fa-play mr-2 group-hover:scale-110 transition-transform"></i> Execute
          </RouterLink>
        </div>
      </div>


    </section>
  </article>

  <!-- Error / Empty -->
  <div v-else-if="error" class="text-red-500 text-center py-10">
    {{ error }}
  </div>

  <div v-else class="text-gray-400 text-center py-10">
    Lesson not found.
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useApi } from '@/consumables/useApi'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const props = defineProps({
  lang: { type: String, required: true },
  topic: { type: String, required: true },
})

const { get } = useApi()
const lesson = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchLesson() {
  try {
    loading.value = true
    error.value = null
    const res = await get(`/languages/${props.lang}/lessons/${props.topic}`)
    lesson.value = res
  } catch (err) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchLesson)
watch(() => props.topic, fetchLesson)
</script>

<style scoped>
.glow-effect {
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.glow-effect:hover {
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Improve readability like web.dev */
.prose {
  max-width: 70ch;
}

/* Breadcrumb spacing */
nav[aria-label='Breadcrumb'] i {
  color: #9ca3af;
}

/* Smooth section transitions (optional) */
section {
  scroll-margin-top: 6rem;
}
</style>