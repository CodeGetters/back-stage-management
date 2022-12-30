// vite配置
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// Element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// WindiCSS
import WindiCSS from 'vite-plugin-windicss'

// vite配置
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src')
        }
    },
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
})
