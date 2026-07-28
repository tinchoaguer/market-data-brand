# Reading Layout Implementation

Translates Reading Layout Specification into **implementable spatial rules** for product UI: bands, column ratios, density, Region chrome, and rhythm.

This document is the source of truth for harmonious Reading layout. It does **not** depend on Figma authoring, Dev Mode, or hi-fi frames. The existing structural wireframe (if available) is an optional historical band diagram only.

Upstream:

- [`reading-layout-specification.md`](./reading-layout-specification.md) — structural arrangement
- [`reading-layout-blueprint.md`](./reading-layout-blueprint.md) — Regions
- [`reading-composition-model.md`](./reading-composition-model.md) — priority
- [`ui-philosophy.md`](./ui-philosophy.md) — posture

Analysis internals: [`analysis/analysis-layout-implementation.md`](./analysis/analysis-layout-implementation.md).

Consuming apps adopt distilled rules under `knowledge/ux/` (e.g. reading-contract). Brand UI kit primitives (`Stack`, `Cluster`, `Page`, `Card`, …) are the implementation vocabulary — not ad-hoc CSS grids in product apps.

---

## Document stack (extended)

| Document | Defines |
|----------|---------|
| … Layout Specification | Placement, relative space, scroll, expansion |
| **Layout Implementation (this doc)** | Band ratios, density recipes, chrome rules, breakpoints |
| Wireframe (optional, frozen) | Historical gray-box band diagram — not editable SoT |

---

## Tooling policy

| Allowed | Forbidden as SoT / gate |
|---------|-------------------------|
| This markdown + brand tokens / UI kit | Hi-fi Figma, annotated Figma frames, Dev Mode measurements |
| Optional view-only link to the existing Reading Layout Wireframe | Requiring paid Figma, new Figma frames, or pixel-perfect Figma parity |
| FE adoption contracts + Feature specs | Product-app Tailwind / utility `className` for layout |

Gray-box fidelity remains valid: structure and proportions matter more than illustration polish.

---

## Desktop band map

Reading workspace is a **vertical stack of bands**. Gaps between bands use brand spacing token **`xl`** (workspace rhythm). Gaps inside a band use **`sm`–`md`** unless a Region recipe says otherwise.

```text
┌─────────────────────────────────────────────────────────────┐
│ Context band (full width) — compact identity strip            │
├──────────────────────────────────┬──────────────────────────┤
│ Primary band                     │                          │
│ Analysis (~2/3–3/4)              │ Classification (~1/4–1/3)│
│ grow / primary chrome            │ content-sized, capped    │
├──────────────────────────────────┴──────────────────────────┤
│ Supporting band                                               │
│ Evidence (~3/5)              │ Market Data (~2/5)             │
├─────────────────────────────────────────────────────────────┤
│ Diagnostics band (full width) — quiet / minimal when healthy  │
└─────────────────────────────────────────────────────────────┘
```

### Band rules

| Band | Regions | Layout |
|------|---------|--------|
| Context | Context | Full-width strip; never a second hero |
| Primary | Analysis + Classification | Side-by-side from `md` up; stack Analysis then Classification below `md` |
| Supporting | Evidence + Market Data | Side-by-side from `md` up; stack Evidence then Market Data below `md` |
| Cross-cutting | Diagnostics | Full-width; after supporting in document order |

### Column ratios (desktop, `md+`)

| Pair | Target share | Implementation intent |
|------|--------------|------------------------|
| Analysis : Classification | **~3:1** (range 2:1–3:1) | Analysis grows (`flex-1` / primary slot). Classification is **content-sized with max-width** — never equal flex share with Analysis |
| Evidence : Market Data | **~3:2** | Prefer explicit share (e.g. grow factors or max-width on Market Data). **Do not** default both to equal `flex-1` when that produces a 50/50 wall |

If kit primitives cannot express uneven shares yet, prefer capping Market Data / Classification width over giving them equal flex growth with the larger sibling.

---

## Relative space → UI

Maps Specification “allocated space” to chrome density (not semantic rank).

| Spec size | Regions | UI implication |
|-----------|---------|----------------|
| Extra large | Analysis | Single primary container; largest padding; may use `Card` once for the Region |
| Large (when expanded) | Evidence | Supporting; may grow vertically; avoid equaling Analysis height in the first viewport |
| Medium | Market Data | Supporting; denser than Evidence tables when both are open; width capped vs Evidence |
| Small | Context, Classification | Strip / aside; compact type and gaps (`sm`); no hero Card wall |
| Minimal | Diagnostics (healthy) | One quiet status line; no competing Card stack |

---

## Region chrome recipes

