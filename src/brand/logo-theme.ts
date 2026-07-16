import { palette } from '../tokens/colors.ts'
import type { BarColorKey, LogoTheme } from './types.ts'

/** Logo theme derived from design-token primitives (matches public/favicon.svg). */
export const defaultLogoTheme: LogoTheme = {
  colors: {
    background: palette.ink,
    bar1: palette.clay,
    bar2: palette.wheat,
    bar3: palette.sky,
    bar4: palette.blue,
    bar5: palette.gold,
    trend: palette.gold,
    ringBg: palette.wheat,
  },
  gradient: {
    ring: {
      from: palette.earth,
      to: palette.gold,
    },
  },
}

export function resolveBarColor(theme: LogoTheme, key: BarColorKey): string {
  return theme.colors[key]
}
