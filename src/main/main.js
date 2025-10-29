// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '../store'

// Import Tailwind CSS file only
import '../styles/main.css'

// FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
