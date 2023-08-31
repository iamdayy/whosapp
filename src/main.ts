import { createApp } from 'vue'
// import '@/style.css'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import pinia from '@/plugins/pinia';
import router from './routes';

import VuetifyNotifier from "@/plugins/vuetify-notifier"

createApp(App).use(pinia).use(vuetify).use(VuetifyNotifier, {
    default: {
      defaultColor: 'primary', //default color for all notifications
      closeIcon: 'mdi-close', //default close icon for component
    },
  }).use(router).mount('#app')
