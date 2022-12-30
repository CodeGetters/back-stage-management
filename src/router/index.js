import {createRouter, createWebHistory} from "vue-router";

// 懒加载
const Hello = () => import('@/components/HelloWorld.vue')
const home = () => import('@/views/index.vue')

const routes = [
    {
        path: '/',
        component: Hello
    },
    {
        path: '/home',
        component:home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router