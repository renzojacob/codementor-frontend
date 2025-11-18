<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Code Platform</span>
            </div>
          </div>

          <!-- Main Navigation -->
          <div class="flex items-center space-x-8">
            <!-- Challenge Management Dropdown -->
            <div class="relative group">
              <button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Challenge Management
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Challenges
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('all-challenges')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'all-challenges' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      🏁 All Challenges
                    </button>
                    <button @click="setActiveView('create-challenge')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'create-challenge' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      ➕ Create Challenge
                    </button>
                  </div>
                </div>

                <!-- Test Cases Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Test Cases
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('test-cases')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'test-cases' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      📄 Test Cases
                    </button>
                  </div>
                </div>

                <!-- Hints Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Hints
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('hints-management')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'hints-management' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      💡 Hints Management
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
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'submissions' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      🧪 Submissions
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
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'challenge-analytics' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50']">
                      📊 Challenge Analytics
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
                <div class="font-semibold text-gray-900">{{ totalSubmissions }}</div>
                <div class="text-gray-500 text-xs">Submissions</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ totalHints }}</div>
                <div class="text-gray-500 text-xs">Hints</div>
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
            <button v-if="activeView === 'all-challenges'" @click="setActiveView('create-challenge')" 
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Challenge
            </button>
            
            <button v-if="activeView === 'test-cases'" @click="showAddTestCaseModal = true" 
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Test Case
            </button>

            <button v-if="activeView === 'hints-management' && selectedChallengeForHints" @click="showAddHintModal = true" 
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Hint
            </button>
          </div>
        </div>

        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mt-4">
          <span>Challenge Management</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-gray-900 font-medium">{{ getBreadcrumb() }}</span>
        </nav>
      </div>

      <!-- Content Sections -->

      <!-- 1. ALL CHALLENGES PAGE -->
      <div v-if="activeView === 'all-challenges'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Challenges</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input v-model="challengeFilters.search" type="text" placeholder="Search challenges..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select v-model="challengeFilters.difficulty" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select v-model="challengeFilters.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">All Languages</option>
                <option v-for="lang in availableLanguages" :key="lang" :value="lang">{{ lang }}</option>
              </select>
              <select v-model="challengeFilters.sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="difficulty">Difficulty</option>
                <option value="popularity">Popularity</option>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Cases</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hints</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="challenge in filteredChallenges" :key="challenge.id" class="hover:bg-gray-50 transition-colors">
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ challenge.language }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ challenge.total_test_cases }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span class="inline-flex items-center gap-1">
                      {{ challenge.total_hints }}
                      <svg v-if="challenge.total_hints > 0" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ challenge.total_submissions }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div class="flex items-center gap-2">
                      <div class="w-16 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-600 h-2 rounded-full" :style="{ width: challenge.success_rate + '%' }"></div>
                      </div>
                      <span>{{ challenge.success_rate }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(challenge.created_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button @click="viewChallenge(challenge)" class="text-blue-600 hover:text-blue-900 transition">View</button>
                      <button @click="editChallenge(challenge)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                      <button @click="manageHints(challenge)" class="text-yellow-600 hover:text-yellow-900 transition">Hints</button>
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
              Showing {{ filteredChallenges.length }} of {{ challenges.length }} challenges
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button class="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. CREATE/EDIT CHALLENGE FORM -->
      <div v-if="activeView === 'create-challenge' || activeView === 'edit-challenge'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ activeView === 'create-challenge' ? 'Create New Challenge' : 'Edit Challenge' }}
        </h2>

        <form @submit.prevent="saveChallenge" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input v-model="currentChallenge.title" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Two Sum, Reverse String, etc.">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input v-model="currentChallenge.slug" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="two-sum, reverse-string, etc.">
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select v-model="currentChallenge.difficulty" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select v-model="currentChallenge.language" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">Select Language</option>
                <option v-for="lang in availableLanguages" :key="lang" :value="lang">{{ lang }}</option>
              </select>
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
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

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Starter Code</label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <div class="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
                {{ currentChallenge.language }} Starter Code
              </div>
              <textarea v-model="currentChallenge.starter_code" rows="6"
                class="w-full px-3 py-2 border-0 focus:ring-0 font-mono text-sm bg-gray-900 text-gray-100"
                placeholder="Write the starter code..."></textarea>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output Format</label>
            <textarea v-model="currentChallenge.expected_output_format" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe the expected output format..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
            <textarea v-model="currentChallenge.constraints" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="List the constraints..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Example Input/Output</label>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Input</label>
                <textarea v-model="currentChallenge.example_input" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Output</label>
                <textarea v-model="currentChallenge.example_output" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"></textarea>
              </div>
            </div>
          </div>

          <!-- Quick Hints Section -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-medium text-gray-900">Quick Hints</h3>
              <button type="button" @click="addQuickHint" class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                Add Hint
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(hint, index) in currentChallenge.quick_hints" :key="index" class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <div class="flex-1">
                  <input v-model="hint.text" type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter hint text...">
                </div>
                <div class="flex items-center gap-2">
                  <input v-model="hint.cost" type="number" min="0" max="100"
                    class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Cost">
                  <button type="button" @click="removeQuickHint(index)" class="text-red-600 hover:text-red-900 transition">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Features -->
          <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-medium text-gray-900">AI Assistance</h3>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <button type="button" @click="generateTestCases" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Generate Test Cases
              </button>
              <button type="button" @click="generateHints" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Generate Hints
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="setActiveView('all-challenges')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              {{ activeView === 'create-challenge' ? 'Create Challenge' : 'Update Challenge' }}
            </button>
          </div>
        </form>
      </div>

      <!-- 3. TEST CASES MANAGEMENT -->
      <div v-if="activeView === 'test-cases'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Test Cases Management</h2>
            <div class="flex items-center gap-3">
              <select v-model="selectedChallengeForTestCases" @change="loadTestCasesForChallenge"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">Select Challenge</option>
                <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">
                  {{ challenge.title }}
                </option>
              </select>
              <button @click="showAddTestCaseModal = true" 
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add Test Case
              </button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div v-if="!selectedChallengeForTestCases" class="text-center py-12 text-gray-500">
            Select a challenge to view its test cases
          </div>

          <div v-else class="space-y-4">
            <!-- Drag and Drop Test Cases -->
            <div v-for="testCase in currentTestCases" :key="testCase.id" 
                 class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex-shrink-0 cursor-move text-gray-400 hover:text-gray-600 mt-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              
              <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Input</label>
                  <pre class="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{{ testCase.input }}</pre>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                  <pre class="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{{ testCase.expected_output }}</pre>
                </div>
              </div>

              <div class="flex-shrink-0 flex items-center gap-2">
                <span v-if="testCase.is_hidden" class="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                  Hidden
                </span>
                <span v-else class="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                  Public
                </span>
                <button @click="editTestCase(testCase)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                <button @click="deleteTestCase(testCase)" class="text-red-600 hover:text-red-900 transition">Delete</button>
              </div>
            </div>

            <!-- Bulk Add Test Cases -->
            <div class="border border-dashed border-gray-300 rounded-lg p-6 text-center">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Bulk Add Test Cases</h3>
              <p class="text-sm text-gray-600 mb-4">Paste multiple test cases in JSON format</p>
              <textarea v-model="bulkTestCasesInput" rows="4" placeholder='[{"input": "1 2", "expected_output": "3", "is_hidden": false}, ...]'
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"></textarea>
              <button @click="addBulkTestCases" class="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Add Bulk Test Cases
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. HINTS MANAGEMENT -->
      <div v-if="activeView === 'hints-management'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Hints Management</h2>
            <div class="flex items-center gap-3">
              <select v-model="selectedChallengeForHints" @change="loadHintsForChallenge"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">Select Challenge</option>
                <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">
                  {{ challenge.title }}
                </option>
              </select>
              <button v-if="selectedChallengeForHints" @click="showAddHintModal = true" 
                class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add Hint
              </button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div v-if="!selectedChallengeForHints" class="text-center py-12 text-gray-500">
            Select a challenge to view its hints
          </div>

          <div v-else class="space-y-4">
            <!-- Hints List -->
            <div v-for="hint in currentHints" :key="hint.id" 
                 class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex-shrink-0 cursor-move text-gray-400 hover:text-gray-600 mt-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-medium text-gray-900">Hint {{ hint.order_index + 1 }}</span>
                  <span :class="['inline-flex items-center px-2 py-1 rounded text-xs font-medium', 
                    hint.cost === 0 ? 'bg-green-100 text-green-800' :
                    hint.cost <= 10 ? 'bg-blue-100 text-blue-800' :
                    hint.cost <= 25 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    Cost: {{ hint.cost }} points
                  </span>
                  <span v-if="hint.is_code" class="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                    Code Hint
                  </span>
                </div>
                <div class="text-sm text-gray-700 mb-2">{{ hint.content }}</div>
                <div v-if="hint.code_example" class="mt-2">
                  <div class="text-xs font-medium text-gray-600 mb-1">Code Example:</div>
                  <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">{{ hint.code_example }}</pre>
                </div>
                <div v-if="hint.explanation" class="mt-2 text-xs text-gray-500">
                  {{ hint.explanation }}
                </div>
              </div>

              <div class="flex-shrink-0 flex items-center gap-2">
                <button @click="editHint(hint)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                <button @click="deleteHint(hint)" class="text-red-600 hover:text-red-900 transition">Delete</button>
              </div>
            </div>

            <!-- Hint Statistics -->
            <div v-if="currentHints.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
              <div class="text-center p-4 border border-gray-200 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">{{ currentHints.length }}</div>
                <div class="text-sm text-gray-600">Total Hints</div>
              </div>
              <div class="text-center p-4 border border-gray-200 rounded-lg">
                <div class="text-2xl font-bold text-yellow-600">{{ averageHintCost }}</div>
                <div class="text-sm text-gray-600">Avg Hint Cost</div>
              </div>
              <div class="text-center p-4 border border-gray-200 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ codeHintsCount }}</div>
                <div class="text-sm text-gray-600">Code Hints</div>
              </div>
            </div>

            <!-- Bulk Add Hints -->
            <div class="border border-dashed border-gray-300 rounded-lg p-6 text-center">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Bulk Add Hints</h3>
              <p class="text-sm text-gray-600 mb-4">Paste multiple hints in JSON format</p>
              <textarea v-model="bulkHintsInput" rows="4" placeholder='[{"content": "Think about using a hash map", "cost": 5, "is_code": false}, ...]'
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"></textarea>
              <button @click="addBulkHints" class="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Add Bulk Hints
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. SUBMISSIONS MANAGEMENT -->
      <div v-if="activeView === 'submissions'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Submissions</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input v-model="submissionFilters.search" type="text" placeholder="Search submissions..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select v-model="submissionFilters.challenge" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">All Challenges</option>
                <option v-for="challenge in challenges" :key="challenge.id" :value="challenge.id">{{ challenge.title }}</option>
              </select>
              <select v-model="submissionFilters.status" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="runtime_error">Runtime Error</option>
              </select>
              <select v-model="submissionFilters.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="">All Languages</option>
                <option v-for="lang in availableLanguages" :key="lang" :value="lang">{{ lang }}</option>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hints Used</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execution Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code Length</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ submission.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ submission.user_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ submission.challenge_title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                      submission.status === 'success' ? 'bg-green-100 text-green-800' :
                      submission.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ submission.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ submission.language }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span v-if="submission.hints_used > 0" class="inline-flex items-center gap-1 text-yellow-600">
                      {{ submission.hints_used }}
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                    </span>
                    <span v-else class="text-gray-400">0</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ submission.execution_time }}ms</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ submission.code_length }} chars</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(submission.submitted_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewSubmission(submission)" class="text-blue-600 hover:text-blue-900 transition">View Code</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 6. CHALLENGE ANALYTICS -->
      <div v-if="activeView === 'challenge-analytics'" class="space-y-8">
        <!-- Challenge Overview Graphs -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Challenge Overview Analytics</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Submissions per Challenge -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Submissions per Challenge</h3>
              <div class="h-64">
                <canvas ref="submissionsPerChallengeChart"></canvas>
              </div>
            </div>

            <!-- Hints Usage Analytics -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Hints Usage Analytics</h3>
              <div class="h-64">
                <canvas ref="hintsUsageChart"></canvas>
              </div>
            </div>

            <!-- Difficulty Distribution -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Challenge Difficulty Distribution</h3>
              <div class="h-64">
                <canvas ref="difficultyDistributionChart"></canvas>
              </div>
            </div>

            <!-- Success Rate vs Hints Used -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Success Rate vs Hints Used</h3>
              <div class="h-64">
                <canvas ref="hintsSuccessCorrelationChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Hints Analytics -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Hints Analytics</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Hints per Challenge -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Hints per Challenge</h3>
              <div class="h-64">
                <canvas ref="hintsPerChallengeChart"></canvas>
              </div>
            </div>

            <!-- Hint Cost Distribution -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Hint Cost Distribution</h3>
              <div class="h-64">
                <canvas ref="hintCostDistributionChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Most Hinted Challenge -->
            <div class="text-center p-6 border border-gray-200 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">{{ mostHintedChallenge.hints }}</div>
              <div class="text-sm text-gray-600 mt-1">Most Hinted</div>
              <div class="text-sm font-medium text-gray-900 mt-2">{{ mostHintedChallenge.title }}</div>
            </div>

            <!-- Average Hints per Submission -->
            <div class="text-center p-6 border border-gray-200 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ averageHintsPerSubmission }}</div>
              <div class="text-sm text-gray-600 mt-1">Avg Hints/Submission</div>
            </div>

            <!-- Hint Effectiveness -->
            <div class="text-center p-6 border border-gray-200 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ hintEffectiveness }}%</div>
              <div class="text-sm text-gray-600 mt-1">Hint Effectiveness</div>
            </div>

            <!-- Total Hint Cost -->
            <div class="text-center p-6 border border-gray-200 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ totalHintCost }}</div>
              <div class="text-sm text-gray-600 mt-1">Total Hint Cost</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- MODALS -->

    <!-- Add/Edit Test Case Modal -->
    <div v-if="showAddTestCaseModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
              placeholder="Test case input..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
            <textarea v-model="currentTestCase.expected_output" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
              placeholder="Expected output..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
            <textarea v-model="currentTestCase.explanation" rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Optional explanation..."></textarea>
          </div>
          
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="currentTestCase.is_hidden" id="isHidden" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500">
            <label for="isHidden" class="text-sm text-gray-700">Hidden test case</label>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button @click="showAddTestCaseModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button @click="saveTestCase" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            {{ editingTestCase ? 'Update' : 'Create' }} Test Case
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Hint Modal -->
    <div v-if="showAddHintModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingHint ? 'Edit Hint' : 'Add Hint' }}
          </h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hint Content</label>
            <textarea v-model="currentHint.content" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter hint content..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cost (Points)</label>
            <input v-model="currentHint.cost" type="number" min="0" max="100"
              class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="0-100">
            <p class="mt-1 text-sm text-gray-500">Points users spend to unlock this hint</p>
          </div>
          
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="currentHint.is_code" id="isCode" class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500">
            <label for="isCode" class="text-sm text-gray-700">Code hint (includes code example)</label>
          </div>
          
          <div v-if="currentHint.is_code">
            <label class="block text-sm font-medium text-gray-700 mb-2">Code Example</label>
            <textarea v-model="currentHint.code_example" rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
              placeholder="Optional code example..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
            <textarea v-model="currentHint.explanation" rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Optional explanation..."></textarea>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button @click="showAddHintModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button @click="saveHint" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            {{ editingHint ? 'Update' : 'Create' }} Hint
          </button>
        </div>
      </div>
    </div>

    <!-- View Submission Modal -->
    <div v-if="showSubmissionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Submission Details</h3>
        </div>
        
        <div class="p-6 space-y-6">
          <!-- Submission Info -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div class="text-gray-600">User</div>
              <div class="font-medium">{{ currentSubmission.user_name }}</div>
            </div>
            <div>
              <div class="text-gray-600">Challenge</div>
              <div class="font-medium">{{ currentSubmission.challenge_title }}</div>
            </div>
            <div>
              <div class="text-gray-600">Status</div>
              <div :class="['font-medium', 
                currentSubmission.status === 'success' ? 'text-green-600' :
                currentSubmission.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              ]">
                {{ currentSubmission.status }}
              </div>
            </div>
            <div>
              <div class="text-gray-600">Hints Used</div>
              <div class="font-medium text-yellow-600">{{ currentSubmission.hints_used }}</div>
            </div>
          </div>

          <!-- Source Code -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Source Code</label>
            <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre><code>{{ currentSubmission.source_code }}</code></pre>
            </div>
          </div>

          <!-- Test Results -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Input Used</label>
              <pre class="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{{ currentSubmission.test_input }}</pre>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
              <pre class="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{{ currentSubmission.expected_output }}</pre>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Actual Output</label>
              <pre class="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{{ currentSubmission.actual_output }}</pre>
            </div>
            <div v-if="currentSubmission.error_trace">
              <label class="block text-sm font-medium text-gray-700 mb-2">Error Trace</label>
              <pre class="bg-red-100 p-3 rounded text-sm font-mono whitespace-pre-wrap text-red-800">{{ currentSubmission.error_trace }}</pre>
            </div>
          </div>

          <!-- Hints Used -->
          <div v-if="currentSubmission.hints_used > 0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Hints Unlocked</label>
            <div class="space-y-2">
              <div v-for="hint in currentSubmission.unlocked_hints" :key="hint.id" class="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <div class="text-sm text-yellow-800">{{ hint.content }}</div>
                <div class="text-xs text-yellow-600 mt-1">Cost: {{ hint.cost }} points</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end">
          <button @click="showSubmissionModal = false" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Close
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
const submissionsPerChallengeChart = ref(null)
const hintsUsageChart = ref(null)
const difficultyDistributionChart = ref(null)
const hintsSuccessCorrelationChart = ref(null)
const hintsPerChallengeChart = ref(null)
const hintCostDistributionChart = ref(null)

