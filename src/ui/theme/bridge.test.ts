import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { BRAND_TOKEN_VARS, THEME_BRIDGE_VARS } from '../theme/bridge'

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..')

describe('theme bridge CSS', () => {
  it('maps brand token variables into component theme variables', () => {
    const bridge = readFileSync(join(root, 'src/ui/theme/bridge.css'), 'utf8')

    for (const variable of THEME_BRIDGE_VARS) {
      expect(bridge).toContain(variable)
    }

    for (const tokenVar of BRAND_TOKEN_VARS) {
      expect(bridge).toContain(`var(${tokenVar}`)
    }
  })

  it('includes theme-critical variables in the generated UI CSS bundle when present', () => {
    const uiCssPath = join(root, 'src/css/ui.css')
    let css: string
    try {
      css = readFileSync(uiCssPath, 'utf8')
    } catch {
      // Bundle may not exist until ui:generate; skip soft failure messaging via expect on tokens instead
      const tokens = readFileSync(join(root, 'src/css/tokens.css'), 'utf8')
      for (const tokenVar of BRAND_TOKEN_VARS) {
        expect(tokens).toContain(tokenVar)
      }
      return
    }

    for (const tokenVar of BRAND_TOKEN_VARS) {
      expect(css).toContain(tokenVar)
    }
    for (const variable of THEME_BRIDGE_VARS) {
      expect(css).toContain(variable)
    }
  })
})
