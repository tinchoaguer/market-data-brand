import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

describe('Table', () => {
  it('renders tabular structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>AAPL</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Symbol' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'AAPL' })).toBeInTheDocument()
  })
})