// Chart instances
let submissionsPerChallengeChartInstance = null
let hintsUsageChartInstance = null
let difficultyDistributionChartInstance = null
let hintsSuccessCorrelationChartInstance = null
let hintsPerChallengeChartInstance = null
let hintCostDistributionChartInstance = null

// Active view state
const activeView = ref('all-challenges')

// Data stores
const challenges = ref([])
const testCases = ref([])
const hints = ref([])
const submissions = ref([])
const users = ref([])

// Current editing items
const currentChallenge = ref(createEmptyChallenge())
const currentTestCase = ref(createEmptyTestCase())
const currentHint = ref(createEmptyHint())
const currentSubmission = ref(createEmptySubmission())
const currentTestCases = ref([])
const currentHints = ref([])

// Modal states
const showAddTestCaseModal = ref(false)
const showAddHintModal = ref(false)
const showSubmissionModal = ref(false)
const editingTestCase = ref(false)
const editingHint = ref(false)

// Filters
const challengeFilters = ref({
  search: '',
  difficulty: '',
  language: '',
  sort: 'newest'
})

const submissionFilters = ref({
  search: '',
  challenge: '',
  status: '',
  language: ''
})

// Selection states
const selectedChallengeForTestCases = ref('')
const selectedChallengeForHints = ref('')
const bulkTestCasesInput = ref('')
const bulkHintsInput = ref('')

