import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // This ensures the Gemini key is available in your code as process.env.GEMINI_API_KEY
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      
      // This ensures your backend URL is available as import.meta.env.VITE_API_URL
      // Even if it's set in Vercel, Vite needs this 'define' to inject it into the browser code
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Ensure the build process correctly handles the environment variables
      sourcemap: true,
    }
  };
});
