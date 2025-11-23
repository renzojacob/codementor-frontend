<template>
  <div class="min-h-screen bg-gray-50">
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

      <!-- Dynamic Component Loading -->
      <template v-else>
        <LanguagesManagement 
          v-if="activeView === 'languages'"
          :languages="languages"
          :loading="loading"
          @show-language-form="showLanguageForm"
          @edit-language="editLanguage"
          @delete-language="handleDeleteLanguage"
          @export="handleExport"
        />

        <LessonsManagement
          v-else-if="activeView === 'lessons'"
          :lessons="lessons"
          :languages="languages"
          :loading="loading"
          @show-lesson-form="showLessonForm"
          @edit-lesson="editLesson"
          @delete-lesson="handleDeleteLesson"
          @export="handleExport"
          @filter-changed="loadLessons"
        />

        <SectionsManagement
          v-else-if="activeView === 'sections'"
          :sections="sections"
          :lessons="lessons"
          :loading="loading"
          @show-section-form="showSectionForm"
          @edit-section="editSection"
          @delete-section="handleDeleteSection"
          @export="handleExport"
          @filter-changed="loadSections"
        />

        <AnalyticsOverview
          v-else-if="activeView === 'analytics'"
          :analytics="analytics"
          @export="handleExport"
        />
      </template>

      <!-- Language Form Modal -->
      <LanguageFormModal
        v-if="showLanguageModal"
        :language="currentLanguage"
        :loading="loading"
        @close="closeLanguageModal"
        @save="saveLanguage"
      />

      <!-- Lesson Form Modal -->
      <LessonFormModal
        v-if="showLessonModal"
        :lesson="currentLesson"
        :languages="languages"
        :loading="loading"
        @close="closeLessonModal"
        @save="saveLesson"
      />

      <!-- Section Form Modal -->
      <SectionFormModal
        v-if="showSectionModal"
        :section="currentSection"
        :lessons="lessons"
        :loading="loading"
        @close="closeSectionModal"
        @save="saveSection"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminLearn } from '@/core/composables/useAdminLearn'

// Components
import LanguagesManagement from '@/features/admin/components/LanguagesManagement.vue'
import LessonsManagement from '@/features/admin/components/LessonsManagement.vue'
import SectionsManagement from '@/features/admin/components/SectionsManagement.vue'
import AnalyticsOverview from '@/features/admin/components/AnalyticsOverview.vue'
import LanguageFormModal from '@/features/admin/components/LanguageFormModal.vue'
import LessonFormModal from '@/features/admin/components/LessonFormModal.vue'
import SectionFormModal from '@/features/admin/components/SectionFormModal.vue'

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

// Modal States
const showLanguageModal = ref(false)
const showLessonModal = ref(false)
const showSectionModal = ref(false)

// Filters
const lessonFilters = ref({
  language: ''
})

const sectionFilters = ref({
  lesson: ''
})

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
async function loadLessons(filters = lessonFilters.value) {
  try {
    const params = {}
    if (filters.language) {
      params.language_id = filters.language
    }
    await fetchLessons(params)
  } catch (err) {
    console.error('Failed to load lessons:', err)
  }
}

// Sections loading with filters
async function loadSections(filters = sectionFilters.value) {
  try {
    const params = {}
    if (filters.lesson) {
      params.lesson_id = filters.lesson
    }
    await fetchSections(params)
  } catch (err) {
    console.error('Failed to load sections:', err)
  }
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

// Expose methods to child components
defineExpose({
  setActiveView
})
</script>