// Available languages
const availableLanguages = ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'TypeScript', 'PHP']

// Utility functions
function createEmptyChallenge() {
  return {
    id: null,
    title: '',
    slug: '',
    description: '',
    difficulty: 'easy',
    language: '',
    starter_code: '',
    expected_output_format: '',
    constraints: '',
    example_input: '',
    example_output: '',
    total_test_cases: 0,
    total_hints: 0,
    total_submissions: 0,
    success_rate: 0,
    created_at: '',
    quick_hints: []
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

function createEmptyHint() {
  return {
    id: null,
    challenge_id: '',
    content: '',
    cost: 5,
    is_code: false,
    code_example: '',
    explanation: '',
    order_index: 0,
    usage_count: 0
  }
}

function createEmptySubmission() {
  return {
    id: null,
    user_id: '',
    user_name: '',
    challenge_id: '',
    challenge_title: '',
    status: '',
    language: '',
    source_code: '',
    execution_time: 0,
    code_length: 0,
    submitted_at: '',
    test_input: '',
    expected_output: '',
    actual_output: '',
    error_trace: '',
    memory_usage: 0,
    hints_used: 0,
    unlocked_hints: []
  }
}

function getPageTitle() {
  const titles = {
    'all-challenges': 'All Challenges',
    'create-challenge': 'Create Challenge',
    'edit-challenge': 'Edit Challenge',
    'test-cases': 'Test Cases Management',
    'hints-management': 'Hints Management',
    'submissions': 'Submissions Review',
    'challenge-analytics': 'Challenge Analytics'
  }
  return titles[activeView.value] || 'Challenge Management'
}

function getPageDescription() {
  const descriptions = {
    'all-challenges': 'Manage and review all coding challenges',
    'create-challenge': 'Create a new coding challenge',
    'test-cases': 'Manage test cases for challenges',
    'hints-management': 'Manage hints and assistance for challenges',
    'submissions': 'Review user submissions and solutions',
    'challenge-analytics': 'Analytics and insights about challenges and user performance'
  }
  return descriptions[activeView.value] || 'Comprehensive challenge management'
}

function getBreadcrumb() {
  const breadcrumbs = {
    'all-challenges': 'All Challenges',
    'create-challenge': 'Create Challenge',
    'edit-challenge': 'Edit Challenge',
    'test-cases': 'Test Cases',
    'hints-management': 'Hints',
    'submissions': 'Submissions',
    'challenge-analytics': 'Analytics'
  }
  return breadcrumbs[activeView.value] || 'Dashboard'
}

function showQuickActions() {
  return ['all-challenges', 'test-cases', 'hints-management'].includes(activeView.value)
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

  // Language filter
  if (challengeFilters.value.language) {
    filtered = filtered.filter(challenge => challenge.language === challengeFilters.value.language)
  }

  // Sort filter
  if (challengeFilters.value.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (challengeFilters.value.sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (challengeFilters.value.sort === 'difficulty') {
    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
    filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
  } else if (challengeFilters.value.sort === 'popularity') {
    filtered.sort((a, b) => b.total_submissions - a.total_submissions)
  }

  return filtered
})

const filteredSubmissions = computed(() => {
  let filtered = submissions.value

  // Search filter
  if (submissionFilters.value.search) {
    const search = submissionFilters.value.search.toLowerCase()
    filtered = filtered.filter(submission => 
      submission.user_name.toLowerCase().includes(search) ||
      submission.challenge_title.toLowerCase().includes(search)
    )
  }

  // Challenge filter
  if (submissionFilters.value.challenge) {
    filtered = filtered.filter(submission => submission.challenge_id === submissionFilters.value.challenge)
  }

  // Status filter
  if (submissionFilters.value.status) {
    filtered = filtered.filter(submission => submission.status === submissionFilters.value.status)
  }

  // Language filter
  if (submissionFilters.value.language) {
    filtered = filtered.filter(submission => submission.language === submissionFilters.value.language)
  }

  return filtered
})

const totalSubmissions = computed(() => {
  return submissions.value.length
})

const totalHints = computed(() => {
  return hints.value.length
})

const averageHintCost = computed(() => {
  if (currentHints.value.length === 0) return 0
  const total = currentHints.value.reduce((sum, hint) => sum + hint.cost, 0)
  return Math.round(total / currentHints.value.length)
})

const codeHintsCount = computed(() => {
  return currentHints.value.filter(hint => hint.is_code).length
})

const mostHintedChallenge = computed(() => {
  const challenge = challenges.value.reduce((prev, current) => 
    (prev.total_hints > current.total_hints) ? prev : current
  )
  return {
    title: challenge.title,
    hints: challenge.total_hints
  }
})

const averageHintsPerSubmission = computed(() => {
  if (submissions.value.length === 0) return 0
  const totalHintsUsed = submissions.value.reduce((sum, sub) => sum + sub.hints_used, 0)
  return (totalHintsUsed / submissions.value.length).toFixed(1)
})

const hintEffectiveness = computed(() => {
  const submissionsWithHints = submissions.value.filter(sub => sub.hints_used > 0)
  if (submissionsWithHints.length === 0) return 0
  const successfulWithHints = submissionsWithHints.filter(sub => sub.status === 'success').length
  return Math.round((successfulWithHints / submissionsWithHints.length) * 100)
})

const totalHintCost = computed(() => {
  return hints.value.reduce((sum, hint) => sum + hint.cost, 0)
})

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
    
    // Update Vue model
    if (activeElement === document.querySelector('textarea[v-model="currentChallenge.description"]')) {
      currentChallenge.value.description = activeElement.value
    }
  }
}

// Chart creation functions
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
        data: topChallenges.map(c => c.total_submissions),
        backgroundColor: '#8b5cf6',
        borderColor: '#7c3aed',
        borderWidth: 1
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
          text: 'Submissions per Challenge'
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

function createHintsUsageChart() {
  if (hintsUsageChartInstance) {
    hintsUsageChartInstance.destroy()
  }

  const ctx = hintsUsageChart.value.getContext('2d')
  const hintUsageData = [65, 25, 10] // No hints, 1-2 hints, 3+ hints

  hintsUsageChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['No Hints Used', '1-2 Hints Used', '3+ Hints Used'],
      datasets: [{
        data: hintUsageData,
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Hints Usage Distribution'
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
  const easyCount = challenges.value.filter(c => c.difficulty === 'easy').length
  const mediumCount = challenges.value.filter(c => c.difficulty === 'medium').length
  const hardCount = challenges.value.filter(c => c.difficulty === 'hard').length

  difficultyDistributionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Easy', 'Medium', 'Hard'],
      datasets: [{
        data: [easyCount, mediumCount, hardCount],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Challenge Difficulty Distribution'
        }
      }
    }
  })
}

