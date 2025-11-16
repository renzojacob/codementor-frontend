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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Learn Platform</span>
            </div>
          </div>

          <!-- Main Navigation -->
          <div class="flex items-center space-x-8">
            <!-- Learn Management Dropdown -->
            <div class="relative group">
              <button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                Learn Management
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <!-- Languages Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                    Languages
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('languages')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'languages' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      All Languages
                    </button>
                    <button @click="setActiveView('add-language')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'add-language' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Add New Language
                    </button>
                  </div>
                </div>

                <!-- Lessons Section -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    Lessons
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('lessons')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'lessons' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      All Lessons
                    </button>
                    <button @click="setActiveView('create-lesson')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'create-lesson' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Create Lesson
                    </button>
                  </div>
                </div>

                <!-- Lesson Sections -->
                <div class="p-3 border-b border-gray-100">
                  <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                    </svg>
                    Lesson Sections
                  </div>
                  <div class="mt-2 space-y-1">
                    <button @click="setActiveView('sections')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'sections' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      All Sections
                    </button>
                    <button @click="setActiveView('add-section')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'add-section' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Add Section
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
                    <button @click="setActiveView('language-insights')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'language-insights' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Language Insights
                    </button>
                    <button @click="setActiveView('lesson-insights')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'lesson-insights' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Lesson Insights
                    </button>
                    <button @click="setActiveView('section-insights')" 
                      :class="['w-full text-left px-4 py-2 text-sm rounded-lg transition', activeView === 'section-insights' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                      Section Insights
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="flex items-center space-x-6 text-sm">
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ languages.length }}</div>
                <div class="text-gray-500 text-xs">Languages</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ lessons.length }}</div>
                <div class="text-gray-500 text-xs">Lessons</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">{{ sections.length }}</div>
                <div class="text-gray-500 text-xs">Sections</div>
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
            <button v-if="activeView === 'languages'" @click="setActiveView('add-language')" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Language
            </button>
            
            <button v-if="activeView === 'lessons'" @click="setActiveView('create-lesson')" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Lesson
            </button>
            
            <button v-if="activeView === 'sections'" @click="setActiveView('add-section')" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Section
            </button>
          </div>
        </div>

        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mt-4">
          <span>Learn Management</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-gray-900 font-medium">{{ getBreadcrumb() }}</span>
        </nav>
      </div>

      <!-- Content Sections -->
      <!-- Languages Management -->
      <div v-if="activeView === 'languages'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Languages</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input v-model="languageFilters.search" type="text" placeholder="Search languages..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select v-model="languageFilters.sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="name">Sort by Name</option>
                <option value="lessons">Sort by Lessons</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Lessons</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="language in filteredLanguages" :key="language.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ language.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ language.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ language.slug }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{{ language.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ language.total_lessons }} lessons
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button @click="editLanguage(language)" class="text-blue-600 hover:text-blue-900 transition">Edit</button>
                      <button @click="deleteLanguage(language)" class="text-red-600 hover:text-red-900 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Showing {{ filteredLanguages.length }} of {{ languages.length }} languages
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Language Form -->
      <div v-if="activeView === 'add-language' || activeView === 'edit-language'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ activeView === 'add-language' ? 'Add New Language' : 'Edit Language' }}
        </h2>

        <form @submit.prevent="saveLanguage" class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input v-model="currentLanguage.name" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="JavaScript, Python, etc.">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input v-model="currentLanguage.slug" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="javascript, python, etc.">
              <p class="mt-1 text-sm text-gray-500">Auto-generated from name, but can be customized</p>
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
                    </div>
                  </div>
                  <textarea v-model="currentLanguage.description" rows="8"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Enter language description using Markdown..."></textarea>
                </div>

                <!-- Live Preview -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">Live Preview</span>
                  </div>
                  <div class="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                    <div v-html="renderMarkdown(currentLanguage.description)" class="prose prose-sm max-w-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="setActiveView('languages')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ activeView === 'add-language' ? 'Create Language' : 'Update Language' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Lessons Management -->
      <div v-if="activeView === 'lessons'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Lessons</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input v-model="lessonFilters.search" type="text" placeholder="Search lessons..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select v-model="lessonFilters.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Languages</option>
                <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
              </select>
              <select v-model="lessonFilters.sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="sections">Most Sections</option>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="lesson in filteredLessons" :key="lesson.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ lesson.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ lesson.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ getLanguageName(lesson.language_id) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{{ lesson.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ lesson.order_index }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ lesson.total_sections }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(lesson.updated_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button @click="previewLesson(lesson)" class="text-blue-600 hover:text-blue-900 transition">Preview</button>
                      <button @click="editLesson(lesson)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                      <button @click="deleteLesson(lesson)" class="text-red-600 hover:text-red-900 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Create/Edit Lesson Form -->
      <div v-if="activeView === 'create-lesson' || activeView === 'edit-lesson'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ activeView === 'create-lesson' ? 'Create New Lesson' : 'Edit Lesson' }}
        </h2>

        <form @submit.prevent="saveLesson" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select v-model="currentLesson.language_id" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a language</option>
                <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
              <input v-model="currentLesson.order_index" type="number" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1, 2, 3...">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input v-model="currentLesson.title" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Introduction to Variables">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input v-model="currentLesson.slug" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="introduction-to-variables">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="currentLesson.description" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of the lesson..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Main Content</label>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Markdown Editor -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Markdown Editor</span>
                  <div class="flex gap-1">
                    <button type="button" @click="insertMarkdown('**bold**')" class="p-1 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded">B</button>
                    <button type="button" @click="insertMarkdown('*italic*')" class="p-1 text-sm italic text-gray-600 hover:bg-gray-100 rounded">I</button>
                    <button type="button" @click="insertMarkdown('# Heading')" class="p-1 text-sm text-gray-600 hover:bg-gray-100 rounded">H</button>
                    <button type="button" @click="insertMarkdown('- List item')" class="p-1 text-sm text-gray-600 hover:bg-gray-100 rounded">•</button>
                    <button type="button" @click="insertMarkdown('`code`')" class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded">C</button>
                    <button type="button" @click="insertMarkdown('```\ncode block\n```')" class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded">C++</button>
                  </div>
                </div>
                <textarea v-model="currentLesson.main_content" rows="12"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Write your lesson content using Markdown..."></textarea>
              </div>

              <!-- Live Preview -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Live Preview</span>
                </div>
                <div class="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                  <div v-html="renderMarkdown(currentLesson.main_content)" class="prose prose-sm max-w-none"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="setActiveView('lessons')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ activeView === 'create-lesson' ? 'Create Lesson' : 'Update Lesson' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Lesson Preview -->
      <div v-if="activeView === 'lesson-preview'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Lesson Preview</h2>
          <button @click="setActiveView('lessons')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Back to Lessons
          </button>
        </div>

        <div class="prose prose-lg max-w-none">
          <h1>{{ currentLesson.title }}</h1>
          <p class="text-gray-600 text-lg">{{ currentLesson.description }}</p>
          <div v-html="renderMarkdown(currentLesson.main_content)" class="mt-6"></div>
        </div>

        <!-- Associated Sections -->
        <div class="mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Lesson Sections</h3>
          <div class="space-y-4">
            <div v-for="section in currentLessonSections" :key="section.id" class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900">{{ section.subtitle }}</h4>
              <div v-html="renderMarkdown(section.content)" class="mt-2 text-gray-600"></div>
              <div v-if="section.code_example" class="mt-3">
                <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre><code>{{ section.code_example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sections Management -->
      <div v-if="activeView === 'sections'" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">All Lesson Sections</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input v-model="sectionFilters.search" type="text" placeholder="Search sections..." 
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select v-model="sectionFilters.lesson" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Lessons</option>
                <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">{{ lesson.title }}</option>
              </select>
              <select v-model="sectionFilters.sort" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="order">By Order</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div class="p-6">
          <!-- Drag and Drop Reordering -->
          <div class="space-y-3">
            <div v-for="section in filteredSections" :key="section.id" 
                 class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex-shrink-0 cursor-move text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-medium text-gray-900">{{ section.subtitle }}</span>
                  <span class="text-xs text-gray-500">Order: {{ section.order_index }}</span>
                </div>
                <div class="text-sm text-gray-600 truncate">{{ section.content }}</div>
                <div class="text-xs text-gray-500 mt-1">
                  Lesson: {{ getLessonTitle(section.lesson_id) }}
                  <span v-if="section.code_example" class="ml-2 text-blue-600">• Includes Code Example</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="editSection(section)" class="text-green-600 hover:text-green-900 transition">Edit</button>
                <button @click="deleteSection(section)" class="text-red-600 hover:text-red-900 transition">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Section Form -->
      <div v-if="activeView === 'add-section' || activeView === 'edit-section'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ activeView === 'add-section' ? 'Add New Section' : 'Edit Section' }}
        </h2>

        <form @submit.prevent="saveSection" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Lesson</label>
              <select v-model="currentSection.lesson_id" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a lesson</option>
                <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">{{ lesson.title }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
              <input v-model="currentSection.order_index" type="number" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1, 2, 3...">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input v-model="currentSection.subtitle" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Section subtitle...">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Example ID</label>
            <input v-model="currentSection.example_id" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="unique-example-id">
            <p class="mt-1 text-sm text-gray-500">Optional unique identifier for referencing in frontend</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
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
                  </div>
                </div>
                <textarea v-model="currentSection.content" rows="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Write section content using Markdown..."></textarea>
              </div>

              <!-- Live Preview -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Live Preview</span>
                </div>
                <div class="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                  <div v-html="renderMarkdown(currentSection.content)" class="prose prose-sm max-w-none"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Code Example</label>
            <textarea v-model="currentSection.code_example" rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Optional code example..."></textarea>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="setActiveView('sections')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ activeView === 'add-section' ? 'Create Section' : 'Update Section' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Analytics Dashboards -->
      <div v-if="activeView.startsWith('language-insights') || activeView.startsWith('lesson-insights') || activeView.startsWith('section-insights')" class="space-y-8">
        <!-- Language Insights -->
        <div v-if="activeView === 'language-insights'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Language Insights</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Lessons per Language Chart -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Lessons per Language</h3>
              <div class="h-64">
                <canvas ref="lessonsPerLanguageChart"></canvas>
              </div>
            </div>

            <!-- Sections Share by Language -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Sections Share by Language</h3>
              <div class="h-64">
                <canvas ref="sectionsShareChart"></canvas>
              </div>
            </div>

            <!-- Lessons Created Over Time -->
            <div class="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Lessons Created Over Time</h3>
              <div class="h-64">
                <canvas ref="lessonsOverTimeChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Lesson Insights -->
        <div v-if="activeView === 'lesson-insights'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Lesson Insights</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Sections per Lesson -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Sections per Lesson</h3>
              <div class="h-64">
                <canvas ref="sectionsPerLessonChart"></canvas>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
              <div class="h-64">
                <canvas ref="activityTimelineChart"></canvas>
              </div>
            </div>

            <!-- Section Types -->
            <div class="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Section Types Distribution</h3>
              <div class="h-64">
                <canvas ref="sectionTypesChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Insights -->
        <div v-if="activeView === 'section-insights'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Section Insights</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Section Creation Trends -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Section Creation Trends</h3>
              <div class="h-64">
                <canvas ref="sectionCreationChart"></canvas>
              </div>
            </div>

            <!-- Order Index Distribution -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Sections Order Distribution</h3>
              <div class="h-64">
                <canvas ref="orderDistributionChart"></canvas>
              </div>
            </div>

            <!-- Lesson-Sections Hierarchy -->
            <div class="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Lesson-Sections Hierarchy</h3>
              <div class="h-64">
                <canvas ref="hierarchyChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
const lessonsPerLanguageChart = ref(null)
const sectionsShareChart = ref(null)
const lessonsOverTimeChart = ref(null)
const sectionsPerLessonChart = ref(null)
const activityTimelineChart = ref(null)
const sectionTypesChart = ref(null)
const sectionCreationChart = ref(null)
const orderDistributionChart = ref(null)
const hierarchyChart = ref(null)

// Chart instances
let lessonsPerLanguageChartInstance = null
let sectionsShareChartInstance = null
let lessonsOverTimeChartInstance = null
let sectionsPerLessonChartInstance = null
let activityTimelineChartInstance = null
let sectionTypesChartInstance = null
let sectionCreationChartInstance = null
let orderDistributionChartInstance = null
let hierarchyChartInstance = null

// Active view state
const activeView = ref('languages')

// Data stores
const languages = ref([])
const lessons = ref([])
const sections = ref([])

// Current editing items
const currentLanguage = ref(createEmptyLanguage())
const currentLesson = ref(createEmptyLesson())
const currentSection = ref(createEmptySection())
const currentLessonSections = ref([])

// Filters
const languageFilters = ref({
  search: '',
  sort: 'name'
})

const lessonFilters = ref({
  search: '',
  language: '',
  sort: 'newest'
})

const sectionFilters = ref({
  search: '',
  lesson: '',
  sort: 'order'
})

// Utility functions
function createEmptyLanguage() {
  return {
    id: null,
    name: '',
    slug: '',
    description: '',
    total_lessons: 0
  }
}

function createEmptyLesson() {
  return {
    id: null,
    language_id: '',
    title: '',
    slug: '',
    description: '',
    main_content: '',
    order_index: 1,
    total_sections: 0,
    created_at: '',
    updated_at: ''
  }
}

function createEmptySection() {
  return {
    id: null,
    lesson_id: '',
    subtitle: '',
    content: '',
    code_example: '',
    example_id: '',
    order_index: 1,
    created_at: '',
    updated_at: ''
  }
}

function getPageTitle() {
  const titles = {
    'languages': 'Languages Management',
    'add-language': 'Add New Language',
    'edit-language': 'Edit Language',
    'lessons': 'Lessons Management',
    'create-lesson': 'Create New Lesson',
    'edit-lesson': 'Edit Lesson',
    'lesson-preview': 'Lesson Preview',
    'sections': 'Lesson Sections Management',
    'add-section': 'Add New Section',
    'edit-section': 'Edit Section',
    'language-insights': 'Language Insights',
    'lesson-insights': 'Lesson Insights',
    'section-insights': 'Section Insights'
  }
  return titles[activeView.value] || 'Learn Management'
}

function getPageDescription() {
  const descriptions = {
    'languages': 'Manage all programming languages available on the platform',
    'add-language': 'Add a new programming language to the platform',
    'lessons': 'Manage all lessons across different programming languages',
    'create-lesson': 'Create a new lesson with markdown content',
    'sections': 'Manage lesson sections and their ordering',
    'add-section': 'Add a new section to a lesson',
    'language-insights': 'Analytics and insights about languages',
    'lesson-insights': 'Analytics and insights about lessons',
    'section-insights': 'Analytics and insights about sections'
  }
  return descriptions[activeView.value] || 'Comprehensive learning content management'
}

function getBreadcrumb() {
  const breadcrumbs = {
    'languages': 'Languages',
    'add-language': 'Add Language',
    'edit-language': 'Edit Language',
    'lessons': 'Lessons',
    'create-lesson': 'Create Lesson',
    'edit-lesson': 'Edit Lesson',
    'lesson-preview': 'Lesson Preview',
    'sections': 'Sections',
    'add-section': 'Add Section',
    'edit-section': 'Edit Section',
    'language-insights': 'Language Insights',
    'lesson-insights': 'Lesson Insights',
    'section-insights': 'Section Insights'
  }
  return breadcrumbs[activeView.value] || 'Dashboard'
}

function showQuickActions() {
  return ['languages', 'lessons', 'sections'].includes(activeView.value)
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
      // Wrap selected text with syntax
      activeElement.value = activeElement.value.substring(0, start) + 
                           syntax.replace('**', selectedText).replace('*', selectedText).replace('`', selectedText) +
                           activeElement.value.substring(end)
    } else {
      // Insert syntax at cursor
      activeElement.value = activeElement.value.substring(0, start) + 
                           syntax + 
                           activeElement.value.substring(end)
    }
    
    // Update Vue model
    if (activeElement === document.querySelector('textarea[v-model="currentLanguage.description"]')) {
      currentLanguage.value.description = activeElement.value
    } else if (activeElement === document.querySelector('textarea[v-model="currentLesson.main_content"]')) {
      currentLesson.value.main_content = activeElement.value
    } else if (activeElement === document.querySelector('textarea[v-model="currentSection.content"]')) {
      currentSection.value.content = activeElement.value
    }
  }
}

// Chart creation functions
function createLessonsPerLanguageChart() {
  if (lessonsPerLanguageChartInstance) {
    lessonsPerLanguageChartInstance.destroy()
  }

  const ctx = lessonsPerLanguageChart.value.getContext('2d')
  lessonsPerLanguageChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: languages.value.map(lang => lang.name),
      datasets: [{
        label: 'Number of Lessons',
        data: languages.value.map(lang => lang.total_lessons),
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
          '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
        ],
        borderColor: [
          '#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed',
          '#0891b2', '#65a30d', '#ea580c', '#db2777', '#4f46e5'
        ],
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
          text: 'Lessons per Programming Language'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Lessons'
          }
        }
      }
    }
  })
}

