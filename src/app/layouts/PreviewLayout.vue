<template>
  <LearnLayout>
    <LessonSidebar :lessons="lessons" />
    <LessonContent :lesson="lesson" />
  </LearnLayout>
</template>

<script setup>
import LearnLayout from '@/main/pages/learn/LearnLayout.vue'
import LessonSidebar from '@/main/pages/learn/components/LessonSidebar.vue'
import LessonContent from '@/main/pages/learn/components/LessonContent.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/consumables/useApi'

const route = useRoute()
const { get } = useApi()

const lesson = ref(null)
const lessons = ref([])

onMounted(async () => {
  lessons.value = await get('/lessons')
  lesson.value = await get(`/lessons/${route.params.slug}`)
})
</script>
