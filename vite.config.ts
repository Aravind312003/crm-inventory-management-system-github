import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // 1. Base URL for GitHub Pages deployment
    base: '/crm-inventory-management-system-github/', 
    
    plugins: [react(), tailwindcss()],
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        // Ensuring the '@' alias points to your root or src correctly
        '@': path.resolve(__dirname, './src'), 
      },
    },
    
    build: {
      // Ensures the build goes to 'dist', which gh-pages looks for
      outDir: 'dist',
      // Useful for GitHub Pages to handle clean assets
      assetsDir: 'assets',
    },

    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});