function createSectionsShareChart() {
  if (sectionsShareChartInstance) {
    sectionsShareChartInstance.destroy()
  }

  const ctx = sectionsShareChart.value.getContext('2d')
  
  // Calculate sections per language
  const languageSections = languages.value.map(lang => {
    const langLessons = lessons.value.filter(lesson => lesson.language_id === lang.id)
    const totalSections = langLessons.reduce((sum, lesson) => sum + lesson.total_sections, 0)
    return {
      language: lang.name,
      sections: totalSections
    }
  })

  sectionsShareChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: languageSections.map(item => item.language),
      datasets: [{
        data: languageSections.map(item => item.sections),
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
          '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
        ],
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
        },
        title: {
          display: true,
          text: 'Sections Distribution by Language'
        }
      }
    }
  })
}

function createLessonsOverTimeChart() {
  if (lessonsOverTimeChartInstance) {
    lessonsOverTimeChartInstance.destroy()
  }

  const ctx = lessonsOverTimeChart.value.getContext('2d')
  
  // Generate sample timeline data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const lessonsData = [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42]

  lessonsOverTimeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Total Lessons',
        data: lessonsData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Lesson Creation Timeline'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Lessons'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      }
    }
  })
}

function createSectionsPerLessonChart() {
  if (sectionsPerLessonChartInstance) {
    sectionsPerLessonChartInstance.destroy()
  }

  const ctx = sectionsPerLessonChart.value.getContext('2d')
  
  // Get top lessons by section count
  const topLessons = [...lessons.value]
    .sort((a, b) => b.total_sections - a.total_sections)
    .slice(0, 8)

  sectionsPerLessonChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topLessons.map(lesson => lesson.title.substring(0, 20) + '...'),
      datasets: [{
        label: 'Number of Sections',
        data: topLessons.map(lesson => lesson.total_sections),
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
        },
        title: {
          display: true,
          text: 'Top Lessons by Section Count'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Sections'
          }
        }
      }
    }
  })
}

