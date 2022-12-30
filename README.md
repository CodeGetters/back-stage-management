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

#这样就可以以@去引入src以下的路径
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
import { createRouter, createWebHistory } from 'vue-router';

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

// Element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
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
            },
            javascriptEnabled: true
        }
    }
}
```
