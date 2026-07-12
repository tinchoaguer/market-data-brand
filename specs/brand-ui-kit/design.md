# Design

## Overview

Implement a private UI toolchain inside `market-data-brand` (Radix + Tailwind + shadcn-style primitives) and ship a **public** surface of React components plus one **generated** CSS bundle. Product apps import `@market-data/brand/ui` (or subpaths) and the CSS bundle; they never install Tailwind or consume shadcn/Radix internals.

Theme bridging maps existing TypeScript design tokens / CSS variables into the component layer (e.g. shadcn CSS variable contract or equivalent) so primitives inherit brand colors, type, radius, and space. Brand Studio gains a lab page that imports the same public components for visual verification.

This design aligns with `knowledge/architecture.md` (private toolchain; public components + generated CSS) and `knowledge/conventions.md` (token source of truth; subpath exports; Studio reuses exported components).

## Architecture

### Components and responsibilities

| Area | Location (intended) | Responsibility |
|------|---------------------|----------------|
| Token source | `src/tokens/*.ts` | Existing design-token source of truth |
| Token CSS | `src/css/tokens.css` | Generated CSS custom properties (unchanged pipeline ownership) |
| Theme bridge | `src/ui/theme/` (or equivalent under `src/ui/`) | Map brand tokens to component theme variables used by primitives |
| UI primitives | `src/ui/components/` | Button, Select, Card, Table, Badge, Skeleton, Alert |
| Private helpers | `src/ui/lib/` (or similar) | `cn()`, Radix wrappers — not exported as public API |
| Tailwind / shadcn config | repo root / private tooling | Build-time only; not a consumer dependency |
| CSS bundle pipeline | `scripts/` + Vite/library build | Produce generated stylesheet including tokens + component styles |
| Package exports | `package.json` `exports` | Public entry points for UI + CSS; keep existing token/wording/logo |
| Studio lab | `src/brand/` lab route/section | Preview each primitive via public imports |

### Boundary rules

- **Public:** React components (typed), generated CSS bundle, existing token/wording/logo exports, documentation of those paths.
- **Private:** Tailwind config/plugins, PostCSS/Tailwind at build time, shadcn CLI/scaffold files, Radix packages as direct consumer deps, internal `cn()` utilities.

### Build shape

1. **Component library build** — compile `src/ui` React sources to distributable ESM (and types) suitable for package consumers.
2. **CSS generation / extraction** — produce a single generated CSS artifact that includes:
   - brand token CSS variables (from existing token pipeline or inclusion of that output)
   - theme-bridge variables required by components
   - styles required by the initial primitives (compiled from Tailwind utilities used by components, or an equivalent extraction step)
3. **Studio** — existing Vite app continues to run locally; lab imports built/source public components for preview.

## Data Flow

```text
src/tokens/*.ts
      │
      ▼  tokens:generate (existing)
src/css/tokens.css
      │
      ├──────────────────────────────┐
      ▼                              ▼
Theme bridge (map to component vars)   Optional inclusion in UI CSS bundle
      │                              │
      ▼                              │
src/ui/components/* (Radix + Tailwind classes / CSS vars)
      │                              │
      ▼                              ▼
Library build (JS/TSX → package)   CSS bundle build (generate/extract)
      │                              │
      └──────────┬───────────────────┘
                 ▼
     package.json exports
                 │
     ┌───────────┴────────────┐
     ▼                        ▼
 Consumer app              Brand Studio lab
 (import UI + CSS)         (same components)
```

Consumer runtime flow:

1. App imports generated CSS once (e.g. in root layout).
2. App imports named components from UI export path(s).
3. Components render using CSS variables from the bundle; no Tailwind runtime in the consumer.

## Interfaces

### Public package exports (contracts)

Exact subpath strings are fixed at implementation but MUST follow existing `@market-data/brand/<subpath>` convention. Intended surface:

| Export | Consumer usage | Contents |
|--------|----------------|----------|
| UI kit entry (e.g. `@market-data/brand/ui`) | `import { Button, Select, ... } from '...'` | Named exports for all initial primitives |
| Optional per-component subpaths (e.g. `@market-data/brand/ui/button`) | Optional tree-friendly imports | Same components as named exports |
| UI CSS bundle (e.g. `@market-data/brand/ui.css` or `@market-data/brand/styles.css`) | `import '@market-data/brand/...'` | Generated CSS: tokens + theme bridge + component styles |
| Existing | `@market-data/brand/tokens`, `tokens.css`, `wording`, `logo` | Unchanged |

### Component API (behavioral contracts)

Requirements define *which* components exist, not every prop. Design contract:

