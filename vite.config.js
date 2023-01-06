import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  resolve:{
    // 设置别名
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  plugins: [vue()],
  server:{
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
