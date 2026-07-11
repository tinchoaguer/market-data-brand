/** Primitive palette — raw brand colors from the logo/favicon. Prefer semantic tokens in UI. */
export const palette = {
  ink: '#111827',
  inkElevated: '#1f2937',
  inkMuted: '#374151',
  slate: '#94a3b8',
  mist: '#e5e7eb',
  white: '#f8fafc',
  /** Chart bar 1 */
  indigo: '#5b6cff',
  /** Chart bar 2 */
  blue: '#3f8cff',
  /** Chart bar 3 */
  cyan: '#00b8d9',
  /** Chart bar 4 */
  deepBlue: '#004cc7',
  /** Chart bar 5 */
  deepPurple: '#363187',
  /** Trend line / signal */
  lime: '#def66a',
  ring: '#000000',
  /** Magnifying-glass ring gradient */
  ringFrom: '#c9e1f8',
  ringTo: '#94d5e6',
  danger: '#f87171',
} as const

export type PaletteKey = keyof typeof palette

/** Semantic colors — what product UI should reference. */
export const color = {
  bg: palette.ink,
  surface: palette.inkElevated,
  surfaceMuted: palette.inkMuted,
  border: palette.inkMuted,
  text: palette.mist,
  textMuted: palette.slate,
  textInverse: palette.ink,
  accent: palette.blue,
  accentStrong: palette.indigo,
  positive: palette.cyan,
  warning: palette.lime,
  danger: palette.danger,
  info: palette.ringTo,
  focus: palette.cyan,
} as const

export type ColorToken = keyof typeof color
