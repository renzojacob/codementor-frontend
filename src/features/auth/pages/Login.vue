<!-- src/features/auth/Login.vue -->
<template>
  <div class="font-sans min-h-screen flex items-center justify-center p-4">
    <div
      class="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl">
      <div class="p-8">
        <!-- Small subtle header -->
        <div class="text-center mb-8 animate-fade-in">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
          <p class="text-gray-500 text-sm">Unlock your coding journey</p>
        </div>
        <!-- Smooth fade-in animation for form elements -->
        <div class="space-y-6 animate-fade-in">
          <div class="animate-slide-up" style="animation-delay: 0.1s">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400 transition-colors duration-300"></i>
              </div>
              <input v-model="username" type="text" id="username"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ease-out"
                placeholder="you@example.com" />
            </div>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.2s">
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <a href="#"
                class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300 flex items-center">
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400 transition-colors duration-300"></i>
              </div>
              <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password"
                class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 ease-out"
                placeholder="••••••••" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300">
                <i :class="[
                  'fas',
                  showPassword ? 'fa-eye-slash' : 'fa-eye',
                  'text-gray-400 hover:text-gray-600 transition-colors duration-300',
                ]"></i>
              </button>
            </div>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.3s">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all duration-300 ease-out transform hover:scale-110" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 transition-colors duration-300">
                Remember me
              </label>
            </div>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.4s">
            <button @click="handleLogin" :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] relative overflow-hidden group">
              <!-- Animated background effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
              </div>

              <!-- Button content with loading animation -->
              <span class="relative flex items-center">
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Signing in...
                </span>
                <span v-else class="flex items-center">
                  <i class="fas fa-sign-in-alt mr-2 transition-transform duration-300 group-hover:scale-110"></i>
                  Sign In
                </span>
              </span>
            </button>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.5s">
            <p v-if="error"
              class="text-red-500 text-sm mt-2 text-center transition-all duration-300 ease-out transform">
              {{ error }}
            </p>
          </div>

          <!-- Social Login -->
          <div class="mt-8 animate-slide-up" style="animation-delay: 0.6s">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 transition-colors duration-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-white text-gray-500 transition-colors duration-300">Or continue with</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <!-- Google Login -->
              <button 
                type="button"
                @click="handleGoogleLogin"
                :disabled="oauthLoading"
                class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fab fa-google text-red-500 transition-transform duration-300 group-hover:scale-110 mr-2"></i>
                <span>Google</span>
              </button>

              <!-- GitHub Login -->
              <button 
                type="button"
                @click="handleGithubLogin"
                :disabled="oauthLoading"
                class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fab fa-github text-gray-800 transition-transform duration-300 group-hover:scale-110 mr-2"></i>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <div class="mt-8 text-center animate-slide-up" style="animation-delay: 0.7s">
            <p class="text-sm text-gray-600 transition-colors duration-300">
              Don't have an account?
              <RouterLink to="/register"
                class="font-medium text-primary-600 hover:text-primary-500 transition-all duration-300 ease-out transform hover:translate-x-1 inline-block ml-1">
                Sign up
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.6s ease-out forwards;
}

/* Smooth pulse effect for loading state */
@keyframes pulse-subtle {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

button:disabled {
  animation: pulse-subtle 2s ease-in-out infinite;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/core/store/user'
import { useAuth } from '@/core/composables/useAuth'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)
const oauthLoading = ref(false)
const router = useRouter()
const userStore = useUserStore()
const { login: authLogin, initiateOAuth } = useAuth()

async function handleLogin() {
  error.value = ''
  loading.value = true
  
  try {
    const result = await authLogin(username.value, password.value)
    
    if (result.success) {
      // Login successful - redirect based on role
      await redirectBasedOnRole()
    } else {
      error.value = result.error || 'Login failed'
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

async function redirectBasedOnRole() {
  // Give the store a moment to update
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (userStore.isAdmin) {
    // Redirect admin to admin dashboard
    console.log('Redirecting admin to /admin')
    await router.push('/admin')
  } else {
    // Redirect regular user to /app
    console.log('Redirecting user to /app')
    await router.push('/app')
  }
}

async function handleGoogleLogin() {
  error.value = ''
  oauthLoading.value = true
  try {
    await initiateOAuth('google')
    // User will be redirected to Google OAuth
  } catch (err) {
    error.value = err.message || 'Google login failed'
    oauthLoading.value = false
  }
}

async function handleGithubLogin() {
  error.value = ''
  oauthLoading.value = true
  try {
    await initiateOAuth('github')
    // User will be redirected to GitHub OAuth
  } catch (err) {
    error.value = err.message || 'GitHub login failed'
    oauthLoading.value = false
  }
}
</script>