function createActivityTimelineChart() {
  if (activityTimelineChartInstance) {
    activityTimelineChartInstance.destroy()
  }

  const ctx = activityTimelineChart.value.getContext('2d')
  
  // Generate heatmap-like data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}AM`).concat(
    Array.from({ length: 6 }, (_, i) => `${i + 1}PM`)
  )

  // Generate random activity data
  const activityData = hours.map(() => 
    days.map(() => Math.floor(Math.random() * 10))
  )

  activityTimelineChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: days.map((day, dayIndex) => ({
        label: day,
        data: activityData.map(hourData => hourData[dayIndex]),
        backgroundColor: `hsl(${dayIndex * 60}, 70%, 50%)`
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Weekly Activity Heatmap'
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Time of Day'
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Activity Level'
          }
        }
      }
    }
  })
}

function createSectionTypesChart() {
  if (sectionTypesChartInstance) {
    sectionTypesChartInstance.destroy()
  }

  const ctx = sectionTypesChart.value.getContext('2d')
  
  const textOnlySections = sections.value.filter(s => !s.code_example).length
  const codeSections = sections.value.filter(s => s.code_example).length

  sectionTypesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Text Only', 'With Code Examples'],
      datasets: [{
        label: 'Number of Sections',
        data: [textOnlySections, codeSections],
        backgroundColor: ['#3b82f6', '#10b981'],
        borderColor: ['#2563eb', '#059669'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Section Types Distribution'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Sections'
          }
        }
      }
    }
  })
}

