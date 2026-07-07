# market-data-brand

Logo design toolkit for the market-data project: React SVG components, Logo Lab editor, and favicon export.

## Workflow

1. `npm install && npm run dev` — open Logo Lab at `http://localhost:5173`
2. Tune bars, trend, lens, magnifying glass, and theme in the UI
3. Copy config JSON or edit `src/brand/logo-config.ts` and `src/brand/logo-theme.ts`
4. `npm run logo:export` — writes `public/favicon.svg`
5. Copy `public/favicon.svg` to `market-data-fe/public/` when the logo is ready for the app

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Logo Lab dev server |
| `npm run build` | Production build |
| `npm run logo:export` | Export SVG favicon from default config |
