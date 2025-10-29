// src/consumables/useAuth.js
import axios from 'axios'
import { ref } from 'vue'
import { useUserStore } from '../store/user'

export function useAuth() {
  const loading = ref(false)
  const error = ref(null)
  const userStore = useUserStore()

  const register = async (data) => {
    loading.value = true
    error.value = null

    try {
      const res = await axios.post('/register', data)
      // res.data.message === "User created"
      console.log(res.data.message)
      // Optional: store user info or redirect to login
      userStore.setUser({ email: data.email, username: data.username })
    } catch (err) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  return { register, loading, error }
}
