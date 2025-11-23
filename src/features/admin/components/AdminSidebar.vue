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
          <!-- Codementor logo (inline SVG) - neutral, reusable across the site -->
          <div class="relative w-8 h-8 rounded-lg bg-gray-800/60 p-1 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-6 h-6" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="cmGrad" x1="0" x2="1">
                  <stop offset="0%" stop-color="#7c3aed" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="10" fill="url(#cmGrad)" />
              <!-- stylized code brackets forming a chat/mentor mark -->
              <path d="M22 24 L30 32 L22 40" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M42 24 L34 32 L42 40" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </div>
        </div>
        <transition name="fade-slide" mode="out-in">
          <span v-if="!collapsed" class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Admin Pro</span>
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
            <div class="w-6 h-6 flex-shrink-0 transition-all duration-300" :class="isActive(item.to) ? 'text-white' : 'text-gray-400 group-hover:text-white'" v-html="item.svg"></div>

            <transition name="fade-slide" mode="out-in">
              <span v-if="!collapsed" class="truncate font-medium">{{ item.title }}</span>
            </transition>

            <span v-if="item.badge && !collapsed" class="ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300"
              :class="isActive(item.to) ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300'">{{ item.badge }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer area: no sign-out here (project already handles sign out elsewhere) -->
    <div class="relative z-10 p-4 border-t border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11zM5.5 20a6.5 6.5 0 0113 0"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <transition name="fade-slide" mode="out-in">
            <div v-if="!collapsed" class="text-sm font-medium truncate">Administrator</div>
          </transition>
          <transition name="fade-slide" mode="out-in">
            <div v-if="!collapsed" class="text-xs text-gray-400 truncate">admin@codementor.dev</div>
          </transition>
        </div>
        <button @click="openProfile" class="p-2 rounded-md hover:bg-gray-800/60">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const collapsed = ref(false)
const route = useRoute()
const router = useRouter()

function toggle() {
  collapsed.value = !collapsed.value
}

function isActive(path) {
  // Normalize paths (remove trailing slashes)
  const normalize = (p) => (p ? p.replace(/\/+$/, '') : '')
  const current = normalize(route.path)
  const target = normalize(path)

  // Special-case the root admin dashboard so it only marks when exactly on '/admin'
  if (target === '/admin') return current === '/admin'

  // For other items, mark active when current equals target or is a child route (starts with target/)
  return current === target || current.startsWith(target + '/')
}

function openProfile() {
  // Navigate to profile or settings page; keep it non-destructive
  router.push('/admin/settings')
}

const items = [
  { title: 'Dashboard', to: '/admin', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>` },
  { title: 'Users', to: '/admin/users', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>` },
  { title: 'Analytics', to: '/admin/analytics', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>` },
  { title: 'Learn', to: '/admin/learn', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>` },
  { title: 'AI Agent', to: '/admin/ai-agent', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>` },
  { title: 'Challenge', to: '/admin/challenges', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M9.497 14.25H8.25m5.007 0H12M8.25 7.5h7.5m-7.5 3h7.5m-7.5 3h7.5"/></svg>` },
  // Settings (explicitly included)
  { title: 'Settings', to: '/admin/settings', svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM19.5 12a7.5 7.5 0 01-.184 1.69l1.518 1.179a.75.75 0 01.14 1.042l-1.435 1.972a.75.75 0 01-1.003.258l-1.786-1.04a7.52 7.52 0 01-1.47.85l-.27 1.98a.75.75 0 01-.742.628h-2.87a.75.75 0 01-.742-.628l-.27-1.98a7.52 7.52 0 01-1.47-.85l-1.786 1.04a.75.75 0 01-1.003-.258L2.026 16.11a.75.75 0 01.14-1.042l1.518-1.179A7.5 7.5 0 014.5 12c0-.57.06-1.124.184-1.69L3.166 9.131a.75.75 0 01-.14-1.042l1.435-1.972a.75.75 0 011.003-.258l1.786 1.04c.448-.33.93-.611 1.47-.85l.27-1.98A.75.75 0 019.858 2.5h2.87c.35 0 .654.246.742.628l.27 1.98c.54.239 1.022.52 1.47.85l1.786-1.04a.75.75 0 011.003.258l1.435 1.972a.75.75 0 01-.14 1.042l-1.518 1.179c.124.566.184 1.12.184 1.69z"/></svg>` }
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

</style>
