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

    <!-- simple placeholder editor; swap with TryItEditor or Monaco -->
    <textarea
      v-model="localCode"
      class="w-full h-56 md:h-72 rounded-md border border-[var(--gry-300)] p-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[var(--pri-200)]"
      spellcheck="false"
    ></textarea>

    <div class="flex items-center justify-between text-sm text-[var(--gry-600)]">
      <div>Memory: -- | Time: --</div>
      <div>Autosave</div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  modelValue: String,
  language: String,
  availableLangs: Array,
})
const emit = defineEmits(['update:modelValue', 'update:language', 'submit'])

const localCode = ref(props.modelValue || '')
const localLang = ref(props.language || (props.availableLangs ? props.availableLangs[0] : 'javascript'))

watch(localCode, (v) => emit('update:modelValue', v))
watch(localLang, (v) => emit('update:language', v))

function emitRun() {
  emit('submit', { action: 'run' })
}

function emitSubmit() {
  emit('submit', { action: 'submit' })
}
</script>
