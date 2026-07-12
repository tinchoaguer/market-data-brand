import { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/index'
import './UiLab.css'

export function UiLab() {
  const [symbol, setSymbol] = useState('AAPL')

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
                  <TableCell>+1.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MSFT</TableCell>
                  <TableCell>420.10</TableCell>
                  <TableCell>-0.4%</TableCell>
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
    </div>
  )
}