function createHintsPerChallengeChart() {
  if (hintsPerChallengeChartInstance) {
    hintsPerChallengeChartInstance.destroy()
  }

  const ctx = hintsPerChallengeChart.value.getContext('2d')
  const topChallenges = challenges.value.slice(0, 6)

  hintsPerChallengeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topChallenges.map(c => c.title.substring(0, 15) + '...'),
      datasets: [{
        label: 'Hints',
        data: topChallenges.map(c => c.total_hints),
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
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
        },
        title: {
          display: true,
          text: 'Hints per Challenge'
        }
      }
    }
  })
}

// Initialize all charts when analytics view is active
function initializeCharts() {
  nextTick(() => {
    if (activeView.value === 'challenge-analytics') {
      createSubmissionsPerChallengeChart()
      createHintsUsageChart()
      createDifficultyDistributionChart()
      createHintsPerChallengeChart()
    }
  })
}

// View management
function setActiveView(view) {
  activeView.value = view
  
  if (view === 'create-challenge') {
    currentChallenge.value = createEmptyChallenge()
  } else if (view === 'test-cases') {
    selectedChallengeForTestCases.value = ''
    currentTestCases.value = []
  } else if (view === 'hints-management') {
    selectedChallengeForHints.value = ''
    currentHints.value = []
  }

  if (view === 'challenge-analytics') {
    nextTick(() => {
      setTimeout(initializeCharts, 100)
    })
  }
}

