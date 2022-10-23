import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './store'
import ElementPlus from './plugins/element-plus'

import './assets/styles/index.scss'
import 'virtual:windi.css'

import 'virtual:svg-icons-register'
import svgIcon from '@components/svgIcon/Index.vue'

const app = createApp(App)

app
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .component('svg-icon', svgIcon)
  .mount('#app')
