import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const cardVariants = cva(
  'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm',
  {
    variants: {
      /** Fill a bound ClusterItem / parent flex column (Reading sibling alignment). */
      height: {
        auto: '',
        fill: 'flex h-full min-h-0 w-full flex-col',
      },
    },
    defaultVariants: {
      height: 'auto',
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, height, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ height }), className)}
      data-card-height={height ?? 'auto'}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex shrink-0 flex-col gap-1.5 p-6', className)}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-[var(--muted-foreground)]', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const cardContentVariants = cva('p-6 pt-0', {
  variants: {
    scroll: {
      true: 'min-h-0 flex-1 overflow-y-auto',
      false: '',
    },
  },
  defaultVariants: {
    scroll: false,
  },
})

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, scroll, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ scroll }), className)}
      data-card-scroll={scroll ? 'true' : undefined}
      {...props}
    />
  ),
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

export { cardVariants, cardContentVariants }
