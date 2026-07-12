import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  exports: Record<string, string | { types?: string; import?: string; default?: string }>
  peerDependencies?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

function resolveExportTarget(value: string | { types?: string; import?: string; default?: string }) {
  if (typeof value === 'string') return value
  return value.import ?? value.default ?? value.types
}

describe('package exports and consumer contract', () => {
  it('preserves existing token, wording, and logo exports', () => {
    expect(pkg.exports['./tokens']).toBe('./src/tokens/index.ts')
    expect(pkg.exports['./tokens.css']).toBe('./src/css/tokens.css')
    expect(pkg.exports['./wording']).toBe('./src/tokens/wording.ts')
    expect(pkg.exports['./logo']).toBe('./src/brand/components/Logo.tsx')

    for (const key of ['./tokens', './tokens.css', './wording', './logo'] as const) {
      const target = resolveExportTarget(pkg.exports[key])
      expect(target, key).toBeTruthy()
      expect(existsSync(join(root, target!))).toBe(true)
    }
  })

  it('declares UI kit and CSS bundle export paths', () => {
    expect(pkg.exports['./ui']).toBeTruthy()
    expect(pkg.exports['./ui.css']).toBe('./src/css/ui.css')
  })

  it('resolves UI CSS export target when generated', () => {
    const cssTarget = resolveExportTarget(pkg.exports['./ui.css'])
    expect(cssTarget).toBe('./src/css/ui.css')
    expect(existsSync(join(root, cssTarget!))).toBe(true)
  })

  it('resolves UI JS/types export targets after library build', () => {
    const ui = pkg.exports['./ui']
    expect(typeof ui).toBe('object')
    if (typeof ui === 'string') return

    const importPath = ui.import ?? ui.default
    const typesPath = ui.types
    expect(importPath).toBe('./dist/ui.js')
    expect(typesPath).toBe('./dist/ui.d.ts')
    expect(existsSync(join(root, importPath!))).toBe(true)
    expect(existsSync(join(root, typesPath!))).toBe(true)
  })

  it('declares React as a peer dependency', () => {
    expect(pkg.peerDependencies?.react).toBeTruthy()
    expect(pkg.peerDependencies?.['react-dom']).toBeTruthy()
  })

  it('does not list Tailwind as a required consumer dependency', () => {
    expect(pkg.dependencies?.tailwindcss).toBeUndefined()
    expect(pkg.dependencies?.['@tailwindcss/vite']).toBeUndefined()
    expect(pkg.dependencies?.['@tailwindcss/cli']).toBeUndefined()
    expect(pkg.devDependencies?.tailwindcss).toBeTruthy()
  })

  it('does not expose private helpers as public exports', () => {
    const keys = Object.keys(pkg.exports)
    expect(keys).not.toContain('./ui/lib/utils')
    expect(keys).not.toContain('./cn')
    expect(keys.some((k) => k.includes('tailwind'))).toBe(false)
    expect(keys.some((k) => k.includes('radix'))).toBe(false)
  })
})
