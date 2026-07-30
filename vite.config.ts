import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Keep Studio output out of package `dist/` so `build:lib` (`dist/ui.*`) is publishable.
  build: {
    outDir: 'studio-dist',
    emptyOutDir: true,
  },
})
