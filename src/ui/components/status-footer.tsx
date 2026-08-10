import * as React from 'react'
import { cn } from '../lib/utils'
import { uiWording } from '../lib/wording'

export type StatusFooterKind = 'live' | 'idle'

export interface StatusFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Presentational status kind. */
  status?: StatusFooterKind
  /** Status label; defaults to `common.live` wording when status is `live`. */
  label?: React.ReactNode
  /** Extra quiet chrome (date, source, etc.) rendered after the status cluster. */
  meta?: React.ReactNode
}

/**
 * Quiet Live / status footer chrome: indicator + label, suitable for dashboard footers.
 */
export const StatusFooter = React.forwardRef<HTMLElement, StatusFooterProps>(
  (
    {
      className,
      status = 'live',
      label,
      meta,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedLabel =
      label ?? (status === 'live' ? uiWording.common.live : undefined)

    return (
      <footer
        ref={ref}
        data-status={status}
        className={cn(
          'flex flex-wrap items-center gap-3 border-t border-[var(--border)] bg-[var(--color-bg)] px-[var(--density-header-padding-x)] py-2 text-xs text-[var(--muted-foreground)]',
          className,
        )}
        {...props}
      >
        <span className="inline-flex items-center gap-1.5" data-status-cluster="">
          <span
            aria-hidden="true"
            data-status-dot=""
            className={cn(
              'size-1.5 shrink-0 rounded-full',
              status === 'live'
                ? 'bg-[var(--positive)]'
                : 'bg-[var(--muted-foreground)] opacity-60',
            )}
          />
          {resolvedLabel != null ? (
            <span data-status-label="">{resolvedLabel}</span>
          ) : null}
        </span>
        {meta}
        {children}
      </footer>
    )
  },
)
StatusFooter.displayName = 'StatusFooter'

/** Alias matching Live-status naming in product chrome. */
export const LiveStatus = StatusFooter
