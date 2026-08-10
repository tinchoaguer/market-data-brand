# Design

## Overview

Extend the existing `@market-data/brand` UI kit and token pipeline so dashboard-mockup chrome gaps are closed inside the brand package. This Feature adds:

1. **New or extended tokens** for slim header density, semantic positive/negative emphasis, and chart-area chrome semantics — authored in TypeScript and emitted only via `npm run tokens:generate`.
2. **Exported primitives** for theme toggle and (where a single control is clearer than a recipe) timeframe segmented control and Live/status footer.
3. **Documented chrome recipes** for sparkline/chart-area framing and any pattern delivered as composition rather than a new primitive.
4. **Brand Studio previews** that import the same public exports consumers use.
5. **Shared wording** for kit chrome strings (for example Live, theme-toggle accessible names).

Product Reading layout, chart engines, and mockup band composition remain out of scope (owned by FE Features). Brand Studio must not become a full Symbol Reading demo.

This design aligns with `knowledge/architecture.md` (tokens → CSS pipeline; public UI + generated CSS; private Tailwind/Radix) and `knowledge/conventions.md` (no hand-edited `tokens.css`; Studio reuses exported components; product apps must not invent utility styling).

## Architecture

### Components and responsibilities

| Area | Location (intended) | Responsibility |
|------|---------------------|----------------|
| Token source | `src/tokens/*.ts` | Add/extend density, semantic up/down, and chart-chrome tokens |
| Token CSS | `src/css/tokens.css` | Generated only via `npm run tokens:generate` |
| Theme bridge | `src/ui/theme/` (existing) | Map new semantic tokens into component theme variables where primitives need them |
| Theme toggle | `src/ui/components/` | Public `ThemeToggle` (or equivalent name) primitive |
| Timeframe control | `src/ui/components/` | Public `SegmentedControl` / `TimeframeControl` primitive **or** documented recipe composing existing kit exports |
| Status footer | `src/ui/components/` | Public `StatusFooter` / `LiveStatus` primitive **or** documented recipe |
| Chart chrome | tokens + docs (+ optional thin presentational wrapper) | Sparkline/chart-area frame, plot surface, axis/chrome color & spacing recipe — **not** a charting library |
| AppShell header density | existing AppShell / header primitives + tokens | Slim dashboard header recipe (density token and/or documented header variant/props) |
| Wording | `src/locales/en.json` + `knowledge/writing/ui-copy.md` | Shared chrome strings for Live and theme-toggle a11y names |
| Package exports | `package.json` `exports` | Ensure new primitives appear on `@market-data/brand/ui` (and CSS includes their styles) |
| Studio lab | `src/brand/` lab section | Preview theme toggle, timeframe pattern, footer pattern, semantic emphasis, header density, chart chrome samples |
| Documentation | README and/or package docs | Public imports + composition recipes |

### Delivery shape per gap

| Gap | Delivery | Rationale |
|-----|----------|-----------|
| Theme toggle | **Exported primitive** | Interactive control with clear a11y/state; consumers must not invent it |
| Timeframe pill / segmented | **Exported primitive** preferred; recipe only if identical behavior is already achievable with existing exports without new API | Mockup uses a distinct mutually exclusive control; a named primitive prevents divergent FE implementations |
| Sparkline / chart-area chrome | **Recipe** (tokens + documented pattern); optional thin presentational chrome wrapper that does **not** plot series data | Chart engines live in consumers; brand owns visual chrome vocabulary |
| Live / status footer | **Exported primitive** or **documented recipe** using Status indicator + Text/Inline layout | Quiet footer chrome; prefer a small primitive if props (status + label slots) clarify the contract |
| Semantic up/down | **Tokens** (+ Badge/Text usage notes in docs) | Color inventing is the failure mode; tokens are the fix |
| Slim header | **Tokens and/or AppShell header recipe** | Density is spacing/chrome, not a new nav system |

### Boundary rules

- **Public:** New primitives (typed), extended tokens/CSS variables, wording keys, documented recipes, Studio previews of public surfaces.
- **Private:** Tailwind/Radix/`cn()` internals, Studio-only layout chrome that is not exported.
- **Out of PROJECT_ROOT scope:** FE `AppLayout` wiring, Reading Region composition, chart data series, Overall Score gauges, product nav IA.

## Data Flow

```text
src/tokens/*.ts  (density, semantic.up/down, chart chrome)
      │
      ▼  npm run tokens:generate
src/css/tokens.css  (generated — never hand-edited)
      │
      ▼
Theme bridge (map new semantics into component vars as needed)
      │
      ▼
src/ui/components/*  (ThemeToggle, SegmentedControl/Timeframe, StatusFooter, …)
      │
      ▼
Library + UI CSS build
      │
      ▼
package.json exports  →  consumers + Brand Studio lab
```