function createSectionCreationChart() {
  if (sectionCreationChartInstance) {
    sectionCreationChartInstance.destroy()
  }

  const ctx = sectionCreationChart.value.getContext('2d')
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const sectionsData = [15, 28, 42, 35, 58, 72]

  sectionCreationChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Sections Created',
        data: sectionsData,
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
      plugins: {
        title: {
          display: true,
          text: 'Section Creation Trends'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sections Created'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      }
    }
  })
}

function createOrderDistributionChart() {
  if (orderDistributionChartInstance) {
    orderDistributionChartInstance.destroy()
  }

  const ctx = orderDistributionChart.value.getContext('2d')
  
  // Analyze order index distribution
  const orderCounts = {}
  sections.value.forEach(section => {
    orderCounts[section.order_index] = (orderCounts[section.order_index] || 0) + 1
  })

  const orderLabels = Object.keys(orderCounts).sort((a, b) => a - b)
  const orderData = orderLabels.map(order => orderCounts[order])

  orderDistributionChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: orderLabels.map(order => `Order ${order}`),
      datasets: [{
        label: 'Number of Sections',
        data: orderData,
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Section Order Distribution'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Sections'
          }
        }
      }
    }
  })
}

function createHierarchyChart() {
  if (hierarchyChartInstance) {
    hierarchyChartInstance.destroy()
  }

  const ctx = hierarchyChart.value.getContext('2d')
  
  // Create a radar chart showing lesson complexity
  const topLessons = lessons.value.slice(0, 3)
  const metrics = ['Sections', 'Content Depth', 'Code Examples', 'Structure', 'Engagement']

  hierarchyChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: metrics,
      datasets: topLessons.map((lesson, index) => ({
        label: lesson.title,
        data: metrics.map(() => Math.floor(Math.random() * 80) + 20),
        backgroundColor: `rgba(${index * 80}, ${index * 100}, 255, 0.2)`,
        borderColor: `rgb(${index * 80}, ${index * 100}, 255)`,
        borderWidth: 2,
        pointBackgroundColor: `rgb(${index * 80}, ${index * 100}, 255)`
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Lesson Complexity Analysis'
        }
      }
    }
  })
}