// CRUD Operations
function viewChallenge(challenge) {
  // Navigate to challenge view
  console.log('View challenge:', challenge)
}

function editChallenge(challenge) {
  currentChallenge.value = { ...challenge }
  activeView.value = 'edit-challenge'
}

function manageHints(challenge) {
  selectedChallengeForHints.value = challenge.id
  loadHintsForChallenge()
  activeView.value = 'hints-management'
}

function deleteChallenge(challenge) {
  if (confirm(`Are you sure you want to delete "${challenge.title}"?`)) {
    challenges.value = challenges.value.filter(c => c.id !== challenge.id)
    // Also delete associated test cases, hints, and submissions
    testCases.value = testCases.value.filter(tc => tc.challenge_id !== challenge.id)
    hints.value = hints.value.filter(h => h.challenge_id !== challenge.id)
    submissions.value = submissions.value.filter(sub => sub.challenge_id !== challenge.id)
  }
}

function saveChallenge() {
  try {
    if (activeView.value === 'create-challenge') {
      const newChallenge = {
        ...currentChallenge.value,
        id: Date.now(),
        total_test_cases: 0,
        total_hints: currentChallenge.value.quick_hints.length,
        total_submissions: 0,
        success_rate: 0,
        created_at: new Date().toISOString()
      }
      challenges.value.push(newChallenge)
    } else {
      const index = challenges.value.findIndex(c => c.id === currentChallenge.value.id)
      if (index !== -1) {
        challenges.value[index] = { ...currentChallenge.value }
      }
    }
    
    setActiveView('all-challenges')
  } catch (error) {
    console.error('Failed to save challenge:', error)
  }
}

