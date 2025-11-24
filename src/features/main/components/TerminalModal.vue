<!-- src/features/main/components/TerminalModal.vue -->
<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @mousedown="handleBackdropClick"
  >
    <div 
      ref="terminalRef"
      class="bg-gray-900 rounded-lg flex flex-col terminal-window"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        left: '0px',
        top: '0px'
      }"
    >
      <!-- Terminal Header - Draggable Area -->
      <div 
        class="flex items-center justify-between p-4 border-b border-gray-700 cursor-move"
        @mousedown="startDrag"
      >
        <div class="flex items-center gap-3">
          <div class="flex gap-2">
            <div 
              class="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"
              @click="$emit('close')"
            ></div>
            <div 
              class="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"
              @click="minimizeTerminal"
            ></div>
            <div 
              class="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors"
              @click="toggleMaximize"
            ></div>
          </div>
          <span class="text-white font-mono text-sm">Terminal</span>
        </div>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors ml-4"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Terminal Content -->
      <div class="flex-1 overflow-auto p-4 font-mono text-sm">
        <div v-if="loading" class="text-green-400">
          <div class="flex items-center gap-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
            <span>Executing code...</span>
          </div>
        </div>

        <div v-else-if="result">
          <!-- Output Section -->
          <div v-if="result.stdout" class="mb-4">
            <div class="text-blue-400 mb-2">Output:</div>
            <pre class="text-gray-300 bg-gray-800 p-3 rounded whitespace-pre-wrap">{{ result.stdout }}</pre>
          </div>

          <!-- Return Value Section -->
          <div v-if="result.return !== null && result.return !== undefined" class="mb-4">
            <div class="text-blue-400 mb-2">Return Value:</div>
            <pre class="text-gray-300 bg-gray-800 p-3 rounded whitespace-pre-wrap">{{ JSON.stringify(result.return, null, 2) }}</pre>
          </div>

          <!-- Error Section -->
          <div v-if="result.error" class="mb-4">
            <div class="text-red-400 mb-2">Error:</div>
            <pre class="text-red-300 bg-gray-800 p-3 rounded whitespace-pre-wrap">{{ result.error }}</pre>
          </div>

          <!-- Empty State -->
          <div v-if="!result.stdout && !result.error && result.return === null" class="text-yellow-400">
            No output generated. Code executed successfully.
          </div>
        </div>

        <!-- No Result State -->
        <div v-else class="text-gray-400">
          Ready to execute code...
        </div>
      </div>

      <!-- Resize Handles -->
      <div class="resize-handle resize-handle-right" @mousedown="startResize('right')"></div>
      <div class="resize-handle resize-handle-bottom" @mousedown="startResize('bottom')"></div>
      <div class="resize-handle resize-handle-bottom-right" @mousedown="startResize('bottom-right')"></div>

      <!-- Terminal Footer -->
      <div class="p-4 border-t border-gray-700">
        <div class="flex items-center justify-between text-xs text-gray-400">
          <div>Status: {{ loading ? 'Running...' : result ? 'Execution Complete' : 'Ready' }}</div>
          <div class="flex items-center gap-4">
            <button 
              @click="clearTerminal"
              class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
            >
              Clear
            </button>
            <button 
              @click="$emit('close')"
              class="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  result: Object,
  loading: Boolean
})

const emit = defineEmits(['close', 'clear'])

// Terminal state
const terminalRef = ref(null)
const isMaximized = ref(false)
const originalDimensions = ref(null)

// Terminal position and size
const position = reactive({ x: 0, y: 0 })
const width = ref(800)
const height = ref(500)

// Drag state
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })

// Resize state
const isResizing = ref(false)
const resizeDirection = ref('')
const resizeStart = reactive({ x: 0, y: 0, width: 0, height: 0 })

// Methods
const startDrag = (e) => {
  if (e.target.closest('button') || e.target.classList.contains('cursor-pointer')) {
    return // Don't drag if clicking on buttons or control dots
  }
  
  isDragging.value = true
  dragStart.x = e.clientX - position.x
  dragStart.y = e.clientY - position.y
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  e.preventDefault()
}

const handleDrag = (e) => {
  if (!isDragging.value) return
  
  position.x = e.clientX - dragStart.x
  position.y = e.clientY - dragStart.y
  
  // Keep within viewport bounds
  const maxX = window.innerWidth - width.value
  const maxY = window.innerHeight - height.value
  
  position.x = Math.max(0, Math.min(position.x, maxX))
  position.y = Math.max(0, Math.min(position.y, maxY))
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const startResize = (direction) => {
  isResizing.value = true
  resizeDirection.value = direction
  resizeStart.x = event.clientX
  resizeStart.y = event.clientY
  resizeStart.width = width.value
  resizeStart.height = height.value
  
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  event.preventDefault()
}

const handleResize = (e) => {
  if (!isResizing.value) return
  
  const deltaX = e.clientX - resizeStart.x
  const deltaY = e.clientY - resizeStart.y
  
  // Minimum dimensions
  const minWidth = 400
  const minHeight = 300
  
  if (resizeDirection.value.includes('right')) {
    width.value = Math.max(minWidth, resizeStart.width + deltaX)
  }
  
  if (resizeDirection.value.includes('bottom')) {
    height.value = Math.max(minHeight, resizeStart.height + deltaY)
  }
}

const stopResize = () => {
  isResizing.value = false
  resizeDirection.value = ''
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

const toggleMaximize = () => {
  if (isMaximized.value) {
    // Restore original size and position
    if (originalDimensions.value) {
      width.value = originalDimensions.value.width
      height.value = originalDimensions.value.height
      position.x = originalDimensions.value.x
      position.y = originalDimensions.value.y
    }
  } else {
    // Save current dimensions and maximize
    originalDimensions.value = {
      width: width.value,
      height: height.value,
      x: position.x,
      y: position.y
    }
    
    width.value = window.innerWidth - 40
    height.value = window.innerHeight - 40
    position.x = 20
    position.y = 20
  }
  
  isMaximized.value = !isMaximized.value
}

const minimizeTerminal = () => {
  // You can implement minimize functionality here
  console.log('Minimize terminal')
}

const clearTerminal = () => {
  emit('clear')
}

const handleBackdropClick = (e) => {
  // Close if clicking directly on backdrop (not terminal content)
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

// Center modal on first show
onMounted(() => {
  if (props.show) {
    centerModal()
  }
})

const centerModal = () => {
  position.x = (window.innerWidth - width.value) / 2
  position.y = (window.innerHeight - height.value) / 2
}

// Cleanup event listeners
onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<style scoped>
.terminal-window {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid #374151;
  min-width: 400px;
  min-height: 300px;
  transition: transform 0.1s ease;
  user-select: none;
}

.resize-handle {
  position: absolute;
  background: transparent;
  z-index: 10;
}

.resize-handle-right {
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: ew-resize;
}

.resize-handle-bottom {
  bottom: -2px;
  left: 0;
  right: 0;
  height: 4px;
  cursor: ns-resize;
}

.resize-handle-bottom-right {
  right: -2px;
  bottom: -2px;
  width: 12px;
  height: 12px;
  cursor: nwse-resize;
}

.resize-handle:hover,
.resize-handle:active {
  background: rgba(59, 130, 246, 0.3);
}

/* Custom scrollbar for terminal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Prevent text selection during drag/resize */
.terminal-window * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.terminal-window pre {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
</style>