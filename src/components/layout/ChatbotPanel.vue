<!-- src/components/ChatbotPanel.vue -->
<template>
  <!-- Collapsed State - Slim Sidebar -->
  <div 
    v-if="collapsed"
    class="w-32 bg-gray-800 border-l border-gray-700 h-full flex flex-col items-center py-6 relative"
  >
    <!-- Chat Icon -->
    <button 
      @click="$emit('toggle')"
      class="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mb-6"
      title="Expand Chat"
    >
      <i class="fas fa-comments text-2xl"></i>
    </button>

    <!-- Navigation Icons (Collapsed) -->
    <div class="flex flex-col gap-4 w-full px-3">
      <button 
        v-for="nav in navigation"
        :key="nav.id"
        @click="navigateTo(nav.section)"
        class="p-3 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors flex flex-col items-center gap-1 group"
        :class="{ 'bg-gray-700 text-blue-400': activeSection === nav.section }"
        :title="nav.label"
      >
        <i :class="nav.icon" class="text-xl"></i>
        <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{{ nav.label }}</span>
      </button>
    </div>

    <!-- Preferences Button (Collapsed) -->
    <button 
      @click="togglePreferences"
      ref="prefsButtonCollapsed"
      class="mt-auto p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors mb-4"
      title="Preferences"
    >
      <i class="fas fa-cog text-xl"></i>
    </button>

    <!-- Online Indicator -->
    <div class="flex flex-col items-center">
      <div class="relative">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-800 rounded-full"></div>
      </div>
    </div>

    <!-- Preferences Dropdown (Collapsed) -->
    <div 
      v-if="showPreferences && collapsed"
      class="absolute bottom-20 left-4 w-64 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-50"
      v-click-outside="closePreferences"
    >
      <PreferencesDropdown 
        :preferences="preferences"
        :selected-response-style="selectedResponseStyle"
        :response-styles="responseStyles"
        @update:preferences="updatePreferences"
        @update:response-style="updateResponseStyle"
        @close="closePreferences"
      />
    </div>
  </div>

  <!-- Expanded State - Full Sidebar -->
  <div 
    v-else
    class="w-160 bg-gray-800 border-l border-gray-700 h-full flex flex-col relative"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <i class="fas fa-robot text-white text-xl"></i>
        </div>
        <div>
          <h3 class="font-semibold text-white text-lg">Code Assistant Pro</h3>
          <p class="text-sm text-green-400 flex items-center gap-2">
            <span class="w-3 h-3 bg-green-400 rounded-full"></span>
            Online & Ready to Help
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <!-- Preferences Button -->
        <button 
          @click="togglePreferences"
          ref="prefsButtonExpanded"
          class="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors relative"
          title="Preferences"
        >
          <i class="fas fa-cog text-lg"></i>
        </button>

        <!-- Collapse Button -->
        <button 
          @click="$emit('toggle')"
          class="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors"
          title="Collapse"
        >
          <i class="fas fa-chevron-right text-lg"></i>
        </button>
      </div>

      <!-- Preferences Dropdown (Expanded) -->
      <div 
        v-if="showPreferences && !collapsed"
        class="absolute top-20 right-4 w-64 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-50"
        v-click-outside="closePreferences"
      >
        <PreferencesDropdown 
          :preferences="preferences"
          :selected-response-style="selectedResponseStyle"
          :response-styles="responseStyles"
          @update:preferences="updatePreferences"
          @update:response-style="updateResponseStyle"
          @close="closePreferences"
        />
      </div>
    </div>

    <!-- Rest of your expanded state content remains the same -->
    <!-- Navigation Section -->
    <div class="p-4 bg-gray-750 border-b border-gray-700">
      <div class="grid grid-cols-4 gap-2">
        <button 
          v-for="nav in navigation"
          :key="nav.id"
          @click="navigateTo(nav.section)"
          class="p-3 text-sm bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors flex flex-col items-center gap-2"
          :class="{ 'bg-blue-600 text-white': activeSection === nav.section }"
        >
          <i :class="nav.icon" class="text-lg"></i>
          <span class="text-xs">{{ nav.label }}</span>
        </button>
      </div>
    </div>

    <!-- Messages & Sample Prompts -->
    <div class="flex-1 overflow-auto p-6 space-y-6">
      <!-- Welcome Message -->
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
          <i class="fas fa-robot text-white text-lg"></i>
        </div>
        <div class="bg-gray-700 rounded-xl p-4 flex-1">
          <p class="text-base text-gray-200 leading-relaxed">
            <strong class="text-blue-400">Hello! I'm your AI coding assistant.</strong> 
            I can help you with code explanations, debugging, algorithm optimization, 
            and provide hints for this challenge. Feel free to ask anything!
          </p>
        </div>
      </div>

      <!-- Sample Prompts -->
      <div class="space-y-3">
        <p class="text-sm text-gray-400 font-medium px-2">Try asking me:</p>
        <div class="grid grid-cols-1 gap-2">
          <button 
            v-for="prompt in samplePrompts"
            :key="prompt.id"
            @click="sendQuickAction(prompt.text)"
            class="p-3 text-left bg-gray-750 hover:bg-gray-700 rounded-xl transition-colors text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500"
          >
            <div class="flex items-start gap-3">
              <i :class="prompt.icon" class="text-blue-400 mt-0.5 text-sm"></i>
              <div>
                <p class="text-sm font-medium">{{ prompt.title }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ prompt.description }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div 
        v-for="message in messages" 
        :key="message.id" 
        class="flex items-start gap-4"
        :class="message.isUser ? 'flex-row-reverse' : ''"
      >
        <!-- Bot Avatar -->
        <div 
          v-if="!message.isUser"
          class="w-10 h-10 bg-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center"
        >
          <i class="fas fa-robot text-white text-lg"></i>
        </div>

        <!-- User Avatar -->
        <div 
          v-if="message.isUser"
          class="w-10 h-10 bg-gray-600 rounded-xl flex-shrink-0 flex items-center justify-center"
        >
          <i class="fas fa-user text-white text-lg"></i>
        </div>

        <!-- Message Bubble -->
        <div 
          class="rounded-xl p-4 max-w-[calc(100%-4rem)] shadow-lg"
          :class="message.isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-700 text-gray-200 rounded-bl-none'"
        >
          <p class="text-base whitespace-pre-wrap leading-relaxed">{{ message.text }}</p>
          <p class="text-xs mt-2 opacity-70 flex items-center gap-1">
            <i class="fas fa-clock"></i>
            {{ message.time }}
          </p>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex items-start gap-4">
        <div class="w-10 h-10 bg-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
          <i class="fas fa-robot text-white text-lg"></i>
        </div>
        <div class="bg-gray-700 rounded-xl p-4">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
          <p class="text-sm text-gray-400 mt-2">AI is thinking...</p>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-6 border-t border-gray-700 bg-gray-900">
      <div class="flex gap-3">
        <input 
          v-model="newMessage"
          @keypress.enter="sendMessage"
          type="text"
          placeholder="Ask about the challenge, request code review, or get help..."
          class="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-base"
        >
        <button 
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <i class="fas fa-paper-plane"></i>
          <span class="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Define props and emits
