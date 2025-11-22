<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-gray-600 mt-2">Comprehensive platform insights and performance metrics</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="timeRange" @change="loadAllAnalytics" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button @click="exportReport" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Platform Overview KPIs -->
    <div v-if="!loading" class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.totalUsers.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">+{{ platformOverview.userGrowth }}% growth</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Sessions</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.activeSessions.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Currently online</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Submissions</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.totalSubmissions.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">{{ platformOverview.submissionSuccessRate }}% success rate</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Lessons</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.totalLessons.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ platformOverview.totalChallenges }} challenges</p>
      </div>
    </div>

    <!-- Analytics Sections Grid -->
    <div v-if="!loading" class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- User Growth Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">User Growth Analytics</h3>
          <div class="flex gap-2">
            <button @click="switchUserGrowthChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', userGrowthChartType === 'line' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100']">
              Trend
            </button>
            <button @click="switchUserGrowthChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', userGrowthChartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100']">
              Monthly
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-700">{{ userGrowth.dailyNewUsers }}</div>
            <div class="text-sm text-blue-600">Daily New Users</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-700">{{ userGrowth.weeklyNewUsers }}</div>
            <div class="text-sm text-green-600">Weekly New Users</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-700">{{ userGrowth.monthlyGrowthRate }}%</div>
            <div class="text-sm text-purple-600">Monthly Growth</div>
          </div>
          <div class="text-center p-4 bg-orange-50 rounded-lg">
            <div class="text-2xl font-bold text-orange-700">{{ userGrowth.totalUsers }}</div>
            <div class="text-sm text-orange-600">Total Users</div>
          </div>
        </div>

        <div class="h-80">
          <canvas ref="userGrowthChart"></canvas>
        </div>
      </div>

      <!-- Submission Activity Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Submission Activity</h3>
          <div class="flex gap-2">
            <button @click="switchSubmissionChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', submissionChartType === 'line' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100']">
              Daily
            </button>
            <button @click="switchSubmissionChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', submissionChartType === 'bar' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100']">
              Pass/Fail
            </button>
            <button @click="switchSubmissionChart('pie')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', submissionChartType === 'pie' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100']">
              Languages
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-2xl font-bold text-gray-700">{{ submissionActivity.totalSubmissions }}</div>
            <div class="text-sm text-gray-600">Total Submissions</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-700">{{ submissionActivity.passedSubmissions }}</div>
            <div class="text-sm text-green-600">Passed</div>
          </div>
          <div class="text-center p-4 bg-red-50 rounded-lg">
            <div class="text-2xl font-bold text-red-700">{{ submissionActivity.failedSubmissions }}</div>
            <div class="text-sm text-red-600">Failed</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-700">{{ submissionActivity.successRate }}%</div>
            <div class="text-sm text-blue-600">Success Rate</div>
          </div>
        </div>

        <div class="h-80">
          <canvas ref="submissionChart"></canvas>
        </div>
      </div>

      <!-- Learning Path Engagement -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Learning Path Engagement</h3>
          <div class="flex gap-2">
            <button @click="switchLearningPathChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', learningPathChartType === 'bar' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100']">
              Active Users
            </button>
            <button @click="switchLearningPathChart('doughnut')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', learningPathChartType === 'doughnut' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100']">
              Success Rate
            </button>
          </div>
        </div>

        <div class="h-80 mb-6">
          <canvas ref="learningPathChart"></canvas>
        </div>

        <!-- Top Learning Paths -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-gray-700">Top Programming Languages</h4>
          <div v-for="path in learningPathEngagement.topPaths" :key="path.language_name" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ path.language_name }}</div>
              <div class="text-xs text-gray-500">{{ path.active_users }} active users • {{ path.success_rate }}% success rate</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ path.total_submissions.toLocaleString() }}</div>
              <div class="text-xs text-gray-500">submissions</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Difficulty Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Challenge Difficulty</h3>
          <div class="flex gap-2">
            <button @click="switchChallengeChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', challengeChartType === 'bar' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100']">
              Pass Rate
            </button>
            <button @click="switchChallengeChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', challengeChartType === 'line' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100']">
              Attempts
            </button>
          </div>
        </div>

        <div class="h-80 mb-6">
          <canvas ref="challengeChart"></canvas>
        </div>

        <!-- Challenge Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold text-gray-700">{{ challengeDifficulty.avgPassRate }}%</div>
            <div class="text-xs text-gray-600">Avg Pass Rate</div>
          </div>
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-lg font-bold text-green-700">{{ challengeDifficulty.avgAttempts }}</div>
            <div class="text-xs text-green-600">Avg Attempts</div>
          </div>
          <div class="text-center p-3 bg-red-50 rounded-lg">
            <div class="text-lg font-bold text-red-700">{{ challengeDifficulty.mostFailed }}</div>
            <div class="text-xs text-red-600">Most Failed</div>
          </div>
          <div class="text-center p-3 bg-blue-50 rounded-lg">
            <div class="text-lg font-bold text-blue-700">{{ challengeDifficulty.mostCompleted }}</div>
            <div class="text-xs text-blue-600">Most Completed</div>
          </div>
        </div>
      </div>

      <!-- Session Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Session Analytics</h3>
          <div class="flex gap-2">
            <button @click="switchSessionChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', sessionChartType === 'bar' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100']">
              Daily Activity
            </button>
            <button @click="switchSessionChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', sessionChartType === 'line' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100']">
              Peak Hours
            </button>
          </div>
        </div>

        <div class="h-80">
          <canvas ref="sessionChart"></canvas>
        </div>
      </div>

      <!-- Lesson Performance -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Lessons</h3>
          <div class="flex gap-2">
            <button @click="switchLessonChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', lessonChartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100']">
              View
            </button>
          </div>
        </div>

        <div class="h-80 mb-6">
          <canvas ref="lessonChart"></canvas>
        </div>

        <!-- Recent Lessons -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-gray-700">Recently Added Lessons</h4>
          <div v-for="lesson in lessonPerformance.topLessons" :key="lesson.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ lesson.title }}</div>
              <div class="text-xs text-gray-500">{{ lesson.language_name }} • {{ formatDate(lesson.created_at) }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ lesson.order_index }}</div>
              <div class="text-xs text-gray-500">order</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Analytics Sections -->
    <div v-if="!loading" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <!-- Top Performers -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
        <div class="space-y-3">
          <div v-for="(user, index) in leaderboard.topPerformers" :key="user.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                {{ index + 1 }}
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                <div class="text-xs text-gray-500">{{ user.challenges_solved }} challenges solved</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-green-700">{{ user.xp }}</div>
              <div class="text-xs text-gray-500">XP</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivity.activities" :key="activity.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ activity.description }}</div>
              <div class="text-xs text-gray-500">{{ formatTime(activity.time) }}</div>
            </div>
            <div class="text-right">
              <span :class="['px-2 py-1 rounded text-xs font-medium', 
                activity.type === 'submission' && activity.status === 'Passed' ? 'bg-green-100 text-green-800' :
                activity.type === 'submission' ? 'bg-red-100 text-red-800' :
                activity.type === 'challenge_solve' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              ]">
                {{ activity.type.replace('_', ' ') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import {
  Chart,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
Chart.register(
  LineController,
  BarController,
  PieController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Chart refs
const userGrowthChart = ref(null)
const submissionChart = ref(null)
const learningPathChart = ref(null)
const sessionChart = ref(null)
const challengeChart = ref(null)
const lessonChart = ref(null)

// Chart instances
let userGrowthChartInstance = null
let submissionChartInstance = null
let learningPathChartInstance = null
let sessionChartInstance = null
let challengeChartInstance = null
let lessonChartInstance = null

// Time range selector
const timeRange = ref('30d')
const loading = ref(true)

// Chart type selectors
const userGrowthChartType = ref('line')
const submissionChartType = ref('line')
const learningPathChartType = ref('bar')
const sessionChartType = ref('bar')
const challengeChartType = ref('bar')
const lessonChartType = ref('bar')

// Analytics data - updated to match backend structure
const platformOverview = ref({
  totalUsers: 0,
  activeSessions: 0,
  totalSubmissions: 0,
  submissionSuccessRate: 0,
  totalLessons: 0,
  totalChallenges: 0,
  userGrowth: 0
})

const userGrowth = ref({
  dailyNewUsers: 0,
  weeklyNewUsers: 0,
  monthlyGrowthRate: 0,
  totalUsers: 0,
  timelineData: [],
  timelineLabels: []
})

const submissionActivity = ref({
  totalSubmissions: 0,
  passedSubmissions: 0,
  failedSubmissions: 0,
  successRate: 0,
  languageUsage: [],
  dailySubmissions: [],
  dailyLabels: []
})

const learningPathEngagement = ref({
  topPaths: []
})

const challengeDifficulty = ref({
  avgPassRate: 0,
  avgAttempts: 0,
  mostFailed: 'N/A',
  mostCompleted: 'N/A',
  challenges: []
})

const lessonPerformance = ref({
  topLessons: []
})

const sessionAnalytics = ref({
  dailyActivity: [],
  peakHours: []
})

const leaderboard = ref({
  topPerformers: []
})

const recentActivity = ref({
  activities: []
})

// API functions
async function loadAllAnalytics() {
  try {
    loading.value = true
    await Promise.all([
      loadPlatformOverview(),
      loadUserGrowth(),
      loadSubmissionActivity(),
      loadLearningPaths(),
      loadChallengeDifficulty(),
      loadLessonPerformance(),
      loadSessionStats(),
      loadTopPerformers(),
      loadRecentActivity()
    ])
    
    // Recreate charts with real data
    nextTick(() => {
      createAllCharts()
    })
  } catch (error) {
    console.error('Failed to load analytics:', error)
  } finally {
    loading.value = false
  }
}

async function loadPlatformOverview() {
  const response = await fetch('/api/admin/analytics/overview')
  const data = await response.json()
  platformOverview.value = data
}

async function loadUserGrowth() {
  const response = await fetch(`/api/admin/analytics/user-growth?range=${timeRange.value}`)
  const data = await response.json()
  
  if (data.length > 0) {
    userGrowth.value.timelineData = data.map(item => item.new_users)
    userGrowth.value.timelineLabels = data.map(item => item.period)
    userGrowth.value.dailyNewUsers = data[data.length - 1]?.new_users || 0
    userGrowth.value.weeklyNewUsers = data.slice(-7).reduce((sum, item) => sum + item.new_users, 0)
    userGrowth.value.totalUsers = data.reduce((sum, item) => sum + item.new_users, 0)
    userGrowth.value.monthlyGrowthRate = platformOverview.value.userGrowth
  }
}

async function loadSubmissionActivity() {
  const response = await fetch(`/api/admin/analytics/submission-activity?range=${timeRange.value}`)
  const data = await response.json()
  
  submissionActivity.value.dailyStats = data.dailyStats
  submissionActivity.value.languageUsage = data.languageUsage
  
  if (data.dailyStats.length > 0) {
    const latest = data.dailyStats[data.dailyStats.length - 1]
    submissionActivity.value.totalSubmissions = latest.total_submissions
    submissionActivity.value.passedSubmissions = latest.passed_submissions
    submissionActivity.value.failedSubmissions = latest.failed_submissions
    submissionActivity.value.successRate = (latest.passed_submissions / latest.total_submissions * 100).toFixed(1)
    submissionActivity.value.dailySubmissions = data.dailyStats.map(item => item.total_submissions)
    submissionActivity.value.dailyLabels = data.dailyStats.map(item => item.period)
  }
}

async function loadLearningPaths() {
  const response = await fetch('/api/admin/analytics/learning-paths')
  const data = await response.json()
  learningPathEngagement.value.topPaths = data
}

async function loadChallengeDifficulty() {
  const response = await fetch('/api/admin/analytics/challenge-difficulty')
  const data = await response.json()
  
  challengeDifficulty.value.challenges = data.challenges
  challengeDifficulty.value.avgPassRate = data.overall.avg_pass_rate
  challengeDifficulty.value.avgAttempts = data.overall.avg_attempts
  
  // Find most failed and most completed
  if (data.challenges.length > 0) {
    const sortedByPassRate = [...data.challenges].sort((a, b) => a.pass_rate - b.pass_rate)
    challengeDifficulty.value.mostFailed = sortedByPassRate[0]?.title || 'N/A'
    challengeDifficulty.value.mostCompleted = sortedByPassRate[sortedByPassRate.length - 1]?.title || 'N/A'
  }
}

async function loadLessonPerformance() {
  const response = await fetch('/api/admin/analytics/lesson-performance')
  const data = await response.json()
  lessonPerformance.value.topLessons = data
}

async function loadSessionStats() {
  const response = await fetch('/api/admin/analytics/session-stats')
  const data = await response.json()
  sessionAnalytics.value = data
}

async function loadTopPerformers() {
  const response = await fetch('/api/admin/analytics/top-performers?limit=5')
  const data = await response.json()
  leaderboard.value.topPerformers = data
}

async function loadRecentActivity() {
  const response = await fetch('/api/admin/analytics/recent-activity?limit=5')
  const data = await response.json()
  recentActivity.value.activities = data
}

// Chart switching functions
function switchUserGrowthChart(type) {
  userGrowthChartType.value = type
  nextTick(() => {
    createUserGrowthChart()
  })
}

function switchSubmissionChart(type) {
  submissionChartType.value = type
  nextTick(() => {
    createSubmissionChart()
  })
}

function switchLearningPathChart(type) {
  learningPathChartType.value = type
  nextTick(() => {
    createLearningPathChart()
  })
}

function switchSessionChart(type) {
  sessionChartType.value = type
  nextTick(() => {
    createSessionChart()
  })
}

function switchChallengeChart(type) {
  challengeChartType.value = type
  nextTick(() => {
    createChallengeChart()
  })
}

function switchLessonChart(type) {
  lessonChartType.value = type
  nextTick(() => {
    createLessonChart()
  })
}

// Chart creation functions using real data
function createUserGrowthChart() {
  if (userGrowthChartInstance) {
    userGrowthChartInstance.destroy()
  }

  const ctx = userGrowthChart.value.getContext('2d')
  
  if (userGrowthChartType.value === 'line') {
    userGrowthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: userGrowth.value.timelineLabels,
        datasets: [{
          label: 'New Users',
          data: userGrowth.value.timelineData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } else {
    userGrowthChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: userGrowth.value.timelineLabels.slice(-6),
        datasets: [{
          label: 'New Users',
          data: userGrowth.value.timelineData.slice(-6),
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

function createSubmissionChart() {
  if (submissionChartInstance) {
    submissionChartInstance.destroy()
  }

  const ctx = submissionChart.value.getContext('2d')
  
  if (submissionChartType.value === 'line') {
    submissionChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: submissionActivity.value.dailyLabels,
        datasets: [{
          label: 'Submissions',
          data: submissionActivity.value.dailySubmissions,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } else if (submissionChartType.value === 'bar') {
    submissionChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Passed', 'Failed'],
        datasets: [{
          data: [submissionActivity.value.passedSubmissions, submissionActivity.value.failedSubmissions],
          backgroundColor: ['#10b981', '#ef4444'],
          borderColor: ['#059669', '#dc2626'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } else {
    submissionChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: submissionActivity.value.languageUsage.map(l => l.language),
        datasets: [{
          data: submissionActivity.value.languageUsage.map(l => l.percentage),
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
}

function createLearningPathChart() {
  if (learningPathChartInstance) {
    learningPathChartInstance.destroy()
  }

  const ctx = learningPathChart.value.getContext('2d')
  const paths = learningPathEngagement.value.topPaths.slice(0, 5)
  
  if (learningPathChartType.value === 'bar') {
    learningPathChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: paths.map(p => p.language_name),
        datasets: [{
          label: 'Active Users',
          data: paths.map(p => p.active_users),
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } else {
    learningPathChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: paths.map(p => p.language_name),
        datasets: [{
          data: paths.map(p => p.success_rate),
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
}

function createChallengeChart() {
  if (challengeChartInstance) {
    challengeChartInstance.destroy()
  }

  const ctx = challengeChart.value.getContext('2d')
  const challenges = challengeDifficulty.value.challenges.slice(0, 5)
  
  if (challengeChartType.value === 'bar') {
    challengeChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: challenges.map(c => c.title),
        datasets: [{
          label: 'Pass Rate (%)',
          data: challenges.map(c => c.pass_rate),
          backgroundColor: '#ef4444',
          borderColor: '#dc2626',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })
  } else {
    challengeChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: challenges.map(c => c.title),
        datasets: [{
          label: 'Avg Attempts',
          data: challenges.map(c => c.total_attempts),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

function createSessionChart() {
  if (sessionChartInstance) {
    sessionChartInstance.destroy()
  }

  const ctx = sessionChart.value.getContext('2d')
  
  if (sessionChartType.value === 'bar') {
    const dailyData = sessionAnalytics.value.dailyActivity.slice(-7)
    sessionChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dailyData.map(d => d.date),
        datasets: [{
          label: 'Unique Users',
          data: dailyData.map(d => d.unique_users),
          backgroundColor: '#f59e0b',
          borderColor: '#d97706',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } else {
    const peakData = sessionAnalytics.value.peakHours
    sessionChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: peakData.map(p => `${p.hour}:00`),
        datasets: [{
          label: 'Submissions',
          data: peakData.map(p => p.submissions),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

function createLessonChart() {
  if (lessonChartInstance) {
    lessonChartInstance.destroy()
  }

  const ctx = lessonChart.value.getContext('2d')
  const lessons = lessonPerformance.value.topLessons
  
  lessonChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lessons.map(l => l.title.split(' ').slice(0, 2).join(' ')),
      datasets: [{
        label: 'Order Index',
        data: lessons.map(l => l.order_index),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

// Utility functions
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString()
}

function createAllCharts() {
  createUserGrowthChart()
  createSubmissionChart()
  createLearningPathChart()
  createChallengeChart()
  createSessionChart()
  createLessonChart()
}

function exportReport() {
  console.log('Exporting analytics report...')
  alert('Export functionality would generate a comprehensive report here!')
}

// Lifecycle
onMounted(() => {
  loadAllAnalytics()
})

onUnmounted(() => {
  // Clean up all chart instances
  const charts = [
    userGrowthChartInstance,
    submissionChartInstance,
    learningPathChartInstance,
    sessionChartInstance,
    challengeChartInstance,
    lessonChartInstance
  ]
  
  charts.forEach(chart => {
    if (chart) {
      chart.destroy()
    }
  })
})
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button, select {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hover effects for cards */
.bg-white {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation for number counters */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-2xl {
  animation: countUp 0.6s ease-out;
}

/* Gradient backgrounds for metric cards */
.bg-blue-50 {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
}

.bg-green-50 {
  background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%);
}

.bg-purple-50 {
  background: linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%);
}

.bg-orange-50 {
  background: linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%);
}

.bg-indigo-50 {
  background: linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%);
}

.bg-red-50 {
  background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%);
}
</style>