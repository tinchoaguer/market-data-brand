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
    className={cn('flex flex-col gap-6 md:flex-row', className)}
    {...props}
  />
))
Cluster.displayName = 'Cluster'

/** Equal-width child inside a Cluster. */
export const ClusterItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('min-w-0 flex-1', className)} {...props} />
))
ClusterItem.displayName = 'ClusterItem'

export { stackVariants, inlineVariants }
