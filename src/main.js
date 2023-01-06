import {createApp} from 'vue'
import App from '@/App.vue'

// windiCSS
// import 'virtual:windi.css'
// 路由
import router from '@/router'
// vuex
import store from "@/store/user.js";
// Element-plus(完整引入)
// import ElementPlus from 'element-plus'

const app = createApp(App)

// app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')
