import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  private?: boolean
  exports: Record<string, string | { types?: string; import?: string; default?: string }>
  peerDependencies?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  publishConfig?: { access?: string }
  scripts?: Record<string, string>
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
    expect(pkg.exports['./locales/en']).toBe('./src/locales/en.json')
    expect(pkg.exports['./logo']).toBe('./src/brand/components/Logo.tsx')
    expect(pkg.exports['./logo-config']).toBe('./src/brand/logo-config.ts')

    for (const key of [
      './tokens',
      './tokens.css',
      './wording',
      './locales/en',
      './logo',
      './logo-config',
    ] as const) {
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
    expect(typesPath).toBe('./dist/index.d.ts')
    expect(existsSync(join(root, importPath!))).toBe(true)
    expect(existsSync(join(root, typesPath!))).toBe(true)
  })

  it('declares React as a peer dependency, not a bundled runtime', () => {
    expect(pkg.peerDependencies?.react).toBeTruthy()
    expect(pkg.peerDependencies?.['react-dom']).toBeTruthy()
    expect(pkg.dependencies?.react).toBeUndefined()
    expect(pkg.dependencies?.['react-dom']).toBeUndefined()
    expect(pkg.devDependencies?.react).toBeTruthy()
    expect(pkg.devDependencies?.['react-dom']).toBeTruthy()
  })

  it('publishes the scoped package publicly', () => {
    expect(pkg.private).toBe(false)
    expect(pkg.publishConfig?.access).toBe('public')
  })

  it('keeps library and Brand Studio builds separate', () => {
    expect(pkg.scripts?.['build:lib']).toContain('vite.ui.config.ts')
    expect(pkg.scripts?.['build:app']).toContain('vite build')
    expect(pkg.scripts?.build).toContain('build:lib')
    expect(pkg.scripts?.build).toContain('build:app')
  })

  it('does not list Tailwind as a required consumer dependency', () => {
    expect(pkg.dependencies?.tailwindcss).toBeUndefined()
    expect(pkg.dependencies?.['@tailwindcss/vite']).toBeUndefined()
    expect(pkg.dependencies?.['@tailwindcss/cli']).toBeUndefined()
    expect(pkg.devDependencies?.tailwindcss).toBeTruthy()
  })

  it('does not require Radix or class helpers from consumers', () => {
    expect(pkg.dependencies?.['@radix-ui/react-select']).toBeUndefined()
    expect(pkg.dependencies?.['@radix-ui/react-slot']).toBeUndefined()
    expect(pkg.dependencies?.['class-variance-authority']).toBeUndefined()
    expect(pkg.dependencies?.clsx).toBeUndefined()
    expect(pkg.dependencies?.['tailwind-merge']).toBeUndefined()
  })

  it('does not expose private helpers as public exports', () => {
    const keys = Object.keys(pkg.exports)
    expect(keys).not.toContain('./ui/lib/utils')
    expect(keys).not.toContain('./cn')
    expect(keys.some((k) => k.includes('tailwind'))).toBe(false)
    expect(keys.some((k) => k.includes('radix'))).toBe(false)
  })

  it('points the web deploy at Brand Studio, not the library dist', () => {
    const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8')) as {
      buildCommand?: string
      outputDirectory?: string
    }
    expect(vercel.buildCommand).toBe('npm run build:app')
    expect(vercel.outputDirectory).toBe('studio-dist')
  })
})

describe('dashboard surface UI exports', () => {
  it('exports theme toggle, segmented control, status footer, and chart frame from the UI entry', async () => {
    const ui = await import('./index')
    expect(ui.ThemeToggle).toBeTruthy()
    expect(ui.SegmentedControl).toBeTruthy()
    expect(ui.TimeframeControl).toBe(ui.SegmentedControl)
    expect(ui.StatusFooter).toBeTruthy()
    expect(ui.LiveStatus).toBe(ui.StatusFooter)
    expect(ui.ChartFrame).toBeTruthy()
  })

  it('preserves prior UI kit named exports', async () => {
    const ui = await import('./index')
    for (const name of [
      'Button',
      'Select',
      'Card',
      'Table',
      'Badge',
      'Skeleton',
      'Alert',
      'AppShell',
      'AppHeader',
      'AppHeaderBar',
      'Page',
      'Stack',
      'Text',
    ] as const) {
      expect(ui[name], name).toBeTruthy()
    }
  })
})
