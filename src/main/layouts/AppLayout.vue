<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside 
      class="bg-white shadow-sm border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-50 transition-transform duration-300"
      :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <router-link to="/dashboard" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">C</span>
            </div>
            <span class="text-xl font-bold text-gray-900">CodeMaster</span>
          </router-link>
          
          <!-- Mobile close button -->
          <button 
            @click="sidebarOpen = false"
            class="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            :class="[
              $route.path.startsWith(item.to) 
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700' 
                : ''
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <!-- User section -->
        <div class="p-4 border-t border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span class="text-indigo-600 text-sm font-medium">
                {{ userInitials }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ user?.name || 'User' }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ user?.email || 'user@example.com' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 md:ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <!-- Left side: Mobile menu button -->
          <div class="flex items-center">
            <button 
              @click="sidebarOpen = true"
              class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <!-- Breadcrumb or page title -->
            <div class="ml-4 md:ml-0">
              <h1 class="text-xl font-semibold text-gray-900">
                {{ currentPageTitle }}
              </h1>
            </div>
          </div>

          <!-- Right side: User menu & actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 11.5 2.5v.25a8.25 8.25 0 0 1-2 5.5" />
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- User menu -->
            <div class="relative">
              <button 
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span class="text-indigo-600 text-sm font-medium">
                    {{ userInitials }}
                  </span>
                </div>
                <span class="hidden md:block text-sm font-medium text-gray-700">
                  {{ user?.name || 'User' }}
                </span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div 
                v-if="userMenuOpen"
                v-click-outside="() => userMenuOpen = false"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              >
                <router-link 
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </router-link>
                <router-link 
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </router-link>
                <div class="border-t border-gray-200 my-1"></div>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile overlay -->
    <div 
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Icon components (you can replace with your actual icons)
const DashboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>`
}

const ChallengeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`
}

const LeaderboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>`
}

const LearnIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>`
}

export default {
  name: 'AppLayout',
  components: {
    DashboardIcon,
    ChallengeIcon,
    LeaderboardIcon,
    LearnIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const sidebarOpen = ref(false)
    const userMenuOpen = ref(false)

    // Mock user data - replace with actual user data from your store
    const user = ref({
      name: 'John Doe',
      email: 'john@example.com'
    })

    const navigation = [
      { name: 'Dashboard', to: '/dashboard', icon: 'DashboardIcon' },
      { name: 'Challenges', to: '/challenges', icon: 'ChallengeIcon' },
      { name: 'Leaderboard', to: '/leaderboard', icon: 'LeaderboardIcon' },
      { name: 'Learn', to: '/learn', icon: 'LearnIcon' },
    ]

    const currentPageTitle = computed(() => {
      const currentNav = navigation.find(item => 
        route.path.startsWith(item.to)
      )
      return currentNav?.name || 'Dashboard'
    })

    const userInitials = computed(() => {
      if (!user.value?.name) return 'U'
      return user.value.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const handleLogout = () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
    }

    // Close mobile sidebar on route change
    onMounted(() => {
      const unwatch = router.afterEach(() => {
        sidebarOpen.value = false
      })
      
      return unwatch
    })

    return {
      sidebarOpen,
      userMenuOpen,
      user,
      navigation,
      currentPageTitle,
      userInitials,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>