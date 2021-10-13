import { createApp } from 'vue'

import router from './router.js';
import store from './store/index.js';

import BaseCard from './components/ui/BaseCard.vue';

import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(store);

app.component('BaseCard', BaseCard);

app.mount('#app');