Consumer runtime:

1. Import UI CSS (existing bundle) once.
2. Import new primitives from `@market-data/brand/ui`.
3. Apply semantic CSS variables / token classes for up/down and chart chrome.
4. Compose Reading/dashboard screens in the consumer app — not in Brand Studio.

## Interfaces

### Public package exports

| Export | Consumer usage | Contents |
|--------|----------------|----------|
| `@market-data/brand/ui` | `import { ThemeToggle, … } from '@market-data/brand/ui'` | Named exports including new dashboard surface primitives |
| `@market-data/brand/ui.css` | existing | Generated styles including new primitive + token vars |
| `@market-data/brand/tokens` / `tokens.css` | existing | Includes new semantic/density/chart-chrome tokens after generation |
| `@market-data/brand/wording` | existing | Includes new shared chrome strings |
| Prior kit exports | unchanged | Button, Select, Card, Table, Badge, Skeleton, Alert, AppShell family, layout primitives, Logo |

Exact primitive names may be finalized at implementation (`ThemeToggle`, `SegmentedControl`, `StatusFooter`, etc.) but MUST be documented and stable on the public UI entry.

### Component / pattern contracts

| Surface | Role | Minimum observable behavior |
|---------|------|-----------------------------|
| Theme toggle | Light/dark control | Renders an accessible control; exposes checked/pressed or equivalent state for current theme; does not own global theme persistence (consumer wires storage/provider) |
| Timeframe / segmented control | Mutually exclusive options | Renders a horizontal set of options; one selected option is visually emphasized; selection changes are observable via callback/props; options are consumer-supplied labels |
| Live / status footer pattern | Quiet status chrome | Renders a status indicator (e.g. Live/dot) plus label slot(s); supports at least a “live”/active visual state using brand tokens; layout suitable for footer density |
| Chart-area chrome recipe | Observation framing | Documents CSS variables / classes for chart card surface, plot background, axis/grid/chrome accents, and sparkline stroke/fill using brand tokens; may ship a non-plotting `ChartFrame` (or equivalent) presentational wrapper |
| Semantic up/down | Directional emphasis | Documented token names / CSS vars for positive and negative emphasis usable on Text/Badge/metrics |
| Slim header recipe | Dense chrome bar | Documented density token values and/or AppShell header variant/props that reduce header vertical padding/height relative to the default kit header |

### External systems

None. No network services. Theme persistence and chart series data are consumer concerns.

### Input / output contracts

| Input | Output |
|-------|--------|
| Extended TS tokens | Regenerated `tokens.css` + theme-bridge mappings |
| New UI sources | Dist UI module + types + styles in UI CSS bundle |
| Locale keys for shared chrome | `@market-data/brand/wording` entries + inventory update |
| Studio lab selection | Interactive preview of new surfaces |

## Data Model

No persistent domain entities.

### Token concepts

| Concept | Purpose |
|---------|---------|
| Header density / compact space scale | Slim chrome bar spacing (vertical padding / control gap) |
| `semantic.positive` / `semantic.negative` (or equivalent names) | Up/down emphasis for price change and similar metrics |
| Chart chrome tokens | Plot surface, axis/grid, sparkline stroke/fill aligned to brand dark theme |

Exact token path names are implementation details if they remain semantic (not raw hex in consumer APIs) and are generated through the pipeline.

### Control state

| Control | State | Ownership |
|---------|-------|-----------|
| Theme toggle | Current appearance (light/dark) | Controlled by consumer; primitive reflects `value`/`pressed`/`checked` props |
| Segmented / timeframe | Selected option id | Controlled by consumer |
| Status footer | Status kind (e.g. live / idle) | Prop-driven presentational state |

No package-level global theme or status store.

## Error Handling

| Failure | Detection | Recovery / expected behavior |
|---------|-----------|------------------------------|
| Hand-edited `tokens.css` drift | Review / CI / regenerate check | Forbidden; regenerate from TS sources |
| Missing semantic up/down tokens after Feature | Theme/token tests; Studio preview | Feature incomplete until tokens exist and generate |
| Theme toggle used without consumer theme wiring | Untoggled appearance | Documented; primitive still renders; does not throw |
| Recipe docs referencing private Tailwind classes | Review against conventions | Reject; recipes must use public CSS vars / kit components only |
| Hardcoded English in new primitives | Copy checklist / wording tests | Move strings to locale catalog |
| Breaking removal of prior exports | Export regression checks | Preserve all prior public exports (REQ-013) |

