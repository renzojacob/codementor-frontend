<!-- src/main/pages/learn/components/LessonSidebar.vue -->
<template>
    <div>
        <!-- Desktop Sidebar -->
        <aside class="w-64 border-r bg-gray-50 overflow-y-auto p-4 hidden md:block">
            <h2 class="text-lg font-semibold mb-4">{{ languageTitle }}</h2>

            <nav v-if="!loading && lessons.length" class="space-y-2">
                <RouterLink v-for="topic in lessons" :key="topic.path" :to="`/learn/${lang}/${topic.path}`"
                    class="block px-2 py-1 rounded hover:bg-gray-200"
                    active-class="bg-blue-100 text-blue-700 font-semibold">
                    {{ topic.title }}
                </RouterLink>
            </nav>

            <p v-else-if="loading" class="text-gray-500">Loading lessons...</p>
            <p v-else class="text-gray-400 text-sm">No lessons found.</p>
        </aside>

        <!-- Mobile Sidebar Toggle -->
        <button aria-label="Toggle sidebar"
            class="fixed top-3 left-3 z-50 md:hidden bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
            @click="$emit('toggleSidebar')">
            <i class="fas fa-bars text-lg"></i>
        </button>

        <!-- Slide-in Sidebar for mobile -->
        <transition name="slide">
            <div v-if="showSidebar" class="fixed inset-0 bg-black/50 z-40" @click="$emit('toggleSidebar')">
                <aside class="absolute top-0 left-0 w-64 h-full bg-gray-50 border-r p-4" @click.stop>
                    <h2 class="text-lg font-semibold mb-4">{{ languageTitle }}</h2>

                    <nav v-if="!loading && lessons.length" class="space-y-2">
                        <RouterLink v-for="topic in lessons" :key="topic.path" :to="`/learn/${lang}/${topic.path}`"
                            class="block px-2 py-1 rounded hover:bg-gray-200"
                            active-class="bg-blue-100 text-blue-700 font-semibold" @click="$emit('toggleSidebar')">
                            {{ topic.title }}
                        </RouterLink>
                    </nav>

                    <p v-else-if="loading" class="text-gray-500">Loading lessons...</p>
                    <p v-else class="text-gray-400 text-sm">No lessons found.</p>
                </aside>
            </div>
        </transition>
    </div>
</template>

<script setup>
defineProps({
    lang: { type: String, required: true },
    lessons: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    languageTitle: { type: String, required: true },
    showSidebar: { type: Boolean, default: false },
})

defineEmits(['toggleSidebar'])
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
