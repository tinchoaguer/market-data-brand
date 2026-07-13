import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  AppBrand,
  AppBrandName,
  AppHeader,
  AppMain,
  AppNav,
  AppShell,
} from './app-shell'
import { Page, PageEyebrow, PageTitle } from './page'
import { Cluster, ClusterItem, Stack } from './stack'
import { Label, SectionHeading, Text } from './text'

describe('layout primitives', () => {
  it('renders AppShell chrome regions', () => {
    render(
      <AppShell>
        <AppHeader data-testid="header">
          <AppBrand>
            <AppBrandName>Market Data</AppBrandName>
          </AppBrand>
          <AppNav aria-label="Primary">nav</AppNav>
        </AppHeader>
        <AppMain>content</AppMain>
      </AppShell>,
    )

    expect(screen.getByTestId('header').tagName).toBe('HEADER')
    expect(screen.getByText('Market Data')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByText('content').closest('main')).toBeTruthy()
  })

  it('renders Page title hierarchy', () => {
    render(
      <Page>
        <PageEyebrow>MD</PageEyebrow>
        <PageTitle>Market data</PageTitle>
      </Page>,
    )

    expect(screen.getByText('MD')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Market data' })).toBeInTheDocument()
  })

  it('renders Stack, Cluster, and Text helpers', () => {
    const { container } = render(
      <Stack gap="lg">
        <Text tone="muted">Muted</Text>
        <Label htmlFor="sym">Symbol</Label>
        <Cluster>
          <ClusterItem>
            <SectionHeading>Bids</SectionHeading>
          </ClusterItem>
        </Cluster>
      </Stack>,
    )

    expect(screen.getByText('Muted').className).toContain('text-[var(--muted-foreground)]')
    expect(screen.getByText('Symbol')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Bids' })).toBeInTheDocument()
    expect(container.firstChild?.className).toContain('flex-col')
    expect(container.firstChild?.className).toContain('gap-6')
  })
})
