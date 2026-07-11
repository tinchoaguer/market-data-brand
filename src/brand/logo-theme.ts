import { palette } from '../tokens/colors.ts'
import type { BarColorKey, LogoTheme } from './types.ts'

/** Logo theme derived from design-token primitives (matches public/favicon.svg). */
export const defaultLogoTheme: LogoTheme = {
  colors: {
    background: palette.ink,
    bar1: palette.indigo,
    bar2: palette.blue,
    bar3: palette.cyan,
    bar4: palette.deepBlue,
    bar5: palette.deepPurple,
    trend: palette.lime,
    ringBg: palette.ring,
  },
  gradient: {
    ring: {
      from: palette.ringFrom,
      to: palette.ringTo,
    },
  },
}

export function resolveBarColor(theme: LogoTheme, key: BarColorKey): string {
  return theme.colors[key]
}