## Testing Strategy

No project `knowledge/testing-policy.md` is present; strategy follows strong, behavior-tied oracles and avoids bloat.

| Behavior | Layer | Oracle | Location (intended) |
|----------|-------|--------|----------------------|
| Theme toggle mounts and exposes toggle semantics | Component / unit | Accessible name/role or pressed/checked state toggles via props/interaction | UI kit tests |
| Timeframe/segmented control selects one option | Component / unit | Selected option changes on interaction; callback receives option id | UI kit tests |
| Status footer / Live pattern renders indicator + label | Component / unit | Status text and live visual affordance present for live state | UI kit tests |
| Semantic positive/negative CSS vars exist after generate | Token / build | Generated `tokens.css` (or theme output) contains documented up/down custom properties | Token generation tests |
| Header density tokens or recipe vars exist | Token / build | Documented density tokens present in generated CSS | Token generation tests |
| Chart chrome tokens exist | Token / build | Documented chart-chrome custom properties present in generated CSS | Token generation tests |
| `tokens.css` not the SoT | Process / build | Token changes originate in `src/tokens/*.ts`; generate script succeeds | Script + review checklist |
| New primitives on public export | Package | `@market-data/brand/ui` named exports include new primitives; export targets resolve | Export / build verification |
| Prior exports preserved | Package | Existing UI/token/wording/logo export keys still resolve | Export regression |
| Tailwind not required for consumers | Package contract | Tailwind not a required consumer dependency for new surfaces | `package.json` peer/deps check |
| Studio previews present | Studio smoke | Lab renders theme toggle, timeframe pattern, footer pattern, semantic samples, header density sample, chart chrome sample | Brand Studio lab + review checklist |
| Shared copy via wording | Unit / contract | New chrome keys exist in locale + inventory; components do not hardcode those strings | Wording / inventory tests |

## Copy / Wording

Shared design-system copy only. Follow `knowledge/writing/`.

| Key | Action | Notes |
|-----|--------|-------|
| `product.name` / `product.nameShort` | reuse | Header brand identity already owned by brand |
| New: theme-toggle accessible name (e.g. `common.themeToggle` or `a11y.themeToggle`) | add | Required for accessible theme control; exact key under `common.*` or `a11y.*` |
| New: Live status label (e.g. `common.live` / `labels.live`) | add | Shared footer chrome string “Live”; add canonical term to `terminology.md` Shared UI chrome if introduced |
| Timeframe option labels (`1D`, `1W`, …) | do not add as DS defaults unless reused as shared inventory | Prefer consumer-supplied option labels; kit must not hardcode product timeframe sets |
| Source / date footer strings | consumer | Screen-specific; not brand inventory unless reused across apps |

Update `src/locales/en.json` and `knowledge/writing/ui-copy.md` inventory together. Do not hardcode user-facing English in components.

Terminology constraints: see `knowledge/writing/terminology.md`. Prefer **Symbol** (not Asset) in any docs/examples.

## Requirement Traceability

| Requirement | Design decision |
|-------------|-----------------|
| REQ-001 | Export `ThemeToggle` (or equivalent) from `@market-data/brand/ui` |
| REQ-002 | Brand Studio lab previews theme toggle via public import |
| REQ-003 | Export segmented/timeframe primitive (preferred) or document composition recipe using public exports |
| REQ-004 | Studio lab previews timeframe pattern |
| REQ-005 | Chart-area / sparkline chrome tokens + documented recipe; optional non-plotting frame wrapper |
| REQ-006 | Status/Live footer primitive or documented public-export recipe |
| REQ-007 | Studio lab previews Live/status footer pattern |
| REQ-008 | Semantic positive/negative tokens + docs for Text/Badge/metric usage |
| REQ-009 | Header density tokens and/or AppShell slim-header recipe |
| REQ-010 | All token edits in `src/tokens/*.ts` + `npm run tokens:generate` |
| REQ-011 | Wire new primitives into package UI exports and document imports |
| REQ-012 | Document recipes with public CSS vars / components only |
| REQ-013 | Preserve existing export map; additive changes only |
| REQ-014 | Locale/wording keys for Live and theme-toggle a11y copy |
| REQ-015 | TypeScript props + React peer-compatible kit build |
| REQ-016 | Tailwind/Radix remain private; consumers use JS + CSS only |
| REQ-017 | Deterministic token/CSS generate pipeline |
| REQ-018 | Subpath naming consistent with `@market-data/brand/...` |
