import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
      '/socket': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      }
    }
  }
})
