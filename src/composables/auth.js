import {useCookies} from "@vueuse/integrations/useCookies";

const cookie = useCookies()
const TokenKey = "admin-token"

// 获取token
export function getToken() {
    return cookie.get(TokenKey)
}

// 设置token
export function setToken(token) {
    return cookie.set(TokenKey, token)
}

// 清除token
export function delToken() {
    return cookie.remove(TokenKey)
}