defineProps({
  collapsed: Boolean
})

defineEmits(['toggle'])

// Reactive data
const messages = ref([
  {
    id: 1,
    text: "Can you explain the time complexity requirement for this algorithm?",
    isUser: true,
    time: "2:30 PM"
  },
  {
    id: 2,
    text: "The problem requires O(n) time complexity. This means your solution should process each element only once without nested loops. I'd recommend using a hash map or two-pointer approach for optimal performance.",
    isUser: false,
    time: "2:31 PM"
  }
])

const newMessage = ref('')
const isTyping = ref(false)
const showPreferences = ref(false)
const activeSection = ref('home')

// Navigation items
const navigation = ref([
  { 
    id: 1, 
    label: "Home", 
    section: "home",
    icon: "fas fa-home"
  },
  { 
    id: 2, 
    label: "Learn", 
    section: "learn",
    icon: "fas fa-graduation-cap"
  },
  { 
    id: 3, 
    label: "Challenges", 
    section: "challenges",
    icon: "fas fa-code"
  },
  { 
    id: 4, 
    label: "Leaderboard", 
    section: "leaderboard",
    icon: "fas fa-trophy"
  }
])

// Sample prompts
const samplePrompts = ref([
  {
    id: 1,
    title: "Explain this algorithm",
    description: "Get a detailed breakdown of how this solution works",
    text: "Can you explain how this algorithm works step by step?",
    icon: "fas fa-search"
  },
  {
    id: 2,
    title: "Time complexity analysis",
    description: "Understand the efficiency of your solution",
    text: "What's the time and space complexity of this approach?",
    icon: "fas fa-chart-line"
  },
  {
    id: 3,
    title: "Code optimization",
    description: "Learn how to make your code faster and cleaner",
    text: "How can I optimize this code for better performance?",
    icon: "fas fa-rocket"
  },
  {
    id: 4,
    title: "Debug help",
    description: "Get help fixing errors in your implementation",
    text: "I'm getting an error in my code. Can you help me debug it?",
    icon: "fas fa-bug"
  }
])

// Response styles
const responseStyles = ref([
  {
    id: 'concise',
    name: 'Concise',
    description: 'Brief and to-the-point',
    icon: 'fas fa-bolt'
  },
  {
    id: 'detailed',
    name: 'Detailed',
    description: 'Comprehensive explanations',
    icon: 'fas fa-search'
  }
])

const selectedResponseStyle = ref('detailed')

// Preferences
const preferences = reactive({
  syntaxHighlighting: true,
  lineNumbers: true,
  detailedExplanations: true,
  codeExamples: true
})

// Methods
const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    isUser: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  // Simulate bot typing
  isTyping.value = true
  newMessage.value = ''

  // Simulate bot response after delay
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now() + 1,
      text: getBotResponse(),
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 2000)
}

const getBotResponse = () => {
  const responses = [
    "I understand your question. Based on your preferences, I'll provide a detailed explanation with code examples.\n\nHere's what I think about your query...",
    "Great question! Let me break this down for you step by step with some practical examples.",
    "I can help with that. Let me analyze the problem and provide you with the most efficient solution approach.",
    "Based on the complexity requirements, I recommend considering these optimization techniques..."
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

const sendQuickAction = (prompt) => {
  newMessage.value = prompt
  sendMessage()
}

const navigateTo = (section) => {
  activeSection.value = section
  // In a real app, you would emit an event or use router here
  console.log(`Navigating to: ${section}`)
}

const togglePreferences = () => {
  showPreferences.value = !showPreferences.value
}

const closePreferences = () => {
  showPreferences.value = false
}

const updatePreferences = (newPreferences) => {
  Object.assign(preferences, newPreferences)
}

const updateResponseStyle = (style) => {
  selectedResponseStyle.value = style
}

// Simple click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutsideHandler)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutsideHandler)
  }
}
</script>

<style scoped>
.w-160 {
  width: 40rem;
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.bg-gray-750 {
  background-color: #374151;
}

/* Animation for message bubbles */
.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>