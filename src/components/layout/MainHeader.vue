<!-- src/components/layout/Header.vue -->
<template>
  <header class="w-full h-16 flex items-center justify-between px-6 bg-[var(--pri-600)] text-white shadow-md">

    <!-- Logo -->
    <div class="font-semibold text-xl tracking-wide cursor-pointer">
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
        <span v-if="$route.path === item.to" class="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full 
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
        </button>

        <!-- Dropdown -->
        <div v-if="showNotifications"
          class="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4 border border-[var(--gry-200)] z-50">
          <p class="font-semibold mb-2 text-[var(--gry-700)]">Notifications</p>
          <p class="text-sm text-[var(--gry-600)]">No new notifications.</p>
        </div>
      </div>

      <!-- User Menu -->
      <div class="relative">
        <img src="https://i.pravatar.cc/150?img=6" class="w-9 h-9 rounded-full cursor-pointer border border-white/40"
          @click="toggleUserMenu" />

        <div v-if="showUserMenu"
          class="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg border border-[var(--gry-200)] z-50">
          <RouterLink v-for="item in profilenav" :key="item.to" :to="item.to"
            class="block px-4 py-2 hover:bg-[var(--gry-100)] transition-colors" :class="{
              'text-[var(--pri-600)] bg-[var(--gry-100)]': isActive(item.to),
              'text-black': !isActive(item.to)
            }">
            {{ item.label }}
          </RouterLink>

          <button
            class="w-full text-left px-4 py-2 hover:bg-[var(--gry-100)] text-[var(--acc-red-600)] transition-colors"
            @click="logout">
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const path = '/app'

const nav = [
  { label: 'Dashboard', to: path + '/' },
  { label: 'Challenges', to: path + '/challenges' },
  { label: 'Leaderboard', to: path + '/leaderboard' },
  { label: 'Learn', to: path + '/learn' },
]

const profilenav = [
  { label: 'Profile', to: path + '/profile' },
  { label: 'Settings', to: path + '/settings' },
]

const showNotifications = ref(false)
const showUserMenu = ref(false)

// Check if the current route matches the nav item
const isActive = (routePath) => {
  // Exact match for dashboard, partial match for others
  if (routePath === '/app/') {
    return route.path === '/app/'
  }
  return route.path.startsWith(routePath) && routePath !== '/app/'
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const logout = () => {
  // Drop token logic here...
  router.push('/login')
}

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}
</script>