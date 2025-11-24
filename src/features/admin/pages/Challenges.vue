<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <i class="fas fa-spinner fa-spin text-blue-600 text-2xl"></i>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
          <span class="text-red-800">{{ error }}</span>
          <button @click="error = ''" class="ml-auto text-red-600 hover:text-red-800">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <i class="fas fa-check-circle text-green-400 mr-2"></i>
          <span class="text-green-800">{{ successMessage }}</span>
          <button @click="successMessage = ''" class="ml-auto text-green-600 hover:text-green-800">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Challenges Management -->
      <div v-if="activeView === 'challenges'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Challenges Management</h1>
            <p class="text-gray-600 mt-2">Manage all coding challenges on the platform</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('challenges')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <i class="fas fa-file-export"></i>
              Export
            </button>
            <button @click="showChallengeForm()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <i class="fas fa-plus"></i>
              Create Challenge
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('challenges')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'challenges' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Challenges
            </button>
            <button 
              @click="setActiveView('test-cases')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'test-cases' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Test Cases
            </button>
            <button 
              @click="setActiveView('submissions')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'submissions' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Submissions
            </button>
            <button 
              @click="setActiveView('analytics')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Analytics
            </button>
          </nav>
        </div>

        <!-- Challenges Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="challenge in challenges" :key="challenge.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ challenge.title }}</h3>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              ]">
                {{ challenge.difficulty }}
              </span>
            </div>

            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ challenge.description }}</p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Test Cases</span>
                <span class="font-medium">{{ challenge.total_test_cases || 0 }}</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Submissions</span>
                <span class="font-medium">{{ challenge.total_submissions || 0 }}</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Success Rate</span>
                <span class="font-medium">
                  {{ calculateSuccessRate(challenge) }}%
                </span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ formatDate(challenge.created_at) }}</span>
              <div class="flex gap-2">
                <button @click="editChallenge(challenge)" class="p-2 text-gray-400 hover:text-blue-600 transition"
                  title="Edit Challenge">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="handleDeleteChallenge(challenge)" class="p-2 text-gray-400 hover:text-red-600 transition"
                  title="Delete Challenge">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Cases Management -->
      <div v-else-if="activeView === 'test-cases'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Test Cases Management</h1>
            <p class="text-gray-600 mt-2">Manage test cases for coding challenges</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('test-cases')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <i class="fas fa-file-export"></i>
              Export
            </button>
            <button @click="showTestCaseForm()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <i class="fas fa-plus"></i>
              Add Test Case
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('challenges')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'challenges' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Challenges
            </button>
            <button 
              @click="setActiveView('test-cases')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'test-cases' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Test Cases
            </button>
            <button 
              @click="setActiveView('submissions')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'submissions' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Submissions
            </button>
            <button 
              @click="setActiveView('analytics')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Analytics
            </button>
          </nav>
        </div>

        <!-- Challenge Selection -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Test Cases</h2>
              <p class="text-gray-600 mt-1">Select a challenge to manage its test cases</p>
            </div>
            <select v-model="selectedChallengeId" @change="loadTestCases"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Challenge</option>
              <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
            </select>
          </div>
        </div>

        <!-- Test Cases Table -->
        <div v-if="selectedChallengeId" class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-900">Test Cases for {{ selectedChallenge?.title }}</h3>
              <div class="flex items-center gap-3">
                <button @click="showBulkUpload = true" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
                  <i class="fas fa-file-upload"></i>
                  Bulk Upload
                </button>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Output</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="testCase in currentTestCases" :key="testCase.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div class="flex items-center gap-2">
                        <button @click="moveTestCaseUp(testCase)" class="text-gray-400 hover:text-gray-600">
                          <i class="fas fa-arrow-up"></i>
                        </button>
                        <span>{{ testCase.order_index }}</span>
                        <button @click="moveTestCaseDown(testCase)" class="text-gray-400 hover:text-gray-600">
                          <i class="fas fa-arrow-down"></i>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 font-mono max-w-xs truncate">
                      {{ testCase.input }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 font-mono max-w-xs truncate">
                      {{ testCase.expected_output }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                        testCase.is_example ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      ]">
                        {{ testCase.is_example ? 'Example' : 'Test Case' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <button @click="editTestCase(testCase)" class="text-blue-600 hover:text-blue-900 transition">
                          <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button @click="deleteTestCase(testCase)" class="text-red-600 hover:text-red-900 transition">
                          <i class="fas fa-trash mr-1"></i>Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Submissions Management -->
      <div v-else-if="activeView === 'submissions'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Submissions Management</h1>
            <p class="text-gray-600 mt-2">View and analyze user submissions</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('submissions')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <i class="fas fa-file-export"></i>
              Export
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('challenges')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'challenges' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Challenges
            </button>
            <button 
              @click="setActiveView('test-cases')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'test-cases' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Test Cases
            </button>
            <button 
              @click="setActiveView('submissions')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'submissions' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Submissions
            </button>
            <button 
              @click="setActiveView('analytics')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Analytics
            </button>
          </nav>
        </div>

        <!-- Submissions Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-900">All Submissions</h2>
              <div class="flex items-center gap-3">
                <select v-model="submissionFilters.challenge_id" @change="loadSubmissions"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Challenges</option>
                  <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
                </select>
                
                <select v-model="submissionFilters.status" @change="loadSubmissions"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Status</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>
                
                <select v-model="submissionFilters.language" @change="loadSubmissions"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Languages</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execution Time</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="submission in submissions" :key="submission.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ submission.username }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ submission.challenge_title }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                        submission.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      ]">
                        {{ submission.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ submission.language }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ submission.execution_time || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(submission.submitted_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="viewSubmission(submission)" class="text-blue-600 hover:text-blue-900 transition">
                        <i class="fas fa-eye mr-1"></i>View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Overview -->
      <div v-else-if="activeView === 'analytics'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Challenge Analytics</h1>
            <p class="text-gray-600 mt-2">Analytics and insights about challenges and submissions</p>
          </div>
          <button @click="handleExport('analytics')"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <i class="fas fa-file-export"></i>
            Export Analytics
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('challenges')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'challenges' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Challenges
            </button>
            <button 
              @click="setActiveView('test-cases')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'test-cases' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Test Cases
            </button>
            <button 
              @click="setActiveView('submissions')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'submissions' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Submissions
            </button>
            <button 
              @click="setActiveView('analytics')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Analytics
            </button>
          </nav>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-blue-100 rounded-lg">
                <i class="fas fa-code text-blue-600 text-xl"></i>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.overview?.total_challenges || 0 }}</div>
                <div class="text-sm text-gray-500">Challenges</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-green-100 rounded-lg">
                <i class="fas fa-file-code text-green-600 text-xl"></i>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.overview?.total_submissions || 0 }}</div>
                <div class="text-sm text-gray-500">Submissions</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-purple-100 rounded-lg">
                <i class="fas fa-check-circle text-purple-600 text-xl"></i>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.overview?.total_solved || 0 }}</div>
                <div class="text-sm text-gray-500">Solved</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-orange-100 rounded-lg">
                <i class="fas fa-users text-orange-600 text-xl"></i>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.overview?.total_creators || 0 }}</div>
                <div class="text-sm text-gray-500">Creators</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Difficulty Distribution -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution</h3>
            <div class="space-y-4">
              <div v-for="diff in analytics.difficulty_distribution" :key="diff.difficulty"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span :class="[
                    'w-3 h-3 rounded-full',
                    diff.difficulty === 'easy' ? 'bg-green-500' :
                    diff.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  ]"></span>
                  <span class="font-medium text-gray-700 capitalize">{{ diff.difficulty }}</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-gray-900">{{ diff.count }} challenges</div>
                  <div class="text-sm text-gray-500">{{ diff.avg_solved || 0 }} avg. solved</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Popular Challenges -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Most Popular Challenges</h3>
            <div class="space-y-3">
              <div v-for="challenge in analytics.popular_challenges" :key="challenge.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium text-gray-700 truncate">{{ challenge.title }}</span>
                <div class="text-right">
                  <div class="font-semibold text-gray-900">{{ challenge.total_submissions }} submissions</div>
                  <div class="text-sm text-gray-500">{{ challenge.success_rate || 0 }}% success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Form Modal -->
      <div v-if="showChallengeModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                {{ currentChallenge?.id ? 'Edit Challenge' : 'Create New Challenge' }}
              </h2>
              <button @click="closeChallengeModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-times text-gray-500"></i>
              </button>
            </div>

            <form @submit.prevent="saveChallenge" class="space-y-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input v-model="currentChallenge.title" type="text" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Two Sum Problem">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <div class="flex gap-2">
                    <input v-model="currentChallenge.slug" type="text" required
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="two-sum-problem">
                    <button type="button" @click="generateSlug" class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Auto-generate
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea v-model="currentChallenge.description" rows="4" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the challenge..."></textarea>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                  <select v-model="currentChallenge.difficulty" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">XP Reward</label>
                  <input v-model="currentChallenge.xp_reward" type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select v-model="currentChallenge.category_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Time Limit</label>
                  <input v-model="currentChallenge.time_limit" type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1s">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Memory Limit</label>
                  <input v-model="currentChallenge.memory_limit" type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="64MB">
                </div>
              </div>

              <div>
                <label class="flex items-center">
                  <input v-model="currentChallenge.is_published" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-700">Published</span>
                </label>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" @click="closeChallengeModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" :disabled="loading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-check"></i>
                  {{ currentChallenge?.id ? 'Update Challenge' : 'Create Challenge' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Test Case Form Modal -->
      <div v-if="showTestCaseModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                {{ currentTestCase?.id ? 'Edit Test Case' : 'Add New Test Case' }}
              </h2>
              <button @click="closeTestCaseModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-times text-gray-500"></i>
              </button>
            </div>

            <form @submit.prevent="saveTestCase" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Challenge *</label>
                  <select v-model="currentTestCase.challenge_id" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a challenge</option>
                    <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Input *</label>
                  <textarea v-model="currentTestCase.input" rows="3" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Test input data..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output *</label>
                  <textarea v-model="currentTestCase.expected_output" rows="3" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Expected output..."></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                    <input v-model="currentTestCase.order_index" type="number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input v-model="currentTestCase.is_example" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                      <span class="ml-2 text-sm text-gray-700">Example Test Case</span>
                    </label>
                    <label class="flex items-center">
                      <input v-model="currentTestCase.is_visible" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                      <span class="ml-2 text-sm text-gray-700">Visible to Users</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" @click="closeTestCaseModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" :disabled="loading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-check"></i>
                  {{ currentTestCase?.id ? 'Update Test Case' : 'Create Test Case' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- View Submission Modal -->
      <div v-if="showSubmissionModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">Submission Details</h2>
              <button @click="closeSubmissionModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-times text-gray-500"></i>
              </button>
            </div>

            <div class="space-y-6">
              <!-- Submission Info -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="text-center">
                  <div class="text-sm text-gray-600">User</div>
                  <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.username }}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600">Challenge</div>
                  <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.challenge_title }}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600">Language</div>
                  <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.language }}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600">Status</div>
                  <div :class="['text-lg font-semibold', currentSubmission.status === 'Passed' ? 'text-green-600' : 'text-red-600']">
                    {{ currentSubmission.status }}
                  </div>
                </div>
              </div>

              <!-- Code -->
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Submitted Code</h4>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ currentSubmission.code }}</code></pre>
              </div>
            </div>

            <div class="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button @click="closeSubmissionModal" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// API Base URL - adjust according to your backend
