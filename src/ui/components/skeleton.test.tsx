import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('renders an inert loading placeholder', () => {
    const { container } = render(<Skeleton data-testid="skel" className="h-4 w-20" />)
    const el = container.querySelector('[data-testid="skel"]')
    expect(el).toBeTruthy()
    expect(el?.getAttribute('aria-hidden')).toBe('true')
    expect(el?.className).toContain('animate-pulse')
    expect(el?.className).toContain('bg-[var(--muted)]')
  })
})
