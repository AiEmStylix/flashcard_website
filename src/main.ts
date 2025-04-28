import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App);

app.use(router);
app.use(createPinia());

//Load access token at the start of the app
const auth = useAuthStore();
auth.loadAccessToken();

app.mount('#app')
