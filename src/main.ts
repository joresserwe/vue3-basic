import { createApp } from 'vue';
import store, { key } from '@/store';
import App from './App.vue';
import router from './router';

createApp(App).use(store, key).use(router).mount('#app');
