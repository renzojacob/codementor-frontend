<template>
  <div class="space-y-6">
    <!-- Page Title -->
    <header>
      <h1 class="text-2xl font-bold text-[color:var(--gry-900)]">Dashboard</h1>
      <p class="text-sm text-[color:var(--gry-500)]">Overview of platform activity</p>
    </header>

    <!-- KPI Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="card in stats"
        :key="card.label"
        class="rounded-xl p-5 shadow bg-white border border-[color:var(--gry-200)] hover:shadow-md transition"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="text-[color:var(--gry-500)] text-sm font-medium">{{ card.label }}</p>
            <h2 class="text-2xl font-bold text-[color:var(--gry-900)] mt-1">{{ card.value }}</h2>
          </div>
          <div :class="['p-3 rounded-lg', card.iconBg]">
            <component :is="card.icon" class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </section>

    <!-- Analytics Charts -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow border border-[color:var(--gry-200)]">
        <h3 class="text-lg font-semibold text-[color:var(--gry-800)] mb-4">User Growth</h3>
        <UserGrowth :labels="userGrowthSeries.labels" :data="userGrowthSeries.data" />
      </div>

      <div class="bg-white p-6 rounded-xl shadow border border-[color:var(--gry-200)]">
        <h3 class="text-lg font-semibold text-[color:var(--gry-800)] mb-4">Lesson Engagement</h3>
        <LessonEngagement :labels="lessonEngagementData.labels" :data="lessonEngagementData.data" />
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="bg-white p-6 rounded-xl shadow border border-[color:var(--gry-200)]">
      <h3 class="text-lg font-semibold text-[color:var(--gry-800)] mb-4">Recent Activity</h3>
      <ul class="divide-y divide-[color:var(--gry-200)]">
        <li
          v-for="item in recentActivity"
          :key="item.id"
          class="py-3 flex justify-between items-center"
        >
          <div>
            <p class="text-[color:var(--gry-800)] font-medium">{{ item.title }}</p>
            <p class="text-sm text-[color:var(--gry-500)]">{{ item.time }}</p>
          </div>
          <span
            :class="[
              'px-2 py-1 rounded text-xs font-semibold',
              item.type === 'lesson'
                ? 'bg-[color:var(--acc-ind-500)] text-white'
                : item.type === 'challenge'
                ? 'bg-[color:var(--acc-org-500)] text-white'
                : 'bg-[color:var(--acc-grn-500)] text-white'
            ]"
          >
            {{ item.type }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BookOpenIcon, UserIcon, CodeIcon, ActivityIcon } from 'lucide-vue-next'
import UserGrowth from '../components/charts/UserGrowth.vue'
import LessonEngagement from '../components/charts/LessonEngagement.vue'
import { useApi } from '@/consumables/useApi' // adjust path if different

const { get } = useApi() // expects get(url) => JSON

const stats = ref([
  { label: 'Active Users', value: '—', icon: UserIcon, iconBg: 'bg-[color:var(--pri-500)]' },
  { label: 'Lessons Published', value: '—', icon: BookOpenIcon, iconBg: 'bg-[color:var(--acc-ind-500)]' },
  { label: 'Challenges Solved', value: '—', icon: CodeIcon, iconBg: 'bg-[color:var(--acc-grn-500)]' },
  { label: 'Avg. Completion Rate', value: '—', icon: ActivityIcon, iconBg: 'bg-[color:var(--acc-org-500)]' },
])

const recentActivity = ref([])
const userGrowthSeries = ref({ labels: [], data: [] })
const lessonEngagementData = ref({ labels: [], data: [] })

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
    const rows = await get('/admin/user-growth?months=6') // returns [{period: '2025-05', count: 10}, ...]
    userGrowthSeries.value.labels = rows.map(r => r.period)
    userGrowthSeries.value.data = rows.map(r => Number(r.count))
  } catch (e) {
    console.error('loadUserGrowth', e)
  }
}

async function loadLessonEngagement() {
  try {
    const rows = await get('/admin/lesson-engagement?limit=8') // returns [{id, title, views}, ...]
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

