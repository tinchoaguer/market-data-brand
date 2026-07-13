import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const pageVariants = cva(
  'mx-auto flex w-full max-w-5xl flex-col px-8 py-8',
  {
    variants: {
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
      },
    },
    defaultVariants: {
      gap: 'md',
    },
  },
)

export interface PageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageVariants> {}

/** Constrained product page column (shared content width). */
export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, gap, ...props }, ref) => (
    <div ref={ref} className={cn(pageVariants({ gap }), className)} {...props} />
  ),
)
Page.displayName = 'Page'

/** Title block at the top of a product page. */
export const PageHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
))
PageHeader.displayName = 'PageHeader'

/** Small uppercase product / section eyebrow above the page title. */
export const PageEyebrow = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm uppercase tracking-[var(--letter-spacing-wide)] text-[var(--muted-foreground)]',
      className,
    )}
    {...props}
  />
))
PageEyebrow.displayName = 'PageEyebrow'

/** Primary page heading. */
export const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      'text-3xl font-bold tracking-[var(--letter-spacing-tight)]',
      className,
    )}
    {...props}
  />
))
PageTitle.displayName = 'PageTitle'

export { pageVariants }
