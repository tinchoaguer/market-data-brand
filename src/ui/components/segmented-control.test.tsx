import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from './segmented-control'

const OPTIONS = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
] as const

afterEach(() => {
  cleanup()
})

describe('SegmentedControl', () => {
  it('renders mutually exclusive options with one selected', () => {
    render(
      <SegmentedControl
        aria-label="Timeframe"
        options={OPTIONS}
        value="1D"
        onValueChange={() => {}}
      />,
    )

    expect(screen.getByRole('radiogroup', { name: 'Timeframe' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '1D' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByRole('radio', { name: '1W' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  it('calls onValueChange with the selected option id', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        aria-label="Timeframe"
        options={OPTIONS}
        value="1D"
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('radio', { name: '1W' }))
    expect(onValueChange).toHaveBeenCalledWith('1W')
  })
})
