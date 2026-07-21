# market-data-brand

Design source of truth for the market-data project: design tokens, brand wording, logo toolkit, UI kit, and Brand Studio.

## What lives here

| Concern | Path | Consumed as |
|---|---|---|
| Design tokens (TS) | `src/tokens/*.ts` | `@market-data/brand/tokens` |
| Generated CSS vars | `src/css/tokens.css` | `@market-data/brand/tokens.css` |
| Locale catalog (en) | `src/locales/en.json` | `@market-data/brand/locales/en` |
| Wording / copy | `src/tokens/wording.ts` | `@market-data/brand/wording` |
| Writing guidelines | `knowledge/writing/` | Agents (Spec / Implement) |
| Logo components | `src/brand/components/` | `@market-data/brand/logo` |
| UI kit (React) | `src/ui/` → `dist/ui.js` | `@market-data/brand/ui` |
| UI kit CSS bundle | `src/css/ui.css` (generated) | `@market-data/brand/ui.css` |

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
| `npm run build:lib` | Emit `dist/ui.js`, types, and `ui.css` |
| `npm run logo:export` | Export SVG favicon from default config |
| `npm run build` | Library artifacts + Studio production build |
| `npm test` | Unit / contract tests |

## Consumer usage

### Tokens / wording / logo

```ts
import '@market-data/brand/tokens.css'
import { wording } from '@market-data/brand/wording'
import { color } from '@market-data/brand/tokens'
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
import '@market-data/brand/ui.css'
import {
  Alert,
  Badge,
  Button,
  Card,
  Select,
  Skeleton,
  Table,
} from '@market-data/brand/ui'
```

- Import **`ui.css` once** (e.g. root layout). It includes brand token variables, the theme bridge, and styles for the primitives.
- Import components from `@market-data/brand/ui`.
- Do **not** install or configure Tailwind in the product app for these components. Tailwind, Radix wiring, and internal helpers stay private to this package.
- React is a peer dependency — share the host app’s React runtime.

Public export map:

| Export | Purpose |
|---|---|
| `@market-data/brand/ui` | Named React primitives (`Button`, `Select`, `Card`, `Table`, `Badge`, `Skeleton`, `Alert`, …) |
| `@market-data/brand/ui.css` | Generated stylesheet (tokens + theme + component styles) |
| `@market-data/brand/tokens` | TypeScript design tokens |
| `@market-data/brand/tokens.css` | Token CSS variables only |
| `@market-data/brand/wording` | Shared copy (default locale) |
| `@market-data/brand/locales/en` | Default locale JSON catalog |
| `@market-data/brand/logo` | Logo component |

## Harness

This repo adopts the AI Harness for Specification-Driven Development. See [HARNESS.md](./HARNESS.md).

1. Open this repository as the Cursor workspace (PROJECT_ROOT)
2. Install harness agents per `HARNESS.md`
3. Start the Orchestrator and run: `Start Feature <slug>`
