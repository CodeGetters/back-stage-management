import {createApp} from 'vue'
import App from './App.vue'
// router
import router from "@/router/index.js";
// store
import store from '@/store'
// Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建app实例
const app = createApp(App)

// 挂载
app.use(store)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 挂载实例
app.mount('#app')
