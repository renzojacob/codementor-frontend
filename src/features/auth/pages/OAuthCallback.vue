<!-- src/views/OAuthCallback.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Completing authentication...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/core/composables/useAuth'

const router = useRouter()
const { handleOAuthCallback } = useAuth()

onMounted(async () => {
  try {
    const result = await handleOAuthCallback()
    
    if (result.success) {
      // Redirect based on user role or default route
      const redirectPath = result.user.role === 'admin' ? '/admin.html' : '/'
      window.location.href = redirectPath
    }
  } catch (error) {
    console.error('OAuth callback failed:', error)
    router.push('/login?error=oauth_failed')
  }
})
</script>