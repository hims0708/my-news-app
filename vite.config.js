import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/news': {
          target: 'https://newsapi.org/v2/everything',
          changeOrigin: true,
          headers: {
            'X-Api-Key': env.VITE_NEWS_API_KEY
          },
          rewrite: (path) => path.replace(/^\/api\/news/, '')
        },
      },
    },
  }
})
