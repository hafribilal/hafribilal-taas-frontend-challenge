import { createPinia } from 'pinia'
import { github } from './github.plugin'

const store = createPinia();

store.use(github);

export default store;