const API_BASE = 'https://codementor-backend-izws.onrender.com/admin' // Adjust this to match your PHP backend

// Component State
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const activeView = ref('challenges')
const showChallengeModal = ref(false)
const showTestCaseModal = ref(false)
const showSubmissionModal = ref(false)
const selectedChallengeId = ref('')

// Data stores
const challenges = ref([])
const testCases = ref([])
const submissions = ref([])
const categories = ref([])
const analytics = ref({})

// Current editing items
const currentChallenge = ref(createEmptyChallenge())
const currentTestCase = ref(createEmptyTestCase())
const currentSubmission = ref({})

// Filters
const submissionFilters = ref({
  challenge_id: '',
  status: '',
  language: ''
})

// Utility functions
function createEmptyChallenge() {
  return {
    id: null,
    title: '',
    slug: '',
    description: '',
    difficulty: 'easy',
    xp_reward: 10,
    time_limit: '1s',
    memory_limit: '64MB',
    category_id: '',
    is_published: true
  }
}

function createEmptyTestCase() {
  return {
    id: null,
    challenge_id: '',
    input: '',
    expected_output: '',
    is_example: false,
    is_visible: true,
    order_index: 0
  }
}

function calculateSuccessRate(challenge) {
  if (!challenge.total_submissions || challenge.total_submissions === 0) return 0
  const successRate = (challenge.accepted_submissions / challenge.total_submissions) * 100
  return Math.round(successRate)
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function generateSlug() {
  if (currentChallenge.value.title) {
    currentChallenge.value.slug = currentChallenge.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
}

// API Functions
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error('API call failed:', err)
    throw err
  }
}

