import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(vueAxios,axios)
    .use(ElementPlus)

app.mount('#app')
