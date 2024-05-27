import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()

console.log(process.env.API_URL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({registerType: 'autoUpdate'})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
    '/api': {
      target: process.env.API_URL,
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '')
    },
    cors:false
    },
  },
})
