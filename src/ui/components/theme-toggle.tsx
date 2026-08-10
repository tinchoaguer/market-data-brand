import * as React from 'react'
import { cn } from '../lib/utils'
import { uiWording } from '../lib/wording'

export type ThemeAppearance = 'light' | 'dark'

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onChange' | 'value'> {
  /** Current appearance. Controlled by the consumer (persistence lives outside the kit). */
  value?: ThemeAppearance
  /** Called when the user requests the opposite appearance. */
  onValueChange?: (value: ThemeAppearance) => void
  /** Accessible name; defaults to `common.themeToggle` wording. */
  label?: string
}

/**
 * Light/dark theme toggle. Reflects controlled `value`; does not own global theme storage.
 */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      className,
      value = 'dark',
      onValueChange,
      label = uiWording.common.themeToggle,
      type = 'button',
      onClick,
      ...props
    },
    ref,
  ) => {
    const isDark = value === 'dark'

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={isDark}
        aria-label={label}
        data-theme={value}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-transparent text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          onValueChange?.(isDark ? 'light' : 'dark')
        }}
        {...props}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isDark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          ) : (
            <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z" />
          )}
        </svg>
      </button>
    )
  },
)
ThemeToggle.displayName = 'ThemeToggle'
