import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0 binding to allow external devices
    port: 5173, // optional
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
