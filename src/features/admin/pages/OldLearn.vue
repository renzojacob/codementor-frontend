<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-red-800">{{ error }}</span>
        </div>
      </div>

      <!-- Languages Management -->
      <div v-else-if="activeView === 'languages'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Languages Management</h1>
            <p class="text-gray-600 mt-2">Manage programming languages available on the platform</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('languages')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            <button @click="showLanguageForm()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Language
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('languages')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'languages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Languages
            </button>
            <button 
              @click="setActiveView('lessons')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'lessons' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Lessons
            </button>
            <button 
              @click="setActiveView('sections')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'sections' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Sections
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

        <!-- Languages Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="language in languages" :key="language.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ language.name }}</h3>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {{ language.total_lessons || 0 }} lessons
              </span>
            </div>

            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ language.description }}</p>

            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500 font-mono">{{ language.slug }}</span>
              <div class="flex gap-2">
                <button @click="editLanguage(language)" class="p-2 text-gray-400 hover:text-blue-600 transition"
                  title="Edit Language">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="handleDeleteLanguage(language)" class="p-2 text-gray-400 hover:text-red-600 transition"
                  title="Delete Language">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lessons Management -->
      <div v-else-if="activeView === 'lessons'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Lessons Management</h1>
            <p class="text-gray-600 mt-2">Manage lessons across different programming languages</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('lessons')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            <button @click="showLessonForm()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Lesson
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('languages')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'languages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Languages
            </button>
            <button 
              @click="setActiveView('lessons')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'lessons' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Lessons
            </button>
            <button 
              @click="setActiveView('sections')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'sections' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Sections
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

        <!-- Lessons Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-900">All Lessons</h2>
              <div class="flex items-center gap-3">
                <select v-model="lessonFilters.language" @change="loadLessons"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Languages</option>
                  <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="lesson in lessons" :key="lesson.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ lesson.title }}</div>
                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ lesson.description }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ getLanguageName(lesson.language_id) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ lesson.order_index }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {{ lesson.total_sections || 0 }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <button @click="editLesson(lesson)" class="text-green-600 hover:text-green-900 transition"
                          title="Edit Lesson">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button @click="handleDeleteLesson(lesson)" class="text-red-600 hover:text-red-900 transition"
                          title="Delete Lesson">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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

      <!-- Sections Management -->
      <div v-else-if="activeView === 'sections'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Sections Management</h1>
            <p class="text-gray-600 mt-2">Manage lesson sections and content</p>
          </div>
          <div class="flex gap-3">
            <button @click="handleExport('sections')"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            <button @click="showSectionForm()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Section
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('languages')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'languages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Languages
            </button>
            <button 
              @click="setActiveView('lessons')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'lessons' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Lessons
            </button>
            <button 
              @click="setActiveView('sections')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'sections' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Sections
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

        <!-- Sections Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-900">All Sections</h2>
              <div class="flex items-center gap-3">
                <select v-model="sectionFilters.lesson" @change="loadSections"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Lessons</option>
                  <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">{{ lesson.title }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtitle</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code Example</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="section in sections" :key="section.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ section.subtitle }}</div>
                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ section.content }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {{ getLessonTitle(section.lesson_id) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ section.order_index }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span v-if="section.code_example" class="text-green-600">✓</span>
                      <span v-else class="text-gray-400">✗</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <button @click="editSection(section)" class="text-green-600 hover:text-green-900 transition"
                          title="Edit Section">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button @click="handleDeleteSection(section)" class="text-red-600 hover:text-red-900 transition"
                          title="Delete Section">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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

      <!-- Analytics Overview -->
      <div v-else-if="activeView === 'analytics'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Learning Analytics</h1>
            <p class="text-gray-600 mt-2">Overview of learning content and usage statistics</p>
          </div>
          <button @click="handleExport('analytics')"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Analytics
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button 
              @click="setActiveView('languages')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'languages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Languages
            </button>
            <button 
              @click="setActiveView('lessons')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'lessons' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Lessons
            </button>
            <button 
              @click="setActiveView('sections')"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeView === 'sections' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Sections
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
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.languages || 0 }}</div>
                <div class="text-sm text-gray-500">Languages</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.lessons || 0 }}</div>
                <div class="text-sm text-gray-500">Lessons</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.sections || 0 }}</div>
                <div class="text-sm text-gray-500">Sections</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ analytics.totals?.sectionsWithCode || 0 }}</div>
                <div class="text-sm text-gray-500">Code Examples</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lessons per Language -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Lessons per Language</h3>
          <div class="space-y-3">
            <div v-for="item in analytics.lessonsPerLanguage || []" :key="item.name"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-700">{{ item.name }}</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ item.lesson_count }} lessons
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Language Form Modal -->
      <div v-if="showLanguageModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                {{ currentLanguage?.id ? 'Edit Language' : 'Add New Language' }}
              </h2>
              <button @click="closeLanguageModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveLanguage" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input v-model="currentLanguage.name" type="text" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="JavaScript, Python, PHP...">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <input v-model="currentLanguage.slug" type="text" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="javascript, python, php...">
                  <p class="mt-1 text-sm text-gray-500">URL-friendly identifier for the language</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Markdown Editor -->
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-700">Markdown Editor</span>
                        <div class="flex gap-1">
                          <button type="button" @click="markdownHelpers.bold(descriptionTextarea)"
                            class="p-1 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded">B</button>
                          <button type="button" @click="markdownHelpers.italic(descriptionTextarea)"
                            class="p-1 text-sm italic text-gray-600 hover:bg-gray-100 rounded">I</button>
                          <button type="button" @click="markdownHelpers.heading(1, descriptionTextarea)"
                            class="p-1 text-sm text-gray-600 hover:bg-gray-100 rounded">H1</button>
                          <button type="button" @click="markdownHelpers.code(descriptionTextarea)"
                            class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded">C</button>
                        </div>
                      </div>
                      <textarea ref="descriptionTextarea" v-model="currentLanguage.description" rows="8"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="Describe the programming language using Markdown..."></textarea>
                    </div>

                    <!-- Live Preview -->
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-700">Live Preview</span>
                      </div>
                      <div class="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                        <div v-html="renderMarkdown(currentLanguage.description)" class="prose prose-sm max-w-none">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" @click="closeLanguageModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" :disabled="loading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ currentLanguage?.id ? 'Update Language' : 'Create Language' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Lesson Form Modal -->
      <div v-if="showLessonModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                {{ currentLesson?.id ? 'Edit Lesson' : 'Create New Lesson' }}
              </h2>
              <button @click="closeLessonModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveLesson" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input v-model="currentLesson.title" type="text" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Lesson title...">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                  <select v-model="currentLesson.language_id" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a language</option>
                    <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea v-model="currentLesson.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Lesson description..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                  <input v-model="currentLesson.order_index" type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Order in the course...">
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" @click="closeLessonModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" :disabled="loading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ currentLesson?.id ? 'Update Lesson' : 'Create Lesson' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Section Form Modal -->
      <div v-if="showSectionModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                {{ currentSection?.id ? 'Edit Section' : 'Create New Section' }}
              </h2>
              <button @click="closeSectionModal" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveSection" class="space-y-6">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Lesson *</label>
                  <select v-model="currentSection.lesson_id" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a lesson</option>
                    <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">{{ lesson.title }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle *</label>
                  <input v-model="currentSection.subtitle" type="text" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Section subtitle...">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                  <input v-model="currentSection.order_index" type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Order in the lesson...">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea v-model="currentSection.content" rows="6"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Section content..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Code Example</label>
                  <textarea v-model="currentSection.code_example" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Code example..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Example ID</label>
                  <input v-model="currentSection.example_id" type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional example identifier...">
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" @click="closeSectionModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" :disabled="loading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ currentSection?.id ? 'Update Section' : 'Create Section' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminLearn } from '@/core/composables/useAdminLearn'
import { useMarkdown } from '@/core/composables/useMarkdown'

