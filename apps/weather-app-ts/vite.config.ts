import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      weather: path.resolve(__dirname, './src/weather'),
      weatherClean: path.resolve(__dirname, './src/weather-clean'),
      ui: path.resolve(__dirname, './src/ui'),
      helpers: path.resolve(__dirname, './src/helpers'),
    },
  },
  plugins: [svelte()],
});
