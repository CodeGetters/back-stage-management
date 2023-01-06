// vite
import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// Element-plus
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// Element-plus图标(自动导入)
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// WindiCSS
// import WindiCSS from 'vite-plugin-windicss'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
    resolve: {
        alias: {
            "@": pathSrc
        }
    },
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
            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),
        Icons({
            autoInstall: true
        })
    ],
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve("src/assets/style/global.less")}";`
                },
                javascriptEnabled: true,
            },
        },
    },
    server:{
        proxy:{
            // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
            '/api': {
                // target: 'https://mock.presstime.cn/mock/63afb2b10a20cd00b24818ae/vvht',
                target:'http://ceshi13.dishait.cn/admin',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})
