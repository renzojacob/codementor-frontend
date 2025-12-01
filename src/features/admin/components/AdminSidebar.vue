<!-- src/features/admin/components/AdminSidebar.vue -->
<template>
  <aside
    :class="[
      'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out',
      collapsed ? 'w-20' : 'w-64'
    ]"
    aria-label="Admin sidebar"
  >
    <!-- Decorative background shapes -->
    <div class="absolute inset-0 pointer-events-none opacity-6">
      <div class="absolute top-0 right-0 w-36 h-36 bg-indigo-600 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-28 h-28 bg-purple-600 rounded-full -translate-x-16 translate-y-16 blur-2xl"></div>
    </div>

    <div class="relative z-10 flex items-center justify-between p-4 border-b border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-70 animate-pulse"></div>
          <!-- CodeMentor logo with robot icon -->
          <div class="relative w-8 h-8 rounded-lg bg-gray-800/60 p-1 flex items-center justify-center">
            <i class="fas fa-robot text-white text-lg"></i>
          </div>
        </div>
        <transition name="fade-slide" mode="out-in">
          <span v-if="!collapsed" class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">CodeMentor</span>
        </transition>
      </div>

      <button
        @click="toggle"
        :aria-expanded="!collapsed"
        class="p-2 rounded-xl hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105"
        aria-label="Toggle sidebar"
      >
        <svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <nav class="relative z-10 flex-1 overflow-y-auto py-6" aria-label="Admin navigation">
      <ul class="space-y-2 px-3">
        <li v-for="item in items" :key="item.to">
          <RouterLink
            :to="item.to"
            class="group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden"
            :class="isActive(item.to)
              ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-500/20'
              : 'text-gray-300 hover:bg-gray-800/60 hover:translate-x-1'"
            :title="collapsed ? item.title : ''"
          >
            <!-- Active state indicator -->
            <div v-if="isActive(item.to)" class="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>

            <!-- Icon -->
            <div class="w-6 h-6 flex-shrink-0 transition-all duration-300 flex items-center justify-center" :class="isActive(item.to) ? 'text-white' : 'text-gray-400 group-hover:text-white'">
              <i :class="item.icon"></i>
            </div>

            <transition name="fade-slide" mode="out-in">
              <span v-if="!collapsed" class="truncate font-medium">{{ item.title }}</span>
            </transition>

            <span v-if="item.badge && !collapsed" class="ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300"
              :class="isActive(item.to) ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300'">{{ item.badge }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer area with dynamic profile and logout -->
    <div class="relative z-10 p-4 border-t border-gray-700/50">
      <div class="flex items-center gap-3">
        <!-- Dynamic Profile Avatar -->
        <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-600">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            {{ userInitials }}
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <transition name="fade-slide" mode="out-in">
            <div v-if="!collapsed" class="text-sm font-medium truncate text-white">{{ userName }}</div>
          </transition>
          <transition name="fade-slide" mode="out-in">
            <div v-if="!collapsed" class="text-xs text-gray-400 truncate">{{ userEmail }}</div>
          </transition>
        </div>
        
        <!-- Profile and Logout Dropdown -->
        <div class="relative" v-if="!collapsed">
          <button 
            @click="toggleDropdown" 
            class="p-2 rounded-md hover:bg-gray-800/60 transition-colors duration-200"
          >
            <i class="fas fa-ellipsis-v text-gray-300"></i>
          </button>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="showDropdown" 
            class="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
          >
            <div class="p-3 border-b border-gray-700">
              <div class="text-sm font-medium text-white">{{ userName }}</div>
              <div class="text-xs text-gray-400 truncate">{{ userEmail }}</div>
            </div>
            <div class="p-1">
              <button 
                @click="openProfile" 
                class="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <i class="fas fa-user-cog text-gray-400 w-4"></i>
                Profile Settings
              </button>
              <button 
                @click="handleLogout" 
                class="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <i class="fas fa-sign-out-alt text-red-400 w-4"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>
        
        <!-- Simple logout button when collapsed -->
        <button 
          v-else 
          @click="handleLogout" 
          class="p-2 rounded-md hover:bg-red-900/20 text-red-300 transition-colors duration-200"
          title="Sign Out"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/core/store/user'
import { useAuth } from '@/core/composables/useAuth'

const collapsed = ref(false)
const showDropdown = ref(false)
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { logout } = useAuth()

// Dynamic user data
const userName = computed(() => userStore.username || 'Administrator')
const userEmail = computed(() => userStore.email || 'admin@codementor.dev')
const userInitials = computed(() => {
  const name = userName.value
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
})

function toggle() {
  collapsed.value = !collapsed.value
  // Close dropdown when collapsing sidebar
  if (collapsed.value) {
    showDropdown.value = false
  }
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown() {
  showDropdown.value = false
}

function isActive(path) {
  const normalize = (p) => (p ? p.replace(/\/+$/, '') : '')
  const current = normalize(route.path)
  const target = normalize(path)

  if (target === '/admin') return current === '/admin'
  return current === target || current.startsWith(target + '/')
}

function openProfile() {
  closeDropdown()
  router.push('/admin/settings')
}

async function handleLogout() {
  closeDropdown()
  try {
    await logout()
    // The logout function in useAuth should handle redirect to login
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const items = [
  { title: 'Dashboard', to: '/admin', icon: 'fas fa-tachometer-alt' },
  { title: 'Users', to: '/admin/users', icon: 'fas fa-users' },
  { title: 'Analytics', to: '/admin/analytics', icon: 'fas fa-chart-bar' },
  { title: 'Learn', to: '/admin/learn', icon: 'fas fa-graduation-cap' },
  { title: 'AI Agent', to: '/admin/ai-agent', icon: 'fas fa-robot' },
  { title: 'Challenges', to: '/admin/challenges', icon: 'fas fa-trophy' },
  { title: 'Settings', to: '/admin/settings', icon: 'fas fa-cog' }
]
</script>

<style scoped>
.transition-width { transition-property: width; }

/* Smooth animations for text and elements */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(-8px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-8px); }

/* Custom scrollbar for the navigation */
nav::-webkit-scrollbar { width: 6px; }
nav::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 10px; }
nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 10px; }
nav::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }

/* Glow effect for active items */
.router-link-active { box-shadow: 0 10px 20px -6px rgba(99,102,241,0.25), 0 4px 6px -2px rgba(99,102,241,0.08); }

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>