// Initialize all charts when analytics view is active
function initializeCharts() {
  nextTick(() => {
    if (activeView.value === 'language-insights') {
      createLessonsPerLanguageChart()
      createSectionsShareChart()
      createLessonsOverTimeChart()
    } else if (activeView.value === 'lesson-insights') {
      createSectionsPerLessonChart()
      createActivityTimelineChart()
      createSectionTypesChart()
    } else if (activeView.value === 'section-insights') {
      createSectionCreationChart()
      createOrderDistributionChart()
      createHierarchyChart()
    }
  })
}

// Computed properties for filtered data
const filteredLanguages = computed(() => {
  let filtered = languages.value

  // Search filter
  if (languageFilters.value.search) {
    const search = languageFilters.value.search.toLowerCase()
    filtered = filtered.filter(lang => 
      lang.name.toLowerCase().includes(search) ||
      lang.slug.toLowerCase().includes(search) ||
      lang.description.toLowerCase().includes(search)
    )
  }

  // Sort filter
  if (languageFilters.value.sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (languageFilters.value.sort === 'lessons') {
    filtered.sort((a, b) => b.total_lessons - a.total_lessons)
  } else if (languageFilters.value.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (languageFilters.value.sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  return filtered
})

const filteredLessons = computed(() => {
  let filtered = lessons.value

  // Search filter
  if (lessonFilters.value.search) {
    const search = lessonFilters.value.search.toLowerCase()
    filtered = filtered.filter(lesson => 
      lesson.title.toLowerCase().includes(search) ||
      lesson.description.toLowerCase().includes(search)
    )
  }

  // Language filter
  if (lessonFilters.value.language) {
    filtered = filtered.filter(lesson => lesson.language_id === lessonFilters.value.language)
  }

  // Sort filter
  if (lessonFilters.value.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (lessonFilters.value.sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (lessonFilters.value.sort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  } else if (lessonFilters.value.sort === 'sections') {
    filtered.sort((a, b) => b.total_sections - a.total_sections)
  }

  return filtered
})

const filteredSections = computed(() => {
  let filtered = sections.value

  // Search filter
  if (sectionFilters.value.search) {
    const search = sectionFilters.value.search.toLowerCase()
    filtered = filtered.filter(section => 
      section.subtitle.toLowerCase().includes(search) ||
      section.content.toLowerCase().includes(search)
    )
  }

  // Lesson filter
  if (sectionFilters.value.lesson) {
    filtered = filtered.filter(section => section.lesson_id === sectionFilters.value.lesson)
  }

  // Sort filter
  if (sectionFilters.value.sort === 'order') {
    filtered.sort((a, b) => a.order_index - b.order_index)
  } else if (sectionFilters.value.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (sectionFilters.value.sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  return filtered
})

// Helper functions
function getLanguageName(languageId) {
  const lang = languages.value.find(l => l.id === languageId)
  return lang ? lang.name : 'Unknown'
}

function getLessonTitle(lessonId) {
  const lesson = lessons.value.find(l => l.id === lessonId)
  return lesson ? lesson.title : 'Unknown'
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
  
  // Reset current items when switching to add views
  if (view === 'add-language') {
    currentLanguage.value = createEmptyLanguage()
  } else if (view === 'create-lesson') {
    currentLesson.value = createEmptyLesson()
  } else if (view === 'add-section') {
    currentSection.value = createEmptySection()
  }

  // Initialize charts when switching to analytics views
  if (view.includes('insights')) {
    nextTick(() => {
      setTimeout(initializeCharts, 100)
    })
  }
}

// CRUD Operations (same as before)
function editLanguage(language) {
  currentLanguage.value = { ...language }
  activeView.value = 'edit-language'
}

function editLesson(lesson) {
  currentLesson.value = { ...lesson }
  activeView.value = 'edit-lesson'
}

function editSection(section) {
  currentSection.value = { ...section }
  activeView.value = 'edit-section'
}

function previewLesson(lesson) {
  currentLesson.value = { ...lesson }
  currentLessonSections.value = sections.value.filter(s => s.lesson_id === lesson.id)
    .sort((a, b) => a.order_index - b.order_index)
  activeView.value = 'lesson-preview'
}

async function saveLanguage() {
  try {
    if (activeView.value === 'add-language') {
      const newLanguage = {
        ...currentLanguage.value,
        id: Date.now(),
        total_lessons: 0,
        created_at: new Date().toISOString()
      }
      languages.value.push(newLanguage)
    } else {
      const index = languages.value.findIndex(l => l.id === currentLanguage.value.id)
      if (index !== -1) {
        languages.value[index] = { ...currentLanguage.value }
      }
    }
    
    setActiveView('languages')
  } catch (error) {
    console.error('Failed to save language:', error)
  }
}

async function saveLesson() {
  try {
    if (activeView.value === 'create-lesson') {
      const newLesson = {
        ...currentLesson.value,
        id: Date.now(),
        total_sections: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      lessons.value.push(newLesson)
    } else {
      const index = lessons.value.findIndex(l => l.id === currentLesson.value.id)
      if (index !== -1) {
        lessons.value[index] = { 
          ...currentLesson.value,
          updated_at: new Date().toISOString()
        }
      }
    }
    
    setActiveView('lessons')
  } catch (error) {
    console.error('Failed to save lesson:', error)
  }
}

async function saveSection() {
  try {
    if (activeView.value === 'add-section') {
      const newSection = {
        ...currentSection.value,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      sections.value.push(newSection)
      
      // Update lesson section count
      const lessonIndex = lessons.value.findIndex(l => l.id === currentSection.value.lesson_id)
      if (lessonIndex !== -1) {
        lessons.value[lessonIndex].total_sections++
      }
    } else {
      const index = sections.value.findIndex(s => s.id === currentSection.value.id)
      if (index !== -1) {
        sections.value[index] = { 
          ...currentSection.value,
          updated_at: new Date().toISOString()
        }
      }
    }
    
    setActiveView('sections')
  } catch (error) {
    console.error('Failed to save section:', error)
  }
}

function deleteLanguage(language) {
  if (language.total_lessons > 0) {
    alert(`Cannot delete "${language.name}" because it has ${language.total_lessons} lessons. Please delete or reassign the lessons first.`)
    return
  }
  
  if (confirm(`Are you sure you want to delete "${language.name}"?`)) {
    languages.value = languages.value.filter(l => l.id !== language.id)
  }
}

function deleteLesson(lesson) {
  if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
    // Delete associated sections first
    sections.value = sections.value.filter(s => s.lesson_id !== lesson.id)
    // Then delete lesson
    lessons.value = lessons.value.filter(l => l.id !== lesson.id)
  }
}

function deleteSection(section) {
  const lessonSections = sections.value.filter(s => s.lesson_id === section.lesson_id)
  if (lessonSections.length === 1) {
    alert('Cannot delete the only section in a lesson. Lessons must have at least one section.')
    return
  }
  
  if (confirm(`Are you sure you want to delete this section?`)) {
    sections.value = sections.value.filter(s => s.id !== section.id)
    
    // Update lesson section count
    const lessonIndex = lessons.value.findIndex(l => l.id === section.lesson_id)
    if (lessonIndex !== -1) {
      lessons.value[lessonIndex].total_sections--
    }
  }
}

// Clean up chart instances
onUnmounted(() => {
  const charts = [
    lessonsPerLanguageChartInstance,
    sectionsShareChartInstance,
    lessonsOverTimeChartInstance,
    sectionsPerLessonChartInstance,
    activityTimelineChartInstance,
    sectionTypesChartInstance,
    sectionCreationChartInstance,
    orderDistributionChartInstance,
    hierarchyChartInstance
  ]
  
  charts.forEach(chart => {
    if (chart) {
      chart.destroy()
    }
  })
})

// Initialize with sample data
onMounted(() => {
  // Sample languages
  languages.value = [
    {
      id: 1,
      name: 'JavaScript',
      slug: 'javascript',
      description: 'The programming language of the web. Used for both frontend and backend development.',
      total_lessons: 5,
      created_at: '2024-01-15'
    },
    {
      id: 2,
      name: 'Python',
      slug: 'python',
      description: 'A versatile programming language known for its simplicity and readability.',
      total_lessons: 3,
      created_at: '2024-01-20'
    },
    {
      id: 3,
      name: 'Java',
      slug: 'java',
      description: 'A robust, object-oriented programming language used for enterprise applications.',
      total_lessons: 2,
      created_at: '2024-02-01'
    },
    {
      id: 4,
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
      total_lessons: 4,
      created_at: '2024-02-10'
    },
    {
      id: 5,
      name: 'Go',
      slug: 'go',
      description: 'Open source programming language that makes it easy to build simple, reliable, and efficient software.',
      total_lessons: 1,
      created_at: '2024-02-15'
    }
  ]

  // Sample lessons
  lessons.value = [
    {
      id: 1,
      language_id: 1,
      title: 'Introduction to Variables',
      slug: 'introduction-to-variables',
      description: 'Learn about variables and data types in JavaScript',
      main_content: '# Variables in JavaScript\n\nVariables are used to store data values...',
      order_index: 1,
      total_sections: 3,
      created_at: '2024-01-16',
      updated_at: '2024-01-16'
    },
    {
      id: 2,
      language_id: 1,
      title: 'Functions and Scope',
      slug: 'functions-and-scope',
      description: 'Understanding functions and variable scope',
      main_content: '# Functions\n\nFunctions are reusable blocks of code...',
      order_index: 2,
      total_sections: 2,
      created_at: '2024-01-18',
      updated_at: '2024-01-18'
    },
    {
      id: 3,
      language_id: 2,
      title: 'Python Basics',
      slug: 'python-basics',
      description: 'Getting started with Python programming',
      main_content: '# Python Basics\n\nPython is known for its simplicity...',
      order_index: 1,
      total_sections: 4,
      created_at: '2024-01-25',
      updated_at: '2024-01-25'
    }
  ]

  // Sample sections
  sections.value = [
    {
      id: 1,
      lesson_id: 1,
      subtitle: 'What are Variables?',
      content: 'Variables are containers for storing data values...',
      code_example: 'let name = "John";\nconst age = 30;',
      example_id: 'vars-intro',
      order_index: 1,
      created_at: '2024-01-16',
      updated_at: '2024-01-16'
    },
    {
      id: 2,
      lesson_id: 1,
      subtitle: 'Variable Declaration',
      content: 'In JavaScript, you can declare variables using var, let, or const...',
      code_example: 'var x = 5;\nlet y = 10;\nconst z = 15;',
      example_id: 'var-declaration',
      order_index: 2,
      created_at: '2024-01-16',
      updated_at: '2024-01-16'
    },
    {
      id: 3,
      lesson_id: 1,
      subtitle: 'Data Types',
      content: 'JavaScript has several data types including strings, numbers, booleans...',
      code_example: null,
      example_id: 'data-types',
      order_index: 3,
      created_at: '2024-01-16',
      updated_at: '2024-01-16'
    },
    {
      id: 4,
      lesson_id: 2,
      subtitle: 'Function Declaration',
      content: 'Functions can be declared in several ways in JavaScript...',
      code_example: 'function greet(name) {\n  return `Hello, ${name}!`;\n}',
      example_id: 'func-declaration',
      order_index: 1,
      created_at: '2024-01-18',
      updated_at: '2024-01-18'
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

.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  font-style: italic;
  margin-top: 1em;
  margin-bottom: 1em;
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