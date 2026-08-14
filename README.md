# market-data-brand

Design source of truth for the market-data project: design tokens, brand wording, logo toolkit, UI kit, and Brand Studio.

This repo is **both**:

1. **An npm library** — `@maguer/market-data-brand`, consumed by product apps (`/ui`, `/ui.css`, `/tokens`, `/wording`, `/logo`, …).
2. **A Vite web app** — Brand Studio, previewable locally and deployable as a static site (Vercel).

Library artifacts go to `dist/`. The Studio app goes to `studio-dist/`. The two outputs never share a folder, so `npm publish` and web deploys cannot overwrite each other.


## What lives here

| Concern | Path | Consumed as |
|---|---|---|
| Design tokens (TS) | `src/tokens/*.ts` | `@maguer/market-data-brand/tokens` |
| Generated CSS vars | `src/css/tokens.css` | `@maguer/market-data-brand/tokens.css` |
| Locale catalog (en) | `src/locales/en.json` | `@maguer/market-data-brand/locales/en` |
| Wording / copy | `src/tokens/wording.ts` | `@maguer/market-data-brand/wording` |
| Writing guidelines | `knowledge/writing/` | Agents (Spec / Implement) |
| Logo components | `src/brand/components/` | `@maguer/market-data-brand/logo` |
| UI kit (React) | `src/ui/` → `dist/ui.js` | `@maguer/market-data-brand/ui` |
| UI kit CSS bundle | `src/css/ui.css` (generated) | `@maguer/market-data-brand/ui.css` |

Edit TypeScript tokens, then regenerate CSS. Do not hand-edit `tokens.css` or `ui.css`.

## Workflow

1. `npm install && npm run dev` — Brand Studio at `http://localhost:5173`
2. **Logo** — tune geometry/theme, copy JSON or edit `logo-config.ts` / `logo-theme.ts`
3. **Tokens** — edit `src/tokens/*`, run `npm run tokens:generate`
4. **Wording** — edit `src/locales/en.json` and keep `knowledge/writing/ui-copy.md` in sync
5. **UI kit** — edit `src/ui/*`, preview under the **UI kit** tab; run `npm run build:lib` for package artifacts
6. `npm run logo:export` — writes `public/favicon.svg`
7. Depend on this package from a consumer app via local path or published version

## Writing guidelines

Agent-facing copy rules live under [`knowledge/writing/`](./knowledge/writing/):

- `writing-guidelines.md` — tone, capitalization, punctuation
- `terminology.md` — canonical product terms
- `ui-copy.md` — shared DS inventory and ownership

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Generate UI CSS + Brand Studio |
| `npm run tokens:generate` | TS tokens → `src/css/tokens.css` |
| `npm run ui:generate` | Tokens + theme bridge + component styles → `src/css/ui.css` |
| `npm run build:lib` | Emit `dist/ui.js`, types, and `ui.css` (npm package) |
| `npm run build:app` | Brand Studio production build → `studio-dist/` |
| `npm run build` | Library artifacts + Studio production build |
| `npm run preview` | Preview the Studio production build |
| `npm run logo:export` | Export SVG favicon from default config |
| `npm run release:from-merge` | CI helper: resolve `bump_version` from new `work/history/` files |
| `npm test` | Unit / contract tests |

## Consumer usage

### Tokens / wording / logo

```ts
import '@maguer/market-data-brand/tokens.css'
import { wording } from '@maguer/market-data-brand/wording'
import { color } from '@maguer/market-data-brand/tokens'
```

```ts
wording.product.name
wording.common.loading
wording.labels.orderBook
```

```css
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
}
```

### UI kit (no Tailwind required)

Run `npm run build:lib` in this package so `dist/` and `src/css/ui.css` exist, then in the consumer app:

```ts
import '@maguer/market-data-brand/ui.css'
import {
  Alert,
  Badge,
  Button,
  Card,
  ChartFrame,
  SegmentedControl,
  Select,
  Skeleton,
  StatusFooter,
  Table,
  ThemeToggle,
} from '@maguer/market-data-brand/ui'
```

- Import **`ui.css` once** (e.g. root layout). It includes brand token variables, the theme bridge, and styles for the primitives.
- Import components from `@maguer/market-data-brand/ui`.
- Do **not** install or configure Tailwind in the product app for these components. Tailwind, Radix wiring, and internal helpers stay private to this package.
- React is a peer dependency — share the host app’s React runtime.

Public export map:

| Export | Purpose |
|---|---|
| `@maguer/market-data-brand/ui` | Named React primitives (`Button`, `Select`, `Card`, `Table`, `Badge`, `Skeleton`, `Alert`, `ThemeToggle`, `SegmentedControl`, `StatusFooter`, `ChartFrame`, AppShell family, …) |
| `@maguer/market-data-brand/ui.css` | Generated stylesheet (tokens + theme + component styles) |
| `@maguer/market-data-brand/tokens` | TypeScript design tokens |
| `@maguer/market-data-brand/tokens.css` | Token CSS variables only |
| `@maguer/market-data-brand/wording` | Shared copy (default locale) |
| `@maguer/market-data-brand/locales/en` | Default locale JSON catalog |
| `@maguer/market-data-brand/logo` | Logo component |

