# 后台管理项目

参照：[易师傅](https://juejin.cn/post/7079785777692934174)

## 初始化项目

### 创建项目

* 步骤提示初始化

```shell
yarn create vite

? Project name:  `vite-name`

? Select a framework: » - Use arrow-keys. Return to submit.
vue

? Select a variant: › - Use arrow-keys. Return to submit.
vue
```

* 快速初始化

```shell
yarn create vite 'vue-name' --template vue
```

### 启动项目

```shell
cd `vite-name` 

yarn 

yarn dev
```

### 集成配置

1.保证 node 的使用

```shell
yarn add @types/node --save-dev
```

2.修改vite.config.js

```js
// vite.config.js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
    resolve: {
        // 设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    server: {
        // 跨域设置
        proxy: {
            '/api': {
                target: 'http://ceshi13.dishait.cn/admin',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
```

### 代码质量风格的统一

#### 集成 eslint

1.安装eslint

```shell
yarn add eslint eslint-plugin-vue --save-dev
```

由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 @typescript-eslint/parser
替代掉默认的解析器

```shell
yarn add @typescript-eslint/parser --save-dev
```

安装对应的插件 @typescript-eslint/eslint-plugin 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则

```shell
yarn add @typescript-eslint/eslint-plugin --save-dev
```

2.创建配置文件 .eslintrc.js

```js
// .eslintrc.js
TODO:更新.eslintrc.js
文件后将内容放在这里
```

#### 集成 prettier

1.安装

```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

2.创建配置文件：prettier.config.js

```js
// prettier.config.js
TODO:更新
prettier.config.js
文件后将内容放在这里
```

3.修改 ..eslintrc.js

```js
module.exports = {
    ...

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],

    ...
};
```

4.命令行式运行：修改 package.json

```js
{
...
    "scripts"
:
    {
    ...
        "prettier:comment"
    :
        "自动格式化当前目录下的所有文件",
            "prettier"
    :
        "prettier --write"
    }
...
}
```

#### 集成vuex

1.安装

```shell
yarn add vuex@next --save
```

2.使用

* 配置store
  新建 src/store 目录并在其下面创建 index.js 导出 store

```js
// store/index.js
import {createStore} from "vuex";

const store = createStore()

export default store
```

* 挂载store

```js
// src/main.js
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
// store
import store from '@/store'
// 创建app实例
const app = createApp(App)
// 挂载
app.use(router)
// 挂载实例
app.mount('#app')
```

#### 集成 vue-router4

1.安装

```shell
yarn add vue-router@4
```

2.使用
使用路由前需要在App.vue中写入 <router-view/> 标签

* 配置router
  新建 src/router 目录并在其下面创建 index.js，导出 router

```js
// src/router/index.js
import {createRouter, createWebHistory} from "vue-router";
// 懒加载
const NotFound = () => import('@/pages/404.vue')
const routes = [
    {
        // 404配置
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

#### 集成 VueUse

* 安装

```shell
yarn add @vueuse/core
```

* 基本使用(不了解)
  创建一个新的 src/pages/vueUse.vue 页面来做一个简单的 demo

```js
<template>
    <h1>测试 vueUse 的鼠标坐标</h1>
    <h3>Mouse: {{x}} x {{y}}</h3>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {useMouse} from '@vueuse/core'

    export default defineComponent({
    name: 'VueUse',
    setup() {
    const {x, y} = useMouse()
    return {
    x, y
}
}
});
</script>
```

* Cookies

1.安装

```shell
TODO:上面的安装好像并不能使用到useCookies

yarn add universal-cookie
yarn add @vueuse/integrations
```

2.使用

```js
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
```

#### CSS的集成(less)

1.安装

```shell
yarn add less-loader less -D
```

1.创建全局样式文件(可选)
src/assets/style/global.less

在全局使用

```vue
<!--app.vue-->
<template>
  <router-view/>
</template>

<style>
@import url('@/style/global.css');
</style>
```

配置 vite.config.js

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

#### 集成axios

* 安装

```shell
yarn add axios
```

* 使用

新建 src/utils/axios.ts

```js
import axios from "axios";

const service = axios.create({
    baseURL: "/api"
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service
```

#### CSS的UI样式库(Element-Plus)

注意：UI 库一般需要按需引入(但是上次项目使用了自动导入出现了bug，所以这里使用全局引入)

* 使用包管理器

```shell
yarn add element-plus
```

```js
// main.js
import {createApp} from 'vue'
import App from './App.vue'
// Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

#### 使用 commitizen 规范git提交(可选)

为了使团队多人协作更加的规范，所以需要每次在 git 提交的时候，做一次硬性规范提交，规范 git 的提交信息

* 安装(交互式提交 + 自定义提示文案 + Commit规范)
  [commitizen](http://commitizen.github.io/cz-cli/)

```shell
TODO:有时间会尝试使用
yarn add -D commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli commitlint-config-cz cz-customizable
```

* 配置package.js

```js

...
"scripts"
:
{
    "commit:comment"
:
    "引导设置规范化的提交信息",
        "commit"
:
    "git-cz",
}
,

"config"
:
{
    "commitizen"
:
    {
        "path"
    :
        "node_modules/cz-customizable"
    }
}
,
...
}
```

* 新增配置 commitlint.config.js

```js
module.exports = {
    extends: ['@commitlint/config-conventional', 'cz'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feature', // 新功能（feature）
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'fix', // 修补bug
                'ui', // 更新 ui
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'perf', // 性能优化
                'release', // 发布
                'deploy', // 部署
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
                'build', // 打包
            ],
        ],
        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],
        // <type> 不能为空
        'type-empty': [2, 'never'],
        // <scope> 范围不能为空
        'scope-empty': [2, 'never'],
        // <scope> 范围格式
        'scope-case': [0],
        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'never'],
        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],
        // <subject> 格式，禁用
        'subject-case': [0, 'never'],
        // <body> 以空行开头
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72],
    },
};
```

* 自定义提示则添加 .cz-config.js

```shell
module.exports = {
    types: [
        {value: 'feature',  name: 'feature:  增加新功能'},
        {value: 'bug',      name: 'bug:      测试反馈bug列表中的bug号'},
        {value: 'fix',      name: 'fix:      修复bug'},
        {value: 'ui',       name: 'ui:       更新UI'},
        {value: 'docs',     name: 'docs:     文档变更'},
        {value: 'style',    name: 'style:    代码格式(不影响代码运行的变动)'},
        {value: 'perf',     name: 'perf:     性能优化'},
        {value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)'},
	{value: 'release',  name: 'release:  发布'},
	{value: 'deploy',   name: 'deploy:   部署'},
        {value: 'test',     name: 'test:     增加测试'},
        {value: 'chore',    name: 'chore:    构建过程或辅助工具的变动(更改配置文件)'},
        {value: 'revert',   name: 'revert:   回退'},
    	{value: 'build',    name: 'build:    打包'}
    ],
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入您修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(可选，待优化去除，跳过即可):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer'],
    subjectLimit: 72
};
```

* 交互页面测试(测试)

```shell
yarn commit
```

#### husky(可选)

[husky](https://typicode.github.io/husky/#/)：对提交前代码的检查

## 登录
