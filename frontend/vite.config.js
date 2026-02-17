import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Necessário para funcionar dentro do Docker
    port: 5173,
    proxy: {
      '/api': {
        // Em Docker usa o nome do serviço; localmente usa localhost
        target: process.env.BACKEND_URL || 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
