<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Challenge Platform</span>
            </div>
          </div>

          <!-- Main Navigation -->
          <div class="flex items-center space-x-8">
            <!-- Challenges Management Dropdown -->
            <div class="relative group">
              <button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Challenges Management
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <!-- Challenges Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Challenges
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('challenges')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'challenges' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      All Challenges
                    </button>
                    <button @click="setActiveView('create-challenge')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'create-challenge' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Create Challenge
                    </button>
                  </div>
                </div>

                <!-- Test Cases Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Test Cases
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('test-cases')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'test-cases' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Manage Test Cases
                    </button>
                  </div>
                </div>

                <!-- Submissions Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Submissions
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('submissions')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'submissions' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      All Submissions
                    </button>
                  </div>
                </div>

                <!-- Analytics Section -->
                <div class="p-3">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Analytics
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('challenge-analytics')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'challenge-analytics' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Challenge Analytics
                    </button>
                    <button @click="setActiveView('submission-analytics')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'submission-analytics' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Submission Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="flex items-center space-x-6 text-sm">
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ challenges.length }}</div>
                <div class="text-gray-500 text-xs">Challenges</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ totalTestCases }}</div>
                <div class="text-gray-500 text-xs">Test Cases</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ submissions.length }}</div>
                <div class="text-gray-500 text-xs">Submissions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ getPageTitle() }}</h1>
            <p class="text-gray-600 mt-2">{{ getPageDescription() }}</p>
          </div>
          
          <!-- Quick Action Buttons -->
          <div v-if="showQuickActions()" class="flex items-center gap-3">
            <button v-if="activeView === 'challenges'" @click="setActiveView('create-challenge')" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Challenge
            </button>
            
            <button v-if="activeView === 'test-cases'" @click="showAddTestCaseModal = true" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Test Case
            </button>
          </div>
        </div>

        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mt-4">
          <span>Challenges Management</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-gray-900 font-medium">{{ getBreadcrumb() }}</span>
        </nav>
      </div>

      <!-- 🧩 1. ALL CHALLENGES PAGE -->
      <div v-if="activeView === 'challenges'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Challenges</h2>
            <div class="flex items-center gap-3">
              <!-- Search -->
              <div class="relative">
                <input v-model="challengeFilters.search" type="text" placeholder="Search challenges..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              
              <!-- Filter by Difficulty -->
              <select v-model="challengeFilters.difficulty" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              
              <!-- Sort Options -->
              <select v-model="challengeFilters.sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="submissions">Most Submissions</option>
                <option value="difficulty">Difficulty</option>
                <option value="success-rate">Success Rate</option>
              </select>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hints</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Cases</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="challenge in paginatedChallenges" :key="challenge.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ challenge.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ challenge.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    ]">
                      {{ challenge.difficulty }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg v-if="challenge.hints && challenge.hints.length > 0" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                      <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      <span>{{ challenge.hints && challenge.hints.length > 0 ? challenge.hints.length + ' hints' : 'No hints' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ getTestCasesCount(challenge.id) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ getSubmissionsCount(challenge.id) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div class="flex items-center gap-2">
                      <div class="w-16 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-600 h-2 rounded-full" :style="{ width: getSuccessRate(challenge.id) + '%' }"></div>
                      </div>
                      <span>{{ getSuccessRate(challenge.id) }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(challenge.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button @click="viewChallenge(challenge)" class="text-blue-600 hover:text-blue-900 transition">View</button>
                      <button @click="editChallenge(challenge)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                      <button @click="deleteChallenge(challenge)" class="text-red-600 hover:text-red-900 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Showing {{ pagination.startIndex + 1 }} to {{ Math.min(pagination.endIndex, filteredChallenges.length) }} of {{ filteredChallenges.length }} challenges
            </div>
            <div class="flex items-center gap-2">
              <button @click="prevPage" :disabled="pagination.currentPage === 1" 
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span class="text-sm text-gray-700">
                Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
              </span>
              <button @click="nextPage" :disabled="pagination.currentPage === pagination.totalPages" 
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 🧩 2. CREATE/EDIT CHALLENGE PAGE -->
      <div v-if="activeView === 'create-challenge' || activeView === 'edit-challenge'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ activeView === 'create-challenge' ? 'Create New Challenge' : 'Edit Challenge' }}
        </h2>

        <form @submit.prevent="saveChallenge" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input v-model="currentChallenge.title" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Two Sum Problem">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Markdown Editor -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Markdown Editor</span>
                  <div class="flex gap-1">
                    <button type="button" @click="insertMarkdown('**bold**')" class="p-1 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded">B</button>
                    <button type="button" @click="insertMarkdown('*italic*')" class="p-1 text-sm italic text-gray-600 hover:bg-gray-100 rounded">I</button>
                    <button type="button" @click="insertMarkdown('# Heading')" class="p-1 text-sm text-gray-600 hover:bg-gray-100 rounded">H</button>
                    <button type="button" @click="insertMarkdown('`code`')" class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded">C</button>
                    <button type="button" @click="insertMarkdown('```\ncode block\n```')" class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded">C++</button>
                  </div>
                </div>
                <textarea v-model="currentChallenge.description" rows="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Describe the challenge using Markdown..."></textarea>
              </div>

              <!-- Live Preview -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Live Preview</span>
                </div>
                <div class="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                  <div v-html="renderMarkdown(currentChallenge.description)" class="prose prose-sm max-w-none"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select v-model="currentChallenge.difficulty" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
              <textarea v-model="currentChallenge.constraints" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Time and space constraints..."></textarea>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Starter Code</label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <div class="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
                <select v-model="currentChallenge.starter_code_language" class="bg-gray-700 text-white px-2 py-1 rounded">
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <textarea v-model="currentChallenge.starter_code" rows="6"
                class="w-full px-3 py-2 font-mono text-sm bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="// Write your starter code here..."></textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Example Input</label>
              <textarea v-model="currentChallenge.example_input" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Input example..."></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Example Output</label>
              <textarea v-model="currentChallenge.example_output" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Output example..."></textarea>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
            <textarea v-model="currentChallenge.expected_output" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Expected output format..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hints</label>
            <div class="space-y-2">
              <div v-for="(hint, index) in currentChallenge.hints" :key="index" class="flex gap-2">
                <input v-model="currentChallenge.hints[index]" type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="'Hint ' + (index + 1)">
                <button type="button" @click="removeHint(index)" class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  Remove
                </button>
              </div>
              <button type="button" @click="addHint" class="px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 transition">
                + Add Hint
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Multiple hints will be shown progressively to users</p>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="setActiveView('challenges')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ activeView === 'create-challenge' ? 'Create Challenge' : 'Update Challenge' }}
            </button>
          </div>
        </form>
      </div>

      <!-- 📄 3. CHALLENGE TEST CASES PAGE -->
      <div v-if="activeView === 'test-cases'" class="space-y-6">
        <!-- Test Cases Header -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Test Cases Management</h2>
              <p class="text-gray-600 mt-1">Manage test cases for: <strong>{{ selectedChallenge?.title || 'Select a challenge' }}</strong></p>
            </div>
            <select v-model="selectedChallengeId" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Challenge</option>
              <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
            </select>
          </div>
        </div>

        <!-- Test Cases Table -->
        <div v-if="selectedChallengeId" class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-900">Test Cases</h3>
              <div class="flex items-center gap-3">
                <button @click="showBulkUpload = true" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  Bulk Upload
                </button>
                <button @click="showAddTestCaseModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Test Case
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Explanation</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hidden</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="testCase in currentTestCases" :key="testCase.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div class="flex items-center gap-2">
                        <button @click="moveTestCaseUp(testCase)" class="text-gray-400 hover:text-gray-600">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                          </svg>
                        </button>
                        <span>{{ testCase.order_index }}</span>
                        <button @click="moveTestCaseDown(testCase)" class="text-gray-400 hover:text-gray-600">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 font-mono max-w-xs truncate">
                      {{ testCase.input }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 font-mono max-w-xs truncate">
                      {{ testCase.expected_output }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {{ testCase.explanation }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                        testCase.is_hidden ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      ]">
                        {{ testCase.is_hidden ? 'Hidden' : 'Public' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <button @click="editTestCase(testCase)" class="text-blue-600 hover:text-blue-900 transition">Edit</button>
                        <button @click="deleteTestCase(testCase)" class="text-red-600 hover:text-red-900 transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Test Runner Simulation -->
            <div class="mt-8 border-t border-gray-200 pt-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Test Runner Simulation</h4>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center gap-4 mb-4">
                  <select v-model="testRunLanguage" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                  <button @click="runTests" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Run Tests
                  </button>
                  <div v-if="testResults" class="flex items-center gap-2">
                    <span :class="['text-sm font-medium', testResults.passed ? 'text-green-600' : 'text-red-600']">
                      {{ testResults.passed ? 'All tests passed!' : 'Some tests failed' }}
                    </span>
                    <span class="text-sm text-gray-600">
                      ({{ testResults.passedCount }}/{{ testResults.totalCount }})
                    </span>
                  </div>
                </div>
                
                <div v-if="testResults" class="space-y-2">
                  <div v-for="(result, index) in testResults.results" :key="index" 
                    :class="['p-3 rounded-lg border', result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200']">
                    <div class="flex items-center justify-between">
                      <span class="font-mono text-sm">Test {{ index + 1 }}</span>
                      <span :class="['text-sm font-medium', result.passed ? 'text-green-600' : 'text-red-600']">
                        {{ result.passed ? 'PASSED' : 'FAILED' }}
                      </span>
                    </div>
                    <div v-if="!result.passed" class="mt-2 text-sm text-gray-600">
                      Expected: <code class="bg-gray-100 px-1 rounded">{{ result.expected }}</code><br>
                      Got: <code class="bg-gray-100 px-1 rounded">{{ result.actual }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🧪 4. SUBMISSIONS PAGE -->
      <div v-if="activeView === 'submissions'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Submissions</h2>
            <div class="flex items-center gap-3">
              <!-- Filters -->
              <select v-model="submissionFilters.challenge" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Challenges</option>
                <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
              </select>
              
              <select v-model="submissionFilters.status" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
              
              <select v-model="submissionFilters.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              
              <input v-model="submissionFilters.date" type="date" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
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
                <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ submission.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ submission.user_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ getChallengeTitle(submission.challenge_id) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                      submission.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ submission.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ submission.programming_language }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ submission.execution_time }}ms
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(submission.submitted_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewSubmission(submission)" class="text-blue-600 hover:text-blue-900 transition">
                      View Code
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 📊 5. CHALLENGE ANALYTICS PAGE -->
      <div v-if="activeView === 'challenge-analytics'" class="space-y-8">
        <!-- Challenge Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Challenges</p>
                <p class="text-2xl font-semibold text-gray-900">{{ challenges.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Submissions</p>
                <p class="text-2xl font-semibold text-gray-900">{{ submissions.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Success Rate</p>
                <p class="text-2xl font-semibold text-gray-900">{{ overallSuccessRate }}%</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Avg. Test Cases</p>
                <p class="text-2xl font-semibold text-gray-900">{{ averageTestCases }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Submissions per Challenge -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Submissions per Challenge</h3>
            <div class="h-64">
              <canvas ref="submissionsPerChallengeChart"></canvas>
            </div>
          </div>

          <!-- Difficulty Distribution -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution</h3>
            <div class="h-64">
              <canvas ref="difficultyDistributionChart"></canvas>
            </div>
          </div>

          <!-- Submissions Over Time -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Submissions Over Time</h3>
            <div class="h-64">
              <canvas ref="submissionsOverTimeChart"></canvas>
            </div>
          </div>

          <!-- Hints Usage -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Hints Usage</h3>
            <div class="h-64">
              <canvas ref="hintsUsageChart"></canvas>
            </div>
          </div>

          <!-- Test Cases Analytics -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Test Cases Distribution</h3>
            <div class="h-64">
              <canvas ref="testCasesChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Challenge Rankings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Challenge Rankings</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Most Attempted -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Most Attempted Challenges</h4>
              <div class="space-y-3">
                <div v-for="challenge in mostAttemptedChallenges" :key="challenge.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-900">{{ challenge.title }}</span>
                  <span class="text-sm text-gray-600">{{ challenge.attempts }} attempts</span>
                </div>
              </div>
            </div>

            <!-- Hardest Challenges -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Hardest Challenges</h4>
              <div class="space-y-3">
                <div v-for="challenge in hardestChallenges" :key="challenge.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-900">{{ challenge.title }}</span>
                  <span class="text-sm text-gray-600">{{ challenge.successRate }}% success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <!-- Add/Edit Test Case Modal -->
    <div v-if="showAddTestCaseModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingTestCase ? 'Edit Test Case' : 'Add Test Case' }}
          </h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Input</label>
            <textarea v-model="currentTestCase.input" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Test input data..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
            <textarea v-model="currentTestCase.expected_output" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Expected output..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
            <textarea v-model="currentTestCase.explanation" rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional explanation..."></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
              <input v-model="currentTestCase.order_index" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="flex items-center">
                <input v-model="currentTestCase.is_hidden" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Hidden Test Case</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button @click="showAddTestCaseModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button @click="saveTestCase" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            {{ editingTestCase ? 'Update' : 'Create' }} Test Case
          </button>
        </div>
      </div>
    </div>

    <!-- View Submission Modal -->
    <div v-if="showSubmissionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Submission Details</h3>
        </div>
        
        <div class="p-6 space-y-6">
          <!-- Code -->
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Code</h4>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ currentSubmission.code }}</code></pre>
          </div>
          
          <!-- Test Results -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Input</h4>
              <div class="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                {{ currentSubmission.input }}
              </div>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Expected Output</h4>
              <div class="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                {{ currentSubmission.expected_output }}
              </div>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Actual Output</h4>
              <div class="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                {{ currentSubmission.actual_output }}
              </div>
            </div>
            
            <div v-if="currentSubmission.error_message">
              <h4 class="font-medium text-gray-900 mb-2">Error Message</h4>
              <div class="bg-red-50 p-3 rounded-lg text-red-700 text-sm">
                {{ currentSubmission.error_message }}
              </div>
            </div>
          </div>
          
          <!-- Performance -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-sm text-gray-600">Execution Time</div>
              <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.execution_time }}ms</div>
            </div>
            <div class="text-center">
              <div class="text-sm text-gray-600">Memory Used</div>
              <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.memory_used }}MB</div>
            </div>
            <div class="text-center">
              <div class="text-sm text-gray-600">Language</div>
              <div class="text-lg font-semibold text-gray-900">{{ currentSubmission.programming_language }}</div>
            </div>
            <div class="text-center">
              <div class="text-sm text-gray-600">Status</div>
              <div :class="['text-lg font-semibold', currentSubmission.status === 'success' ? 'text-green-600' : 'text-red-600']">
                {{ currentSubmission.status }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end">
          <button @click="showSubmissionModal = false" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Bulk Upload Modal -->
    <div v-if="showBulkUpload" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Bulk Upload Test Cases</h3>
        </div>
        
        <div class="p-6">
          <textarea v-model="bulkUploadData" rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Paste CSV data with columns: input,expected_output,explanation,is_hidden"></textarea>
          <p class="mt-2 text-sm text-gray-500">
            Format: input,expected_output,explanation,is_hidden (true/false)
          </p>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button @click="showBulkUpload = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button @click="processBulkUpload" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'
import {
  Chart,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
Chart.register(
  BarController,
  LineController,
  PieController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

// Chart refs
const submissionsPerChallengeChart = ref(null)
const difficultyDistributionChart = ref(null)
const submissionsOverTimeChart = ref(null)
const hintsUsageChart = ref(null)
const testCasesChart = ref(null)

// Chart instances
let submissionsPerChallengeChartInstance = null
let difficultyDistributionChartInstance = null
let submissionsOverTimeChartInstance = null
let hintsUsageChartInstance = null
let testCasesChartInstance = null

// Active view state
const activeView = ref('challenges')

// Data stores
const challenges = ref([])
const testCases = ref([])
const submissions = ref([])

// Current editing items
const currentChallenge = ref(createEmptyChallenge())
const currentTestCase = ref(createEmptyTestCase())
const currentSubmission = ref({})
const selectedChallengeId = ref('')
const selectedChallenge = computed(() => 
  challenges.value.find(c => c.id === selectedChallengeId.value)
)

// Modals
const showAddTestCaseModal = ref(false)
const showSubmissionModal = ref(false)
const showBulkUpload = ref(false)
const editingTestCase = ref(false)

// Test runner
const testRunLanguage = ref('javascript')
const testResults = ref(null)

// Bulk upload
const bulkUploadData = ref('')

// Filters
const challengeFilters = ref({
  search: '',
  difficulty: '',
  sort: 'newest'
})

const submissionFilters = ref({
  challenge: '',
  status: '',
  language: '',
  date: ''
})

// Pagination
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  startIndex: 0,
  endIndex: 0
})

// Utility functions
function createEmptyChallenge() {
  return {
    id: null,
    title: '',
    slug: '',
    description: '',
    difficulty: 'easy',
    starter_code: '',
    starter_code_language: 'javascript',
    expected_output: '',
    constraints: '',
    example_input: '',
    example_output: '',
    hints: [],
    created_at: ''
  }
}

function createEmptyTestCase() {
  return {
    id: null,
    challenge_id: '',
    input: '',
    expected_output: '',
    explanation: '',
    is_hidden: false,
    order_index: 0
  }
}

function getPageTitle() {
  const titles = {
    'challenges': 'Challenges Management',
    'create-challenge': 'Create New Challenge',
    'edit-challenge': 'Edit Challenge',
    'test-cases': 'Test Cases Management',
    'submissions': 'Submissions Management',
    'challenge-analytics': 'Challenge Analytics'
  }
  return titles[activeView.value] || 'Challenges Management'
}

function getPageDescription() {
  const descriptions = {
    'challenges': 'Manage all coding challenges on the platform',
    'create-challenge': 'Create a new coding challenge with markdown content',
    'test-cases': 'Manage test cases for challenges',
    'submissions': 'View and analyze user submissions',
    'challenge-analytics': 'Analytics and insights about challenges and submissions'
  }
  return descriptions[activeView.value] || 'Comprehensive challenge management'
}

function getBreadcrumb() {
  const breadcrumbs = {
    'challenges': 'Challenges',
    'create-challenge': 'Create Challenge',
    'edit-challenge': 'Edit Challenge',
    'test-cases': 'Test Cases',
    'submissions': 'Submissions',
    'challenge-analytics': 'Analytics'
  }
  return breadcrumbs[activeView.value] || 'Dashboard'
}

function showQuickActions() {
  return ['challenges', 'test-cases'].includes(activeView.value)
}

// Markdown rendering
function renderMarkdown(text) {
  return marked(text || '')
}

function insertMarkdown(syntax) {
  const activeElement = document.activeElement
  if (activeElement && activeElement.tagName === 'TEXTAREA') {
    const start = activeElement.selectionStart
    const end = activeElement.selectionEnd
    const selectedText = activeElement.value.substring(start, end)
    
    if (selectedText) {
      activeElement.value = activeElement.value.substring(0, start) + 
                           syntax.replace('**', selectedText).replace('*', selectedText).replace('`', selectedText) +
                           activeElement.value.substring(end)
    } else {
      activeElement.value = activeElement.value.substring(0, start) + 
                           syntax + 
                           activeElement.value.substring(end)
    }
    
    if (activeElement === document.querySelector('textarea[v-model="currentChallenge.description"]')) {
      currentChallenge.value.description = activeElement.value
    }
  }
}

// Slug generation
function generateSlug() {
  if (currentChallenge.value.title) {
    currentChallenge.value.slug = currentChallenge.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
}

// Hints management
function addHint() {
  if (!currentChallenge.value.hints) {
    currentChallenge.value.hints = []
  }
  currentChallenge.value.hints.push('')
}

function removeHint(index) {
  currentChallenge.value.hints.splice(index, 1)
}

// Computed properties
const filteredChallenges = computed(() => {
  let filtered = challenges.value

  // Search filter
  if (challengeFilters.value.search) {
    const search = challengeFilters.value.search.toLowerCase()
    filtered = filtered.filter(challenge => 
      challenge.title.toLowerCase().includes(search) ||
      challenge.description.toLowerCase().includes(search)
    )
  }

  // Difficulty filter
  if (challengeFilters.value.difficulty) {
    filtered = filtered.filter(challenge => challenge.difficulty === challengeFilters.value.difficulty)
  }

  // Sort filter
  if (challengeFilters.value.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (challengeFilters.value.sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (challengeFilters.value.sort === 'submissions') {
    filtered.sort((a, b) => getSubmissionsCount(b.id) - getSubmissionsCount(a.id))
  } else if (challengeFilters.value.sort === 'difficulty') {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
    filtered.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty])
  } else if (challengeFilters.value.sort === 'success-rate') {
    filtered.sort((a, b) => getSuccessRate(b.id) - getSuccessRate(a.id))
  }

  return filtered
})

const paginatedChallenges = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  pagination.value.startIndex = start
  pagination.value.endIndex = end
  pagination.value.totalPages = Math.ceil(filteredChallenges.value.length / pagination.value.pageSize)
  
  return filteredChallenges.value.slice(start, end)
})

const currentTestCases = computed(() => {
  return testCases.value
    .filter(tc => tc.challenge_id === selectedChallengeId.value)
    .sort((a, b) => a.order_index - b.order_index)
})

const filteredSubmissions = computed(() => {
  let filtered = submissions.value

  if (submissionFilters.value.challenge) {
    filtered = filtered.filter(s => s.challenge_id === submissionFilters.value.challenge)
  }

  if (submissionFilters.value.status) {
    filtered = filtered.filter(s => s.status === submissionFilters.value.status)
  }

  if (submissionFilters.value.language) {
    filtered = filtered.filter(s => s.programming_language === submissionFilters.value.language)
  }

  if (submissionFilters.value.date) {
    filtered = filtered.filter(s => s.submitted_at.startsWith(submissionFilters.value.date))
  }

  return filtered
})

const totalTestCases = computed(() => testCases.value.length)

const overallSuccessRate = computed(() => {
  if (submissions.value.length === 0) return 0
  const successful = submissions.value.filter(s => s.status === 'success').length
  return Math.round((successful / submissions.value.length) * 100)
})

const averageTestCases = computed(() => {
  if (challenges.value.length === 0) return 0
  const total = challenges.value.reduce((sum, challenge) => sum + getTestCasesCount(challenge.id), 0)
  return Math.round(total / challenges.value.length)
})

const mostAttemptedChallenges = computed(() => {
  return challenges.value
    .map(challenge => ({
      ...challenge,
      attempts: getSubmissionsCount(challenge.id)
    }))
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 5)
})

const hardestChallenges = computed(() => {
  return challenges.value
    .map(challenge => ({
      ...challenge,
      successRate: getSuccessRate(challenge.id)
    }))
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, 5)
})

// Helper functions
function getTestCasesCount(challengeId) {
  return testCases.value.filter(tc => tc.challenge_id === challengeId).length
}

function getSubmissionsCount(challengeId) {
  return submissions.value.filter(s => s.challenge_id === challengeId).length
}

function getSuccessRate(challengeId) {
  const challengeSubmissions = submissions.value.filter(s => s.challenge_id === challengeId)
  if (challengeSubmissions.length === 0) return 0
  const successful = challengeSubmissions.filter(s => s.status === 'success').length
  return Math.round((successful / challengeSubmissions.length) * 100)
}

function getChallengeTitle(challengeId) {
  const challenge = challenges.value.find(c => c.id === challengeId)
  return challenge ? challenge.title : 'Unknown'
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// View management
function setActiveView(view) {
  activeView.value = view
  
  if (view === 'create-challenge') {
    currentChallenge.value = createEmptyChallenge()
  } else if (view === 'test-cases') {
    selectedChallengeId.value = challenges.value[0]?.id || ''
  }

  if (view === 'challenge-analytics') {
    nextTick(() => {
      setTimeout(initializeCharts, 100)
    })
  }
}

// Pagination
function nextPage() {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++
  }
}

function prevPage() {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--
  }
}

// CRUD Operations
function viewChallenge(challenge) {
  currentChallenge.value = { ...challenge }
  setActiveView('edit-challenge')
}

function editChallenge(challenge) {
  currentChallenge.value = { ...challenge }
  setActiveView('edit-challenge')
}

function saveChallenge() {
  try {
    if (activeView.value === 'create-challenge') {
      const newChallenge = {
        ...currentChallenge.value,
        id: Date.now(),
        created_at: new Date().toISOString()
      }
      challenges.value.push(newChallenge)
    } else {
      const index = challenges.value.findIndex(c => c.id === currentChallenge.value.id)
      if (index !== -1) {
        challenges.value[index] = { ...currentChallenge.value }
      }
    }
    
    setActiveView('challenges')
  } catch (error) {
    console.error('Failed to save challenge:', error)
  }
}

function deleteChallenge(challenge) {
  if (confirm(`Are you sure you want to delete "${challenge.title}"?`)) {
    // Delete associated test cases and submissions
    testCases.value = testCases.value.filter(tc => tc.challenge_id !== challenge.id)
    submissions.value = submissions.value.filter(s => s.challenge_id !== challenge.id)
    // Delete challenge
    challenges.value = challenges.value.filter(c => c.id !== challenge.id)
  }
}

// Test Cases Management
function addTestCase() {
  currentTestCase.value = createEmptyTestCase()
  currentTestCase.value.challenge_id = selectedChallengeId.value
  currentTestCase.value.order_index = currentTestCases.value.length + 1
  editingTestCase.value = false
  showAddTestCaseModal.value = true
}

function editTestCase(testCase) {
  currentTestCase.value = { ...testCase }
  editingTestCase.value = true
  showAddTestCaseModal.value = true
}

function saveTestCase() {
  try {
    if (editingTestCase.value) {
      const index = testCases.value.findIndex(tc => tc.id === currentTestCase.value.id)
      if (index !== -1) {
        testCases.value[index] = { ...currentTestCase.value }
      }
    } else {
      const newTestCase = {
        ...currentTestCase.value,
        id: Date.now()
      }
      testCases.value.push(newTestCase)
    }
    
    showAddTestCaseModal.value = false
    currentTestCase.value = createEmptyTestCase()
  } catch (error) {
    console.error('Failed to save test case:', error)
  }
}

function deleteTestCase(testCase) {
  if (confirm('Are you sure you want to delete this test case?')) {
    testCases.value = testCases.value.filter(tc => tc.id !== testCase.id)
  }
}

function moveTestCaseUp(testCase) {
  const index = testCases.value.findIndex(tc => tc.id === testCase.id)
  if (index > 0) {
    const temp = testCases.value[index].order_index
    testCases.value[index].order_index = testCases.value[index - 1].order_index
    testCases.value[index - 1].order_index = temp
  }
}

function moveTestCaseDown(testCase) {
  const index = testCases.value.findIndex(tc => tc.id === testCase.id)
  if (index < testCases.value.length - 1) {
    const temp = testCases.value[index].order_index
    testCases.value[index].order_index = testCases.value[index + 1].order_index
    testCases.value[index + 1].order_index = temp
  }
}

function runTests() {
  // Simulate test execution
  testResults.value = {
    passed: Math.random() > 0.3,
    passedCount: Math.floor(Math.random() * currentTestCases.value.length) + 1,
    totalCount: currentTestCases.value.length,
    results: currentTestCases.value.map((tc, index) => ({
      passed: index < 3, // Simulate some passing, some failing
      expected: tc.expected_output,
      actual: tc.expected_output + (index < 3 ? '' : ' (modified)')
    }))
  }
}

function processBulkUpload() {
  const lines = bulkUploadData.value.split('\n').filter(line => line.trim())
  let newTestCases = []
  
  lines.forEach((line, index) => {
    const [input, expected_output, explanation, is_hidden] = line.split(',')
    if (input && expected_output) {
      newTestCases.push({
        id: Date.now() + index,
        challenge_id: selectedChallengeId.value,
        input: input.trim(),
        expected_output: expected_output.trim(),
        explanation: explanation ? explanation.trim() : '',
        is_hidden: is_hidden ? is_hidden.trim().toLowerCase() === 'true' : false,
        order_index: currentTestCases.value.length + index + 1
      })
    }
  })
  
  testCases.value.push(...newTestCases)
  showBulkUpload.value = false
  bulkUploadData.value = ''
}

// Submissions Management
function viewSubmission(submission) {
  currentSubmission.value = { ...submission }
  showSubmissionModal.value = true
}

// Analytics Charts
function createSubmissionsPerChallengeChart() {
  if (submissionsPerChallengeChartInstance) {
    submissionsPerChallengeChartInstance.destroy()
  }

  const ctx = submissionsPerChallengeChart.value.getContext('2d')
  const topChallenges = challenges.value.slice(0, 8)
  
  submissionsPerChallengeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topChallenges.map(c => c.title.substring(0, 20) + '...'),
      datasets: [{
        label: 'Submissions',
        data: topChallenges.map(c => getSubmissionsCount(c.id)),
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
          title: {
            display: true,
            text: 'Number of Submissions'
          }
        }
      }
    }
  })
}

function createDifficultyDistributionChart() {
  if (difficultyDistributionChartInstance) {
    difficultyDistributionChartInstance.destroy()
  }

  const ctx = difficultyDistributionChart.value.getContext('2d')
  const difficultyCounts = {
    easy: challenges.value.filter(c => c.difficulty === 'easy').length,
    medium: challenges.value.filter(c => c.difficulty === 'medium').length,
    hard: challenges.value.filter(c => c.difficulty === 'hard').length
  }

  difficultyDistributionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Easy', 'Medium', 'Hard'],
      datasets: [{
        data: [difficultyCounts.easy, difficultyCounts.medium, difficultyCounts.hard],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 2
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

function createSubmissionsOverTimeChart() {
  if (submissionsOverTimeChartInstance) {
    submissionsOverTimeChartInstance.destroy()
  }

  const ctx = submissionsOverTimeChart.value.getContext('2d')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const submissionData = months.map(() => Math.floor(Math.random() * 100) + 20)

  submissionsOverTimeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Submissions',
        data: submissionData,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Submissions'
          }
        }
      }
    }
  })
}

