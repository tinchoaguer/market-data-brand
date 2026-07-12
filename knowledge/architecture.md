# Architecture

## System overview

`market-data-brand` is the **design system** package for the market-data project. It is the source of truth for visual identity, copy, and shared UI primitives consumed by `market-data-fe` as `@market-data/brand`.

```
market-data-brand/
├── src/
│   ├── tokens/              # TS design tokens (source of truth)
│   ├── css/tokens.css       # generated CSS variables (do not hand-edit)
│   ├── brand/               # Brand Studio, logo toolkit
│   │   └── components/      # Logo and related SVG pieces
│   └── ui/                  # (planned) shared UI primitives
├── scripts/                 # tokens:generate, logo:export
└── package.json             # public exports for consumers
```

## Package role

| Concern | Responsibility |
|---------|----------------|
| **Design tokens** | Colors, space, type, radius, motion as TS → CSS vars |
| **Wording** | Product name, taglines, shared copy |
| **Logo** | Configurable logo components and favicon export |
| **Brand Studio** | Local Vite app to preview tokens, logo, wording |
| **UI kit** (planned) | React primitives + generated stylesheet for product apps |

Consumers depend on this package via `file:../market-data-brand` (or a published version). Product screens and API integration live in `market-data-fe`, not here.

## Current public surface

| Export | Path | Purpose |
|--------|------|---------|
| `@market-data/brand/tokens.css` | `src/css/tokens.css` | CSS custom properties |
| `@market-data/brand/tokens` | `src/tokens/index.ts` | TS token objects |
| `@market-data/brand/wording` | `src/tokens/wording.ts` | Copy strings |
| `@market-data/brand/logo` | `src/brand/components/Logo.tsx` | Logo component |

## Intended public surface (UI kit)

After the brand UI kit feature:

- Existing token/wording/logo exports remain
- UI components exported under `@market-data/brand/ui/*` (or equivalent)
- A **generated** CSS bundle that includes token vars and styles required by those components
- Consumers import components + the CSS bundle; they do **not** install Tailwind

## Private to brand

These are implementation details and must not leak into consumer apps:

- Tailwind CSS toolchain and config
- shadcn/ui source scaffolding
- Radix primitive wiring and `cn()` helpers (except as used inside exported components)
- Brand Studio-only labs and internal CSS

## Writable paths (Implementer)

When implementing features in this repo, modify only:

- `src/`
- `scripts/`
- `package.json` (exports, scripts, dependencies)
- Build / Vite / TypeScript config at repo root
- `public/` (e.g. favicon)
- `knowledge/`, `work/`, `specs/` as required by harness stages

Do **not** implement `market-data-fe` product pages or backend APIs as part of brand features.

## Cross-repo features

The harness does not coordinate multi-repo features. Split work:

- **Brand features** — tokens, components, generated CSS, Studio previews
- **FE features** — screens that consume brand exports and call the backend

Link related slugs in feature descriptions when a FE feature depends on a brand capability.

## Technology

- React 19 + TypeScript + Vite
- Node/npm package `@market-data/brand`
- Token pipeline: TypeScript → `scripts/generate-tokens-css.ts` → `src/css/tokens.css`
