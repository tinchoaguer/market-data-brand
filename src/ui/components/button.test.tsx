import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders a pressable button with primary variant by default', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toBeInTheDocument()
    expect(button.className).toContain('bg-[var(--primary)]')
  })

  it('supports secondary variant', () => {
    render(<Button variant="secondary">Cancel</Button>)
    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain(
      'bg-[var(--secondary)]',
    )
  })
})
