// src/consumables/useTutorials.js
import { ref } from 'vue'
import { useApi } from '@/consumables/useApi'

export function useTutorials() {
  const { get } = useApi()
  const languages = ref([])
  const lessons = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchLanguages() {
    try {
      loading.value = true
      const res = await get('/languages') // GET http://localhost:3000/languages
      languages.value = res
      console.log('\u2705 Languages fetched:', res)
    } catch (err) {
      console.error('\u274c Error loading languages:', err.message)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchLessons(langSlug) {
  try {
    loading.value = true
    const res = await get(`/languages/${langSlug}/lessons`)
    lessons.value = res
    return res // \u2705 return it so caller can use it
  } catch (err) {
    error.value = err.message
    return []  // \u2705 fallback to empty array
  } finally {
    loading.value = false
  }
}


  return { languages, lessons, loading, error, fetchLanguages, fetchLessons }
}
