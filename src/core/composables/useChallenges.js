// src/core/composables/useChallenges.js
import { ref } from 'vue'
import { 
  getChallenges, 
  getChallenge, 
  submitChallenge, 
  getSubmission 
} from '../api/challenges'

export function useChallenges() {
  const challenges = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch list of challenges
  const fetchChallenges = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await getChallenges()
      challenges.value = res.data.map(c => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        difficulty: c.difficulty.toLowerCase(),
        xp: c.xp_reward,
        solved: Boolean(c.solved),
        solved_count: c.solved_count ?? 0,
        category_id: c.category_id,
        tags: c.tags || [],
        time_limit: c.time_limit || '1s',
        memory_limit: c.memory_limit || '64MB',
        total_submissions: c.total_submissions || 0,
        accepted_submissions: c.accepted_submissions || 0,
      }))
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch challenges'
    } finally {
      loading.value = false
    }
  }

  // Fetch single challenge with mapped fields
  const fetchChallenge = async (value) => {
    loading.value = true
    error.value = null
    try {
      const res = await getChallenge(value)
      const data = res.data
      return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        difficulty: data.difficulty,
        solved: !!data.is_solved,
        tags: data.tags || [],
        xp_reward: data.xp_reward || 0,
        time_limit: data.time_limit || '1s',
        memory_limit: data.memory_limit || '64MB',
        total_submissions: data.total_submissions || 0,
        accepted_submissions: data.accepted_submissions || 0,
        description: data.description || '',
        examples: data.examples || [],
        hints: data.hints || [],
        testcases: data.testcases || [],
        submissions: Array.isArray(data.submissions) ? data.submissions : [],
        user_stats: data.user_stats || {
          attempts: 0,
          best_execution_time: null,
          best_memory_used: null,
          solved_at: null
        }
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch challenge'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Submit solution to challenge
  const submitSolution = async (challengeId, code, language) => {
    loading.value = true
    error.value = null
    try {
      const response = await submitChallenge(challengeId, {
        code,
        language
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Submission failed'
      }
    } finally {
      loading.value = false
    }
  }

  // Check submission status
  const checkSubmissionStatus = async (submissionId) => {
    try {
      const response = await getSubmission(submissionId)
      return response.data
    } catch (err) {
      console.error('Error checking submission status:', err)
      return null
    }
  }

  return {
    challenges,
    loading,
    error,
    fetchChallenges,
    fetchChallenge,
    submitSolution,
    checkSubmissionStatus
  }
}