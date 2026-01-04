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
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const searchParams = url.searchParams;
            searchParams.set('apiKey', env.VITE_NEWS_API_KEY);
            return '?' + searchParams.toString();
          },
        },
      },
    },
  }
})