// Composables
const {
  loading,
  error,
  languages,
  lessons,
  sections,
  analytics,
  currentLanguage,
  currentLesson,
  currentSection,
  fetchLanguages,
  fetchLessons,
  fetchSections,
  fetchAnalytics,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  createLesson,
  updateLesson,
  deleteLesson,
  createSection,
  updateSection,
  deleteSection,
  setCurrentLanguage,
  setCurrentLesson,
  setCurrentSection,
  resetCurrentItems,
  exportContent
} = useAdminLearn()

// Component State
const activeView = ref('languages')
const showLanguageModal = ref(false)
const showLessonModal = ref(false)
const showSectionModal = ref(false)
const descriptionTextarea = ref(null)

// Filters
const lessonFilters = ref({
  language: ''
})

const sectionFilters = ref({
  lesson: ''
})

const { renderMarkdown, markdownHelpers } = useMarkdown()

// View management
function setActiveView(view) {
  activeView.value = view
  loadData()
}

// Data loading
async function loadData() {
  try {
    if (activeView.value === 'languages') {
      await fetchLanguages()
    } else if (activeView.value === 'lessons') {
      await loadLessons()
    } else if (activeView.value === 'sections') {
      await loadSections()
    } else if (activeView.value === 'analytics') {
      await fetchAnalytics()
    }
  } catch (err) {
    console.error('Failed to load data:', err)
  }
}

