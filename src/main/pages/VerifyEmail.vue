<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const message = ref('Verifying...')

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    message.value = 'No token provided.'
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/verify-email?token=${token}`)
    const data = await res.json()
    message.value = data.message || 'Verification complete.'
  } catch (err) {
    message.value = 'Verification failed.'
  }

  setTimeout(() => router.push('/login'), 5000) // redirect after 5s
})
</script>

<template>
  <div class="verify-email-page">
    <p>{{ message }}</p>
  </div>
</template>