function addQuickHint() {
  if (!currentChallenge.value.quick_hints) {
    currentChallenge.value.quick_hints = []
  }
  currentChallenge.value.quick_hints.push({
    text: '',
    cost: 5
  })
}

function removeQuickHint(index) {
  currentChallenge.value.quick_hints.splice(index, 1)
}

function loadTestCasesForChallenge() {
  if (!selectedChallengeForTestCases.value) {
    currentTestCases.value = []
    return
  }
  currentTestCases.value = testCases.value.filter(tc => tc.challenge_id === selectedChallengeForTestCases.value)
    .sort((a, b) => a.order_index - b.order_index)
}

function loadHintsForChallenge() {
  if (!selectedChallengeForHints.value) {
    currentHints.value = []
    return
  }
  currentHints.value = hints.value.filter(h => h.challenge_id === selectedChallengeForHints.value)
    .sort((a, b) => a.order_index - b.order_index)
}

function addTestCase() {
  currentTestCase.value = createEmptyTestCase()
  currentTestCase.value.challenge_id = selectedChallengeForTestCases.value
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
        id: Date.now(),
        order_index: currentTestCases.value.length
      }
      testCases.value.push(newTestCase)
      
      // Update challenge test case count
      const challengeIndex = challenges.value.findIndex(c => c.id === currentTestCase.value.challenge_id)
      if (challengeIndex !== -1) {
        challenges.value[challengeIndex].total_test_cases++
      }
    }
    
    showAddTestCaseModal.value = false
    loadTestCasesForChallenge()
  } catch (error) {
    console.error('Failed to save test case:', error)
  }
}

