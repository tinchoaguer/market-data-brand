/**
 * Theme-critical CSS custom properties expected after tokens + theme bridge.
 * Used by tests and documentation; mirrors `bridge.css`.
 */
export const THEME_BRIDGE_VARS = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--radius',
  '--success',
  '--warning',
  '--info',
] as const

export type ThemeBridgeVar = (typeof THEME_BRIDGE_VARS)[number]

/** Brand token CSS variables that theme bridge depends on. */
export const BRAND_TOKEN_VARS = [
  '--color-bg',
  '--color-text',
  '--color-surface',
  '--color-surface-muted',
  '--color-text-muted',
  '--color-accent',
  '--color-accent-strong',
  '--color-text-inverse',
  '--color-danger',
  '--color-positive',
  '--color-warning',
  '--color-info',
  '--color-border',
  '--color-focus',
  '--radius-md',
] as const
