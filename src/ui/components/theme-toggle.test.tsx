import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './theme-toggle'
import { wording } from '../../tokens/wording'

afterEach(() => {
  cleanup()
})

describe('ThemeToggle', () => {
  it('renders an accessible switch with wording-backed name', () => {
    render(<ThemeToggle value="dark" />)
    const control = screen.getByRole('switch', {
      name: wording.common.themeToggle,
    })
    expect(control).toBeInTheDocument()
    expect(control).toHaveAttribute('aria-checked', 'true')
    expect(control).toHaveAttribute('data-theme', 'dark')
  })

  it('notifies consumer when toggled without owning persistence', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ThemeToggle value="dark" onValueChange={onValueChange} />)

    await user.click(
      screen.getByRole('switch', { name: wording.common.themeToggle }),
    )
    expect(onValueChange).toHaveBeenCalledWith('light')
  })

  it('reflects light appearance state', () => {
    render(<ThemeToggle value="light" />)
    expect(
      screen.getByRole('switch', { name: wording.common.themeToggle }),
    ).toHaveAttribute('aria-checked', 'false')
  })
})