function deleteTestCase(testCase) {
  if (confirm('Are you sure you want to delete this test case?')) {
    testCases.value = testCases.value.filter(tc => tc.id !== testCase.id)
    
    // Update challenge test case count
    const challengeIndex = challenges.value.findIndex(c => c.id === testCase.challenge_id)
    if (challengeIndex !== -1) {
      challenges.value[challengeIndex].total_test_cases--
    }
    
    loadTestCasesForChallenge()
  }
}

function addHint() {
  currentHint.value = createEmptyHint()
  currentHint.value.challenge_id = selectedChallengeForHints.value
  editingHint.value = false
  showAddHintModal.value = true
}

function editHint(hint) {
  currentHint.value = { ...hint }
  editingHint.value = true
  showAddHintModal.value = true
}

function saveHint() {
  try {
    if (editingHint.value) {
      const index = hints.value.findIndex(h => h.id === currentHint.value.id)
      if (index !== -1) {
        hints.value[index] = { ...currentHint.value }
      }
    } else {
      const newHint = {
        ...currentHint.value,
        id: Date.now(),
        order_index: currentHints.value.length
      }
      hints.value.push(newHint)
      
      // Update challenge hint count
      const challengeIndex = challenges.value.findIndex(c => c.id === currentHint.value.challenge_id)
      if (challengeIndex !== -1) {
        challenges.value[challengeIndex].total_hints++
      }
    }
    
    showAddHintModal.value = false
    loadHintsForChallenge()
  } catch (error) {
    console.error('Failed to save hint:', error)
  }
}

function deleteHint(hint) {
  if (confirm('Are you sure you want to delete this hint?')) {
    hints.value = hints.value.filter(h => h.id !== hint.id)
    
    // Update challenge hint count
    const challengeIndex = challenges.value.findIndex(c => c.id === hint.challenge_id)
    if (challengeIndex !== -1) {
      challenges.value[challengeIndex].total_hints--
    }
    
    loadHintsForChallenge()
  }
}

