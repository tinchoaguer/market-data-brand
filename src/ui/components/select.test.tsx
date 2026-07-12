import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

describe('Select', () => {
  it('renders an accessible select trigger', () => {
    render(
      <Select defaultValue="aapl">
        <SelectTrigger aria-label="Symbol">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="aapl">AAPL</SelectItem>
          <SelectItem value="msft">MSFT</SelectItem>
        </SelectContent>
      </Select>,
    )

    expect(screen.getByRole('combobox', { name: 'Symbol' })).toBeInTheDocument()
  })
})
