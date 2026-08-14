import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Brand Studio web app. Keep output out of package `dist/` so `build:lib` stays publishable.
  build: {
    outDir: 'studio-dist',
    emptyOutDir: true,
  },
})
