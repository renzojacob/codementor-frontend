<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">&lt;/&gt;</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeMaster
            </span>
          </router-link>
        </div>

        <!-- Navigation Menu -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/tutorials" 
            class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            active-class="text-blue-600 font-semibold"
          >
            <i class="fas fa-graduation-cap w-4 h-4"></i>
            <span>Tutorials</span>
          </router-link>
          
          <router-link 
            to="/problems" 
            class="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            active-class="text-orange-600 font-semibold"
          >
            <i class="fas fa-code w-4 h-4"></i>
            <span>Problems</span>
          </router-link>
          
          <router-link 
            to="/challenges" 
            class="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200"
            active-class="text-green-600 font-semibold"
          >
            <i class="fas fa-trophy w-4 h-4"></i>
            <span>Challenges</span>
          </router-link>
          
          <router-link 
            to="/playground" 
            class="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            active-class="text-purple-600 font-semibold"
          >
            <i class="fas fa-play-circle w-4 h-4"></i>
            <span>Playground</span>
          </router-link>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Box -->
          <div class="hidden lg:flex items-center relative">
            <i class="fas fa-search absolute left-3 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search tutorials, problems..." 
              v-model="searchQuery"
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all duration-200"
            >
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-2">
            <button 
              v-if="!user" 
              @click="login"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm"
            >
              Sign In
            </button>
            
            <button 
              v-if="!user" 
              @click="register"
              class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Register
            </button>

            <!-- User Menu -->
            <div v-if="user" class="flex items-center space-x-3">
              <!-- Notifications -->
              <button class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <i class="fas fa-bell w-5 h-5"></i>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>

              <!-- User Profile -->
              <div class="flex items-center space-x-2 cursor-pointer" @click="toggleUserMenu">
                <div class="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {{ userInitials }}
                </div>
                <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
              </div>

              <!-- User Dropdown Menu -->
              <div 
                v-if="showUserMenu" 
                class="absolute right-4 top-16 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="font-semibold text-gray-900">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
                <router-link 
                  to="/profile" 
                  class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <i class="fas fa-user w-4 h-4"></i>
                  <span>Profile</span>
                </router-link>
                <router-link 
                  to="/solutions" 
                  class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <i class="fas fa-code-branch w-4 h-4"></i>
                  <span>My Solutions</span>
                </router-link>
                <button 
                  @click="logout"
                  class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                >
                  <i class="fas fa-sign-out-alt w-4 h-4"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
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
          to="/tutorials" 
          class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
          @click="showMobileMenu = false"
        >
          <i class="fas fa-graduation-cap w-4 h-4"></i>
          <span>Tutorials</span>
        </router-link>
        
        <router-link 
          to="/problems" 
          class="flex items-center space-x-2 text-gray-700 hover:text-orange-600 py-2"
          @click="showMobileMenu = false"
        >
          <i class="fas fa-code w-4 h-4"></i>
          <span>Problems</span>
        </router-link>
        
        <router-link 
          to="/challenges" 
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2"
          @click="showMobileMenu = false"
        >
          <i class="fas fa-trophy w-4 h-4"></i>
          <span>Challenges</span>
        </router-link>
        
        <router-link 
          to="/playground" 
          class="flex items-center space-x-2 text-gray-700 hover:text-purple-600 py-2"
          @click="showMobileMenu = false"
        >
          <i class="fas fa-play-circle w-4 h-4"></i>
          <span>Playground</span>
        </router-link>

        <!-- Mobile Search -->
        <div class="relative pt-2">
          <i class="fas fa-search absolute left-3 top-5 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            v-model="searchQuery"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchQuery: '',
      showUserMenu: false,
      showMobileMenu: false,
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      }
      // Set user to null to see login/register buttons
      // user: null
    }
  },
  computed: {
    userInitials() {
      if (!this.user?.name) return 'U'
      return this.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
  },
  methods: {
    login() {
      console.log('Login clicked')
      // Implement login logic
    },
    register() {
      console.log('Register clicked')
      // Implement register logic
    },
    logout() {
      console.log('Logout clicked')
      this.user = null
      this.showUserMenu = false
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>