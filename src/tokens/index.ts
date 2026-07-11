import { color, palette } from './colors.ts'
import { duration, easing } from './motion.ts'
import { radius } from './radius.ts'
import { space } from './space.ts'
import {
  font,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from './typography.ts'
import { wording } from './wording.ts'
import { flattenTokens, type JsonValue } from './flatten.ts'

/** Design tokens consumed by CSS generation and TS imports. Wording is separate. */
export const tokens = {
  palette,
  color,
  font,
  'font-size': fontSize,
  'font-weight': fontWeight,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
  space,
  radius,
  duration,
  easing,
} as const

export function tokensToCssVariables(): Record<string, string> {
  return flattenTokens(tokens as unknown as Record<string, JsonValue>)
}

export {
  color,
  palette,
  duration,
  easing,
  radius,
  space,
  font,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  wording,
  flattenTokens,
}

export type { ColorToken, PaletteKey } from './colors.ts'
export type { SpaceToken } from './space.ts'
export type { RadiusToken } from './radius.ts'
export type { Wording } from './wording.ts'
