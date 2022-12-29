import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import Qs from "qs"

import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)


app.use(pinia)
    .use(router)
    .use(vueAxios,axios,Qs)
    .use(ElementPlus)
app.mount('#app')
