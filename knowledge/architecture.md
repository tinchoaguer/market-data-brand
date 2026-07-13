# Architecture

## System overview

`market-data-brand` is the **design system** package for the market-data project. It is the source of truth for visual identity, shared copy, and shared UI primitives consumed as `@market-data/brand`.

```
market-data-brand/
├── knowledge/
│   └── writing/             # agent-facing copy guidelines
├── src/
│   ├── locales/             # locale catalogs (default: en.json)
│   ├── tokens/              # TS design tokens + wording loader
│   ├── css/tokens.css       # generated CSS variables (do not hand-edit)
│   ├── brand/               # Brand Studio, logo toolkit
│   │   └── components/      # Logo and related SVG pieces
│   └── ui/                  # shared UI primitives
├── scripts/                 # tokens:generate, logo:export, ui:generate
└── package.json             # public exports for consumers
```

## Package role

| Concern | Responsibility |
|---------|----------------|
| **Design tokens** | Colors, space, type, radius, motion as TS → CSS vars |
| **Wording** | Locale catalogs + typed wording export for shared copy |
| **Writing guidelines** | Agent-facing tone, terminology, and DS inventory under `knowledge/writing/` |
| **Logo** | Configurable logo components and favicon export |
| **Brand Studio** | Local Vite app to preview tokens, logo, wording, UI kit |
| **UI kit** | React primitives + generated stylesheet for product apps |

Consumers depend on this package via a local path or a published version. Product screens and API integration live in consuming applications, not here.

## Current public surface

| Export | Path | Purpose |
|--------|------|---------|
| `@market-data/brand/tokens.css` | `src/css/tokens.css` | CSS custom properties |
| `@market-data/brand/tokens` | `src/tokens/index.ts` | TS token objects |
| `@market-data/brand/wording` | `src/tokens/wording.ts` | Typed copy from default locale |
| `@market-data/brand/locales/en` | `src/locales/en.json` | Default locale catalog |
| `@market-data/brand/logo` | `src/brand/components/Logo.tsx` | Logo component |
| `@market-data/brand/ui` | `dist/ui.js` | Shared React primitives |
| `@market-data/brand/ui.css` | `src/css/ui.css` | Generated UI stylesheet |

## Wording ownership

- **Runtime strings:** `src/locales/<locale>.json` (default `en`)
- **Consumer API:** `@market-data/brand/wording` loads the default locale
- **Guidelines:** `knowledge/writing/` (must be read at Specification and Implementation)
- Shared DS copy only; screen-specific copy stays in the consuming app

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

Do **not** implement product application pages or backend APIs as part of brand features.

## Cross-repo features

The harness does not coordinate multi-repo features. Split work:

- **Brand features** — tokens, shared copy, components, generated CSS, Studio previews
- **Consumer app features** — screens that consume brand exports and call backends

Link related slugs in feature descriptions when a consumer feature depends on a brand capability.

## Technology

- React 19 + TypeScript + Vite
- Node/npm package `@market-data/brand`
- Token pipeline: TypeScript → `scripts/generate-tokens-css.ts` → `src/css/tokens.css`
- Wording pipeline: `src/locales/en.json` → `src/tokens/wording.ts` → `@market-data/brand/wording`
