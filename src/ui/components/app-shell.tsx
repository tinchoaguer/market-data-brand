import * as React from 'react'
import { cn } from '../lib/utils'

/** Full-viewport product shell: background, text color, column layout. */
export const AppShell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text)]',
      className,
    )}
    {...props}
  />
))
AppShell.displayName = 'AppShell'

/** Persistent top chrome surface (border + surface token). */
export const AppHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'border-b border-[var(--color-border)] bg-[var(--color-surface)]',
      className,
    )}
    {...props}
  />
))
AppHeader.displayName = 'AppHeader'

/** Centered max-width row inside the header for brand + nav. */
export const AppHeaderBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mx-auto flex w-full max-w-5xl flex-wrap items-center gap-4 px-8 py-4',
      className,
    )}
    {...props}
  />
))
AppHeaderBar.displayName = 'AppHeaderBar'

/** Brand mark + product name cluster. */
export const AppBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-3', className)} {...props} />
))
AppBrand.displayName = 'AppBrand'

/** Shrink-wrap for logo / mark so it does not flex-grow. */
export const AppBrandMark = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('shrink-0', className)} {...props} />
))
AppBrandMark.displayName = 'AppBrandMark'

/** Product name typography in chrome. */
export const AppBrandName = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'text-lg font-semibold tracking-[var(--letter-spacing-tight)]',
      className,
    )}
    {...props}
  />
))
AppBrandName.displayName = 'AppBrandName'

/** Primary destination navigation row. */
export const AppNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('flex flex-wrap items-center gap-2', className)}
    {...props}
  />
))
AppNav.displayName = 'AppNav'

/** Content outlet that fills remaining shell height. */
export const AppMain = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main ref={ref} className={cn('flex-1', className)} {...props} />
))
AppMain.displayName = 'AppMain'
