import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const skeletonVariants = cva(
  'animate-pulse rounded-[var(--radius-md)] bg-[var(--muted)]',
  {
    variants: {
      size: {
        line: 'h-4 w-full',
        card: 'h-24 w-full',
        panel: 'h-40 w-full',
        unset: '',
      },
    },
    defaultVariants: {
      size: 'unset',
    },
  },
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({ className, size, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ size }), className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { skeletonVariants }
