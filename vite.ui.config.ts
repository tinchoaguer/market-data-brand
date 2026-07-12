import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

/** Library build for the public UI kit (ESM + declarations). */
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/ui'],
      exclude: ['src/ui/**/*.test.*', 'src/ui/**/*.spec.*', 'src/ui/theme/**'],
      rollupTypes: true,
      insertTypesEntry: true,
      entryRoot: 'src/ui',
      outDir: 'dist',
      tsconfigPath: './tsconfig.ui.json',
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/ui/index.ts'),
      name: 'MarketDataBrandUI',
      formats: ['es'],
      fileName: () => 'ui.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
  },
})
