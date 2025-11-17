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
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

import ProblemHeader from '../components/ProblemHeader.vue'
import ProblemMeta from '../components/ProblemMeta.vue'
import ProblemDescription from '../components/ProblemDescription.vue'
import CodeEditorWrapper from '../components/CodeEditorWrapper.vue'
import TestCasesPanel from '../components/TestCasesPanel.vue'
import SubmissionsList from '../components/SubmissionsList.vue'
import HintsPanel from '../components/HintsPanel.vue'

// route param (id/slug)
const route = useRoute()
const slug = route.params.slug || route.params.id || 'reverse-linked-list'

// mock loader (replace with API/composable)
const problem = reactive({
  id: 1,
  slug,
  title: 'Reverse Linked List',
  difficulty: 'easy',
  solved: true,
  tags: ['linked-list', 'two-pointers'],
  meta: {
    xp: 50,
    timeLimit: '1s',
    memoryLimit: '64MB',
    submissions: 124,
    accepted: 98,
  },
  body: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
  examples: [
    { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reverse list' },
    { input: 'head = [1,2]', output: '[2,1]', explanation: '' },
  ],
  hints: [
    'Iteratively reverse pointers with three variables: prev, curr, next.',
    'You can also solve recursively but watch stack depth.',
  ],
  testcases: [
    { id: 1, name: 'Example 1', input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
    { id: 2, name: 'Empty list', input: '[]', expected: '[]' },
    { id: 3, name: 'Single node', input: '[1]', expected: '[1]' },
  ],
})

// editor state
const availableLangs = ['javascript', 'python', 'cpp']
const language = ref('javascript')
const code = ref(`// write your ${language.value} solution here`)

// fake runtime/test runner
const testResults = ref([])

const submissions = ref([
  { id: 523, lang: 'javascript', status: 'Accepted', time: '50ms', date: '2025-11-16' },
  { id: 512, lang: 'python', status: 'Wrong Answer', time: '\u2014', date: '2025-11-10' },
])

// simulate run & submit
function runAndSubmit({ action = 'run' } = {}) {
  // simplistic runner: just mark tests passed for "accepted"
  testResults.value = problem.testcases.map((t) => ({
    id: t.id,
    name: t.name,
    status: 'Running',
    details: '',
  }))

  // simulate async run
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

<style scoped>
/* subtle borders using theme vars */
:root {
  --card-border: var(--gry-200);
}
</style>
