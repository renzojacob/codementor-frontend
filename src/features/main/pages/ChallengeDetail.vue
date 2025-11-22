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
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChallenges } from '@/core/composables/useChallenges'

import ProblemHeader from '../components/ProblemHeader.vue'
import ProblemMeta from '../components/ProblemMeta.vue'
import ProblemDescription from '../components/ProblemDescription.vue'
import CodeEditorWrapper from '../components/CodeEditorWrapper.vue'
import TestCasesPanel from '../components/TestCasesPanel.vue'
import SubmissionsList from '../components/SubmissionsList.vue'
import HintsPanel from '../components/HintsPanel.vue'

// route param (auto-detect id or slug)
const route = useRoute()
const value = route.params.slug || route.params.id

// reactive state
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

const availableLangs = ['javascript', 'python', 'cpp']
const language = ref('javascript')
const code = ref(`// write your ${language.value} solution here`)
const testResults = ref([])
const submissions = ref([])

const { fetchChallenge } = useChallenges()

onMounted(async () => {
  const res = await fetchChallenge(value)
  if (!res) return

  Object.assign(problem, {
    id: res.id,
    slug: res.slug,
    title: res.title,
    difficulty: res.difficulty,
    solved: res.solved,
    tags: res.tags,
    meta: {
      xp: res.xp_reward,
      timeLimit: res.time_limit,
      memoryLimit: res.memory_limit,
      submissions: res.total_submissions,
      accepted: res.accepted_submissions,
    },
    body: res.description,
    examples: res.examples,
    hints: res.hints,
    testcases: res.testcases
  })

  submissions.value = res.submissions
})

// simulate run & submit
function runAndSubmit({ action = 'run' } = {}) {
  testResults.value = problem.testcases.map((t) => ({
    id: t.id,
    name: t.name,
    status: 'Running',
    details: '',
  }))

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
</script>

