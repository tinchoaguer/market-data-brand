import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

describe('Card', () => {
  it('renders a brand surface container', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Snapshot</CardTitle>
          <CardDescription>Daily summary</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    )

    expect(screen.getByText('Snapshot')).toBeInTheDocument()
    expect(screen.getByText('Daily summary')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
