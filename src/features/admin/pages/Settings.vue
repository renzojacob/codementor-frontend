<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Top Navigation Bar -->
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ settings.siteTitle || 'Admin Platform' }}</span>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="flex items-center space-x-6 text-sm">
            <div class="text-center">
              <div class="font-semibold text-gray-900 dark:text-white">Settings</div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Maintenance Banner -->
    <div v-if="settings.maintenanceActive" class="bg-yellow-500 dark:bg-yellow-600 border-b border-yellow-600 dark:border-yellow-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <span class="text-yellow-900 font-medium">{{ settings.maintenanceMessage || 'Maintenance in progress...' }}</span>
          </div>
          <button @click="toggleMaintenance(false)" class="text-yellow-900 hover:text-yellow-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-2">Configure platform behavior and appearance</p>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex items-center gap-3">
            <button @click="exportSettings" 
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
              Export
            </button>
            
            <button @click="importSettings" 
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              Import
            </button>
            
            <button @click="resetToDefaults" 
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
          </div>
        </div>

        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
          <span>Admin</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-gray-900 dark:text-white font-medium">Settings</span>
        </nav>
      </div>

      <!-- Settings Cards Grid -->
      <div class="space-y-6">
        <!-- 1. Theme Mode -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Theme Mode</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Choose the default theme for the platform</p>
            </div>
            <button @click="saveSetting('themeMode', settings.themeMode)" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <button @click="updateSetting('themeMode', 'light')" 
              :class="['p-4 border-2 rounded-lg transition-all duration-200', 
                settings.themeMode === 'light' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500']">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <div v-if="settings.themeMode === 'light'" class="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div class="text-left">
                  <div class="font-medium text-gray-900 dark:text-white">Light</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Bright theme</div>
                </div>
              </div>
            </button>
            
            <button @click="updateSetting('themeMode', 'dark')" 
              :class="['p-4 border-2 rounded-lg transition-all duration-200', 
                settings.themeMode === 'dark' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500']">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <div v-if="settings.themeMode === 'dark'" class="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div class="text-left">
                  <div class="font-medium text-gray-900 dark:text-white">Dark</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Dark theme</div>
                </div>
              </div>
            </button>
            
            <button @click="updateSetting('themeMode', 'system')" 
              :class="['p-4 border-2 rounded-lg transition-all duration-200', 
                settings.themeMode === 'system' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500']">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <div v-if="settings.themeMode === 'system'" class="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div class="text-left">
                  <div class="font-medium text-gray-900 dark:text-white">System</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Follow OS preference</div>
                </div>
              </div>
            </button>
          </div>
          
          <!-- Theme Preview -->
          <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-gray-900 dark:text-white">Preview</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Current: {{ settings.themeMode }}</span>
            </div>
            <div class="grid grid-cols-3 gap-3 text-xs">
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded p-3 text-center">
                <div class="w-4 h-4 bg-blue-600 rounded mx-auto mb-1"></div>
                <div class="text-gray-900 dark:text-white">Card</div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded p-3 text-center">
                <div class="w-4 h-4 bg-green-600 rounded mx-auto mb-1"></div>
                <div class="text-gray-900 dark:text-white">Success</div>
              </div>
              <div class="bg-gray-900 dark:bg-gray-100 border border-gray-200 dark:border-gray-600 rounded p-3 text-center">
                <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1"></div>
                <div class="text-white dark:text-gray-900">Dark</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Items Per Page -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Items Per Page</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Default number of rows in admin lists</p>
            </div>
            <button @click="saveSetting('itemsPerPage', settings.itemsPerPage)" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="mt-4">
            <select v-model="settings.itemsPerPage" 
              @change="updateSetting('itemsPerPage', settings.itemsPerPage)"
              class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="10">10 items per page</option>
              <option value="25">25 items per page</option>
              <option value="50">50 items per page</option>
              <option value="100">100 items per page</option>
            </select>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Affects: Users, Lessons, Challenges, and other admin lists
            </p>
          </div>
        </div>

        <!-- 3. Dashboard Widgets Visibility -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Widgets</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Choose which KPI cards appear on your dashboard</p>
            </div>
            <button @click="saveSetting('dashboardWidgets', settings.dashboardWidgets)" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <label v-for="widget in dashboardWidgetsList" :key="widget.key" 
              class="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <input type="checkbox" 
                v-model="settings.dashboardWidgets[widget.key]"
                @change="updateSetting('dashboardWidgets', settings.dashboardWidgets)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600">
              <div class="flex-1">
                <div class="font-medium text-gray-900 dark:text-white">{{ widget.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ widget.description }}</div>
              </div>
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="widget.color">
                <component :is="widget.icon" class="w-4 h-4 text-white" />
              </div>
            </label>
          </div>
        </div>

        <!-- 4. Try-It Editor Toggle -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Code Execution</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Enable or disable the in-browser code runner</p>
            </div>
            <button @click="saveSetting('tryItEnabled', settings.tryItEnabled)" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-6 rounded-full transition-colors duration-200 relative"
                :class="settings.tryItEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
                @click="toggleTryItEditor">
                <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                  :class="settings.tryItEnabled ? 'transform translate-x-5' : 'transform translate-x-1'"></div>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ settings.tryItEnabled ? 'Enabled' : 'Disabled' }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ settings.tryItEnabled ? 'Users can run code in browser' : 'Code execution is disabled' }}
                </div>
              </div>
            </div>
            
            <div v-if="!settings.tryItEnabled" class="text-amber-600 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-lg">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              Maintenance Mode
            </div>
          </div>
        </div>

        <!-- 5. Default Lesson Sort Order -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Lesson Sort Order</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Default sorting for lessons listing</p>
            </div>
            <button @click="saveSetting('defaultLessonSort', settings.defaultLessonSort)" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <button v-for="sortOption in sortOptions" :key="sortOption.value"
              @click="updateSetting('defaultLessonSort', sortOption.value)"
              :class="['p-4 border-2 rounded-lg transition-all duration-200 text-left', 
                settings.defaultLessonSort === sortOption.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500']">
              <div class="font-medium text-gray-900 dark:text-white mb-1">{{ sortOption.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ sortOption.description }}</div>
            </button>
          </div>
        </div>

        <!-- 6. Maintenance Banner -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Maintenance Banner</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Show a site-wide maintenance announcement</p>
            </div>
            <button @click="saveMaintenanceSettings" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
          
          <div class="space-y-4 mt-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-6 rounded-full transition-colors duration-200 relative"
                  :class="settings.maintenanceActive ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'"
                  @click="toggleMaintenance(!settings.maintenanceActive)">
                  <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                    :class="settings.maintenanceActive ? 'transform translate-x-5' : 'transform translate-x-1'"></div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ settings.maintenanceActive ? 'Active' : 'Inactive' }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ settings.maintenanceActive ? 'Banner is visible to users' : 'Banner is hidden' }}
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="settings.maintenanceActive">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maintenance Message
              </label>
              <textarea v-model="settings.maintenanceMessage" 
                @input="updateSetting('maintenanceMessage', settings.maintenanceMessage)"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter maintenance message..."></textarea>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This message will be displayed site-wide to all users
              </p>
            </div>
          </div>
        </div>

        <!-- 7. Logo & Site Title -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Branding Preview</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Customize platform logo and title (preview only)</p>
            </div>
            <button @click="saveBrandingSettings" 
              class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Apply Preview
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- Site Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Title
              </label>
              <input v-model="settings.siteTitle" 
                @input="updateSetting('siteTitle', settings.siteTitle)"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter site title...">
            </div>
            
            <!-- Logo Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo Preview
              </label>
              <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                <div v-if="!settings.logoPreview" class="space-y-2">
                  <svg class="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    <button @click="triggerLogoUpload" class="text-blue-600 hover:text-blue-500">
                      Upload a logo
                    </button>
                    or drag and drop
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">
                    PNG, JPG up to 2MB
                  </div>
                </div>
                <div v-else class="space-y-2">
                  <img :src="settings.logoPreview" alt="Logo preview" class="w-16 h-16 mx-auto object-contain">
                  <div class="text-sm text-gray-600 dark:text-gray-400">Logo preview</div>
                  <button @click="removeLogo" class="text-red-600 hover:text-red-500 text-sm">
                    Remove
                  </button>
                </div>
                <input ref="logoInput" type="file" accept="image/*" @change="handleLogoUpload" class="hidden">
              </div>
            </div>
          </div>
          
          <!-- Branding Preview -->
          <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-sm font-medium text-gray-900 dark:text-white mb-3">Branding Preview</div>
            <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <div v-if="settings.logoPreview" class="w-8 h-8">
                <img :src="settings.logoPreview" alt="Logo" class="w-full h-full object-contain">
              </div>
              <div v-else class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-lg font-bold text-gray-900 dark:text-white">
                {{ settings.siteTitle || 'Admin Platform' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <div v-if="toast.show" 
      class="fixed bottom-4 right-4 max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-transform duration-300 transform"
      :class="toast.show ? 'translate-y-0' : 'translate-y-full'">
      <div class="flex items-start gap-3">
        <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          :class="toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="toast.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="flex-1">
          <div class="font-medium text-gray-900 dark:text-white">{{ toast.title }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ toast.message }}</div>
        </div>
        <button @click="toast.show = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Try-It Editor Disable Confirmation Modal -->
    <div v-if="showDisableConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Disable Code Execution?</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">This will prevent users from running code in the browser.</p>
          </div>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <div class="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is useful for maintenance periods or when you want to restrict code execution capabilities.
          </div>
        </div>
        
        <div class="flex justify-end gap-3">
          <button @click="showDisableConfirmation = false" 
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Cancel
          </button>
          <button @click="confirmDisableTryIt" 
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Disable Code Execution
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

// Refs
const logoInput = ref(null)
const showDisableConfirmation = ref(false)

// Toast notification
const toast = reactive({
  show: false,
  title: '',
  message: '',
  type: 'info'
})

// Settings data
const settings = reactive({
  // 1. Theme Mode
  themeMode: 'system',
  
  // 2. Items Per Page
  itemsPerPage: 25,
  
  // 3. Dashboard Widgets Visibility
  dashboardWidgets: {
    showTotalUsers: true,
    showNewUsers: true,
    showSubmissions: true,
    showLessons: true,
    showChallenges: true,
    showSuccessRate: true
  },
  
  // 4. Try-It Editor
  tryItEnabled: true,
  
  // 5. Default Lesson Sort Order
  defaultLessonSort: 'order_index',
  
  // 6. Maintenance Banner
  maintenanceActive: false,
  maintenanceMessage: '',
  
  // 7. Logo & Site Title
  siteTitle: 'Admin Platform',
  logoPreview: null
})

// Constants
const dashboardWidgetsList = [
  {
    key: 'showTotalUsers',
    name: 'Total Users',
    description: 'Display total user count',
    color: 'bg-blue-500',
    icon: 'UsersIcon'
  },
  {
    key: 'showNewUsers',
    name: 'New Users',
    description: 'Display new users this week',
    color: 'bg-green-500',
    icon: 'UserAddIcon'
  },
  {
    key: 'showSubmissions',
    name: 'Submissions',
    description: 'Display total submissions',
    color: 'bg-purple-500',
    icon: 'DocumentTextIcon'
  },
  {
    key: 'showLessons',
    name: 'Lessons',
    description: 'Display total lessons count',
    color: 'bg-orange-500',
    icon: 'BookOpenIcon'
  },
  {
    key: 'showChallenges',
    name: 'Challenges',
    description: 'Display total challenges',
    color: 'bg-red-500',
    icon: 'PuzzleIcon'
  },
  {
    key: 'showSuccessRate',
    name: 'Success Rate',
    description: 'Display overall success rate',
    color: 'bg-teal-500',
    icon: 'ChartBarIcon'
  }
]

const sortOptions = [
  {
    value: 'order_index',
    name: 'By Order',
    description: 'Sort lessons by their defined order index'
  },
  {
    value: 'created_at',
    name: 'By Creation Date',
    description: 'Sort lessons by creation date (newest first)'
  },
  {
    value: 'title',
    name: 'By Title',
    description: 'Sort lessons alphabetically by title'
  }
]

// Icons for dashboard widgets
const UsersIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>`
}

const UserAddIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>`
}

const DocumentTextIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`
}

const BookOpenIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>`
}

const PuzzleIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>`
}

const ChartBarIcon = {
  template: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`
}

// Methods
function showToast(title, message, type = 'info') {
  toast.title = title
  toast.message = message
  toast.type = type
  toast.show = true
  
  setTimeout(() => {
    toast.show = false
  }, 4000)
}

function updateSetting(key, value) {
  settings[key] = value
  // Auto-save to localStorage for immediate preview
  localStorage.setItem(`admin_settings_${key}`, JSON.stringify(value))
}

function saveSetting(key, value) {
  // In a real app, this would make an API call to persist the setting
  updateSetting(key, value)
  showToast('Setting Saved', 'Changes applied to local preview', 'success')
}

function saveMaintenanceSettings() {
  saveSetting('maintenanceActive', settings.maintenanceActive)
  saveSetting('maintenanceMessage', settings.maintenanceMessage)
}

function saveBrandingSettings() {
  saveSetting('siteTitle', settings.siteTitle)
  saveSetting('logoPreview', settings.logoPreview)
}

function toggleTryItEditor() {
  if (settings.tryItEnabled) {
    showDisableConfirmation.value = true
  } else {
    updateSetting('tryItEnabled', true)
    saveSetting('tryItEnabled', true)
  }
}

