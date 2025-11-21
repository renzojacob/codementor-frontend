// src/consumables/composables/uselearn.js
import { ref } from 'vue'
import { useApi } from './useApi'

export function useLearn() {
  const { learn, loading, error } = useApi()
  const languages = ref([])
  const lessons = ref([])

  async function fetchLanguages() {
    try {
      const res = await learn.languages.getAll()
      languages.value = res
      console.log('✅ Languages fetched:', res)
      return res
    } catch (err) {
      console.error('❌ Error loading languages:', err.message)
      throw err
    }
  }

  async function fetchLessons(langSlug) {
    try {
      const res = await learn.lessons.getByLanguage(langSlug)
      lessons.value = res
      return res
    } catch (err) {
      console.error('❌ Error loading lessons:', err.message)
      lessons.value = []
      throw err
    }
  }

  return { 
    languages, 
    lessons, 
    loading, 
    error, 
    fetchLanguages, 
    fetchLessons 
  }
}