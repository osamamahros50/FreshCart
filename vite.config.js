/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],

})
