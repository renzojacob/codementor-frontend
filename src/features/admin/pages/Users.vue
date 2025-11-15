<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600 mt-2">Manage all platform users, roles, progress, and moderation</p>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export Data
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Invite User
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ stats.activeUsers }} active users</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg Progress</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.avgProgress }}%</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Across all learning paths</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending Actions</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pendingApprovals }}</p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Accounts requiring review</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">AI Interactions</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.aiInteractions }}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Last 7 days</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <!-- Filters and Search -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="filters.search"
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search users by name, email, or ID..."
                @input="debouncedSearch"
              >
            </div>

            <!-- Role Filter -->
            <select v-model="filters.role" @change="loadUsers" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Roles</option>
              <option v-for="role in roles" :key="role.role_id" :value="role.role_id">{{ role.role_name }}</option>
            </select>

            <!-- Status Filter -->
            <select v-model="filters.status" @change="loadUsers" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div class="flex items-center gap-3">
            <!-- Results per page -->
            <select v-model="pagination.perPage" @change="loadUsers" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option v-for="n in [10, 25, 50, 100]" :key="n" :value="n">{{ n }} per page</option>
            </select>

            <!-- Advanced Filters Toggle -->
            <button @click="showAdvancedFilters = !showAdvancedFilters" class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Advanced Filters -->
        <div v-if="showAdvancedFilters" class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
              <div class="flex gap-2">
                <input v-model="filters.dateFrom" type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <input v-model="filters.dateTo" type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Activity</label>
              <select v-model="filters.lastActivity" @change="loadUsers" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Progress Range</label>
              <select v-model="filters.progressRange" @change="loadUsers" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Any Progress</option>
                <option value="0-25">0-25%</option>
                <option value="25-50">25-50%</option>
                <option value="50-75">50-75%</option>
                <option value="75-100">75-100%</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button @click="clearFilters" class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Clear Filters
            </button>
            <button @click="loadUsers" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                <div class="flex justify-center">
                  <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p class="mt-2">Loading users...</p>
              </td>
            </tr>
            
            <tr v-else-if="users.length === 0" class="hover:bg-gray-50">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                <p class="mt-2 text-sm font-medium text-gray-900">No users found</p>
                <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </td>
            </tr>

            <tr v-else v-for="user in users" :key="user.user_id" class="hover:bg-gray-50 transition-colors">
              <!-- User Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 relative">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {{ getUserInitials(user.full_name) }}
                    </div>
                    <div :class="['absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white', getStatusDotClass(user.account_status)]"></div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.full_name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                    <div class="text-xs text-gray-400">ID: {{ user.user_id }}</div>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getRoleClass(user.role_id)]">
                  {{ getRoleName(user.role_id) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusClass(user.account_status)]">
                  {{ user.account_status }}
                </span>
              </td>

              <!-- Progress -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300" 
                      :class="getProgressColor(user.progress?.overall_progress || 0)"
                      :style="{ width: (user.progress?.overall_progress || 0) + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 min-w-8">{{ user.progress?.overall_progress || 0 }}%</span>
                </div>
              </td>

              <!-- Last Login -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.last_login_at) || 'Never' }}
              </td>

              <!-- Joined -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.created_at) }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-1">
                  <button 
                    @click="openUserDetail(user)" 
                    class="text-blue-600 hover:text-blue-900 p-1 rounded transition"
                    title="View Details"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"/>
                    </svg>
                  </button>
                  
                  <button 
                    @click="openRoleModal(user)" 
                    class="text-purple-600 hover:text-purple-900 p-1 rounded transition"
                    title="Change Role"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                    </svg>
                  </button>
                  
                  <button 
                    @click="openModerationModal(user)" 
                    class="text-red-600 hover:text-red-900 p-1 rounded transition"
                    title="Moderate Account"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ pagination.from }}</span> to <span class="font-medium">{{ pagination.to }}</span> of 
            <span class="font-medium">{{ pagination.total }}</span> results
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="previousPage"
              :disabled="pagination.currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>
            
            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 border text-sm rounded-lg transition',
                  page === pagination.currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button
              @click="nextPage"
              :disabled="pagination.currentPage === pagination.lastPage"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- User Detail Modal -->
  <div v-if="showUserDetailModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeUserDetailModal"></div>

      <!-- Modal panel -->
      <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button @click="closeUserDetailModal" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="bg-white px-6 py-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <div class="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-xl">
                {{ getUserInitials(selectedUser?.full_name) }}
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">{{ selectedUser?.full_name }}</h3>
                <p class="text-gray-600">{{ selectedUser?.email }} • ID: {{ selectedUser?.user_id }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getRoleClass(selectedUser?.role_id)]">
                    {{ getRoleName(selectedUser?.role_id) }}
                  </span>
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusClass(selectedUser?.account_status)]">
                    {{ selectedUser?.account_status }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openRoleModal(selectedUser)" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Change Role
              </button>
              <button @click="openModerationModal(selectedUser)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Moderate
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="space-y-6">
            <!-- Progress Overview -->
            <div v-if="activeTab === 'progress'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Progress Stats -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-900">Learning Progress</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-gray-900">{{ userProgress?.total_lessons_completed || 0 }}</div>
                    <div class="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-gray-900">{{ userProgress?.current_lesson || 'None' }}</div>
                    <div class="text-sm text-gray-600">Current Lesson</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-gray-900">{{ userProgress?.percent_completion || 0 }}%</div>
                    <div class="text-sm text-gray-600">Completion</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-gray-900">{{ formatTimeSpent(userProgress?.time_spent) }}</div>
                    <div class="text-sm text-gray-600">Time Spent</div>
                  </div>
                </div>
              </div>

              <!-- Learning Paths -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Learning Paths</h4>
                <div class="space-y-4">
                  <div v-for="path in learningPaths" :key="path.enrollment_id" class="bg-white border border-gray-200 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="font-medium text-gray-900">{{ path.path_name }}</h5>
                      <span class="text-sm text-gray-500">{{ path.progress_percentage }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div class="bg-green-500 h-2 rounded-full transition-all duration-300" :style="{ width: path.progress_percentage + '%' }"></div>
                    </div>
                    <div class="text-sm text-gray-600">
                      <div>Completed: {{ path.completed_lessons }}/{{ path.total_lessons }} lessons</div>
                      <div v-if="path.current_lesson">Current: {{ path.current_lesson }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submissions History -->
            <div v-if="activeTab === 'submissions'">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Code Submissions</h4>
              <div class="space-y-4">
                <div v-for="submission in submissions" :key="submission.submission_id" 
                  class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h5 class="font-medium text-gray-900">{{ submission.challenge_title }}</h5>
                      <p class="text-sm text-gray-500">{{ formatDate(submission.submitted_at) }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <span :class="['px-2 py-1 rounded text-xs font-medium', submission.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                        {{ submission.status }}
                      </span>
                      <span class="text-xs text-gray-500">{{ submission.runtime }}ms • {{ submission.language }}</span>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 rounded-lg p-3 mb-3">
                    <div class="text-sm font-medium text-gray-700 mb-2">Test Results:</div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div v-for="(result, index) in submission.test_case_results?.slice(0, 4)" :key="index"
                        :class="['p-2 rounded text-center', result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                        Test {{ index + 1 }}
                      </div>
                      <div v-if="submission.test_case_results?.length > 4" class="p-2 bg-gray-100 text-gray-600 rounded text-center">
                        +{{ submission.test_case_results.length - 4 }} more
                      </div>
                    </div>
                  </div>

                  <button @click="viewSubmissionCode(submission)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Code →
                  </button>
                </div>
              </div>
            </div>

            <!-- AI Interactions -->
            <div v-if="activeTab === 'ai'">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">AI Assistance History</h4>
              <div class="space-y-4">
                <div v-for="interaction in aiInteractions" :key="interaction.interaction_id" 
                  class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="text-sm text-gray-500 mb-2">{{ formatDate(interaction.timestamp) }}</div>
                  <div class="space-y-3">
                    <div>
                      <div class="text-sm font-medium text-gray-700 mb-1">User:</div>
                      <div class="text-sm text-gray-900 bg-gray-50 p-3 rounded">{{ interaction.user_message }}</div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-700 mb-1">AI Response:</div>
                      <div class="text-sm text-gray-900 bg-blue-50 p-3 rounded whitespace-pre-wrap">{{ interaction.ai_response }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Role Assignment Modal -->
  <div v-if="showRoleModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showRoleModal = false"></div>
      
      <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div class="bg-white px-6 py-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Assign Role</h3>
            <button @click="showRoleModal = false" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">Change role for {{ selectedUser?.full_name }}</p>
          
          <div class="space-y-3">
            <div v-for="role in roles" :key="role.role_id" 
              :class="['p-4 border rounded-lg cursor-pointer transition', selectedRole === role.role_id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300']"
              @click="selectedRole = role.role_id">
              <div class="flex items-center gap-3">
                <div :class="['w-4 h-4 rounded-full border-2 flex items-center justify-center', selectedRole === role.role_id ? 'border-blue-500 bg-blue-500' : 'border-gray-300']">
                  <svg v-if="selectedRole === role.role_id" class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ role.role_name }}</div>
                  <div class="text-sm text-gray-500">{{ role.description }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end gap-3">
            <button @click="showRoleModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              Cancel
            </button>
            <button @click="assignRole" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Assign Role
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Moderation Modal -->
  <div v-if="showModerationModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModerationModal = false"></div>
      
      <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div class="bg-white px-6 py-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Account Moderation</h3>
            <button @click="showModerationModal = false" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <p class="text-sm text-gray-600 mb-4">Manage account status for {{ selectedUser?.full_name }}</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Action</label>
              <select v-model="moderationAction" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="approve">Approve Account</option>
                <option value="suspend">Suspend Account</option>
                <option value="ban">Ban Account</option>
                <option value="reactivate">Reactivate Account</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Reason for Action
                <span class="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea v-model="moderationReason" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Provide a reason for this action..."></textarea>
            </div>
            
            <div v-if="moderationAction === 'ban' || moderationAction === 'suspend'" class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center gap-2 text-red-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <span class="text-sm font-medium">Warning</span>
              </div>
              <p class="text-sm text-red-600 mt-1">This action will restrict user access to the platform.</p>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end gap-3">
            <button @click="showModerationModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              Cancel
            </button>
            <button @click="submitModeration" :class="['px-4 py-2 text-white rounded-lg text-sm font-medium transition', moderationAction === 'ban' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700']">
              Confirm Action
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Submission Code Modal -->
  <div v-if="showCodeModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showCodeModal = false"></div>
      
      <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white px-6 py-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Submission Code</h3>
            <button @click="showCodeModal = false" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <h4 class="font-medium text-gray-900">{{ selectedSubmission?.challenge_title }}</h4>
            <p class="text-sm text-gray-500">{{ selectedSubmission?.language }} • {{ formatDate(selectedSubmission?.submitted_at) }}</p>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <pre class="text-sm text-gray-100 overflow-auto max-h-96"><code>{{ selectedSubmission?.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// State management
const users = ref([])
const loading = ref(false)
const showAdvancedFilters = ref(false)
const showUserDetailModal = ref(false)
const showRoleModal = ref(false)
const showModerationModal = ref(false)
const showCodeModal = ref(false)
const activeTab = ref('progress')

// Data
const selectedUser = ref(null)
const selectedRole = ref('')
const selectedSubmission = ref(null)
const userProgress = ref({})
const learningPaths = ref([])
const submissions = ref([])
const aiInteractions = ref([])

// Filters and pagination
const filters = ref({
  search: '',
  role: '',
  status: '',
  dateFrom: '',
  dateTo: '',
  lastActivity: '',
  progressRange: ''
})

const pagination = ref({
  currentPage: 1,
  perPage: 10,
  total: 0,
  lastPage: 1,
  from: 0,
  to: 0
})

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  avgProgress: 0,
  pendingApprovals: 0,
  aiInteractions: 0
})

// Moderation
const moderationAction = ref('suspend')
const moderationReason = ref('')

// Mock data for roles (in real app, this would come from API)
const roles = ref([
  { role_id: 1, role_name: 'Admin', description: 'Full system access and management' },
  { role_id: 2, role_name: 'User', description: 'Standard platform access' }
])

const tabs = [
  { id: 'progress', name: 'Progress Overview' },
  { id: 'submissions', name: 'Submissions History' },
  { id: 'ai', name: 'AI Interactions' }
]

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const totalPages = pagination.value.lastPage
  const current = pagination.value.currentPage
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    } else if (current >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    }
  }
  return pages
})

