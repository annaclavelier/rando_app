import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${import.meta.env.VITE_PORT_BACK}`,
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
