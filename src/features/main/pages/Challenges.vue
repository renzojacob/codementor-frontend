<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Coding Challenges</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 mb-6">
      <select v-model="selectedDifficulty" class="border rounded px-3 py-1">
        <option value="">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select v-model="selectedLanguage" class="border rounded px-3 py-1">
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="php">PHP</option>
      </select>
    </div>

    <!-- Challenge List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="challenge in paginatedChallenges"
        :key="challenge.id"
        class="p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
      >
        <h2 class="font-semibold text-lg mb-1">{{ challenge.title }}</h2>
        <div class="flex items-center gap-2 text-sm mb-2">
          <span :class="difficultyClass(challenge.difficulty)">
            {{ challenge.difficulty }}
          </span>
          <span class="text-gray-500">• {{ challenge.language }}</span>
        </div>
        <div class="flex justify-between items-center text-gray-500 text-sm">
          <span>{{ challenge.submissions }} submissions</span>
          <router-link
            :to="`/challenge/${challenge.id}`"
            class="text-blue-600 hover:underline"
          >
            Solve
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :total-items="filteredChallenges.length"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from '@/components/ui/Pagination.vue';

// Sample challenges
const challenges = ref([
  { id: 1, title: 'FizzBuzz', difficulty: 'easy', language: 'javascript', submissions: 102 },
  { id: 2, title: 'Two Sum', difficulty: 'medium', language: 'python', submissions: 256 },
  { id: 3, title: 'Palindrome Checker', difficulty: 'easy', language: 'java', submissions: 78 },
  { id: 4, title: 'Binary Tree Inorder', difficulty: 'hard', language: 'csharp', submissions: 43 },
  // Add more as needed
]);

const selectedDifficulty = ref('');
const selectedLanguage = ref('');
const currentPage = ref(1);
const pageSize = ref(6);

// Filtered challenges
const filteredChallenges = computed(() => {
  return challenges.value.filter(challenge => {
    return (!selectedDifficulty.value || challenge.difficulty === selectedDifficulty.value) &&
           (!selectedLanguage.value || challenge.language === selectedLanguage.value);
  });
});

// Paginated
const paginatedChallenges = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredChallenges.value.slice(start, end);
});

// Difficulty color class
const difficultyClass = (level) => {
  switch(level) {
    case 'easy': return 'text-green-600 font-medium';
    case 'medium': return 'text-yellow-500 font-medium';
    case 'hard': return 'text-red-500 font-medium';
    default: return '';
  }
};
</script>
