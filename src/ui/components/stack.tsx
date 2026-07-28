import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    width: {
      full: 'w-full',
      narrow: 'w-full max-w-xs',
      unset: '',
    },
  },
  defaultVariants: {
    gap: 'md',
    width: 'unset',
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

/** Vertical flex stack with branded spacing. */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, width, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(stackVariants({ gap, width }), className)}
      {...props}
    />
  ),
)
Stack.displayName = 'Stack'

const inlineVariants = cva('flex items-center', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
    wrap: {
      true: 'flex-wrap',
      false: '',
    },
  },
  defaultVariants: {
    gap: 'md',
    wrap: false,
  },
})

export interface InlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants> {}

/** Horizontal flex row with branded spacing. */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  ({ className, gap, wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(inlineVariants({ gap, wrap }), className)}
      {...props}
    />
  ),
)
Inline.displayName = 'Inline'

/** Column on small screens, side-by-side on md+ — for paired panels. */
export const Cluster = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-6 md:relative md:flex-row', className)}
    {...props}
  />
))
Cluster.displayName = 'Cluster'

const clusterItemVariants = cva('min-w-0', {
  variants: {
    /**
     * Relative share inside a Cluster (Reading layout implementation).
     * - fill: equal flex growth (default)
     * - majority: ~3 share (defines row height beside bound siblings)
     * - minority: ~2 share; md+ bound to majority height with scroll
     * - aside: capped width; md+ bound to majority height with scroll
     */
    share: {
      fill: 'flex-1',
      majority: 'flex-[3]',
      minority:
        'relative flex-[2] md:min-h-0 md:self-stretch',
      aside:
        'relative w-full flex-none md:w-[min(100%,20rem)] md:min-h-0 md:self-stretch',
    },
  },
  defaultVariants: {
    share: 'fill',
  },
})

export interface ClusterItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof clusterItemVariants> {}

function isBoundShare(
  share: ClusterItemProps['share'],
): share is 'aside' | 'minority' {
  return share === 'aside' || share === 'minority'
}

/** Child inside a Cluster with optional uneven share. */
export const ClusterItem = React.forwardRef<HTMLDivElement, ClusterItemProps>(
  ({ className, share, children, ...props }, ref) => {
    const bound = isBoundShare(share)

    return (
      <div
        ref={ref}
        className={cn(clusterItemVariants({ share }), className)}
        data-cluster-share={share ?? 'fill'}
        data-cluster-bound={bound ? 'true' : undefined}
        {...props}
      >
        {bound ? (
          <div
            data-cluster-bound-panel={share}
            className={
              share === 'aside'
                ? // Fill sibling height; Region Card scrolls inside (Classification).
                  'flex min-h-0 flex-col md:absolute md:inset-0 md:overflow-hidden [&>[data-region-id]]:flex [&>[data-region-id]]:h-full [&>[data-region-id]]:min-h-0 [&>[data-region-id]]:flex-col'
                : // Scroll whole supporting column (Market Data) to Evidence height.
                  'md:absolute md:inset-0 md:overflow-y-auto'
            }
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    )
  },
)
ClusterItem.displayName = 'ClusterItem'

export { stackVariants, inlineVariants, clusterItemVariants }
