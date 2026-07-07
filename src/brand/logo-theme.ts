import type { BarColorKey, LogoTheme } from './types.ts'

export const defaultLogoTheme: LogoTheme = {
  colors: {
    background: '#111827',
    bar1: '#5b6cff',
    bar2: '#3f8cff',
    bar3: '#00b8d9',
    bar4: '#00c853',
    bar5: '#fbfb31',
    trend: '#fbfb31',
    ringBg: '#000000',
  },
  gradient: {
    ring: {
      from: '#00d26a',
      to: '#3a86ff',
    },
  },
}

export function resolveBarColor(theme: LogoTheme, key: BarColorKey): string {
  return theme.colors[key]
}
