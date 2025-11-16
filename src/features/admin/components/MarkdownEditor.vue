<template>
  <div class="markdown-editor">
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-3 border border-gray-300 rounded-t-lg bg-gray-50">
      <button @click="insertText('**', '**')" type="button" class="p-2 rounded hover:bg-gray-200" title="Bold">
        <span class="font-bold">B</span>
      </button>
      <button @click="insertText('*', '*')" type="button" class="p-2 rounded hover:bg-gray-200" title="Italic">
        <span class="italic">I</span>
      </button>
      <button @click="insertText('# ', '')" type="button" class="p-2 rounded hover:bg-gray-200" title="Heading 1">
        H1
      </button>
      <button @click="insertText('## ', '')" type="button" class="p-2 rounded hover:bg-gray-200" title="Heading 2">
        H2
      </button>
      <button @click="insertText('- ', '')" type="button" class="p-2 rounded hover:bg-gray-200" title="Bullet List">
        • List
      </button>
      <button @click="insertText('1. ', '')" type="button" class="p-2 rounded hover:bg-gray-200" title="Numbered List">
        1. List
      </button>
      <button @click="insertText('> ', '')" type="button" class="p-2 rounded hover:bg-gray-200" title="Quote">
        "
      </button>
      <button @click="insertText('`', '`')" type="button" class="p-2 rounded hover:bg-gray-200" title="Inline Code">
        &lt;/&gt;
      </button>
      <button @click="insertText('```\n', '\n```')" type="button" class="p-2 rounded hover:bg-gray-200" title="Code Block">
        &lt;/&gt; Block
      </button>
      <button @click="insertText('[', '](url)')" type="button" class="p-2 rounded hover:bg-gray-200" title="Link">
        🔗
      </button>
    </div>

    <!-- Editor and Preview -->
    <div class="grid" :class="preview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'">
      <!-- Editor -->
      <div class="border border-gray-300 border-t-0" :class="preview ? 'lg:border-r-0' : ''">
        <textarea
          ref="textarea"
          v-model="localValue"
          @input="updateValue"
          @keydown="handleKeydown"
          class="w-full h-96 p-4 font-mono text-sm focus:outline-none resize-none"
          placeholder="Write your content in Markdown..."
        ></textarea>
      </div>

      <!-- Preview -->
      <div v-if="preview" class="border border-gray-300 border-t-0 p-4 overflow-auto h-96">
        <div class="prose max-w-none" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const textarea = ref(null)
const localValue = ref(props.modelValue)

const compiledMarkdown = computed(() => {
  return marked(localValue.value || '')
})

function updateValue() {
  emit('update:modelValue', localValue.value)
}

function insertText(before, after) {
  const textareaEl = textarea.value
  if (!textareaEl) return

  const start = textareaEl.selectionStart
  const end = textareaEl.selectionEnd
  const selectedText = localValue.value.substring(start, end)
  
  const newText = localValue.value.substring(0, start) + before + selectedText + after + localValue.value.substring(end)
  localValue.value = newText
  
  // Set cursor position
  nextTick(() => {
    textareaEl.focus()
    textareaEl.setSelectionRange(start + before.length, end + before.length)
    updateValue()
  })
}

function handleKeydown(event) {
  // Tab key support
  if (event.key === 'Tab') {
    event.preventDefault()
    const start = textarea.value.selectionStart
    const end = textarea.value.selectionEnd
    
    localValue.value = localValue.value.substring(0, start) + '  ' + localValue.value.substring(end)
    
    nextTick(() => {
      textarea.value.setSelectionRange(start + 2, start + 2)
      updateValue()
    })
  }
}
</script>

<style scoped>
.markdown-editor {
  font-family: system-ui, -apple-system, sans-serif;
}

.prose {
  color: #374151;
}

.prose h1 {
  font-size: 2em;
  font-weight: 700;
  margin-bottom: 0.5em;
}

.prose h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.prose h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.prose p {
  margin-bottom: 1em;
}

.prose ul, .prose ol {
  margin: 1em 0;
  padding-left: 1.5em;
}

.prose li {
  margin: 0.5em 0;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1.5em 0;
  font-style: italic;
  color: #6b7280;
}
</style>