// Utility functions
function getUserInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

function getRoleName(roleId) {
  const role = roles.value.find(r => r.role_id === roleId)
  return role ? role.role_name : 'User'
}

function getRoleClass(roleId) {
  const classes = {
    1: 'bg-purple-100 text-purple-800', // Admin
    2: 'bg-gray-100 text-gray-800'      // User
  }
  return classes[roleId] || classes[2]
}

function getStatusClass(status) {
  const classes = {
    active: 'bg-green-100 text-green-800',
    suspended: 'bg-yellow-100 text-yellow-800',
    banned: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || classes.pending
}

function getStatusDotClass(status) {
  const classes = {
    active: 'bg-green-500',
    suspended: 'bg-yellow-500',
    banned: 'bg-red-500',
    pending: 'bg-gray-500'
  }
  return classes[status] || classes.pending
}

function getProgressColor(progress) {
  if (progress < 25) return 'bg-red-500'
  if (progress < 50) return 'bg-yellow-500'
  if (progress < 75) return 'bg-blue-500'
  return 'bg-green-500'
}

function formatDate(dateString) {
  if (!dateString) return 'Never'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

function formatTimeSpent(seconds) {
  if (!seconds) return '0h 0m'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

// API functions
async function loadUsers() {
  loading.value = true
  try {
    // In real app, this would be an API call
    // const response = await fetch(`/api/admin/users?page=${pagination.value.currentPage}&perPage=${pagination.value.perPage}&${new URLSearchParams(filters.value)}`)
    // const data = await response.json()
    
    // Mock data for demonstration
    const mockUsers = Array.from({ length: 25 }, (_, i) => ({
      user_id: `user_${i + 1}`,
      full_name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role_id: i % 5 === 0 ? 1 : 2, // Every 5th user is admin
      account_status: ['active', 'active', 'active', 'suspended', 'banned', 'pending'][i % 6],
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      last_login_at: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
      progress: {
        overall_progress: Math.floor(Math.random() * 100)
      }
    }))

    users.value = mockUsers
    pagination.value.total = 25
    pagination.value.lastPage = Math.ceil(25 / pagination.value.perPage)
    pagination.value.from = (pagination.value.currentPage - 1) * pagination.value.perPage + 1
    pagination.value.to = Math.min(pagination.value.currentPage * pagination.value.perPage, 25)
    
    // Update stats
    stats.value.totalUsers = 25
    stats.value.activeUsers = 18
    stats.value.avgProgress = 42
    stats.value.pendingApprovals = 3
    stats.value.aiInteractions = 156
    
  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}

async function loadUserDetails(userId) {
  try {
    // Mock API calls for user details
    userProgress.value = {
      total_lessons_completed: Math.floor(Math.random() * 50),
      current_lesson: 'Advanced JavaScript Functions',
      percent_completion: Math.floor(Math.random() * 100),
      time_spent: Math.floor(Math.random() * 10000)
    }

    learningPaths.value = [
      {
        enrollment_id: 1,
        path_name: 'JavaScript Fundamentals',
        progress_percentage: 75,
        completed_lessons: 15,
        total_lessons: 20,
        current_lesson: 'Array Methods'
      },
      {
        enrollment_id: 2,
        path_name: 'React Development',
        progress_percentage: 40,
        completed_lessons: 8,
        total_lessons: 20,
        current_lesson: 'State Management'
      }
    ]

    submissions.value = [
      {
        submission_id: 1,
        challenge_title: 'Two Sum Problem',
        status: 'passed',
        runtime: 45,
        language: 'JavaScript',
        submitted_at: new Date().toISOString(),
        test_case_results: [
          { passed: true },
          { passed: true },
          { passed: true },
          { passed: true },
          { passed: true }
        ],
        code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}'
      },
      {
        submission_id: 2,
        challenge_title: 'Palindrome Checker',
        status: 'failed',
        runtime: 12,
        language: 'Python',
        submitted_at: new Date(Date.now() - 86400000).toISOString(),
        test_case_results: [
          { passed: true },
          { passed: false },
          { passed: true },
          { passed: false }
        ],
        code: 'def is_palindrome(s):\n    return s == s[::-1]'
      }
    ]

    aiInteractions.value = [
      {
        interaction_id: 1,
        user_message: 'How do I solve the two sum problem?',
        ai_response: 'The two sum problem can be solved efficiently using a hash map. Here\'s the approach:\n\n1. Create a map to store numbers and their indices\n2. For each number, calculate the complement (target - current number)\n3. If complement exists in map, return the indices\n4. Otherwise, add current number to map',
        timestamp: new Date().toISOString()
      },
      {
        interaction_id: 2,
        user_message: 'Why is my palindrome function failing for empty strings?',
        ai_response: 'Your function should handle edge cases. For empty strings, you might want to return True since an empty string is technically a palindrome. Also consider case sensitivity and non-alphanumeric characters.',
        timestamp: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  } catch (error) {
    console.error('Failed to load user details:', error)
  }
}

// Event handlers
function debouncedSearch() {
  clearTimeout(debouncedSearch.timeout)
  debouncedSearch.timeout = setTimeout(() => {
    loadUsers()
  }, 500)
}

function clearFilters() {
  filters.value = {
    search: '',
    role: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    lastActivity: '',
    progressRange: ''
  }
  loadUsers()
}

function openUserDetail(user) {
  selectedUser.value = user
  showUserDetailModal.value = true
  activeTab.value = 'progress'
  loadUserDetails(user.user_id)
}

function closeUserDetailModal() {
  showUserDetailModal.value = false
  selectedUser.value = null
}

function openRoleModal(user) {
  selectedUser.value = user
  selectedRole.value = user.role_id
  showRoleModal.value = true
}

function openModerationModal(user) {
  selectedUser.value = user
  moderationAction.value = user.account_status === 'pending' ? 'approve' : 'suspend'
  moderationReason.value = ''
  showModerationModal.value = true
}

function viewSubmissionCode(submission) {
  selectedSubmission.value = submission
  showCodeModal.value = true
}

async function assignRole() {
  if (!selectedUser.value) return
  
  try {
    // API call to update user role
    // await fetch(`/api/admin/users/${selectedUser.value.user_id}/role`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ role_id: selectedRole.value })
    // })
    
    // Update local state
    selectedUser.value.role_id = selectedRole.value
    showRoleModal.value = false
    
    // Refresh users list
    loadUsers()
  } catch (error) {
    console.error('Failed to assign role:', error)
  }
}

async function submitModeration() {
  if (!selectedUser.value) return
  
  try {
    // API call to moderate user
    // await fetch(`/api/admin/users/${selectedUser.value.user_id}/moderate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     action: moderationAction.value,
    //     reason: moderationReason.value
    //   })
    // })
    
    // Update local state based on action
    const statusMap = {
      approve: 'active',
      suspend: 'suspended',
      ban: 'banned',
      reactivate: 'active'
    }
    
    selectedUser.value.account_status = statusMap[moderationAction.value]
    showModerationModal.value = false
    
    // Refresh users list
    loadUsers()
  } catch (error) {
    console.error('Failed to moderate user:', error)
  }
}

// Pagination
function previousPage() {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--
    loadUsers()
  }
}

function nextPage() {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    pagination.value.currentPage++
    loadUsers()
  }
}

function goToPage(page) {
  if (typeof page === 'number' && page >= 1 && page <= pagination.value.lastPage) {
    pagination.value.currentPage = page
    loadUsers()
  }
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Smooth transitions */
button, select, input {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for code blocks */
pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>