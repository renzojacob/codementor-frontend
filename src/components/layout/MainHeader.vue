<!-- src/components/layout/Header.vue -->
<template>
  <header class="w-full h-16 flex items-center justify-between px-6 bg-[var(--pri-600)] text-white shadow-md">

    <!-- Logo -->
    <div class="font-semibold text-xl tracking-wide cursor-pointer" @click="goHome">
      CodeMentor
    </div>

    <!-- Center Navigation (hidden on mobile) -->
    <nav class="hidden md:flex gap-6 font-medium">
      <RouterLink v-for="item in nav" :key="item.to" :to="item.to"
        class="relative py-2 text-white/90 hover:text-white transition group">
        {{ item.label }}

        <!-- Hover underline (center → outward) -->
        <span class="pointer-events-none absolute left-1/2 -bottom-0.5 h-[2px] w-0 
           bg-[var(--pri-200)] transition-all duration-300 
           -translate-x-1/2 group-hover:w-full"></span>

        <!-- Active underline (always full width) -->
        <span v-if="isActive(item.to)" class="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full 
           bg-[var(--pri-50)]"></span>
      </RouterLink>
    </nav>

    <!-- Right Controls -->
    <div class="flex items-center gap-4">

      <!-- Notifications -->
      <div class="relative">
        <button @click="toggleNotifications" class="relative p-2 hover:bg-[var(--pri-700)] rounded-lg transition">
          <!-- FontAwesome Bell Icon -->
          <i class="fas fa-bell w-5 h-5"></i>
          <!-- Notification badge -->
          <span v-if="unreadNotifications > 0" 
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {{ unreadNotifications }}
          </span>
        </button>

        <!-- Dropdown -->
        <div v-if="showNotifications"
          class="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4 border border-[var(--gry-200)] z-50">
          <p class="font-semibold mb-2 text-[var(--gry-700)]">Notifications</p>
          <div v-if="notifications.length > 0">
            <div v-for="notification in notifications" :key="notification.id" 
              class="text-sm text-[var(--gry-600)] p-2 border-b border-gray-100 last:border-b-0">
              {{ notification.message }}
              <span class="text-xs text-gray-400 block">{{ notification.time }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-[var(--gry-600)]">No new notifications.</p>
        </div>
      </div>

      <!-- User Menu -->
      <div class="relative">
        <!-- Dynamic User Avatar -->
        <div class="flex items-center gap-2 cursor-pointer" @click="toggleUserMenu">
          <!-- User avatar with fallback to initials -->
          <div v-if="userStore.username" class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm border border-white/40">
              {{ userInitials }}
            </div>
            <div class="hidden md:block text-sm">
              <div class="font-medium">{{ userStore.username }}</div>
              <div class="text-xs text-white/80">{{ userStore.role }}</div>
            </div>
          </div>
          <!-- Loading state -->
          <div v-else class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-full bg-gray-400 animate-pulse"></div>
            <div class="hidden md:block">
              <div class="h-4 w-20 bg-gray-400 rounded animate-pulse"></div>
              <div class="h-3 w-16 bg-gray-400 rounded animate-pulse mt-1"></div>
            </div>
          </div>
        </div>

        <!-- User Dropdown Menu -->
        <div v-if="showUserMenu"
          class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg border border-[var(--gry-200)] z-50 overflow-hidden">
          
          <!-- User info section -->
          <div class="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div class="font-semibold text-sm truncate">{{ userStore.username || 'User' }}</div>
            <div class="text-xs text-gray-500 truncate">{{ userStore.email || 'Loading...' }}</div>
          </div>
          
          <!-- Navigation links -->
          <RouterLink 
            v-for="item in profileNav" 
            :key="item.to" 
            :to="item.to"
            class="block px-4 py-2 hover:bg-[var(--gry-100)] transition-colors text-sm flex items-center gap-2"
            :class="{
              'text-[var(--pri-600)] bg-[var(--gry-100)]': isActive(item.to),
              'text-gray-700': !isActive(item.to)
            }"
            @click="closeDropdowns">
            <i :class="item.icon" class="w-4 h-4"></i>
            {{ item.label }}
          </RouterLink>

          <!-- Admin link (only show for admins) -->
          <RouterLink 
            v-if="userStore.isAdmin"
            to="/admin"
            class="block px-4 py-2 hover:bg-[var(--gry-100)] transition-colors text-sm flex items-center gap-2 text-purple-600 border-t border-gray-100"
            @click="closeDropdowns">
            <i class="fas fa-shield-alt w-4 h-4"></i>
            Admin Panel
          </RouterLink>

          <!-- Logout button -->
          <button
            class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors text-sm flex items-center gap-2 border-t border-gray-100"
            @click="logout">
            <i class="fas fa-sign-out-alt w-4 h-4"></i>
            Logout
          </button>
        </div>
      </div>

      <!-- Mobile menu button -->
      <button class="md:hidden p-2 rounded-lg hover:bg-[var(--pri-700)] transition" @click="$emit('toggleNav')">
        <!-- FontAwesome Bars Icon -->
        <i class="fas fa-bars w-5 h-5"></i>
      </button>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/core/store/user'
import { useAuth } from '@/core/composables/useAuth'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { logout: authLogout } = useAuth()

const showNotifications = ref(false)
const showUserMenu = ref(false)

// Dynamic navigation based on user role
const nav = computed(() => {
  const basePath = userStore.isAdmin ? '/admin' : '/app'
  
  const baseNav = [
    { label: 'Dashboard', to: basePath + '/' },
    { label: 'Challenges', to: basePath + '/challenges' },
    { label: 'Leaderboard', to: basePath + '/leaderboard' },
    { label: 'Learn', to: basePath + '/learn' },
  ]
  
  return baseNav
})

// Profile navigation
const profileNav = [
  { label: 'Profile', to: '/app/profile', icon: 'fas fa-user' },
  { label: 'Settings', to: '/app/settings', icon: 'fas fa-cog' },
  { label: 'Achievements', to: '/app/achievements', icon: 'fas fa-trophy' },
]

// Mock notifications data
const notifications = ref([
  { id: 1, message: 'New challenge available!', time: '5 min ago', read: false },
  { id: 2, message: 'You earned 50 XP', time: '1 hour ago', read: true },
])

const unreadNotifications = computed(() => 
  notifications.value.filter(n => !n.read).length
)

// User initials for avatar
const userInitials = computed(() => {
  if (!userStore.username) return '...'
  
  return userStore.username
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
})

// Check if the current route matches the nav item
const isActive = (routePath) => {
  // Exact match for dashboard, partial match for others
  if (routePath.endsWith('/')) {
    return route.path === routePath
  }
  return route.path.startsWith(routePath)
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const goHome = () => {
  const homePath = userStore.isAdmin ? '/admin' : '/app'
  router.push(homePath)
}

const closeDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}

const logout = async () => {
  closeDropdowns()
  try {
    await authLogout()
    // The logout function should handle redirect to login page
  } catch (error) {
    console.error('Logout failed:', error)
    // Fallback redirect
    router.push('/login')
  }
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  const header = event.target.closest('header')
  if (!header) {
    closeDropdowns()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  console.log('Header mounted - user data:', {
    username: userStore.username,
    email: userStore.email,
    role: userStore.role,
    isAdmin: userStore.isAdmin
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.router-link-active {
  color: white;
}
</style>