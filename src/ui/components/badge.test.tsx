import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders a status label', () => {
    render(<Badge variant="success">Live</Badge>)
    const badge = screen.getByText('Live')
    expect(badge).toBeInTheDocument()
    expect(badge.className).toContain('bg-[var(--success)]')
  })
})
