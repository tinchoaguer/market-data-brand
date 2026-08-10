/**
 * Compact chrome density — slim dashboard header and related control spacing.
 * Use with AppHeaderBar `density="slim"` or CSS vars directly.
 */
export const density = {
  /** Vertical padding inside a slim header bar. */
  headerPaddingY: '0.5rem',
  /** Horizontal padding inside a slim header bar. */
  headerPaddingX: '1.5rem',
  /** Gap between header clusters (brand, nav, actions). */
  headerGap: '0.75rem',
  /** Minimum height target for a slim chrome bar. */
  headerMinHeight: '2.75rem',
  /** Tight gap between adjacent header controls. */
  headerControlGap: '0.5rem',
} as const

export type DensityToken = keyof typeof density
