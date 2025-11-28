<!-- src/App.vue or your main layout component -->
<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Main App Content (2/3 width) -->
    <div class="flex-1 overflow-auto" :class="{ 'w-2/3': !isChatCollapsed }">
      <router-view />
    </div>

    <!-- Chatbot Panel (1/3 width, collapsible) -->
    <ChatbotPanel 
      :collapsed="isChatCollapsed"
      @toggle="isChatCollapsed = !isChatCollapsed"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatbotPanel from '@/components/layout/ChatbotPanel.vue'

const isChatCollapsed = ref(false)
</script>