# Requirements

## Overview

Close UI kit and token gaps in `market-data-brand` required for dashboard-mockup surface fidelity. Consumers of `@market-data/brand` must be able to compose a dark dashboard chrome and observation surfaces — slim header density, theme toggle, timeframe segmented control, sparkline/chart-area chrome, Live/status footer, and semantic up/down emphasis — without inventing a parallel design system.

This Feature ships brand primitives, tokens, and/or documented composition recipes only. Product screen layout and chart data binding remain in consuming applications.

## Goals

- Export or document every mockup chrome affordance listed in the Feature acceptance so FE Features can compose without ad-hoc styling.
- Express positive/negative (up/down) emphasis through brand tokens and kit styling, not consumer-invented colors.
- Support a slim dashboard header chrome via density/spacing tokens and/or AppShell header recipes.
- Keep token changes on the TypeScript → generated CSS pipeline; never hand-edit generated token CSS.
- Preview new or extended kit surfaces in Brand Studio using the same public exports consumers import.
- Preserve the existing public UI kit contract (Tailwind/Radix private; consumers import components + CSS only).

## Functional Requirements

```text
REQ-001

The system shall expose a theme-toggle control as an importable React primitive from the public UI kit export (`@market-data/brand/ui` or an equivalent documented UI subpath) that consumers can use to switch between light and dark presentation without authoring a custom toggle.
```

```text
REQ-002

When Brand Studio is running, the system shall allow preview of the theme-toggle control using the same public component export consumers import.
```

```text
REQ-003

The system shall provide a timeframe pill / segmented control pattern that consumers can use to present mutually exclusive timeframe options (for example 1D, 1W, 1M, 3M, 1Y) as either an exported UI primitive or a documented composition recipe that uses only brand public exports.
```

```text
REQ-004

When Brand Studio is running, the system shall allow preview of the timeframe pill / segmented control pattern using the same public primitive or documented recipe consumers are expected to use.
```

```text
REQ-005

The system shall provide a sparkline and/or chart-area chrome recipe in the brand kit (semantic tokens and/or a documented component pattern) that defines frame, plot-area, and axis/chrome styling for consumer chart surfaces without requiring consumers to invent chart chrome colors or spacing.
```

```text
REQ-006

The system shall provide a Live / status footer pattern as either an exported UI primitive or a documented composition recipe that uses only brand public exports, supporting at least a status indicator and associated status label suitable for a quiet dashboard footer.
```

```text
REQ-007

When Brand Studio is running, the system shall allow preview of the Live / status footer pattern using the same public primitive or documented recipe consumers are expected to use.
```

```text
REQ-008

The system shall expose semantic positive (up) and negative (down) emphasis through brand design tokens and/or kit styling so consumers can style price change and similar directional metrics without inventing ad-hoc colors.
```

```text
REQ-009

The system shall provide header density and/or spacing tokens, and/or AppShell header recipes, that support a slim dashboard chrome bar consistent with denser mockup header spacing.
```

```text
REQ-010

When the Feature adds or extends design tokens, the system shall author those tokens in the TypeScript token source of truth and regenerate CSS custom properties via `npm run tokens:generate`, without hand-editing `src/css/tokens.css`.
```

```text
REQ-011

When the Feature adds new UI primitives to the public kit, the system shall publish them through the existing public UI package export surface and document how consumers import them.
```

```text
REQ-012

When the Feature provides a pattern as a documented composition recipe rather than a new primitive, the system shall document that recipe in package documentation using only public brand exports (components, tokens, CSS variables) so consumers do not need private toolchain knowledge.
```

```text
REQ-013

The system shall preserve existing public exports for tokens, wording, logo, and the current UI kit primitives so introducing dashboard surface capabilities does not remove or break those surfaces.
```

```text
REQ-014

When shared chrome strings are required by new kit primitives (for example a Live status label or theme-toggle accessible name), the system shall supply those strings via the wording / locale catalog and not hardcode user-facing English in components.
```

## Non-Functional Requirements

```text
REQ-015

New or extended UI primitives shall ship TypeScript types usable by TypeScript consumers and remain peer-compatible with React as established by the existing UI kit.
```

```text
REQ-016

Dashboard surface kit additions shall keep Tailwind, shadcn scaffolding, Radix wiring, and internal style helpers private; consumers must not be required to install or configure Tailwind to use the new surfaces.
```

```text
REQ-017

Token and CSS generation for this Feature shall remain deterministic for a given token source state (repeatable `tokens:generate` / UI CSS build).
```

```text
REQ-018

Public export paths for new primitives shall follow the package’s existing `@market-data/brand/...` subpath export convention.
```

## Acceptance Criteria

- [ ] Theme-toggle control is exported from `@market-data/brand/ui` (or documented kit subpath) and previewable in Brand Studio (REQ-001, REQ-002, REQ-011).
- [ ] Timeframe pill / segmented control pattern is available as a brand primitive or documented composition recipe using brand exports, and is previewable in Brand Studio (REQ-003, REQ-004, REQ-012).
- [ ] Sparkline and/or chart-area chrome recipe exists in the brand kit (tokens and/or component pattern) for consumer chart surfaces (REQ-005, REQ-012).
- [ ] Live / status footer pattern is available as a brand primitive or documented composition recipe, and is previewable in Brand Studio (REQ-006, REQ-007, REQ-012).
- [ ] Semantic up/down (positive/negative) emphasis is expressible via brand tokens and/or kit styling without ad-hoc consumer color invention (REQ-008, REQ-010).
- [ ] Header density / spacing tokens or AppShell header recipes support a slim dashboard chrome bar (REQ-009, REQ-010).
- [ ] New or extended tokens go through the TS → generated CSS pipeline (`npm run tokens:generate`); `src/css/tokens.css` is not hand-edited (REQ-010, REQ-017).
- [ ] Public package exports for any new UI primitives are documented; Brand Studio can preview them (REQ-011, REQ-002, REQ-004, REQ-007, REQ-018).
- [ ] Existing token, wording, logo, and prior UI kit exports remain available (REQ-013).
- [ ] Shared chrome copy for new primitives uses wording/locale catalogs, not hardcoded English (REQ-014).
- [ ] Consumers can use new surfaces without installing Tailwind (REQ-015, REQ-016).
