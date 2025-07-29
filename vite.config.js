/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FreshCart/', // 👈 هنا صح، خارج resolve
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
