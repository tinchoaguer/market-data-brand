import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert, AlertDescription, AlertTitle } from './alert'

describe('Alert', () => {
  it('renders an alert with semantic variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert.className).toContain('border-[var(--destructive)]/40')
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