// Data loading functions
async function loadChallenges() {
  loading.value = true
  try {
    const data = await apiCall('/challenges')
    challenges.value = data
  } catch (err) {
    error.value = 'Failed to load challenges'
  } finally {
    loading.value = false
  }
}

async function loadTestCases() {
  if (!selectedChallengeId.value) return
  
  loading.value = true
  try {
    const data = await apiCall(`/challenges/${selectedChallengeId.value}/test-cases`)
    testCases.value = data
  } catch (err) {
    error.value = 'Failed to load test cases'
  } finally {
    loading.value = false
  }
}

async function loadSubmissions() {
  loading.value = true
  try {
    const params = new URLSearchParams()
    if (submissionFilters.value.challenge_id) params.append('challenge_id', submissionFilters.value.challenge_id)
    if (submissionFilters.value.status) params.append('status', submissionFilters.value.status)
    if (submissionFilters.value.language) params.append('language', submissionFilters.value.language)
    
    const data = await apiCall(`/submissions?${params.toString()}`)
    submissions.value = data
  } catch (err) {
    error.value = 'Failed to load submissions'
  } finally {
    loading.value = false
  }
}

async function loadAnalytics() {
  loading.value = true
  try {
    const data = await apiCall('/analytics/challenges')
    analytics.value = data
  } catch (err) {
    error.value = 'Failed to load analytics'
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  try {
    const data = await apiCall('/categories')
    categories.value = data
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

// View management
function setActiveView(view) {
  activeView.value = view
  switch (view) {
    case 'challenges':
      loadChallenges()
      break
    case 'test-cases':
      loadChallenges()
      break
    case 'submissions':
      loadSubmissions()
      break
    case 'analytics':
      loadAnalytics()
      break
  }
}

// Computed properties
const selectedChallenge = computed(() => 
  challenges.value.find(c => c.id === parseInt(selectedChallengeId.value))
)

const currentTestCases = computed(() => {
  return testCases.value
    .filter(tc => tc.challenge_id === parseInt(selectedChallengeId.value))
    .sort((a, b) => a.order_index - b.order_index)
})

// Challenge CRUD
function showChallengeForm(challenge = null) {
  currentChallenge.value = challenge ? { ...challenge } : createEmptyChallenge()
  showChallengeModal.value = true
}

function closeChallengeModal() {
  showChallengeModal.value = false
  currentChallenge.value = createEmptyChallenge()
}

async function saveChallenge() {
  loading.value = true
  try {
    if (currentChallenge.value.id) {
      // Update existing challenge
      await apiCall(`/challenges/${currentChallenge.value.id}`, {
        method: 'PUT',
        body: JSON.stringify(currentChallenge.value)
      })
      successMessage.value = 'Challenge updated successfully'
    } else {
      // Create new challenge
      await apiCall('/challenges', {
        method: 'POST',
        body: JSON.stringify(currentChallenge.value)
      })
      successMessage.value = 'Challenge created successfully'
    }
    
    closeChallengeModal()
    loadChallenges()
  } catch (err) {
    error.value = 'Failed to save challenge'
  } finally {
    loading.value = false
  }
}

async function handleDeleteChallenge(challenge) {
  if (!confirm(`Are you sure you want to delete "${challenge.title}"? This will also delete all associated test cases and submissions.`)) return

  loading.value = true
  try {
    await apiCall(`/challenges/${challenge.id}`, {
      method: 'DELETE'
    })
    successMessage.value = 'Challenge deleted successfully'
    loadChallenges()
  } catch (err) {
    error.value = 'Failed to delete challenge'
  } finally {
    loading.value = false
  }
}

function editChallenge(challenge) {
  showChallengeForm(challenge)
}

// Test Case CRUD
function showTestCaseForm(testCase = null) {
  currentTestCase.value = testCase ? { ...testCase } : createEmptyTestCase()
  if (selectedChallengeId.value) {
    currentTestCase.value.challenge_id = parseInt(selectedChallengeId.value)
  }
  showTestCaseModal.value = true
}

function closeTestCaseModal() {
  showTestCaseModal.value = false
  currentTestCase.value = createEmptyTestCase()
}

async function saveTestCase() {
  loading.value = true
  try {
    if (currentTestCase.value.id) {
      // Update existing test case
      await apiCall(`/challenges/${currentTestCase.value.challenge_id}/test-cases/${currentTestCase.value.id}`, {
        method: 'PUT',
        body: JSON.stringify(currentTestCase.value)
      })
      successMessage.value = 'Test case updated successfully'
    } else {
      // Create new test case
      await apiCall(`/challenges/${currentTestCase.value.challenge_id}/test-cases`, {
        method: 'POST',
        body: JSON.stringify(currentTestCase.value)
      })
      successMessage.value = 'Test case created successfully'
    }
    
    closeTestCaseModal()
    loadTestCases()
  } catch (err) {
    error.value = 'Failed to save test case'
  } finally {
    loading.value = false
  }
}

function editTestCase(testCase) {
  showTestCaseForm(testCase)
}

async function deleteTestCase(testCase) {
  if (!confirm('Are you sure you want to delete this test case?')) return

  loading.value = true
  try {
    await apiCall(`/challenges/${testCase.challenge_id}/test-cases/${testCase.id}`, {
      method: 'DELETE'
    })
    successMessage.value = 'Test case deleted successfully'
    loadTestCases()
  } catch (err) {
    error.value = 'Failed to delete test case'
  } finally {
    loading.value = false
  }
}

function moveTestCaseUp(testCase) {
  // Implementation for moving test case up
  console.log('Move test case up:', testCase)
}

function moveTestCaseDown(testCase) {
  // Implementation for moving test case down
  console.log('Move test case down:', testCase)
}

// Submissions Management
function viewSubmission(submission) {
  currentSubmission.value = { ...submission }
  showSubmissionModal.value = true
}

function closeSubmissionModal() {
  showSubmissionModal.value = false
  currentSubmission.value = {}
}

// Export functionality
async function handleExport(type) {
  try {
    let data, filename
    
    switch (type) {
      case 'challenges':
        data = challenges.value
        filename = 'challenges'
        break
      case 'test-cases':
        data = testCases.value
        filename = 'test-cases'
        break
      case 'submissions':
        data = submissions.value
        filename = 'submissions'
        break
      case 'analytics':
        data = analytics.value
        filename = 'analytics'
        break
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    successMessage.value = `Exported ${type} successfully!`
  } catch (err) {
    error.value = 'Export failed'
  }
}

// Initialize
onMounted(() => {
  loadChallenges()
  loadCategories()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>