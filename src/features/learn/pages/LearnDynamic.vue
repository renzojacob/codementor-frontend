<!-- src/main/pages/learn/LearnDynamic.vue -->
<template>
  <LessonContent :lang="lang" :topic="topic" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LessonContent from '../components/LessonContent.vue'

const route = useRoute()
const lang = computed(() => route.params.lang)
const topic = computed(() => route.params.topic)
</script>
