import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from '../store';
import '../styles/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#api-app'); // separate mount point
