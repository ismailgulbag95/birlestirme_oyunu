import { rmSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig(({ mode }) => {
  let outputDirectory

  return {
    base: './',
    plugins: [
      wasm(),
      topLevelAwait(),
      {
        name: 'exclude-unused-character-previews-from-production',
        apply: 'build',
        configResolved(config) {
          outputDirectory = path.resolve(config.root, config.build.outDir)
        },
        closeBundle() {
          if (mode !== 'production') return

          for (const relativePath of [
            '_character_original.glb',
            '_character_original_preview.glb',
            'models/character_original_preview.glb'
          ]) {
            const outputPath = path.resolve(outputDirectory, relativePath)
            if (!outputPath.startsWith(`${outputDirectory}${path.sep}`)) {
              throw new Error(`Refusing to prune a file outside the build output: ${relativePath}`)
            }
            rmSync(outputPath, { force: true })
          }
        }
      }
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
      emptyOutDir: true
    }
  }
})
