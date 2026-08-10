/** Primitive palette — raw brand colors from the logo/favicon. Prefer semantic tokens in UI. */
export const palette = {
  /** Federal deep blue — max-contrast text and dark chrome */
  ink: '#1E2A38',
  /** Federal blue elevated surfaces */
  inkElevated: '#2C3E50',
  /** Desaturated blue-gray — secondary text and borders */
  inkMuted: '#4A6572',
  /** Pampean celeste — primary brand blue */
  blue: '#7FA8CC',
  /** Soft washed sky blue */
  sky: '#A0C4DF',
  /** Wheat / sand mid-tone */
  wheat: '#EADBC8',
  /** Soft clay / ochre */
  clay: '#D5CEA3',
  /** Warm off-white base */
  cream: '#FBF9F6',
  /** Earth / pampa clay */
  earth: '#705C53',
  /** Mate gold */
  gold: '#D4A359',
  /** Terracotta — market down / error */
  terracotta: '#B85042',
} as const

export type PaletteKey = keyof typeof palette

/** Semantic colors — what product UI should reference. */
export const color = {
  bg: palette.ink,
  surface: palette.inkElevated,
  surfaceMuted: palette.inkMuted,
  border: palette.inkMuted,
  text: palette.wheat,
  textMuted: palette.blue,
  textInverse: palette.ink,
  accent: palette.wheat,
  accentStrong: palette.clay,
  positive: palette.sky,
  /** Down / negative directional emphasis (price change, deltas). */
  negative: palette.terracotta,
  warning: palette.gold,
  danger: palette.terracotta,
  info: palette.gold,
  focus: palette.sky,
} as const

export type ColorToken = keyof typeof color

/**
 * Directional metric emphasis (up/down). Prefer these over inventing
 * consumer hex values for price change and similar deltas.
 * Maps to `--semantic-positive` / `--semantic-negative` CSS variables.
 */
export const semantic = {
  positive: palette.sky,
  negative: palette.terracotta,
} as const

export type SemanticToken = keyof typeof semantic