### Dashboard surface recipes

Composition patterns for dark dashboard chrome. Use only public CSS variables and kit exports — no private Tailwind classes in product apps.

#### Slim header

```tsx
import { AppHeader, AppHeaderBar, ThemeToggle } from '@maguer/market-data-brand/ui'

<AppHeader>
  <AppHeaderBar density="slim">
    {/* brand + nav */}
    <ThemeToggle value={theme} onValueChange={setTheme} />
  </AppHeaderBar>
</AppHeader>
```

Density tokens: `--density-header-padding-y`, `--density-header-padding-x`, `--density-header-gap`, `--density-header-min-height`, `--density-header-control-gap`.

#### Theme toggle

```tsx
import { ThemeToggle } from '@maguer/market-data-brand/ui'
import { wording } from '@maguer/market-data-brand/wording'

// Accessible name defaults to wording.common.themeToggle
<ThemeToggle value={theme} onValueChange={setTheme} />
```

The control is presentational: wire document/`data-theme` persistence in the consumer.

#### Timeframe pills

```tsx
import { SegmentedControl } from '@maguer/market-data-brand/ui'

<SegmentedControl
  aria-label="Timeframe"
  options={[
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
  ]}
  value={tf}
  onValueChange={setTf}
/>
```

`TimeframeControl` is an alias of `SegmentedControl`. Option labels are consumer-supplied (not brand inventory).

#### Semantic up / down

Prefer brand tokens over ad-hoc hex:

| Surface | Usage |
|---|---|
| CSS | `color: var(--semantic-positive)` / `var(--semantic-negative)` (aliases: `--positive`, `--negative`, `--color-positive`, `--color-negative`) |
| Text | `<Text tone="positive">+1.2%</Text>` / `<Text tone="negative">−0.4%</Text>` |
| Badge | `<Badge variant="positive">Up</Badge>` / `<Badge variant="negative">Down</Badge>` |

#### Chart-area / sparkline chrome

```tsx
import { ChartFrame } from '@maguer/market-data-brand/ui'

<ChartFrame header="Price" footer="24H">
  {/* consumer chart engine / SVG series */}
</ChartFrame>
```

| CSS variable | Role |
|---|---|
| `--chart-frame` / `--chart-frame-border` | Outer card chrome |
| `--chart-plot` | Plot background |
| `--chart-axis` / `--chart-grid` | Axis and grid accents |
| `--chart-sparkline-stroke` / `--chart-sparkline-fill` | Sparkline series accents |
| `--chart-chrome` | Crosshair / quiet chrome |

`ChartFrame` does **not** plot data — it only frames consumer chart surfaces.

#### Live / status footer

```tsx
import { StatusFooter } from '@maguer/market-data-brand/ui'
import { wording } from '@maguer/market-data-brand/wording'

<StatusFooter
  status="live"
  meta={<span>Source · Updated just now</span>}
/>
// default label is wording.common.live when status="live"
```

`LiveStatus` is an alias of `StatusFooter`.

## Publishing (npm library)

The scoped package `@maguer/market-data-brand` is public (`publishConfig.access: public`). Only library files listed in `package.json` `files` are packed — Brand Studio (`studio-dist/`, labs under `src/brand/*Lab*`) is not published.

Package version and npm publish are driven by Feature completion, not by hand-editing `package.json` in Feature PRs.

1. When adding a Feature to `work/feature_list.json`, set required **`bump_version`**: `major` | `minor` | `patch` | `none`.
2. Complete the Feature (Orchestrator writes `work/history/<slug>.md` and marks it `Done`).
3. Merge to **`main`**.
4. [`.github/workflows/release.yml`](./.github/workflows/release.yml) detects new history files, reads `bump_version` (strongest bump if several Features land together), runs `npm version`, and pushes tag `vX.Y.Z`.
5. [`.github/workflows/publish.yml`](./.github/workflows/publish.yml) runs on `v*` tags (`build:lib` → `test` → `npm publish`).

Use `none` for docs-only or non-publishable Features. Do not bump `package.json` version inside Feature PRs — CI owns the version.

On npmjs.com, configure **trusted publishing** (OIDC) for this GitHub repo so the publish workflow can release without a long-lived `NPM_TOKEN`.

## Deploying Brand Studio (web app)

Brand Studio is a static Vite app. `vercel.json` points Vercel at `npm run build:app` and `studio-dist/` so the web deploy never picks up the library `dist/`.

1. Import the GitHub repo in the Vercel dashboard (framework: Vite; output: `studio-dist`).
2. Production: every push to `main` deploys Studio.
3. Previews: pull requests get preview URLs.

Local production check:

```bash
npm run build:app
npm run preview
```

## Harness

This repo adopts the AI Harness for Specification-Driven Development. See [HARNESS.md](./HARNESS.md).

1. Open this repository as the Cursor workspace (PROJECT_ROOT)
2. Install harness agents per `HARNESS.md`
3. Start the Orchestrator and run: `Start Feature <slug>`
