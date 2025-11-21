// src/main/composables/useProfile.js
import { ref, onMounted } from 'vue'
import { fetchProfileData } from '@/core/api/user' // Adjust path as needed

export function useProfile() {
  const user = ref(null) // Reactive state for user data
  const recentActivity = ref([]) // Reactive state for recent activity
  const isLoading = ref(true)
  const error = ref(null)

  const loadProfile = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await fetchProfileData()
      
      // Map the API data to the structure your component expects
      user.value = {
        name: data.username, // Assuming username is used as name for now
        username: data.username,
        // The rest of these fields need to be returned from your PHP
        level: data.level ?? 1, // Use a default if not fetched
        xp: data.xp ?? 0,
        streak: data.current_streak ?? 0,
        bio: 'No bio set.', // Will require another DB column/API change
        avatar: `https://i.pravatar.cc/150?u=${data.id}` // Use ID for consistent avatar
      }
      
      // Process recent activity to match your mock 'type' field
      recentActivity.value = data.recent_activity.map(item => ({
        title: `${item.status === 'Passed' ? 'Solved' : 'Attempted'} "${item.title}"`,
        type: item.status === 'Passed' ? 'solved' : 'attempted',
        date: item.submitted_at // You'll need a utility to format this to 'x hours ago'
      }))

    } catch (err) {
      console.error('Failed to load profile:', err)
      error.value = 'Failed to fetch user profile data.'
    } finally {
      isLoading.value = false
    }
  }

  // Load data automatically when the component using this composable is mounted
  onMounted(loadProfile)

  return { user, recentActivity, isLoading, error, loadProfile }
}