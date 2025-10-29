<template>
  <div class="max-w-6xl w-full mx-auto">
    <!-- Forms Container -->
    <div class="flex flex-col lg:flex-row gap-8 items-center justify-center">
      
      <!-- Login Form -->
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div class="p-8">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p class="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" 
                  placeholder="you@example.com"
                  required
                >
              </div>
            </div>
            
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">Forgot password?</a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password"
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" 
                  placeholder="••••••••"
                  required
                >
                <button 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="togglePasswordVisibility"
                >
                  <i 
                    :class="showPassword ? 'fas fa-eye-slash text-gray-600' : 'fas fa-eye text-gray-400'" 
                    class="hover:text-gray-600 transition-colors"
                  ></i>
                </button>
              </div>
            </div>
            
            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                v-model="form.rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            
            <!-- This button will now be BLUE using primary colors -->
            <button 
              type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>
          
          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div class="mt-4 flex justify-center gap-4">
              <button 
                type="button" 
                class="w-1/3 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                @click="socialLogin('google')"
              >
                <i class="fab fa-google text-red-500"></i>
              </button>
              <button 
                type="button" 
                class="w-1/3 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                @click="socialLogin('github')"
              >
                <i class="fab fa-github text-gray-800"></i>
              </button>
            </div>
          </div>
          
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="text-center mt-10 text-gray-500 text-sm">
      <p>© 2023 Beautiful Forms. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Password visibility state
const showPassword = ref(false)

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Handle form submission
const handleLogin = () => {
  console.log('Login attempt with:', form)
  // Here you would typically make an API call to authenticate the user
  // For now, we'll just log the form data
  alert(`Login attempted with:\nEmail: ${form.email}\nPassword: ${form.password}\nRemember me: ${form.rememberMe}`)
}

// Handle social login
const socialLogin = (provider) => {
  console.log(`Social login with ${provider}`)
  alert(`Redirecting to ${provider} authentication...`)
}
</script>