import { createApp } from 'vue'
// import '@/style.css'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import pinia from '@/plugins/pinia';
import router from './routes';
createApp(App).use(pinia).use(vuetify).use(router).mount('#app')