function addBulkTestCases() {
  try {
    const bulkTestCases = JSON.parse(bulkTestCasesInput.value)
    bulkTestCases.forEach((testCase, index) => {
      const newTestCase = {
        ...createEmptyTestCase(),
        ...testCase,
        id: Date.now() + index,
        challenge_id: selectedChallengeForTestCases.value,
        order_index: currentTestCases.value.length + index
      }
      testCases.value.push(newTestCase)
    })
    
    // Update challenge test case count
    const challengeIndex = challenges.value.findIndex(c => c.id === selectedChallengeForTestCases.value)
    if (challengeIndex !== -1) {
      challenges.value[challengeIndex].total_test_cases += bulkTestCases.length
    }
    
    bulkTestCasesInput.value = ''
    loadTestCasesForChallenge()
  } catch (error) {
    alert('Invalid JSON format for bulk test cases')
  }
}

function addBulkHints() {
  try {
    const bulkHints = JSON.parse(bulkHintsInput.value)
    bulkHints.forEach((hint, index) => {
      const newHint = {
        ...createEmptyHint(),
        ...hint,
        id: Date.now() + index,
        challenge_id: selectedChallengeForHints.value,
        order_index: currentHints.value.length + index
      }
      hints.value.push(newHint)
    })
    
    // Update challenge hint count
    const challengeIndex = challenges.value.findIndex(c => c.id === selectedChallengeForHints.value)
    if (challengeIndex !== -1) {
      challenges.value[challengeIndex].total_hints += bulkHints.length
    }
    
    bulkHintsInput.value = ''
    loadHintsForChallenge()
  } catch (error) {
    alert('Invalid JSON format for bulk hints')
  }
}

function viewSubmission(submission) {
  currentSubmission.value = { ...submission }
  showSubmissionModal.value = true
}

function generateTestCases() {
  // AI test case generation simulation
  alert('AI test case generation feature would be implemented here with backend integration')
}

function generateHints() {
  // AI hint generation simulation
  alert('AI hint generation feature would be implemented here with backend integration')
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Clean up chart instances
onUnmounted(() => {
  const charts = [
    submissionsPerChallengeChartInstance,
    hintsUsageChartInstance,
    difficultyDistributionChartInstance,
    hintsSuccessCorrelationChartInstance,
    hintsPerChallengeChartInstance,
    hintCostDistributionChartInstance
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
      language: 'JavaScript',
      starter_code: 'function twoSum(nums, target) {\n    // Your code here\n}',
      expected_output_format: 'Array of two indices',
      constraints: '2 <= nums.length <= 10^4',
      example_input: '[2,7,11,15], 9',
      example_output: '[0,1]',
      total_test_cases: 5,
      total_hints: 3,
      total_submissions: 156,
      success_rate: 78,
      created_at: '2024-01-15',
      quick_hints: [
        { text: 'Consider using a hash map for O(n) time complexity', cost: 5 },
        { text: 'Think about storing numbers and their indices', cost: 10 }
      ]
    },
    {
      id: 2,
      title: 'Reverse String',
      slug: 'reverse-string',
      description: 'Reverse a string in-place without using built-in reverse functions.',
      difficulty: 'easy',
      language: 'Python',
      starter_code: 'def reverse_string(s):\n    # Your code here',
      expected_output_format: 'Reversed string',
      constraints: '1 <= s.length <= 10^5',
      example_input: '"hello"',
      example_output: '"olleh"',
      total_test_cases: 3,
      total_hints: 2,
      total_submissions: 89,
      success_rate: 92,
      created_at: '2024-01-20',
      quick_hints: [
        { text: 'Use two pointers approach', cost: 5 }
      ]
    }
  ]

  // Sample test cases
  testCases.value = [
    {
      id: 1,
      challenge_id: 1,
      input: '[2,7,11,15], 9',
      expected_output: '[0,1]',
      explanation: 'Basic test case',
      is_hidden: false,
      order_index: 0
    }
  ]

  // Sample hints
  hints.value = [
    {
      id: 1,
      challenge_id: 1,
      content: 'Consider using a hash map to store numbers and their indices',
      cost: 5,
      is_code: false,
      code_example: '',
      explanation: 'This allows O(1) lookups for complement values',
      order_index: 0,
      usage_count: 45
    },
    {
      id: 2,
      challenge_id: 1,
      content: 'Here is the optimal solution approach',
      cost: 15,
      is_code: true,
      code_example: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}',
      explanation: 'Complete solution with hash map',
      order_index: 1,
      usage_count: 23
    }
  ]

  // Sample submissions
  submissions.value = [
    {
      id: 1,
      user_id: 1,
      user_name: 'john_doe',
      challenge_id: 1,
      challenge_title: 'Two Sum',
      status: 'success',
      language: 'JavaScript',
      source_code: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}',
      execution_time: 45,
      code_length: 234,
      submitted_at: '2024-02-15T10:30:00Z',
      test_input: '[2,7,11,15], 9',
      expected_output: '[0,1]',
      actual_output: '[0,1]',
      error_trace: '',
      memory_usage: 42.1,
      hints_used: 1,
      unlocked_hints: [
        {
          id: 1,
          content: 'Consider using a hash map to store numbers and their indices',
          cost: 5
        }
      ]
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