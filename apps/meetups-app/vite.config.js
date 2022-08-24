import { defineConfig } from 'vite';
import path from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'meetups': path.resolve(__dirname, './src/meetups'),
      'ui': path.resolve(__dirname, './src/ui'),
      'helpers': path.resolve(__dirname, './src/helpers'),
    }
  },
  plugins: [svelte()],
});
