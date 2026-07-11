/** Font stacks and type scale for product UI. */
export const font = {
  sans: '"Sora", "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", "Consolas", monospace',
} as const

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.75rem',
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const lineHeight = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.5',
  relaxed: '1.65',
} as const

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.04em',
} as const
