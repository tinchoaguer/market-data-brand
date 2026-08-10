import { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AppBrand,
  AppBrandName,
  AppHeader,
  AppHeaderBar,
  AppMain,
  AppNav,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartFrame,
  Inline,
  Page,
  PageEyebrow,
  PageHeader,
  PageTitle,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Stack,
  StatusFooter,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  ThemeToggle,
  type ThemeAppearance,
} from '../ui/index'
import './UiLab.css'

const TIMEFRAME_OPTIONS = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '1Y', label: '1Y' },
] as const

export function UiLab() {
  const [symbol, setSymbol] = useState('AAPL')
  const [theme, setTheme] = useState<ThemeAppearance>('dark')
  const [timeframe, setTimeframe] = useState('1D')

  return (
    <div className="ui-lab">
      <header className="ui-lab-header">
        <h1>UI kit</h1>
        <p>
          Preview of public primitives from <code>@market-data/brand/ui</code>. Import{' '}
          <code>@market-data/brand/ui.css</code> once in the host app — Tailwind is not required
          for consumers.
        </p>
      </header>

      <section className="ui-lab-section" aria-labelledby="ui-lab-button">
        <h2 id="ui-lab-button">Button</h2>
        <div className="ui-lab-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-theme-toggle">
        <h2 id="ui-lab-theme-toggle">Theme toggle</h2>
        <p className="ui-lab-layout-note">
          Controlled light/dark switch. Persistence and document theme wiring stay in the consumer.
        </p>
        <div className="ui-lab-row">
          <ThemeToggle value={theme} onValueChange={setTheme} />
          <Text size="sm" tone="muted">
            Appearance: {theme}
          </Text>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-timeframe">
        <h2 id="ui-lab-timeframe">Timeframe / segmented control</h2>
        <div className="ui-lab-row">
          <SegmentedControl
            aria-label="Timeframe"
            options={TIMEFRAME_OPTIONS}
            value={timeframe}
            onValueChange={setTimeframe}
          />
          <Text size="sm" tone="muted">
            Selected: {timeframe}
          </Text>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-semantic">
        <h2 id="ui-lab-semantic">Semantic up / down</h2>
        <p className="ui-lab-layout-note">
          Use <code>Text tone=&quot;positive|negative&quot;</code>,{' '}
          <code>Badge variant=&quot;positive|negative&quot;</code>, or{' '}
          <code>var(--semantic-positive)</code> / <code>var(--semantic-negative)</code>.
        </p>
        <div className="ui-lab-row">
          <Text tone="positive" weight="semibold" tabular>
            +1.24%
          </Text>
          <Text tone="negative" weight="semibold" tabular>
            −0.48%
          </Text>
          <Badge variant="positive">Up</Badge>
          <Badge variant="negative">Down</Badge>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-chart-chrome">
        <h2 id="ui-lab-chart-chrome">Chart-area chrome</h2>
        <p className="ui-lab-layout-note">
          <code>ChartFrame</code> is a non-plotting frame. Sparkline stroke/fill use{' '}
          <code>--chart-sparkline-*</code> tokens.
        </p>
        <ChartFrame
          className="ui-lab-chart-frame"
          header={<span>Price</span>}
          footer={<span>Axis / chrome accents via brand chart tokens</span>}
        >
          <svg
            className="ui-lab-sparkline"
            viewBox="0 0 320 96"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 72 C40 68 60 40 100 44 C140 48 160 20 200 28 C240 36 260 16 320 24"
              fill="var(--chart-sparkline-fill)"
              stroke="none"
            />
            <path
              d="M0 72 C40 68 60 40 100 44 C140 48 160 20 200 28 C240 36 260 16 320 24"
              fill="none"
              stroke="var(--chart-sparkline-stroke)"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="80"
              x2="320"
              y2="80"
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
          </svg>
        </ChartFrame>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-status-footer">
        <h2 id="ui-lab-status-footer">Live / status footer</h2>
        <div className="ui-lab-footer-sample">
          <StatusFooter
            status="live"
            meta={
              <Inline gap="sm">
                <span>Source: Brand Studio</span>
                <span aria-hidden="true">·</span>
                <span>Updated just now</span>
              </Inline>
            }
          />
          <StatusFooter status="idle" label="Idle" />
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-select">
        <h2 id="ui-lab-select">Select</h2>
        <div className="ui-lab-row ui-lab-row--narrow">
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger aria-label="Symbol">
              <SelectValue placeholder="Pick a symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="MSFT">MSFT</SelectItem>
              <SelectItem value="GOOGL">GOOGL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-card">
        <h2 id="ui-lab-card">Card</h2>
        <Card className="ui-lab-card">
          <CardHeader>
            <CardTitle>Market snapshot</CardTitle>
            <CardDescription>Brand surface using token-driven theme variables.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content sits on the elevated surface token.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-table">
        <h2 id="ui-lab-table">Table</h2>
        <Card>
          <CardContent className="ui-lab-table-wrap">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>AAPL</TableCell>
                  <TableCell>198.40</TableCell>
                  <TableCell>
                    <Text as="span" tone="positive" size="sm" tabular>
                      +1.2%
                    </Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MSFT</TableCell>
                  <TableCell>420.10</TableCell>
                  <TableCell>
                    <Text as="span" tone="negative" size="sm" tabular>
                      −0.4%
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-badge">
        <h2 id="ui-lab-badge">Badge</h2>
        <div className="ui-lab-row">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="positive">Positive</Badge>
          <Badge variant="negative">Negative</Badge>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-skeleton">
        <h2 id="ui-lab-skeleton">Skeleton</h2>
        <div className="ui-lab-skeleton-row">
          <Skeleton className="ui-lab-skeleton-line" />
          <Skeleton className="ui-lab-skeleton-line ui-lab-skeleton-line--short" />
          <Skeleton className="ui-lab-skeleton-block" />
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-alert">
        <h2 id="ui-lab-alert">Alert</h2>
        <div className="ui-lab-stack">
          <Alert>
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>Informational surface using brand border and card tokens.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Market data refresh completed.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Stale quote detected for this symbol.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Unable to load the latest session.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Watchlist saved.</AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="ui-lab-section" aria-labelledby="ui-lab-layout">
        <h2 id="ui-lab-layout">Layout</h2>
        <p className="ui-lab-layout-note">
          App chrome and page structure for product apps. Prefer these over utility classNames in
          consumers. Use <code>AppHeaderBar density=&quot;slim&quot;</code> for compact dashboard
          chrome.
        </p>
        <div className="ui-lab-layout-frame">
          <AppShell>
            <AppHeader>
              <AppHeaderBar density="slim">
                <AppBrand>
                  <AppBrandName>Market Data</AppBrandName>
                </AppBrand>
                <AppNav aria-label="Demo">
                  <Button size="sm" variant="primary">
                    Market Data
                  </Button>
                  <Button size="sm" variant="ghost">
                    Analysis
                  </Button>
                </AppNav>
                <ThemeToggle value={theme} onValueChange={setTheme} />
              </AppHeaderBar>
            </AppHeader>
            <AppMain>
              <Page>
                <PageHeader>
                  <PageEyebrow>MD</PageEyebrow>
                  <PageTitle>Market data</PageTitle>
                </PageHeader>
                <Stack gap="md">
                  <Text tone="muted">Page content uses Page + Stack + Text.</Text>
                  <Skeleton size="card" />
                </Stack>
              </Page>
            </AppMain>
            <StatusFooter status="live" meta={<span>Slim header + Live footer sample</span>} />
          </AppShell>
        </div>
      </section>
    </div>
  )
}