function confirmDisableTryIt() {
  updateSetting('tryItEnabled', false)
  saveSetting('tryItEnabled', false)
  showDisableConfirmation.value = false
  showToast('Code Execution Disabled', 'Users can no longer run code in the browser', 'info')
}

function toggleMaintenance(active) {
  updateSetting('maintenanceActive', active)
  if (active) {
    showToast('Maintenance Mode Active', 'Banner is now visible to users', 'info')
  } else {
    showToast('Maintenance Mode Disabled', 'Banner is now hidden', 'info')
  }
}

function triggerLogoUpload() {
  logoInput.value?.click()
}

function handleLogoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      settings.logoPreview = e.target.result
      updateSetting('logoPreview', e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

function removeLogo() {
  settings.logoPreview = null
  updateSetting('logoPreview', null)
}

function exportSettings() {
  const dataStr = JSON.stringify(settings, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = 'admin-settings-export.json'
  link.click()
  
  showToast('Settings Exported', 'Your settings have been downloaded as JSON', 'success')
}

function importSettings() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result)
          Object.assign(settings, importedSettings)
          showToast('Settings Imported', 'Your settings have been imported successfully', 'success')
        } catch (error) {
          showToast('Import Failed', 'Invalid settings file format', 'error')
        }
      }
      reader.readAsText(file)
    }
  }
  
  input.click()
}

