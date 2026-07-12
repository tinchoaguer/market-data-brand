import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const alertVariants = cva(
  'relative w-full rounded-[var(--radius-md)] border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]',
        info: 'border-[var(--info)]/40 bg-[var(--info)]/10 text-[var(--foreground)]',
        warning: 'border-[var(--warning)]/40 bg-[var(--warning)]/10 text-[var(--foreground)]',
        destructive:
          'border-[var(--destructive)]/40 bg-[var(--destructive)]/10 text-[var(--foreground)]',
        success:
          'border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, role = 'alert', ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
)
Alert.displayName = 'Alert'

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
))
AlertTitle.displayName = 'AlertTitle'

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-[var(--muted-foreground)] [&_p]:leading-relaxed', className)} {...props} />
))
AlertDescription.displayName = 'AlertDescription'

export { alertVariants }
