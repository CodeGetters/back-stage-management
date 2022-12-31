import {createApp} from 'vue'
import App from '@/App.vue'

// windiCSS
// import 'virtual:windi.css'
// 路由
import router from '@/router'
// vuex
import store from "@/store/index.js";

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