function createHintsUsageChart() {
  if (hintsUsageChartInstance) {
    hintsUsageChartInstance.destroy()
  }

  const ctx = hintsUsageChart.value.getContext('2d')
  const withHints = challenges.value.filter(c => c.hints && c.hints.length > 0).length
  const withoutHints = challenges.value.length - withHints

  hintsUsageChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['With Hints', 'Without Hints'],
      datasets: [{
        data: [withHints, withoutHints],
        backgroundColor: ['#3b82f6', '#6b7280'],
        borderColor: '#fff',
        borderWidth: 2
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

function createTestCasesChart() {
  if (testCasesChartInstance) {
    testCasesChartInstance.destroy()
  }

  const ctx = testCasesChart.value.getContext('2d')
  const hiddenCases = testCases.value.filter(tc => tc.is_hidden).length
  const publicCases = testCases.value.length - hiddenCases

  testCasesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Public Test Cases', 'Hidden Test Cases'],
      datasets: [{
        label: 'Count',
        data: [publicCases, hiddenCases],
        backgroundColor: ['#10b981', '#f59e0b'],
        borderColor: ['#059669', '#d97706'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Test Cases'
          }
        }
      }
    }
  })
}

function initializeCharts() {
  nextTick(() => {
    if (activeView.value === 'challenge-analytics') {
      createSubmissionsPerChallengeChart()
      createDifficultyDistributionChart()
      createSubmissionsOverTimeChart()
      createHintsUsageChart()
      createTestCasesChart()
    }
  })
}

