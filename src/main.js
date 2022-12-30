import {createApp} from 'vue'
import './style.css'
import App from '@/App.vue'

// windiCSS
import 'virtual:windi.css'
// 路由
import router from '@/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
