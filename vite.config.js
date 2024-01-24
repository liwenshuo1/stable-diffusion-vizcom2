import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { cwd } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(cwd(), 'src/assets/icons')], // 与本地储存地址一致
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: 'fill',
              preserveCurrentColor: true
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 10527,
    open: true
    // proxy: {
    //   '^/api': {
    //     target: debugUrl,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
