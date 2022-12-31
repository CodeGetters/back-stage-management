# 企业商城项目

[演示地址](http://shopadmin.dishawang.com/)

工具链：vite+vue+router+WindCSS+ELement-Plus

## 初始化项目

```shell
# 1.创建项目
yarn create vite `vue-name` --template vue

#2.引入依赖
yarn

cd vue3-demo

```

3.配置 vite.config.js(@/开头路径)

```js
import path from 'path'

#这样就可以以使用
'@'
去引入src以下的路径
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src')
        }
    },
})
```

4.添加路由

```shell
#4.路由
yarn add vue-router@next
```

4.1 路由配置

新建文件 src/router/index.js

```js
// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router';

// 懒加载
const Hello = () => import('@/components/HelloWorld.vue');

const routes = [
    {
        path: '/',
        component: Hello,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

4.2 挂载路由

```js
// main.js
// 路由
import router from '@/router';

const app = createApp(App);
app.use(router);
```

5.引入 Element-plus 组件库

```shell
#5.1使用包管理器
yarn add element-plus
#5.2自动导入
yarn add -D unplugin-vue-components unplugin-auto-import
```

5.3 配置 vite.config.js

```shell
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// Element-plus
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
})`
```

6.引入 WindCSS

```shell
yarn add -D vite-plugin-windicss windicss
```

6.1 配置 main.js

```js
// windiCSS
import 'virtual:windi.css';
```

7.引入 less

```shell
yarn add less-loader less -D
```

7.1 创建路径
src/assets/style/global.less

7.2 配置 vite.config.js

```js
css: {
    // css预处理器
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import (reference) "${path.resolve("src/assets/style/global.less")}";`
            }
        ,
            javascriptEnabled: true
        }
    ,
    }
,
}
```

## 登录页面login

使用 element-plus 中的 layout 布局方式

### 1.布局
通过基础的 24 分栏平均的分成了4栏，每一栏占6间距，
也可以使用响应式布局

### 2.图标

2.1使用包管理器

```shell
yarn add @element-plus/icons-vue
```

2.2自动导入

引入依赖

```shell
#unplugin-icons
yarn add -D unplugin-icons
#unplugin-auto-import
yarn add -D unplugin-auto-import
```

配置文件

```js
// vite.config.js
// Element-plus图标
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

const pathSrc = path.resolve(__dirname, 'src')

plugins: [
    vue(),
    AutoImport({
        // Auto import functions from Element Plus
        // e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
            ElementPlusResolver(),
            // Auto import icon components
            // 自动导入图标组件
            IconsResolver({
                prefix: 'Icon',
            }),
        ],
        // 生成文件路径
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
        resolvers: [
            // Auto register icon components
            // 自动注册图标组件
            IconsResolver({
                enabledCollections: ['ep'],
            }),
            // Auto register Element Plus components
            // 自动导入 Element Plus 组件
            ElementPlusResolver(),
        ],
        // 生成文件路径
        dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
        autoInstall: true
    })
]
```

2.3使用
在图标名前 + ElIcon
```vue
<!--自动导入-->
<template #prefix>
  <el-icon>
    <ElIconUser/>
  </el-icon>
</template>
```

### 3.表单验证
3.1自定义验证规则并绑定到标签中
```js
// login.vue
// 响应式数据
const ruleForm = reactive({
    username: '',
    password: ''
})

const rules = reactive<FormRules>({
  // 用户名
  username: [
    {
      // 必填
      required: true,
      message: '账号不能为空',
      // 失去焦点时触发
      trigger: 'blur'
    },
    {
      min: 3,
      max: 15,
      message: '用户名长度必须在 3-15 之间',
      trigger: 'blur'
    }
  ],
  // 密码
  password: [
    {
      // 必填
      required: true,
      message: '密码不能为空',
      // 失去焦点时触发
      trigger: 'blur'
    },
    {
      min: 6,
      max: 10,
      message: '密码长度必须在 3-10 之间',
      trigger: 'blur'
    }
  ]
})
```
3.2 获取登录结果
```js
const submitForm = () => {
  ruleFormRef.value.validate((isValid) => {
    console.log(isValid)
  })
}
```

### 4.登录接口交互

4.1引入axios请求库和登录接口
创建路径src/axios.js
创建axios实例
```js
//axios.js
import axios from "axios";

const service = axios.create({
    baseURL: ' https://mock.presstime.cn/mock/63afb2b10a20cd00b24818ae/vvht'
})

export default service
```

4.2创建API接口
创建src/api/manager.js文件(api文件夹负责管理接口方法)

```js
// manager.js
import service from "@/axios.js";

export function login(username, password) {
    return service.post('/login', {
        username,
        password
    })
}
```

4.3使用VueUse工具集-useCookies
这两个主要用于设置、读取、删除Cookie信息
```shell
yarn add @vueuse/integrations
yarn add universal-cookie
```

使用示例
```vue
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
```

4.4
