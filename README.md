# market-data-brand

Design source of truth for the market-data project: design tokens, brand wording, logo toolkit, and Brand Studio.

## What lives here

| Concern | Path | Consumed by FE as |
|---|---|---|
| Design tokens (TS) | `src/tokens/*.ts` | `@market-data/brand/tokens` |
| Generated CSS vars | `src/css/tokens.css` | `@market-data/brand/tokens.css` |
| Wording / copy | `src/tokens/wording.ts` | `@market-data/brand/wording` |
| Logo components | `src/brand/components/` | `@market-data/brand/logo` |

Edit TypeScript tokens, then regenerate CSS. Do not hand-edit `tokens.css`.

## Workflow

1. `npm install && npm run dev` — Brand Studio at `http://localhost:5173`
2. **Logo** — tune geometry/theme, copy JSON or edit `logo-config.ts` / `logo-theme.ts`
3. **Tokens** — edit `src/tokens/*`, run `npm run tokens:generate`
4. **Wording** — edit `src/tokens/wording.ts`
5. `npm run logo:export` — writes `public/favicon.svg`
6. In `market-data-fe`, depend on this package via `file:../market-data-brand`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Generate tokens + Brand Studio |
| `npm run tokens:generate` | TS tokens → `src/css/tokens.css` |
| `npm run logo:export` | Export SVG favicon from default config |
| `npm run build` | Production build |

## Frontend usage

```ts
import '@market-data/brand/tokens.css'
import { wording } from '@market-data/brand/wording'
import { color } from '@market-data/brand/tokens'
```

```css
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
}
```

## Harness

This repo adopts the AI Harness for Specification-Driven Development. See [HARNESS.md](./HARNESS.md).

1. Open `market-data-brand/` as the Cursor workspace (PROJECT_ROOT)
2. Ensure agents from `../harness/agents/` are installed to `~/.cursor/agents/`
3. Start the Orchestrator and run: `Start Feature brand-ui-kit`
