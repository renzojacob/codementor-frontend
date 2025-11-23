import { ref } from 'vue'
import { learnAPI } from '@/core/api'

export function useAdminLearn() {
    // State
    const loading = ref(false)
    const error = ref(null)

    const languages = ref([])
    const lessons = ref([])
    const sections = ref([])
    const analytics = ref({})

    // Current editing items
    const currentLanguage = ref({
        name: '',
        slug: '',
        description: ''
    })
    const currentLesson = ref(null)
    const currentSection = ref(null)

    // Helper function to manage state around an async operation
    const executeCall = async (apiCall) => {
        loading.value = true
        error.value = null
        try {
            const response = await apiCall()
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'An error occurred'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Languages
    async function fetchLanguages(params = {}) {
        try {
            const res = await executeCall(() => learnAPI.admin.languages.getAll(params))
            languages.value = res
            return res
        } catch (err) {
            console.error('Error loading languages:', error.value)
            throw err
        }
    }

    async function createLanguage(data) {
        try {
            const res = await executeCall(() => learnAPI.admin.languages.create(data))
            await fetchLanguages() // Refresh the list
            return res
        } catch (err) {
            console.error('Error creating language:', error.value)
            throw err
        }
    }

    async function updateLanguage(id, data) {
        try {
            const res = await executeCall(() => learnAPI.admin.languages.update(id, data))
            await fetchLanguages() // Refresh the list
            return res
        } catch (err) {
            console.error('Error updating language:', error.value)
            throw err
        }
    }

    async function deleteLanguage(id) {
        try {
            const res = await executeCall(() => learnAPI.admin.languages.delete(id))
            await fetchLanguages() // Refresh the list
            return res
        } catch (err) {
            console.error('Error deleting language:', error.value)
            throw err
        }
    }

    // Lessons
    async function fetchLessons(params = {}) {
        try {
            const res = await executeCall(() => learnAPI.admin.lessons.getAll(params))
            lessons.value = res
            return res
        } catch (err) {
            console.error('Error loading lessons:', error.value)
            throw err
        }
    }

    async function fetchLesson(id) {
        try {
            const res = await executeCall(() => learnAPI.admin.lessons.get(id))
            currentLesson.value = res
            return res
        } catch (err) {
            console.error('Error loading lesson:', error.value)
            throw err
        }
    }

    async function createLesson(data) {
        try {
            const res = await executeCall(() => learnAPI.admin.lessons.create(data))
            await fetchLessons() // Refresh the list
            return res
        } catch (err) {
            console.error('Error creating lesson:', error.value)
            throw err
        }
    }

    async function updateLesson(id, data) {
        try {
            const res = await executeCall(() => learnAPI.admin.lessons.update(id, data))
            await fetchLessons() // Refresh the list
            return res
        } catch (err) {
            console.error('Error updating lesson:', error.value)
            throw err
        }
    }

    async function deleteLesson(id) {
        try {
            const res = await executeCall(() => learnAPI.admin.lessons.delete(id))
            await fetchLessons() // Refresh the list
            return res
        } catch (err) {
            console.error('Error deleting lesson:', error.value)
            throw err
        }
    }

    // Sections
    async function fetchSections(params = {}) {
        try {
            const res = await executeCall(() => learnAPI.admin.sections.getAll(params))
            sections.value = res
            return res
        } catch (err) {
            console.error('Error loading sections:', error.value)
            throw err
        }
    }

    async function createSection(data) {
        try {
            const res = await executeCall(() => learnAPI.admin.sections.create(data))
            await fetchSections() // Refresh the list
            return res
        } catch (err) {
            console.error('Error creating section:', error.value)
            throw err
        }
    }

    async function updateSection(id, data) {
        try {
            const res = await executeCall(() => learnAPI.admin.sections.update(id, data))
            await fetchSections() // Refresh the list
            return res
        } catch (err) {
            console.error('Error updating section:', error.value)
            throw err
        }
    }

    async function deleteSection(id) {
        try {
            const res = await executeCall(() => learnAPI.admin.sections.delete(id))
            await fetchSections() // Refresh the list
            return res
        } catch (err) {
            console.error('Error deleting section:', error.value)
            throw err
        }
    }

    // Analytics
    async function fetchAnalytics() {
        try {
            const res = await executeCall(() => learnAPI.admin.analytics.getOverview())
            analytics.value = res
            return res
        } catch (err) {
            console.error('Error loading analytics:', error.value)
            throw err
        }
    }

    // Export
    async function exportContent(type) {
        try {
            const res = await executeCall(() => learnAPI.admin.export.content(type))
            return res
        } catch (err) {
            console.error('Error exporting content:', error.value)
            throw err
        }
    }

    // Reordering
    async function reorderSections(lessonId, sections) {
        try {
            const res = await executeCall(() => learnAPI.admin.reorder.sections(lessonId, { sections }))
            return res
        } catch (err) {
            console.error('Error reordering sections:', error.value)
            throw err
        }
    }

    // Utility functions
    function setCurrentLanguage(language) {
        if (language) {
            currentLanguage.value = { ...language }
        } else {
            // Reset to default structure
            currentLanguage.value = {
                name: '',
                slug: '',
                description: ''
            }
        }
    }

    function setCurrentLesson(lesson) {
        currentLesson.value = lesson ? { ...lesson } : null
    }

    function setCurrentSection(section) {
        currentSection.value = section ? { ...section } : null
    }

    function resetCurrentItems() {
        currentLanguage.value = {
            name: '',
            slug: '',
            description: ''
        }
        currentLesson.value = null
        currentSection.value = null
    }

    return {
        // State
        loading,
        error,
        languages,
        lessons,
        sections,
        analytics,
        currentLanguage,
        currentLesson,
        currentSection,

        // Languages methods
        fetchLanguages,
        createLanguage,
        updateLanguage,
        deleteLanguage,

        // Lessons methods
        fetchLessons,
        fetchLesson,
        createLesson,
        updateLesson,
        deleteLesson,

        // Sections methods
        fetchSections,
        createSection,
        updateSection,
        deleteSection,

        // Analytics & Tools
        fetchAnalytics,
        exportContent,
        reorderSections,

        // Utility methods
        setCurrentLanguage,
        setCurrentLesson,
        setCurrentSection,
        resetCurrentItems,
    }
}