function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
    const defaults = {
      themeMode: 'system',
      itemsPerPage: 25,
      dashboardWidgets: {
        showTotalUsers: true,
        showNewUsers: true,
        showSubmissions: true,
        showLessons: true,
        showChallenges: true,
        showSuccessRate: true
      },
      tryItEnabled: true,
      defaultLessonSort: 'order_index',
      maintenanceActive: false,
      maintenanceMessage: '',
      siteTitle: 'Admin Platform',
      logoPreview: null
    }
    
    Object.assign(settings, defaults)
    
    // Clear localStorage
    Object.keys(defaults).forEach(key => {
      localStorage.removeItem(`admin_settings_${key}`)
    })
    
    showToast('Settings Reset', 'All settings have been reset to defaults', 'success')
  }
}

// Load settings from localStorage on mount
onMounted(() => {
  Object.keys(settings).forEach(key => {
    const stored = localStorage.getItem(`admin_settings_${key}`)
    if (stored) {
      try {
        settings[key] = JSON.parse(stored)
      } catch (error) {
        console.warn(`Failed to parse stored setting for ${key}:`, stored)
      }
    }
  })
})

// Watch for theme changes and apply to document
watch(() => settings.themeMode, (newTheme) => {
  const html = document.documentElement
  
  if (newTheme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    html.classList.toggle('dark', prefersDark)
  } else {
    html.classList.toggle('dark', newTheme === 'dark')
  }
}, { immediate: true })

// Watch for maintenance changes
watch(() => settings.maintenanceActive, (active) => {
  if (active && !settings.maintenanceMessage) {
    settings.maintenanceMessage = 'Maintenance in progress. Some features may be temporarily unavailable.'
  }
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
.bg-white, .dark .bg-gray-800 {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.bg-white:hover, .dark .bg-gray-800:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Toggle switch animation */
.toggle-bg::after {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  background: white;
  border-radius: 9999px;
  height: 1.25rem;
  width: 1.25rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

input:checked + .toggle-bg::after {
  transform: translateX(100%);
  border-color: white;
}

input:checked + .toggle-bg {
  background-color: #10b981;
  border-color: #10b981;
}

/* Toast animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>