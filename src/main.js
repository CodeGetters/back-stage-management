import {createApp} from 'vue'
import App from './App.vue'
// router
import router from "@/router/index.js";
// store
import store from '@/store'
// Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建app实例
const app = createApp(App)

// 挂载
app.use(ElementPlus)
app.use(store)
app.use(router)

// 挂载实例
app.mount('#app')
