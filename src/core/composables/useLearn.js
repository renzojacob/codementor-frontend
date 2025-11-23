// src/consumables/composables/useLearn.js
import { ref } from 'vue'
// 💡 We import learnAPI, which contains the functions using axiosInstance.
import { learnAPI } from '@/core/api' 

export function useLearn() {
  // 💡 Define local loading and error state
  const loading = ref(false)
  const error = ref(null)
  
  const languages = ref([])
  const lessons = ref([])

  // Helper function to manage state around an async operation
  const executeCall = async (apiCall) => {
    loading.value = true
    error.value = null
    try {
      // 💡 Direct call to the API function (which uses axios/axiosInstance)
      const response = await apiCall()
      return response.data // learnAPI functions return the full axios response
    } catch (err) {
      // 💡 Custom error handling logic (can be simple or complex)
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchLanguages() {
    try {
      // 💡 Call the wrapper function with the desired API method
      const res = await executeCall(learnAPI.languages.getAll)
      languages.value = res
      console.log('✅ Languages fetched:', res)
      return res
    } catch (err) {
      console.error('❌ Error loading languages:', error.value) // Use local error state for display
      throw err
    }
  }

  async function fetchLessons(langSlug) {
    try {
      // 💡 Call the wrapper function with the desired API method and arguments
      const res = await executeCall(() => learnAPI.lessons.getByLanguage(langSlug))
      lessons.value = res
      return res
    } catch (err) {
      console.error('❌ Error loading lessons:', error.value)
      lessons.value = []
      throw err
    }
  }

  return { 
    languages, 
    lessons, 
    loading, // Local loading state
    error,   // Local error state
    fetchLanguages, 
    fetchLessons 
  }
}