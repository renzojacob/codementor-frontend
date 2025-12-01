// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


// Import Tailwind CSS file only
import '../styles/main.css'
import '../styles/variables.css'



// FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
console.log('App mounted successfully')