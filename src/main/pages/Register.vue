<template>
  <div class="font-sans min-h-screen flex items-center justify-center p-4">
    <div
      class="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div class="p-8">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-gray-800">Create Account</h2>
          <p class="text-gray-600 mt-2">Join us today</p>
        </div>

        <div class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input v-model="username" id="username" type="text"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="johndoe" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input v-model="email" id="email" type="email"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

          <div>
            <label for="confirm" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input :type="showConfirm ? 'text' : 'password'" v-model="confirm" id="confirm"
                class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="••••••••" />
              <button type="button" @click="showConfirm = !showConfirm"
                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <i :class="[
                  'fas',
                  showConfirm ? 'fa-eye-slash' : 'fa-eye',
                  'text-gray-400 hover:text-gray-600 transition-colors',
                ]"></i>
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <input id="agree-terms" v-model="agree" type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-primary-600 hover:text-primary-500 transition-colors">Terms and Conditions</a>
            </label>
          </div>

          <button @click="handleRegister" :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5">
            <span v-if="loading">Creating...</span>
            <span v-else>Create Account</span>
          </button>

          <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
            {{ error }}
          </p>
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
              Already have an account?
              <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Sign
                in</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API_BASE = 'http://localhost:3000'
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const agree = ref(false)
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''

  // Validation
  if (!agree.value) {
    error.value = 'You must agree to the Terms and Conditions.'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    // Use JSON for request body
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        role: 'user',
      }),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Registration failed')

    // Alert user that registration & email were successful
    alert(data.message || 'Registration successful! Check your email.')

    router.push('/login')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
