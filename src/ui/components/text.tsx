import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const textVariants = cva('', {
  variants: {
    tone: {
      default: 'text-[var(--foreground)]',
      muted: 'text-[var(--muted-foreground)]',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    mono: {
      true: 'font-[family-name:var(--font-mono)]',
      false: '',
    },
    tabular: {
      true: 'tabular-nums',
      false: '',
    },
  },
  defaultVariants: {
    tone: 'default',
    size: 'md',
    weight: 'regular',
    mono: false,
    tabular: false,
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

/** Brand typography for body / muted / mono numeric text. */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { className, tone, size, weight, mono, tabular, as: Comp = 'p', ...props },
    ref,
  ) => (
    <Comp
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cn(
        textVariants({ tone, size, weight, mono, tabular }),
        className,
      )}
      {...props}
    />
  ),
)
Text.displayName = 'Text'

/** Form / field label. */
export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium text-[var(--muted-foreground)]',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'

const sectionHeadingVariants = cva(
  'text-sm font-medium text-[var(--muted-foreground)]',
  {
    variants: {
      spacing: {
        sm: 'mb-2',
        md: 'mb-3',
      },
    },
    defaultVariants: {
      spacing: 'sm',
    },
  },
)

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof sectionHeadingVariants> {}

/** Muted subsection title (e.g. bids/asks, candle timeframe). */
export const SectionHeading = React.forwardRef<
  HTMLHeadingElement,
  SectionHeadingProps
>(({ className, spacing, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(sectionHeadingVariants({ spacing }), className)}
    {...props}
  />
))
SectionHeading.displayName = 'SectionHeading'

export { textVariants, sectionHeadingVariants }