| Component | Role | Minimum observable behavior |
|-----------|------|-----------------------------|
| `Button` | Action control | Renders a pressable control; supports primary/secondary (or equivalent) variants driven by theme |
| `Select` | Option picker | Renders a selectable control backed by accessible Radix behavior privately |
| `Card` | Content container | Renders a bordered/elevated surface using brand radius/space/color tokens |
| `Table` | Tabular layout | Renders table structure primitives (header/body/row/cell as appropriate) |
| `Badge` | Status/label chip | Renders compact labeled status using theme colors |
| `Skeleton` | Loading placeholder | Renders inert placeholder with loading appearance |
| `Alert` | Inline message | Renders informational/warning/error (or equivalent) message surface |

Props should be TypeScript-typed; accessibility defaults come from Radix where used. Exact prop names are an implementation detail as long as components are usable and themed.

### External systems

- None. Consumers are local packages (`market-data-fe` via `file:` or published version). No network services.

### Input / output contracts

| Input | Output |
|-------|--------|
| Token TS sources | Token CSS (existing) + theme bridge vars |
| UI component sources + private Tailwind | Distributable JS + `.d.ts` + generated CSS bundle |
| Studio lab selection | Interactive preview of primitives |

## Data Model

No persistent domain entities. Relevant conceptual models:

### Theme bridge mapping

| Brand concern | Component theme usage |
|---------------|------------------------|
| Color tokens (`color.*` / `--color-*`) | Background, foreground, border, accent, destructive, muted, etc. |
| Space / radius / type / motion tokens | Spacing, border-radius, font family/size, transitions on primitives |

Mapping is one-way: tokens → component CSS variables. Components do not write back to token sources.

### Component composition state

- Interactive components (`Button`, `Select`) expose transient UI state (hover, open, disabled) via DOM/Radix; no package-level global store.
- Presentational components (`Card`, `Table`, `Badge`, `Skeleton`, `Alert`) are primarily prop-driven.

## Error Handling

| Failure | Detection | Recovery / expected behavior |
|---------|-----------|------------------------------|
| Token generation fails | Script/build exit non-zero | UI CSS build must not publish a stale inconsistent bundle as “success”; fix tokens and regenerate |
| Theme bridge missing a required token | Build or Studio visual breakage; tests | Map all required semantic vars before release; fail build or tests if critical vars absent when checks exist |
| Consumer forgets CSS import | Unthemed / unstyled components | Documented requirement; not runtime-enforced beyond docs and Studio checklist |
| Consumer installs Tailwind expecting brand styles | Out of scope | Document that Tailwind is not required and not supported as the consumer styling path for these components |
| Invalid component props | TypeScript compile-time for typed consumers | Runtime: rely on React/DOM defaults; do not throw for ordinary prop omissions unless accessibility requires a label |

## Testing Strategy

| Type | Scope | Expectations |
|------|-------|--------------|
| Unit / component tests | Each primitive mounts and exposes expected roles/variants | At least one smoke test per initial primitive (REQ-002) |
| Theme bridge tests | Critical CSS variables present in generated/theme output | Assert mapped vars exist for brand semantic colors used by components (REQ-004, REQ-010) |
| Build verification | Library build script | Produces JS (or ESM) artifacts and CSS bundle path on disk (REQ-001, REQ-012) |
| Export verification | `package.json` exports | Export keys resolve to existing files for UI and CSS (REQ-006, REQ-014) |
| Consumer-contract check | Documented import path without Tailwind in package deps for consumers | Brand `package.json` does not force Tailwind as a required consumer dependency (REQ-003, REQ-005) |
| Studio manual / smoke | Lab page | Each primitive visible in Studio lab (REQ-007) |
| Regression | Existing exports | Token/wording/logo export paths still defined (REQ-009) |

Automated tests preferred for build outputs, exports, and component smoke. Studio preview may be verified by presence of lab route/content plus manual checklist during review.

## Requirement Traceability

| Requirement | Design decision |
|-------------|-----------------|
| REQ-001 | Dual artifact build: component library compile + generated CSS bundle |
| REQ-002 | Seven primitives under `src/ui/components/` with public named exports |
| REQ-003 | Consumers depend only on published JS + CSS; Tailwind remains build-time private |
| REQ-004 | Theme bridge maps existing brand tokens to component theme CSS variables |
| REQ-005 | No public exports for Tailwind config, shadcn scaffolds, Radix, or `cn()` helpers |
| REQ-006 | `package.json` `exports` entries for UI and CSS bundle |
| REQ-007 | Brand Studio lab imports the same public components for preview |
| REQ-008 | README (or package docs section) documents import paths and no-Tailwind consumer usage |
| REQ-009 | Existing token/wording/logo export map retained |
| REQ-010 | Generated CSS bundle includes token vars, theme bridge, and component styles |
| REQ-011 | React declared as peerDependency (peer-compatible) for the UI kit |
| REQ-012 | Scripted, deterministic generate/build pipeline for CSS and components |
| REQ-013 | TypeScript sources emit `.d.ts` with the library build |
| REQ-014 | Subpath export naming consistent with `@market-data/brand/...` |
