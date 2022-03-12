import { createApp } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import App from './App.vue'
import router from './router';
import store from './store';

import './style.css';

const app = createApp(App);

dayjs.extend(relativeTime)

app.use(router);
app.use(store);
app.config.globalProperties.$dayjs = dayjs;

app.mount('#app');
