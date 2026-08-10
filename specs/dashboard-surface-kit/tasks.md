# Tasks

## Implementation Tasks

Tasks are ordered to minimize implementation dependencies. Each task references related requirements.

- [x] Audit existing token and AppShell/header surfaces against dashboard chrome gaps (density, semantic up/down, chart chrome) and list additive token names to introduce (REQ-008, REQ-009, REQ-005)
- [x] Add TypeScript design tokens for semantic positive/negative (up/down) emphasis; run `npm run tokens:generate`; do not hand-edit `src/css/tokens.css` (REQ-008, REQ-010, REQ-017)
- [x] Add TypeScript design tokens for slim header density / compact chrome spacing; run `npm run tokens:generate` (REQ-009, REQ-010, REQ-017)
- [x] Add TypeScript design tokens for sparkline / chart-area chrome (plot surface, axis/grid/chrome accents, sparkline stroke/fill as needed); run `npm run tokens:generate` (REQ-005, REQ-010, REQ-017)
- [x] Extend theme bridge mappings so new semantic and chrome tokens are available to UI primitives where required (REQ-008, REQ-005, REQ-010)
- [x] Add shared wording keys for theme-toggle accessible name and Live status label; update `src/locales/en.json`, `knowledge/writing/ui-copy.md`, and `knowledge/writing/terminology.md` Shared UI chrome as needed (REQ-014)
- [x] Implement `ThemeToggle` (or equivalent) primitive with typed props, brand theming, and wording-backed accessible name; do not hardcode English (REQ-001, REQ-014, REQ-015, REQ-016)
- [x] Implement timeframe pill / segmented control primitive with typed props for options, selected value, and change callback (preferred); if delivering as recipe only, document the composition and skip a redundant primitive (REQ-003, REQ-012, REQ-015, REQ-016)
- [x] Implement Live / status footer primitive **or** finalize a documented composition recipe using public exports with live/idle visual states (REQ-006, REQ-012, REQ-014, REQ-015)
- [x] Publish AppShell / header slim-density recipe (token usage and/or header variant/props) so consumers can render a slim dashboard chrome bar (REQ-009, REQ-012)
- [x] Document sparkline / chart-area chrome recipe (CSS variables / optional non-plotting frame pattern) for consumer chart surfaces (REQ-005, REQ-012)
- [x] Document semantic up/down token usage for directional metrics without ad-hoc consumer colors (REQ-008, REQ-012)
- [x] Wire new primitives into `@market-data/brand/ui` exports and ensure UI CSS bundle includes their styles; preserve existing token, wording, logo, and prior UI exports (REQ-011, REQ-013, REQ-016, REQ-018)
- [x] Add Brand Studio lab previews for theme toggle, timeframe pattern, Live/status footer, semantic up/down samples, slim header density sample, and chart-area chrome sample using public imports only (REQ-002, REQ-004, REQ-007)
- [x] Document public imports and composition recipes in README and/or package docs (REQ-011, REQ-012, REQ-018)
- [x] Add component tests for theme toggle, timeframe/segmented control (if primitive), and status footer pattern (REQ-001, REQ-003, REQ-006, REQ-015)
- [x] Add token/build tests asserting semantic up/down, header density, and chart-chrome custom properties exist in generated CSS output (REQ-005, REQ-008, REQ-009, REQ-010, REQ-017)
- [x] Add export/regression checks that new UI exports resolve and prior public exports remain intact; confirm Tailwind is not required for consumers (REQ-011, REQ-013, REQ-016, REQ-018)
- [x] Add wording/inventory contract coverage for new shared chrome keys (REQ-014)

Tasks are ordered to minimize implementation dependencies.
