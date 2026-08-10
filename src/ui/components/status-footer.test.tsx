import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { StatusFooter } from './status-footer'
import { wording } from '../../tokens/wording'

afterEach(() => {
  cleanup()
})

describe('StatusFooter', () => {
  it('renders Live indicator and wording-backed label for live status', () => {
    render(<StatusFooter status="live" />)

    expect(screen.getByText(wording.common.live)).toBeInTheDocument()
    const footer = screen.getByText(wording.common.live).closest('footer')
    expect(footer).toHaveAttribute('data-status', 'live')
    expect(footer?.querySelector('[data-status-dot]')).not.toBeNull()
  })

  it('supports idle visual state with custom label', () => {
    render(<StatusFooter status="idle" label="Idle" />)

    expect(screen.getByText('Idle')).toBeInTheDocument()
    expect(screen.getByText('Idle').closest('footer')).toHaveAttribute(
      'data-status',
      'idle',
    )
  })

  it('renders meta slot content for quiet footer chrome', () => {
    render(<StatusFooter status="live" meta={<span>Source</span>} />)
    expect(screen.getByText('Source')).toBeInTheDocument()
  })
})
