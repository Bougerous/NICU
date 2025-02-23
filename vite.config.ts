import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Updated the entry point to use main.tsx instead of index.js
      input: '/src/main.tsx'
    }
  },
  server: {
    port: 5174
  }
})
