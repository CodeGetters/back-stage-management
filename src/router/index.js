import {createRouter, createWebHistory} from "vue-router";
import {getToken} from "@/composables/auth.js";
import {toast} from "@/composables/util.js";
import store from "@/store/index.js";

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
        component: login
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
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken()
    // 没有登录强制跳转登录页
    if (!token && to.path != '/login') {
        toast("请先登录", "error")
        return next({path: "/login"})
    }
    // 防止重复登录
    if (token && to.path == '/login') {
        toast("请勿重复登录", "error")
        // 回到上一页或者首页
        return next({path: from.path ? from.path : '/home'})
    }
    // 如果用户登录，自动获取存储信息到vuex
    if (token) {
        await store.dispatch('getInfo')
    }

    next()
})

export default router