// Clean up chart instances
onUnmounted(() => {
  const charts = [
    submissionsPerChallengeChartInstance,
    difficultyDistributionChartInstance,
    submissionsOverTimeChartInstance,
    hintsUsageChartInstance,
    testCasesChartInstance
  ]
  
  charts.forEach(chart => {
    if (chart) {
      chart.destroy()
    }
  })
})

// Initialize with sample data
onMounted(() => {
  // Sample challenges
  challenges.value = [
    {
      id: 1,
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target.',
      difficulty: 'easy',
      starter_code: 'function twoSum(nums, target) {\n  // Your code here\n}',
      starter_code_language: 'javascript',
      expected_output: '[0,1]',
      constraints: '2 <= nums.length <= 10^4',
      example_input: 'nums = [2,7,11,15], target = 9',
      example_output: '[0,1]',
      hints: ['Try using a hash map to store visited numbers', 'Think about the complement of each number'],
      created_at: '2024-01-15'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      slug: 'reverse-linked-list',
      description: 'Reverse a singly linked list.',
      difficulty: 'medium',
      starter_code: 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head):\n    # Your code here',
      starter_code_language: 'python',
      expected_output: 'Reversed linked list',
      constraints: 'The number of nodes in the list is in the range [0, 5000]',
      example_input: 'head = [1,2,3,4,5]',
      example_output: '[5,4,3,2,1]',
      hints: ['You can solve this iteratively or recursively', 'Keep track of previous, current, and next nodes'],
      created_at: '2024-01-20'
    },
    {
      id: 3,
      title: 'Trapping Rain Water',
      slug: 'trapping-rain-water',
      description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
      difficulty: 'hard',
      starter_code: 'public int trap(int[] height) {\n    // Your code here\n}',
      starter_code_language: 'java',
      expected_output: '6',
      constraints: 'n == height.length',
      example_input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      example_output: '6',
      hints: ['Use two pointers approach', 'Calculate left and right maximums'],
      created_at: '2024-02-01'
    }
  ]

  // Sample test cases
  testCases.value = [
    {
      id: 1,
      challenge_id: 1,
      input: '[2,7,11,15], 9',
      expected_output: '[0,1]',
      explanation: 'nums[0] + nums[1] = 2 + 7 = 9',
      is_hidden: false,
      order_index: 1
    },
    {
      id: 2,
      challenge_id: 1,
      input: '[3,2,4], 6',
      expected_output: '[1,2]',
      explanation: 'nums[1] + nums[2] = 2 + 4 = 6',
      is_hidden: false,
      order_index: 2
    },
    {
      id: 3,
      challenge_id: 1,
      input: '[3,3], 6',
      expected_output: '[0,1]',
      explanation: 'nums[0] + nums[1] = 3 + 3 = 6',
      is_hidden: true,
      order_index: 3
    }
  ]

  // Sample submissions
  submissions.value = [
    {
      id: 1,
      user_name: 'john_doe',
      challenge_id: 1,
      status: 'success',
      programming_language: 'javascript',
      execution_time: 45,
      memory_used: 16.2,
      submitted_at: '2024-01-16T10:30:00Z',
      code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      input: '[2,7,11,15], 9',
      expected_output: '[0,1]',
      actual_output: '[0,1]',
      error_message: ''
    },
    {
      id: 2,
      user_name: 'jane_smith',
      challenge_id: 1,
      status: 'failed',
      programming_language: 'python',
      execution_time: 32,
      memory_used: 14.8,
      submitted_at: '2024-01-16T11:15:00Z',
      code: 'def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []',
      input: '[3,2,4], 6',
      expected_output: '[1,2]',
      actual_output: '[1,2]',
      error_message: 'Time Limit Exceeded'
    }
  ]
})
</script>

<style scoped>
/* Smooth transitions */
button, select, input, textarea {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar */
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

/* Hover effects */
.bg-white {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Prose styles for markdown content */
.prose {
  color: #374151;
}

.prose h1 {
  font-size: 2.25em;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.5em;
}

.prose h2 {
  font-size: 1.875em;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose p {
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125em 0.25em;
  border-radius: 0.25em;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

/* Dropdown animations */
.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}

.group:hover .group-hover\:rotate-180 {
  transform: rotate(180deg);
}
</style>