// Lessons loading with filters
async function loadLessons() {
  try {
    const params = {}
    if (lessonFilters.value.language) {
      params.language_id = lessonFilters.value.language
    }
    await fetchLessons(params)
  } catch (err) {
    console.error('Failed to load lessons:', err)
  }
}

// Sections loading with filters
async function loadSections() {
  try {
    const params = {}
    if (sectionFilters.value.lesson) {
      params.lesson_id = sectionFilters.value.lesson
    }
    await fetchSections(params)
  } catch (err) {
    console.error('Failed to load sections:', err)
  }
}

// Helper functions
function getLanguageName(languageId) {
  const language = languages.value.find(lang => lang.id === languageId)
  return language ? language.name : 'Unknown'
}

function getLessonTitle(lessonId) {
  const lesson = lessons.value.find(lesson => lesson.id === lessonId)
  return lesson ? lesson.title : 'Unknown'
}

// Language CRUD
function showLanguageForm(language = null) {
  setCurrentLanguage(language)
  showLanguageModal.value = true
}

function closeLanguageModal() {
  showLanguageModal.value = false
  resetCurrentItems()
}

async function saveLanguage() {
  try {
    if (currentLanguage.value.id) {
      await updateLanguage(currentLanguage.value.id, currentLanguage.value)
    } else {
      await createLanguage(currentLanguage.value)
    }
    closeLanguageModal()
  } catch (err) {
    console.error('Failed to save language:', err)
  }
}

async function handleDeleteLanguage(language) {
  if (!confirm(`Are you sure you want to delete "${language.name}"? This action cannot be undone.`)) return

  try {
    await deleteLanguage(language.id)
  } catch (err) {
    console.error('Failed to delete language:', err)
  }
}

function editLanguage(language) {
  showLanguageForm(language)
}

// Lesson CRUD
function showLessonForm(lesson = null) {
  setCurrentLesson(lesson || {
    title: '',
    description: '',
    language_id: '',
    order_index: 0
  })
  showLessonModal.value = true
}

function closeLessonModal() {
  showLessonModal.value = false
  resetCurrentItems()
}

async function saveLesson() {
  try {
    if (currentLesson.value.id) {
      await updateLesson(currentLesson.value.id, currentLesson.value)
    } else {
      await createLesson(currentLesson.value)
    }
    closeLessonModal()
  } catch (err) {
    console.error('Failed to save lesson:', err)
  }
}

async function handleDeleteLesson(lesson) {
  if (!confirm(`Are you sure you want to delete "${lesson.title}"? This will also delete all sections in this lesson.`)) return

  try {
    await deleteLesson(lesson.id)
  } catch (err) {
    console.error('Failed to delete lesson:', err)
  }
}

function editLesson(lesson) {
  showLessonForm(lesson)
}

// Section CRUD
function showSectionForm(section = null) {
  setCurrentSection(section || {
    subtitle: '',
    content: '',
    code_example: '',
    example_id: '',
    lesson_id: '',
    order_index: 0
  })
  showSectionModal.value = true
}

function closeSectionModal() {
  showSectionModal.value = false
  resetCurrentItems()
}

async function saveSection() {
  try {
    if (currentSection.value.id) {
      await updateSection(currentSection.value.id, currentSection.value)
    } else {
      await createSection(currentSection.value)
    }
    closeSectionModal()
  } catch (err) {
    console.error('Failed to save section:', err)
  }
}

async function handleDeleteSection(section) {
  if (!confirm(`Are you sure you want to delete "${section.subtitle}"? This action cannot be undone.`)) return

  try {
    await deleteSection(section.id)
  } catch (err) {
    console.error('Failed to delete section:', err)
  }
}

function editSection(section) {
  showSectionForm(section)
}

// Export functionality
async function handleExport(type) {
  try {
    const data = await exportContent(type)

    // Create download link
    const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert(`Exported ${data.total_records} ${type} successfully!`)
  } catch (err) {
    console.error('Export failed:', err)
  }
}

// Initialize
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
</style>