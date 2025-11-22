<!-- src/features/main/components/CodeEditorWrapper.vue -->
<template>
  <div class="bg-white p-4 rounded-xl border border-[var(--gry-200)] shadow-sm space-y-3">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <label class="text-sm text-[var(--gry-600)]">Language</label>
        <select v-model="localLang" class="px-2 py-1 rounded-md border border-[var(--gry-300)] text-sm">
          <option v-for="l in availableLangs" :key="l" :value="l">{{ l }}</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <button @click="emitRun" class="px-3 py-1 rounded-md bg-[var(--pri-500)] text-white hover:bg-[var(--pri-600)] text-sm">Run</button>
        <button @click="emitSubmit" class="px-3 py-1 rounded-md bg-[var(--acc-ind-600)] text-white hover:bg-[var(--acc-ind-500)] text-sm">Submit</button>
      </div>
    </div>

    <div ref="editorContainer" class="code-editor-host"></div>

    <div class="flex items-center justify-between text-sm text-[var(--gry-600)]">
      <div>Memory: {{ problemMeta.memoryLimit }} | Time: {{ problemMeta.timeLimit }}</div>
      <div>Autosave</div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, onUnmounted } from 'vue'

// --- 1. CODE MIRROR IMPORTS ---
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
// Import language extensions you want to support
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';

// --- PROPS and EMITS ---
const props = defineProps({
  modelValue: String,
  language: String,
  availableLangs: Array,
  // Pass relevant problem meta data down for display
  problemMeta: {
    type: Object,
    default: () => ({ memoryLimit: '--', timeLimit: '--' })
  }
})
const emit = defineEmits(['update:modelValue', 'update:language', 'submit'])

// --- STATE AND REFS ---
const localCode = ref(props.modelValue || '')
const localLang = ref(props.language || (props.availableLangs ? props.availableLangs[0] : 'javascript'))
const editorContainer = ref(null) // DOM reference for mounting CM
let view = null // Holds the EditorView instance

// --- 2. CODE MIRROR LOGIC & HELPERS ---

// Map language slugs to CodeMirror extensions
const langExtensions = {
  javascript: javascript(),
  python: python(),
  php: php(),
  // Add more languages here as needed:
  // 'html': html(), 
  // 'css': css(),
};

// Custom listener to emit code changes back to Vue parent
const updateListener = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    const doc = update.state.doc.toString();
    localCode.value = doc;
    // Debounce this emit in a real app to prevent excessive updates!
    emit('update:modelValue', doc);
  }
});

function getExtensions(langSlug) {
  const langExtension = langExtensions[langSlug] || javascript(); // Default to JS
  return [
    basicSetup,
    langExtension,
    updateListener,
    // Add custom styling/theme extensions here
    EditorView.lineWrapping, // Example: Enable line wrapping
  ];
}

function initializeEditor(code, lang) {
  if (view) {
    // Destroy existing view before creating a new one (important for language switching)
    view.destroy(); 
    view = null;
  }
  
  const initialState = EditorState.create({
    doc: code,
    extensions: getExtensions(lang),
  });

  view = new EditorView({
    state: initialState,
    parent: editorContainer.value,
  });
}

// --- 3. LIFECYCLE AND WATCHERS ---

// A. Initial setup on component mount
onMounted(() => {
  initializeEditor(localCode.value, localLang.value);
});

// B. Clean up when component is destroyed
onUnmounted(() => {
  if (view) {
    view.destroy();
  }
});

// C. Watch for code changes coming from the parent (e.g., loading a new solution)
watch(() => props.modelValue, (newValue) => {
  if (view && newValue !== view.state.doc.toString()) {
    view.dispatch({
      changes: { 
        from: 0, 
        to: view.state.doc.length, 
        insert: newValue 
      },
    });
    localCode.value = newValue; // Keep local code in sync
  }
});

// D. Watch for language changes from the select box or parent prop
watch(localLang, (newLang) => {
  emit('update:language', newLang);
  // Re-initialize the editor when language changes to load new extensions
  initializeEditor(localCode.value, newLang);
});

// E. Watch for initial language prop to set the initial code content correctly
watch(() => props.language, (newLang) => {
    localLang.value = newLang; // Sync with parent
}, { immediate: true }); 


// --- EMIT FUNCTIONS ---
function emitRun() {
  // Use the current code content (localCode.value) in the submit payload
  emit('submit', { action: 'run', code: localCode.value, lang: localLang.value })
}

function emitSubmit() {
  emit('submit', { action: 'submit', code: localCode.value, lang: localLang.value })
}
</script>

<style scoped>
/* Define the height and style for the CodeMirror host */
.code-editor-host {
  height: 200px; /* Swap h-56/h-72 from old textarea */
  border: 1px solid var(--gry-300);
  border-radius: 6px; /* Match your component's rounding */
  overflow: hidden; /* Ensure line numbers are contained */
}

/* Optional: To make the editor fill the container height */
:deep(.cm-editor) {
  height: 100%;
}
</style>