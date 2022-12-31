<template>
  <div>后台首页</div>
  <el-button @click="setCookie">设置</el-button>
  <el-button @click="deleteCookie">删除</el-button>
  <el-button @click="getCookie">读取</el-button>
</template>

<script setup>
import {useCookies} from '@vueuse/integrations/useCookies'

const cookie = useCookies()
console.log(cookie)

function setCookie() {
  cookie.set('admin-token', "123456")
}

function getCookie() {
  console.log(cookie.get('admin-token'))
}

function deleteCookie() {
  cookie.remove('admin-token')
}
</script>