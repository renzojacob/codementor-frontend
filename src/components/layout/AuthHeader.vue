<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <!-- <span class="text-white font-bold text-lg">&lt;/&gt;</span> -->
               <i class="fas fa-robot text-white"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeMentor
            </span>
          </router-link>
        </div>

        <!-- Navigation for logged out state -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            active-class="text-blue-600"
          >
            Home
          </router-link>
          <router-link 
            to="/tutorials" 
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            active-class="text-blue-600"
          >
            Tutorials
          </router-link>
          <router-link 
            to="/problems" 
            class="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            active-class="text-orange-600"
          >
            Problems
          </router-link>
          <router-link 
            to="/pricing" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
            active-class="text-green-600"
          >
            Pricing
          </router-link>
        </nav>

        <!-- Auth Navigation -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="hidden md:block relative">
            <select class="text-sm border-0 bg-transparent text-gray-600 focus:ring-0 cursor-pointer">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-3">
            <router-link 
              to="/login" 
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              :class="{ 'text-blue-600': $route.path === '/login' }"
            >
              Sign In
            </router-link>
            <router-link 
              to="/register" 
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm"
            >
              Get Started
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <i class="fas fa-bars w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="showMobileMenu" 
        class="md:hidden border-t border-gray-200 py-4 space-y-4"
      >
        <router-link 
          to="/" 
          class="block py-2 text-gray-600 hover:text-blue-600"
          @click="showMobileMenu = false"
        >
          Home
        </router-link>
        <router-link 
          to="/tutorials" 
          class="block py-2 text-gray-600 hover:text-blue-600"
          @click="showMobileMenu = false"
        >
          Tutorials
        </router-link>
        <router-link 
          to="/problems" 
          class="block py-2 text-gray-600 hover:text-orange-600"
          @click="showMobileMenu = false"
        >
          Problems
        </router-link>
        <router-link 
          to="/pricing" 
          class="block py-2 text-gray-600 hover:text-green-600"
          @click="showMobileMenu = false"
        >
          Pricing
        </router-link>
        
        <div class="pt-4 border-t border-gray-200 space-y-3">
          <router-link 
            to="/login" 
            class="block py-2 text-gray-600 hover:text-blue-600"
            @click="showMobileMenu = false"
          >
            Sign In
          </router-link>
          <router-link 
            to="/register" 
            class="block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
            @click="showMobileMenu = false"
          >
            Get Started
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AuthHeader',
  data() {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  },
  watch: {
    $route() {
      this.showMobileMenu = false
    }
  }
}
</script>