import * as React from 'react'
import { cn } from '../lib/utils'

export interface ChartFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional caption / toolbar row above the plot. */
  header?: React.ReactNode
  /** Optional axis / legend chrome below the plot. */
  footer?: React.ReactNode
}

/**
 * Non-plotting chart-area chrome: frame, plot surface, and slots for consumer chart engines.
 * Does not render series data — apply `--chart-*` CSS variables for stroke/fill accents.
 */
export const ChartFrame = React.forwardRef<HTMLDivElement, ChartFrameProps>(
  ({ className, header, footer, children, ...props }, ref) => (
    <div
      ref={ref}
      data-chart-frame=""
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--chart-frame-border)] bg-[var(--chart-frame)] text-[var(--foreground)]',
        className,
      )}
      {...props}
    >
      {header != null ? (
        <div
          data-chart-frame-header=""
          className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--chart-frame-border)] px-3 py-2 text-xs text-[var(--muted-foreground)]"
        >
          {header}
        </div>
      ) : null}
      <div
        data-chart-plot=""
        className="relative min-h-[8rem] flex-1 bg-[var(--chart-plot)]"
      >
        {children}
      </div>
      {footer != null ? (
        <div
          data-chart-frame-footer=""
          className="flex shrink-0 items-center gap-2 border-t border-[var(--chart-frame-border)] px-3 py-1.5 text-[10px] text-[var(--chart-axis)]"
        >
          {footer}
        </div>
      ) : null}
    </div>
  ),
)
ChartFrame.displayName = 'ChartFrame'
