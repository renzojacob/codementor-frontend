<template>
  <div class="font-sans min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-3">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account to continue</p>
      </div>

      <!-- Login Card -->
      <div
        class="w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div class="p-8">
          <div class="space-y-5">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input v-model="username" type="text" id="username"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">Forgot
                  password?</a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password"
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  placeholder="••••••••" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <i :class="[
                    'fas',
                    showPassword ? 'fa-eye-slash' : 'fa-eye',
                    'text-gray-400 hover:text-gray-600 transition-colors',
                  ]"></i>
                </button>
              </div>
            </div>

            <div class="flex items-center pt-2">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>

            <div class="pt-2">
              <button @click="handleLogin" :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5">
                <span v-if="loading">Signing in...</span>
                <span v-else>Sign in</span>
              </button>
            </div>

            <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
              {{ error }}
            </p>
          </div>

          <!-- Social Login -->
          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <!-- Google Login -->
              <button type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <i class="fab fa-google text-red-500"></i>
              </button>

              <!-- GitHub Login -->
              <button type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <i class="fab fa-github text-gray-800"></i>
              </button>
            </div>
          </div>


          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <RouterLink to="/register"
                class="font-medium text-primary-600 hover:text-primary-500 transition-colors ml-1">Sign up</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useAuth } from '@/consumables'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)
const router = useRouter()
const user = useUserStore()
const { login: authLogin } = useAuth()

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const res = await authLogin(username.value, password.value)
    
    // The useAuth composable already saves tokens and updates the user store
    // But we need to handle the admin redirect here
    
    if (user.role === 'admin') {
      window.location.href = '/admin.html'  // loads the admin SPA
    } else {
      router.push('/')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>