**Principle:** Chrome hierarchy must match Region prominence. Nested equal-weight Cards across Regions create a “dashboard wall.”

| Region | Outer chrome | Inner chrome |
|--------|--------------|--------------|
| Context | Bare `Stack` / strip | Identity text only; no Card |
| Analysis | **One** primary `Card` (or equivalent single primary surface) for the Region | Peer units: **shared skeleton, no competing Region-level Cards** — see Analysis implementation |
| Classification | **One** compact associated `Card` (fills Analysis sibling height; body scrolls) | Dense groups / tables inside; no four equal Cards |
| Evidence | Bare Region heading + body | Claim blocks may use light separators / one Card per claim **only if** needed for scan; never a primary wall |
| Market Data | Bare Region heading + body | Section landmarks (Price / Order book / Candles); Cards only if they aid scan and stay secondary. Candles tables stay collapsed until expanded so the column does not outgrow Evidence; supporting `ClusterItem` minority is height-bound to Evidence with scroll |
| Diagnostics | Bare / quiet | Elevated: `Alert` (or equivalent), not a hero Card |

### Anti-patterns (chrome)

- Classification as four large Cards + wide tables that match Analysis peer scale
- Evidence and Market Data both as equal Card columns that visually rival Analysis
- Every Region wrapped in the same Card style (equal visual weight)
- Product-app custom CSS grids that bypass kit primitives

---

## Density recipes

| Kind | Density | Guidance |
|------|---------|----------|
| Persistent primary (Analysis) | Comfortable | Outcomes + Recommendation readable without scrolling past the fold when practical |
| Associated (Classification) | **Dense** | Source / score / reason in compact rows; prefer truncation + expand over full essay tables in the aside |
| Supporting (Evidence, Market Data) | Medium | Progressive disclosure; collapsed depth by default where the product already supports it |
| Cross-cutting healthy | Minimal | Single status |
| Cross-cutting blocking | Elevated | Unmistakable near the Reading; still not the hero Region |

---

## Viewport / scroll (implementation)

1. First viewport: Context + enough Analysis (Assessments + Recommendation) to grasp interpretation.
2. Classification may sit beside Analysis on desktop even if tall content scrolls inside the aside — do not push Analysis below the fold to make room for Classification tables.
3. Supporting band may start below the fold.
4. Do not require opening Evidence to understand Analysis.

---

## Breakpoints

| Viewport | Behavior |
|----------|----------|
| `< md` | Single column: Context → Analysis → Classification → Evidence → Market Data → Diagnostics |
| `md+` | Primary and supporting bands use the column ratios above |

Use the brand / kit breakpoint that `Cluster` already treats as `md` unless a future kit primitive documents a Reading-specific breakpoint.

---

## Rhythm (spacing)

| Location | Gap token |
|----------|-----------|
| Between Reading bands | `xl` |
| Inside Analysis Assessments workspace | `lg` between peer collection and Recommendation; `sm` inside units |
| Classification groups | `sm` |
| Evidence claim attachments | `md`–`lg` |
| Diagnostics signal list | `sm` |

Prefer kit `Stack` / `Inline` / `Cluster` gap props. Do not invent a parallel spacing scale in the product app.

---

## Kit mapping (current)

| Need | Prefer |
|------|--------|
| Vertical Reading | `Stack` |
| Primary / supporting pairs | `Cluster` + `ClusterItem` `share` (`majority` / `minority` / `aside`) — not blind equal `fill` for uneven bands |
| Region labels | `Text` / `SectionHeading` / `Label` by prominence (primary vs associated vs supporting) |
| Primary Analysis surface | `Card` once |
| Trust elevation | `Alert` |

| Reading slot | `ClusterItem` share |
|--------------|---------------------|
| Analysis (beside Classification) | `majority` (or `fill` if Classification is `aside`) |
| Classification | `aside` (capped; never equal flex with Analysis) |
| Evidence | `majority` |
| Market Data | `minority` |

---

## Success criteria

A layout implementation is successful when:

- Desktop Reading reads as one workstation: Analysis dominates; Classification is a narrow aside
- Evidence and Market Data are supporting, not a 50/50 second hero row by default
- Region chrome weight matches prominence
- Gaps feel consistent across bands (workspace `xl`, dense asides `sm`)
- No Feature requires Figma Dev Mode or new Figma frames to ship layout changes

---

## Out of scope

- Pixel-perfect illustration, motion prototypes, marketing layouts
- New Figma files or paid-plan workflows
- HTTP / DTO maps (Feature specs)
- Replacing semantic Region ownership (owned by Model / Blueprint / Specification)
