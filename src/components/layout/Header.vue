<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <i class="fas fa-robot text-white"></i>
          </div>
          <span class="text-xl font-bold bg-gray-900 bg-clip-text text-transparent">
            CodeMentor
          </span>
        </router-link>

        <!-- Navigation (Desktop) -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link to="/" class="nav-link" active-class="text-blue-600">Home</router-link>
          <router-link to="/learn" class="nav-link" active-class="text-green-600">Learn</router-link>

          <!-- Only show Challenges & Leaderboard if logged in -->
          <template v-if="isAuthenticated">
            <router-link to="/challenge/1" class="nav-link" active-class="text-orange-600">Challenges</router-link>
            <router-link to="/leaderboard" class="nav-link" active-class="text-purple-600">Leaderboard</router-link>
          </template>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-3">
          <template v-if="!isAuthenticated">
            <router-link to="/login"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              :class="{ 'text-blue-600': $route.path === '/login' }">
              Sign In
            </router-link>
            <router-link to="/register"
              class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-sm font-medium transition-all duration-200">
              Get Started
            </router-link>
          </template>
          <template v-else>
            <button @click="logout" class="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200">
              Logout
            </button>
          </template>

          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
            <i class="fas fa-bars w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4 space-y-4">
        <router-link to="/" class="mobile-link" @click="showMobileMenu = false">Home</router-link>
        <router-link to="/learn" class="mobile-link" @click="showMobileMenu = false">Learn</router-link>

        <template v-if="isAuthenticated">
          <router-link to="/challenge/1" class="mobile-link" @click="showMobileMenu = false">Challenges</router-link>
          <router-link to="/leaderboard" class="mobile-link" @click="showMobileMenu = false">Leaderboard</router-link>
          <button class="mobile-link text-red-500" @click="handleMobileLogout">
            Logout
          </button>

        </template>

        <template v-else>
          <router-link to="/login" class="mobile-link" @click="showMobileMenu = false">Sign In</router-link>
          <router-link to="/register"
            class="block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 rounded-lg font-medium"
            @click="showMobileMenu = false">
            Get Started
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return { showMobileMenu: false }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('access_token') // your auth logic
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    logout() {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    },
    handleMobileLogout() {
      this.logout()
      this.showMobileMenu = false
    }
  },
  watch: {
    $route() {
      this.showMobileMenu = false
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200;
}

.mobile-link {
  @apply block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200;
}
</style>
