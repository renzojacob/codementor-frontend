<!-- /src/components/AppInitializer.vue -->
<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/core/store/user'
import { useAuth } from '@/core/composables/useAuth'

const userStore = useUserStore()
const { fetchCurrentUser } = useAuth()

onMounted(async () => {
  console.log('AppInitializer mounted')
  
  // If we have a token but no user data, fetch the current user
  if (localStorage.getItem('access_token') && (!userStore.username || !userStore.email)) {
    try {
      console.log('Fetching user data on app initialization...')
      await fetchCurrentUser()
      console.log('User data initialized:', {
        username: userStore.username,
        email: userStore.email,
        role: userStore.role
      })
    } catch (error) {
      console.warn('Failed to fetch user data on initialization:', error)
      // Clear invalid token
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }
})
</script>

<template>
  <!-- This component doesn't render anything, it just handles initialization -->
</template>