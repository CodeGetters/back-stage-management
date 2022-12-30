import {createRouter, createWebHistory} from "vue-router";

// 懒加载
const Hello = () => import('@/components/HelloWorld.vue')
const home = () => import('@/views/index.vue')
const NotFound = () => import('@/views/404.vue')
const login = () => import('@/views/login.vue')

const routes = [
    {
        path: '/',
        component: Hello
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/login',
        component:login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router