<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-sm w-full bg-white rounded-xl shadow-md p-6 text-center">
      <!-- Icon -->
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-envelope text-blue-500 text-xl"></i>
      </div>

      <!-- Content -->
      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        {{ isLoading ? 'Verifying Email' : 'Verification Complete' }}
      </h2>
      
      <p class="text-gray-600 mb-4">
        {{ message }}
      </p>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center mb-4">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>

      <!-- Countdown -->
      <div v-if="!isLoading" class="text-sm text-gray-500 mb-4">
        Redirecting in {{ countdown }} seconds...
      </div>

      <!-- Actions -->
      <button
        @click="goToLogin"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/core/composables/useApi'

const route = useRoute()
const router = useRouter()
const { get } = useApi()

const message = ref('Verifying your email...')
const isLoading = ref(true)
const countdown = ref(5)
const verificationError = ref('')

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    message.value = 'No verification token provided.'
    verificationError.value = 'Please check your verification link and try again.'
    isLoading.value = false
    return
  }

  try {
    const response = await get(`/verify-email?token=${token}`)
    message.value = response.message || 'Email verified successfully!'
  } catch (err) {
    message.value = 'Verification failed'
    verificationError.value = err.message || 'Please try again or request a new verification email.'
  } finally {
    isLoading.value = false
    
    // Start countdown to redirect
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        router.push('/login')
      }
    }, 1000)
  }
})

const goToLogin = () => {
  router.push('/login')
}
</script>