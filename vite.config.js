import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import { serverPrompts } from './prompts/index.js'


// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  let serverOptions = {}
  if (mode === 'development') {
    serverOptions = await serverPrompts()
  }
  return {
    plugins: [
      vue(),
      VueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: serverOptions.host,  // 启动后浏览器窗口输入地址就可以进行访问
      port: serverOptions.port, // 端口号
    },
  }
})
