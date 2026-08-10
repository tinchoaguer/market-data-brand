import * as React from 'react'
import { cn } from '../lib/utils'

export type SegmentedControlOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Mutually exclusive options (consumer-supplied labels — e.g. 1D, 1W). */
  options: readonly SegmentedControlOption[]
  /** Currently selected option id. */
  value: string
  /** Called when the user selects a different option. */
  onValueChange: (value: string) => void
}

/**
 * Horizontal pill / segmented control for mutually exclusive options (timeframes, etc.).
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, options, value, onValueChange, role = 'radiogroup', ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--muted)] p-0.5',
        className,
      )}
      {...props}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            data-state={selected ? 'on' : 'off'}
            className={cn(
              'inline-flex h-7 min-w-8 items-center justify-center rounded-[var(--radius-sm)] px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm'
                : 'bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
            )}
            onClick={() => {
              if (!option.disabled && option.value !== value) {
                onValueChange(option.value)
              }
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  ),
)
SegmentedControl.displayName = 'SegmentedControl'

/** Alias for timeframe pill usage. */
export const TimeframeControl = SegmentedControl
