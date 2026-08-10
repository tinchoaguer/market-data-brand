import { palette } from './colors.ts'

/**
 * Chart-area / sparkline chrome vocabulary.
 * Consumers bind series data; brand owns frame, plot surface, axis/grid, and stroke/fill accents.
 */
export const chart = {
  /** Outer chart card / frame surface. */
  frame: palette.inkElevated,
  /** Border around the chart frame. */
  frameBorder: palette.inkMuted,
  /** Inner plot background. */
  plot: palette.ink,
  /** Axis labels and ticks. */
  axis: palette.blue,
  /** Grid / guide lines. */
  grid: palette.inkMuted,
  /** Sparkline / primary series stroke. */
  sparklineStroke: palette.sky,
  /** Soft sparkline fill (under-curve wash). */
  sparklineFill: 'color-mix(in srgb, #A0C4DF 28%, transparent)',
  /** Quiet chrome accents (crosshair, hover rule). */
  chrome: palette.wheat,
} as const

export type ChartToken = keyof typeof chart
