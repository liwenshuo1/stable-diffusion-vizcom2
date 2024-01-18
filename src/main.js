import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/index.less' // 确保该文件在第三方包下面

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册icon
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
console.log(SvgIcon)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
