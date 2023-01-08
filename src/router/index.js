import {createRouter, createWebHistory} from "vue-router";

// 懒加载
const vueUse = () => import('@/pages/vueUse.vue')
const NotFound = () => import('@/pages/404.vue')

const login = () => import('@/pages/login.vue')

const routes = [
    {
        path: '/',
        component: vueUse
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router