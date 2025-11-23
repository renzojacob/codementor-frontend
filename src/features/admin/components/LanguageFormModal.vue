<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-900">
            {{ language?.id ? 'Edit Language' : 'Add New Language' }}
          </h2>
          <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg transition">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="$emit('save')" class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input v-model="language.name" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="JavaScript, Python, PHP...">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input v-model="language.slug" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="javascript, python, php...">
                <p class="mt-1 text-sm text-gray-500">URL-friendly identifier for the language</p>
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
                      <button type="button" @click="markdownHelpers.bold(descriptionTextarea)"
                        class="p-1 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded" title="Bold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h16M3 12h16m-7 6h7"/>
                        </svg>
                      </button>
                      <button type="button" @click="markdownHelpers.italic(descriptionTextarea)"
                        class="p-1 text-sm italic text-gray-600 hover:bg-gray-100 rounded" title="Italic">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 4h12M6 20h12"/>
                        </svg>
                      </button>
                      <button type="button" @click="markdownHelpers.code(descriptionTextarea)"
                        class="p-1 text-sm font-mono text-gray-600 hover:bg-gray-100 rounded" title="Code">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                      </button>
                      <button type="button" @click="markdownHelpers.link(descriptionTextarea)"
                        class="p-1 text-sm text-gray-600 hover:bg-gray-100 rounded" title="Link">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <textarea ref="descriptionTextarea" v-model="language.description" rows="8"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Describe the programming language using Markdown..."></textarea>
                </div>

                <!-- Live Preview -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">Live Preview</span>
                  </div>
                  <div class="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                    <div v-html="renderMarkdown(language.description)" class="prose prose-sm max-w-none">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button type="button" @click="$emit('close')"
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
              {{ language?.id ? 'Update Language' : 'Create Language' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMarkdown } from '@/core/composables/useMarkdown'

const { renderMarkdown, markdownHelpers } = useMarkdown()
const descriptionTextarea = ref(null)

defineProps({
  language: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      slug: '',
      description: ''
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close', 'save'])
</script>

<style scoped>
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

.prose h3 {
  font-size: 1.5em;
  font-weight: 600;
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
  margin-left: 0;
  font-style: italic;
  color: #6b7280;
}
</style>