import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardHeader, CardTitle } from './card'

describe('Card', () => {
  it('renders Card fill and scroll content variants', () => {
    render(
      <Card height="fill" data-testid="fill-card">
        <CardHeader>
          <CardTitle>Bound</CardTitle>
        </CardHeader>
        <CardContent scroll data-testid="scroll-body">
          Body
        </CardContent>
      </Card>,
    )

    expect(screen.getByTestId('fill-card')).toHaveAttribute(
      'data-card-height',
      'fill',
    )
    expect(screen.getByTestId('scroll-body')).toHaveAttribute(
      'data-card-scroll',
      'true',
    )
  })
})
