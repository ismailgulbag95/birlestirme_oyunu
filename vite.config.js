import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  base: './',
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  server: {
    host: true,
    port: 3000,
    watch: {
      ignored: [
        '**/dist/**',
        '**/.git/**',
        '**/*.backup*',
        '**/*.original_backup*',
        '**/public/models/**',
        '**/*.glb',
        '**/*.gltf'
      ]
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: false
  }
})
