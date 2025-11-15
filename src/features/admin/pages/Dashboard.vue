<template>
  <div class="space-y-6 px-2 md:px-0">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">High-level overview of platform health and activity</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/></svg>
          <span class="text-sm text-gray-600">Last 30 days</span>
        </div>
        <button class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm rounded-lg shadow-sm hover:shadow-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg>
          Export
        </button>
      </div>
    </header>

    <!-- KPI Row -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(card, i) in stats" :key="card.label" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div class="flex items-start gap-3">
          <div :class="['p-3 rounded-lg shrink-0', card.iconBg]">
            <component :is="card.icon" class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-xs text-gray-500 font-medium">{{ card.label }}</p>
              <span v-if="i===0 && activeChange !== null" :class="activeChange >= 0 ? 'text-green-600' : 'text-red-600'" class="text-xs font-semibold">{{ activeChange >= 0 ? '+'+activeChange+'%' : activeChange+'%' }}</span>
            </div>
            <div class="mt-2 flex items-baseline gap-3">
              <h2 class="text-2xl font-extrabold text-gray-900">{{ card.value }}</h2>
              <p class="text-xs text-gray-400">{{ card.sub ?? '' }}</p>
            </div>
            <div class="mt-3">
              <!-- subtle miniature sparkline for first card when data available -->
              <svg v-if="i===0 && userGrowthSeries.data.length" class="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline :points="sparklinePoints" fill="none" stroke="url(#g)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stop-color="#7c3aed" />
                    <stop offset="100%" stop-color="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content: larger charts and a right column -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">User Growth</h3>
          <div class="text-sm text-gray-500">Monthly active users</div>
        </div>
        <div class="h-64">
          <UserGrowth :labels="userGrowthSeries.labels" :data="userGrowthSeries.data" />
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Lesson Engagement</h4>
          <LessonEngagement :labels="lessonEngagementData.labels" :data="lessonEngagementData.data" />
        </div>

        <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h4>
          <ul class="space-y-3 max-h-48 overflow-auto pr-2">
            <li v-for="item in recentActivity" :key="item.id" class="flex items-start justify-between">
              <div>
                <p class="text-sm text-gray-800 font-medium">{{ item.title }}</p>
                <p class="text-xs text-gray-400">{{ item.time }}</p>
              </div>
              <span :class="['text-xs font-semibold px-2 py-1 rounded', item.type === 'lesson' ? 'bg-indigo-100 text-indigo-700' : item.type === 'challenge' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700']">{{ item.type }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { BookOpenIcon, UserIcon, CodeIcon, ActivityIcon } from 'lucide-vue-next'
import UserGrowth from '../components/charts/UserGrowth.vue'
import LessonEngagement from '../components/charts/LessonEngagement.vue'
import { useApi } from '@/core/composables/useApi'

const { get, loading, error } = useApi()

const stats = ref([
  { label: 'Active Users', value: '\u2014', icon: UserIcon, iconBg: 'bg-gradient-to-tr from-purple-600 to-teal-400' },
  { label: 'Lessons Published', value: '\u2014', icon: BookOpenIcon, iconBg: 'bg-indigo-600' },
  { label: 'Challenges Solved', value: '\u2014', icon: CodeIcon, iconBg: 'bg-green-600' },
  { label: 'Avg. Completion Rate', value: '\u2014', icon: ActivityIcon, iconBg: 'bg-orange-500' },
])

const recentActivity = ref([])
const userGrowthSeries = ref({ labels: [], data: [] })
const lessonEngagementData = ref({ labels: [], data: [] })

const activeChange = ref(null)

const sparklinePoints = computed(() => {
  const arr = userGrowthSeries.value.data || []
  if (!arr.length) return ''
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const w = 100
  const h = 18
  return arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
})

async function loadStats() {
  try {
    const res = await get('/admin/stats')
    stats.value[0].value = res.active_users_30d ?? 0
    stats.value[1].value = res.lessons ?? 0
    stats.value[2].value = res.challenges_solved ?? 0
    stats.value[3].value = (res.avg_completion_rate ?? 0) + '%'
  } catch (e) {
    console.error('loadStats', e)
  }
}

async function loadUserGrowth() {
  try {
    const rows = await get('/admin/user-growth?months=6')
    userGrowthSeries.value.labels = rows.map(r => r.period)
    userGrowthSeries.value.data = rows.map(r => Number(r.count))
    // compute change between last two points
    const d = userGrowthSeries.value.data
    if (d.length >= 2) {
      const last = d[d.length - 1]
      const prev = d[d.length - 2] || last
      activeChange.value = prev === 0 ? null : Math.round(((last - prev) / prev) * 100)
    }
  } catch (e) {
    console.error('loadUserGrowth', e)
  }
}

async function loadLessonEngagement() {
  try {
    const rows = await get('/admin/lesson-engagement?limit=8')
    lessonEngagementData.value.labels = rows.map(r => r.title)
    lessonEngagementData.value.data = rows.map(r => Number(r.views))
  } catch (e) {
    console.error('loadLessonEngagement', e)
  }
}

async function loadRecentActivity() {
  try {
    recentActivity.value = await get('/admin/recent-activity?limit=8')
  } catch (e) {
    console.error('loadRecentActivity', e)
  }
}

onMounted(async () => {
  await Promise.all([loadStats(), loadUserGrowth(), loadLessonEngagement(), loadRecentActivity()])
})
</script>