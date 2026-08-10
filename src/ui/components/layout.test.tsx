import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  AppBrand,
  AppBrandName,
  AppHeader,
  AppHeaderBar,
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

  it('applies slim header density tokens on AppHeaderBar', () => {
    render(<AppHeaderBar density="slim" data-testid="slim-bar" />)
    const bar = screen.getByTestId('slim-bar')
    expect(bar).toHaveAttribute('data-header-density', 'slim')
    expect(bar.className).toContain('min-h-[var(--density-header-min-height)]')
    expect(bar.className).toContain('py-[var(--density-header-padding-y)]')
  })

  it('renders Page title hierarchy', () => {
    const { container } = render(
      <Page>
        <PageEyebrow>MD</PageEyebrow>
        <PageTitle>Market data</PageTitle>
      </Page>,
    )

    expect(screen.getByText('MD')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Market data' })).toBeInTheDocument()
    expect(container.firstChild).toBeInstanceOf(HTMLElement)
    expect((container.firstChild as HTMLElement)).toHaveAttribute(
      'data-page-width',
      'default',
    )
  })

  it('renders full-width Page for workstation surfaces', () => {
    const { container } = render(
      <Page width="full" data-testid="full-page">
        <PageTitle>Reading</PageTitle>
      </Page>,
    )

    expect(screen.getByTestId('full-page')).toHaveAttribute(
      'data-page-width',
      'full',
    )
    expect((container.firstChild as HTMLElement).className).toContain('max-w-none')
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
    const root = container.firstChild
    expect(root).toBeInstanceOf(HTMLElement)
    expect((root as HTMLElement).className).toContain('flex-col')
    expect((root as HTMLElement).className).toContain('gap-6')
  })

  it('applies ClusterItem share variants for uneven Reading bands', () => {
    render(
      <Cluster data-testid="cluster">
        <ClusterItem share="majority" data-testid="majority">
          Evidence
        </ClusterItem>
        <ClusterItem share="minority" data-testid="minority">
          Market Data
        </ClusterItem>
        <ClusterItem share="aside" data-testid="aside">
          Classification
        </ClusterItem>
      </Cluster>,
    )

    expect(screen.getByTestId('majority')).toHaveAttribute(
      'data-cluster-share',
      'majority',
    )
    expect(screen.getByTestId('majority').className).toContain('flex-[3]')
    expect(screen.getByTestId('minority')).toHaveAttribute(
      'data-cluster-bound',
      'true',
    )
    expect(screen.getByTestId('aside')).toHaveAttribute(
      'data-cluster-bound',
      'true',
    )
    expect(
      screen.getByTestId('aside').querySelector('[data-cluster-bound-panel]'),
    ).not.toBeNull()
  })
})
