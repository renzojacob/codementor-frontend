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

    <!-- Platform Overview KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
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
        <p class="text-xs text-green-600 mt-2">+{{ platformOverview.userGrowth }}% this month</p>
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
            <p class="text-sm font-medium text-gray-600">Lessons Completed</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.lessonsCompleted.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">+{{ platformOverview.completionGrowth }}% growth</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">AI Interactions</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.aiInteractions.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-indigo-100 rounded-lg">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ platformOverview.avgAiResponseTime }}s avg response</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Enrollments</p>
            <p class="text-2xl font-bold text-gray-900">{{ platformOverview.totalEnrollments.toLocaleString() }}</p>
          </div>
          <div class="p-3 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">{{ platformOverview.enrollmentCompletionRate }}% completion rate</p>
      </div>
    </div>

    <!-- Analytics Sections Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
            <button @click="switchUserGrowthChart('doughnut')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', userGrowthChartType === 'doughnut' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100']">
              Status
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
            <div class="text-2xl font-bold text-orange-700">{{ userGrowth.returningUsers }}</div>
            <div class="text-sm text-orange-600">Returning Users</div>
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
              Enrollment
            </button>
            <button @click="switchLearningPathChart('doughnut')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', learningPathChartType === 'doughnut' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100']">
              Completion
            </button>
            <button @click="switchLearningPathChart('radar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', learningPathChartType === 'radar' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100']">
              Engagement
            </button>
          </div>
        </div>

        <div class="h-80 mb-6">
          <canvas ref="learningPathChart"></canvas>
        </div>

        <!-- Top Learning Paths -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-gray-700">Top Learning Paths</h4>
          <div v-for="path in learningPathEngagement.topPaths" :key="path.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ path.name }}</div>
              <div class="text-xs text-gray-500">{{ path.enrollments }} enrollments • {{ path.completionRate }}% completion</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ path.dropOffRate }}%</div>
              <div class="text-xs text-gray-500">Drop-off</div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Usage Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">AI Usage Analytics</h3>
          <div class="flex gap-2">
            <button @click="switchAiChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', aiChartType === 'line' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100']">
              Volume
            </button>
            <button @click="switchAiChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', aiChartType === 'bar' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100']">
              Topics
            </button>
            <button @click="switchAiChart('doughnut')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', aiChartType === 'doughnut' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100']">
              Hours
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="text-center p-4 bg-indigo-50 rounded-lg">
            <div class="text-2xl font-bold text-indigo-700">{{ aiUsage.totalInteractions }}</div>
            <div class="text-sm text-indigo-600">Total Interactions</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-700">{{ aiUsage.avgUsagePerUser }}</div>
            <div class="text-sm text-purple-600">Avg per User</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-700">{{ aiUsage.avgResponseTime }}s</div>
            <div class="text-sm text-blue-600">Avg Response Time</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-700">{{ aiUsage.dailyQueries }}</div>
            <div class="text-sm text-green-600">Daily Queries</div>
          </div>
        </div>

        <div class="h-80">
          <canvas ref="aiUsageChart"></canvas>
        </div>
      </div>

      <!-- Session & Login Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Session & Login Analytics</h3>
          <div class="flex gap-2">
            <button @click="switchSessionChart('bar')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', sessionChartType === 'bar' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100']">
              Hours
            </button>
            <button @click="switchSessionChart('line')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', sessionChartType === 'line' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100']">
              Daily
            </button>
            <button @click="switchSessionChart('pie')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', sessionChartType === 'pie' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100']">
              User Types
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="text-center p-4 bg-orange-50 rounded-lg">
            <div class="text-2xl font-bold text-orange-700">{{ sessionAnalytics.retentionRate }}%</div>
            <div class="text-sm text-orange-600">Retention Rate</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-700">{{ sessionAnalytics.avgSessionDuration }}</div>
            <div class="text-sm text-blue-600">Avg Session</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-700">{{ sessionAnalytics.dailyLogins }}</div>
            <div class="text-sm text-green-600">Daily Logins</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-700">{{ sessionAnalytics.returningVsNew }}%</div>
            <div class="text-sm text-purple-600">Returning Users</div>
          </div>
        </div>

        <div class="h-80">
          <canvas ref="sessionChart"></canvas>
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
            <button @click="switchChallengeChart('scatter')" 
              :class="['px-3 py-1 rounded-lg text-sm transition', challengeChartType === 'scatter' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100']">
              Difficulty
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
    </div>

    <!-- Additional Analytics Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <!-- Lesson Performance -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Lesson Performance</h3>
        <div class="h-64 mb-4">
          <canvas ref="lessonChart"></canvas>
        </div>
        <div class="space-y-4">
          <div v-for="lesson in lessonPerformance.topLessons" :key="lesson.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ lesson.title }}</div>
              <div class="text-xs text-gray-500">{{ lesson.views }} views • {{ lesson.completionRate }}% completion</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ lesson.avgTimeSpent }}</div>
              <div class="text-xs text-gray-500">avg time</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Moderation -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Moderation</h3>
        <div class="h-64 mb-4">
          <canvas ref="moderationChart"></canvas>
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-red-50 rounded-lg">
              <div class="text-lg font-bold text-red-700">{{ accountModeration.suspendedCount }}</div>
              <div class="text-xs text-red-600">Suspended</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-lg font-bold text-gray-700">{{ accountModeration.bannedCount }}</div>
              <div class="text-xs text-gray-600">Banned</div>
            </div>
          </div>
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700">Top Moderation Reasons</h4>
            <div v-for="reason in accountModeration.topReasons" :key="reason.reason" 
                 class="flex justify-between text-sm">
              <span class="text-gray-600">{{ reason.reason }}</span>
              <span class="text-gray-500">{{ reason.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Leaderboard Analytics -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
        <div class="h-64 mb-4">
          <canvas ref="leaderboardChart"></canvas>
        </div>
        <div class="space-y-3">
          <div v-for="(user, index) in leaderboard.topPerformers" :key="user.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                {{ index + 1 }}
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                <div class="text-xs text-gray-500">{{ user.completedLessons }} lessons</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-green-700">{{ user.successRate }}%</div>
              <div class="text-xs text-gray-500">success rate</div>
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
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
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
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
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
const aiUsageChart = ref(null)
const sessionChart = ref(null)
const challengeChart = ref(null)
const lessonChart = ref(null)
const moderationChart = ref(null)
const leaderboardChart = ref(null)

// Chart instances
let userGrowthChartInstance = null
let submissionChartInstance = null
let learningPathChartInstance = null
let aiUsageChartInstance = null
let sessionChartInstance = null
let challengeChartInstance = null
let lessonChartInstance = null
let moderationChartInstance = null
let leaderboardChartInstance = null

// Time range selector
const timeRange = ref('30d')

// Chart type selectors
const userGrowthChartType = ref('line')
const submissionChartType = ref('line')
const learningPathChartType = ref('bar')
const aiChartType = ref('line')
const sessionChartType = ref('bar')
const challengeChartType = ref('bar')

// Analytics data
const platformOverview = ref({
  totalUsers: 15432,
  activeSessions: 843,
  totalSubmissions: 89234,
  submissionSuccessRate: 78,
  lessonsCompleted: 45678,
  completionGrowth: 12,
  aiInteractions: 23456,
  avgAiResponseTime: 2.3,
  totalEnrollments: 34567,
  enrollmentCompletionRate: 65,
  userGrowth: 8.2
})

const userGrowth = ref({
  dailyNewUsers: 42,
  weeklyNewUsers: 294,
  monthlyGrowthRate: 8.2,
  returningUsers: 1234,
  statusDistribution: [
    { status: 'active', count: 12000, percentage: 78 },
    { status: 'suspended', count: 150, percentage: 1 },
    { status: 'banned', count: 82, percentage: 0.5 },
    { status: 'pending', count: 3200, percentage: 20.5 }
  ],
  timelineData: [120, 135, 148, 162, 178, 195, 210, 228, 245, 260, 275, 290]
})

const submissionActivity = ref({
  totalSubmissions: 89234,
  passedSubmissions: 69602,
  failedSubmissions: 19632,
  successRate: 78,
  languageUsage: [
    { language: 'JavaScript', percentage: 45 },
    { language: 'Python', percentage: 30 },
    { language: 'Java', percentage: 15 },
    { language: 'C++', percentage: 8 },
    { language: 'Other', percentage: 2 }
  ],
  dailySubmissions: [234, 287, 265, 312, 298, 345, 321]
})

const learningPathEngagement = ref({
  topPaths: [
    { id: 1, name: 'JavaScript Fundamentals', enrollments: 5432, completionRate: 72, dropOffRate: 28 },
    { id: 2, name: 'React Development', enrollments: 4321, completionRate: 65, dropOffRate: 35 },
    { id: 3, name: 'Python for Beginners', enrollments: 3987, completionRate: 81, dropOffRate: 19 },
    { id: 4, name: 'Data Structures', enrollments: 2876, completionRate: 58, dropOffRate: 42 }
  ],
  completionRates: [72, 65, 81, 58],
  dropOffPoints: ['Lesson 3', 'Lesson 7', 'Lesson 5', 'Lesson 9']
})

const aiUsage = ref({
  totalInteractions: 23456,
  avgUsagePerUser: 15.2,
  avgResponseTime: 2.3,
  dailyQueries: 342,
  topTopics: [
    { topic: 'Code Debugging', count: 5432 },
    { topic: 'Algorithm Help', count: 4321 },
    { topic: 'Syntax Questions', count: 3987 },
    { topic: 'Best Practices', count: 2876 }
  ],
  hourlyUsage: [12, 8, 5, 3, 2, 4, 15, 45, 67, 89, 78, 65, 72, 68, 63, 58, 62, 78, 85, 73, 52, 38, 25, 18]
})

const sessionAnalytics = ref({
  retentionRate: 72,
  avgSessionDuration: '24m',
  dailyLogins: 2843,
  returningVsNew: 68,
  peakHours: [
    { hour: '09:00', logins: 234 },
    { hour: '14:00', logins: 432 },
    { hour: '19:00', logins: 387 }
  ]
})

const challengeDifficulty = ref({
  avgPassRate: 65,
  avgAttempts: 2.3,
  mostFailed: 'Binary Search',
  mostCompleted: 'Hello World',
  challenges: [
    { name: 'Two Sum', passRate: 85, attempts: 1.8 },
    { name: 'Palindrome', passRate: 72, attempts: 2.1 },
    { name: 'Binary Search', passRate: 45, attempts: 3.4 },
    { name: 'Sorting', passRate: 68, attempts: 2.5 },
    { name: 'Graph Traversal', passRate: 52, attempts: 3.1 }
  ]
})

const lessonPerformance = ref({
  topLessons: [
    { id: 1, title: 'Introduction to Variables', views: 5432, completionRate: 92, avgTimeSpent: '8m' },
    { id: 2, title: 'Functions and Scope', views: 4321, completionRate: 78, avgTimeSpent: '15m' },
    { id: 3, title: 'Array Methods', views: 3987, completionRate: 85, avgTimeSpent: '12m' },
    { id: 4, title: 'Async Programming', views: 2876, completionRate: 65, avgTimeSpent: '22m' }
  ]
})

const accountModeration = ref({
  suspendedCount: 42,
  bannedCount: 23,
  topReasons: [
    { reason: 'Inappropriate Content', count: 15 },
    { reason: 'Spam', count: 12 },
    { reason: 'Multiple Accounts', count: 8 },
    { reason: 'Code Plagiarism', count: 6 }
  ]
})

const leaderboard = ref({
  topPerformers: [
    { id: 1, name: 'Alex Johnson', completedLessons: 156, successRate: 94 },
    { id: 2, name: 'Sarah Chen', completedLessons: 142, successRate: 92 },
    { id: 3, name: 'Mike Rodriguez', completedLessons: 138, successRate: 89 },
    { id: 4, name: 'Emily Davis', completedLessons: 127, successRate: 91 }
  ]
})

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

function switchAiChart(type) {
  aiChartType.value = type
  nextTick(() => {
    createAiUsageChart()
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

// Chart creation functions
function createUserGrowthChart() {
  if (userGrowthChartInstance) {
    userGrowthChartInstance.destroy()
  }

  const ctx = userGrowthChart.value.getContext('2d')
  
  if (userGrowthChartType.value === 'line') {
    userGrowthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
          },
          title: {
            display: true,
            text: 'Monthly User Growth'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  } else if (userGrowthChartType.value === 'bar') {
    userGrowthChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Users',
          data: [320, 450, 380, 520, 480, 610],
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
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  } else {
    userGrowthChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: userGrowth.value.statusDistribution.map(s => s.status),
        datasets: [{
          data: userGrowth.value.statusDistribution.map(s => s.count),
          backgroundColor: [
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#6b7280'
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

function createSubmissionChart() {
  if (submissionChartInstance) {
    submissionChartInstance.destroy()
  }

  const ctx = submissionChart.value.getContext('2d')
  
  if (submissionChartType.value === 'line') {
    submissionChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
  const pathNames = learningPathEngagement.value.topPaths.map(p => p.name)
  
  if (learningPathChartType.value === 'bar') {
    learningPathChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: pathNames,
        datasets: [{
          label: 'Enrollments',
          data: learningPathEngagement.value.topPaths.map(p => p.enrollments),
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
  } else if (learningPathChartType.value === 'doughnut') {
    learningPathChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: pathNames,
        datasets: [{
          data: learningPathEngagement.value.topPaths.map(p => p.completionRate),
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444'
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
  } else {
    learningPathChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Enrollment', 'Completion', 'Engagement', 'Retention', 'Satisfaction'],
        datasets: [{
          label: 'JavaScript Fundamentals',
          data: [85, 72, 78, 65, 80],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          borderWidth: 2
        }, {
          label: 'React Development',
          data: [78, 65, 72, 58, 70],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10b981',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })
  }
}

function createAiUsageChart() {
  if (aiUsageChartInstance) {
    aiUsageChartInstance.destroy()
  }

  const ctx = aiUsageChart.value.getContext('2d')
  
  if (aiChartType.value === 'line') {
    aiUsageChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'AI Interactions',
          data: [342, 398, 421, 387, 456, 312, 289],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
  } else if (aiChartType.value === 'bar') {
    aiUsageChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: aiUsage.value.topTopics.map(t => t.topic),
        datasets: [{
          label: 'Requests',
          data: aiUsage.value.topTopics.map(t => t.count),
          backgroundColor: '#6366f1',
          borderColor: '#4f46e5',
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
    aiUsageChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Morning (6-12)', 'Afternoon (12-18)', 'Evening (18-24)', 'Night (0-6)'],
        datasets: [{
          data: [35, 40, 20, 5],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#6b7280'
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

function createSessionChart() {
  if (sessionChartInstance) {
    sessionChartInstance.destroy()
  }

  const ctx = sessionChart.value.getContext('2d')
  
  if (sessionChartType.value === 'bar') {
    sessionChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
        datasets: [{
          label: 'Logins',
          data: [45, 234, 187, 156, 387, 298, 67],
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
  } else if (sessionChartType.value === 'line') {
    sessionChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Logins',
          data: [2843, 2987, 3124, 2876, 3245, 2987, 2765],
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
  } else {
    sessionChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Returning Users', 'New Users'],
        datasets: [{
          data: [68, 32],
          backgroundColor: ['#3b82f6', '#10b981'],
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
  
  if (challengeChartType.value === 'bar') {
    challengeChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: challengeDifficulty.value.challenges.map(c => c.name),
        datasets: [{
          label: 'Pass Rate (%)',
          data: challengeDifficulty.value.challenges.map(c => c.passRate),
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
  } else if (challengeChartType.value === 'line') {
    challengeChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: challengeDifficulty.value.challenges.map(c => c.name),
        datasets: [{
          label: 'Avg Attempts',
          data: challengeDifficulty.value.challenges.map(c => c.attempts),
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
  } else {
    challengeChartInstance = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Challenges',
          data: challengeDifficulty.value.challenges.map(c => ({
            x: c.attempts,
            y: c.passRate
          })),
          backgroundColor: '#ef4444',
          borderColor: '#dc2626',
          borderWidth: 1,
          pointRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Average Attempts'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Pass Rate (%)'
            },
            beginAtZero: true,
            max: 100
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
  lessonChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lessonPerformance.value.topLessons.map(l => l.title.split(' ').slice(0, 2).join(' ')),
      datasets: [{
        label: 'Completion Rate (%)',
        data: lessonPerformance.value.topLessons.map(l => l.completionRate),
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
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  })
}

function createModerationChart() {
  if (moderationChartInstance) {
    moderationChartInstance.destroy()
  }

  const ctx = moderationChart.value.getContext('2d')
  moderationChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: accountModeration.value.topReasons.map(r => r.reason),
      datasets: [{
        data: accountModeration.value.topReasons.map(r => r.count),
        backgroundColor: [
          '#ef4444',
          '#f59e0b',
          '#3b82f6',
          '#10b981'
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

function createLeaderboardChart() {
  if (leaderboardChartInstance) {
    leaderboardChartInstance.destroy()
  }

  const ctx = leaderboardChart.value.getContext('2d')
  leaderboardChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Lessons Completed', 'Success Rate', 'Consistency', 'Speed', 'Helpfulness'],
      datasets: [{
        label: 'Top Performer',
        data: [95, 94, 90, 85, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2
      }, {
        label: 'Average User',
        data: [65, 72, 68, 60, 55],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  })
}

// API functions
async function loadAllAnalytics() {
  try {
    console.log('Loading analytics for time range:', timeRange.value)
    await new Promise(resolve => setTimeout(resolve, 500))
    // Recreate charts with new data
    createAllCharts()
  } catch (error) {
    console.error('Failed to load analytics:', error)
  }
}

function createAllCharts() {
  createUserGrowthChart()
  createSubmissionChart()
  createLearningPathChart()
  createAiUsageChart()
  createSessionChart()
  createChallengeChart()
  createLessonChart()
  createModerationChart()
  createLeaderboardChart()
}

function exportReport() {
  // In a real app, this would generate and download a PDF/Excel report
  console.log('Exporting analytics report...')
  alert('Export functionality would generate a comprehensive report here!')
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    createAllCharts()
  })
})

onUnmounted(() => {
  // Clean up all chart instances
  const charts = [
    userGrowthChartInstance,
    submissionChartInstance,
    learningPathChartInstance,
    aiUsageChartInstance,
    sessionChartInstance,
    challengeChartInstance,
    lessonChartInstance,
    moderationChartInstance,
    leaderboardChartInstance
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