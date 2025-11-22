<!-- src/features/main/pages/ChallengeDetail.vue -->
<template>
  <div class="p-6 space-y-6">
    <ProblemHeader 
      :title="problem.title" 
      :difficulty="problem.difficulty" 
      :solved="problem.solved"
      :tags="problem.tags" 
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Description -->
      <div class="lg:col-span-2 space-y-6">
        <ProblemMeta :meta="problem.meta" />
        <ProblemDescription :body="problem.body" :examples="problem.examples" />
        <HintsPanel :hints="problem.hints" />
      </div>

      <!-- Right: Editor + Testcases + Submissions -->
      <aside class="space-y-6">
        <CodeEditorWrapper 
          v-model="code" 
          :language="language" 
          :available-langs="availableLangs"
          @submit="runAndSubmit" 
        />

        <TestCasesPanel :cases="problem.testcases" :results="testResults" />
        <SubmissionsList :submissions="submissions" />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChallenges } from '@/core/composables/useChallenges'
import { useLearn } from '@/core/composables/useLearn'

import ProblemHeader from '../components/ProblemHeader.vue'
import ProblemMeta from '../components/ProblemMeta.vue'
import ProblemDescription from '../components/ProblemDescription.vue'
import CodeEditorWrapper from '../components/CodeEditorWrapper.vue'
import TestCasesPanel from '../components/TestCasesPanel.vue'
import SubmissionsList from '../components/SubmissionsList.vue'
import HintsPanel from '../components/HintsPanel.vue'

// Route
const route = useRoute()
const challengeId = route.params.slug || route.params.id

// Composables
const { languages, fetchLanguages } = useLearn()
const { fetchChallenge } = useChallenges()

// Reactive state
const problem = reactive({
  id: null,
  slug: '',
  title: '',
  difficulty: '',
  solved: false,
  tags: [],
  meta: {
    xp: 0,
    timeLimit: '1s',
    memoryLimit: '64MB',
    submissions: 0,
    accepted: 0,
  },
  body: '',
  examples: [],
  hints: [],
  testcases: [],
})

// Computed
const availableLangs = computed(() => 
  Array.isArray(languages.value) ? languages.value.map(l => l.slug) : []
)

// Refs
const language = ref('')
const code = ref('')
const testResults = ref([])
const submissions = ref([])

// Watchers
watch(availableLangs, (newLangs) => {
  if (newLangs.length > 0 && !language.value) {
    language.value = newLangs[0]
    updateCodeTemplate()
  }
})

// Methods
const updateCodeTemplate = () => {
  code.value = `// write your ${language.value} solution here`
}

const runAndSubmit = ({ action = 'run' } = {}) => {
  // Initialize test results
  testResults.value = problem.testcases.map((t) => ({
    id: t.id,
    name: t.name,
    status: 'Running',
    details: '',
  }))

  // Simulate API call
  setTimeout(() => {
    testResults.value = problem.testcases.map((t) => ({
      id: t.id,
      name: t.name,
      status: 'Passed',
      details: `Expected ${t.expected}`,
    }))

    if (action === 'submit') {
      submissions.value.unshift({
        id: Math.floor(Math.random() * 10000),
        lang: language.value,
        status: 'Accepted',
        time: `${Math.floor(Math.random() * 100) + 20}ms`,
        date: new Date().toISOString().slice(0, 10),
      })
    }
  }, 700)
}

// Lifecycle
onMounted(async () => {
  await fetchLanguages()
  
  const challenge = await fetchChallenge(challengeId)
  if (!challenge) return

  Object.assign(problem, {
    id: challenge.id,
    slug: challenge.slug,
    title: challenge.title,
    difficulty: challenge.difficulty,
    solved: challenge.solved,
    tags: challenge.tags,
    meta: {
      xp: challenge.xp_reward,
      timeLimit: challenge.time_limit,
      memoryLimit: challenge.memory_limit,
      submissions: challenge.total_submissions,
      accepted: challenge.accepted_submissions,
    },
    body: challenge.description,
    examples: challenge.examples,
    hints: challenge.hints,
    testcases: challenge.testcases
  })

  submissions.value = challenge.submissions || []
})
</script>