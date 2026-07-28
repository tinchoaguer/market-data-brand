# Visual definitions

Canonical UX definitions for Market Data as an **analysis workstation**. These documents define semantics, composition, spatial structure, and **implementable layout rules** for a Symbol Reading — independently of Figma hi-fi polish.

Consuming apps (e.g. `market-data-fe`) **adopt** distilled contracts under their own `knowledge/ux/` for harness isolation. This tree remains the source of truth.

Shared vocabulary and principles live at the root of this folder. **Reading** and **Analysis** each have a document stack (read top → bottom within a stack).

---

## Shared

| Document | Role |
|----------|------|
| [`ui-philosophy.md`](./ui-philosophy.md) | Product posture and non-negotiable UI principles |
| [`domain-language.md`](./domain-language.md) | Entity vocabulary, relationships, and term alignment |
| [`../writing/terminology.md`](../writing/terminology.md) | Canonical UI labels (Symbol, Analysis, Evidence, …) |

---

## Reading stack

How one **Symbol** is read as a layered workstation (Context → Analysis → supporting Regions).

| Document | Role |
|----------|------|
| [`reading-model.md`](./reading-model.md) | Semantic structure: layers, roles, relationships |
| [`reading-composition-model.md`](./reading-composition-model.md) | Visual priority, attention flow, progressive disclosure |
| [`reading-layout-blueprint.md`](./reading-layout-blueprint.md) | Spatial **Regions** and their responsibilities |
| [`reading-layout-specification.md`](./reading-layout-specification.md) | Structural arrangement (placement, sizing, scroll, expansion) |
| [`reading-layout-implementation.md`](./reading-layout-implementation.md) | Band ratios, density, Region chrome, breakpoints (UI-kit SoT) |

---

## Analysis stack

How the **Analysis Region** organizes Assessments, Recommendation, and Narrative (Evidence / Diagnostics referenced, not owned).

| Document | Role |
|----------|------|
| [`analysis/analysis-information-architecture.md`](./analysis/analysis-information-architecture.md) | Logical organization, ownership, and boundaries |
| [`analysis/analysis-presentation-model.md`](./analysis/analysis-presentation-model.md) | Semantic roles and presentation rules for Analysis units |
| [`analysis/analysis-composition-model.md`](./analysis/analysis-composition-model.md) | Attention flow and progressive disclosure *inside* Analysis |
| [`analysis/analysis-layout-blueprint.md`](./analysis/analysis-layout-blueprint.md) | Spatial Regions inside the Reading’s Analysis Region |
| [`analysis/analysis-layout-specification.md`](./analysis/analysis-layout-specification.md) | Structural arrangement of those Analysis Regions |
| [`analysis/analysis-layout-implementation.md`](./analysis/analysis-layout-implementation.md) | Peer collection layout, Recommendation density, Analysis chrome |

---

## How to read

1. Start with **Shared** (`ui-philosophy` → `domain-language`).
2. For a full Symbol workspace: **Reading stack** in order (end at **Implementation** when building UI).
3. For internals of Analysis: **Analysis stack** in order (after Reading Model / Composition; end at **Implementation** when composing Assessments).
4. Layout Specifications stay structural; **Implementation** docs own ratios, density, and chrome recipes for the brand UI kit. Do not treat Specs as pixel or component APIs.

---

## Figma / wireframe policy

- **SoT for layout harmony:** Implementation markdown in this tree + brand UI kit / tokens.
- **Optional:** the existing Reading Layout Wireframe (gray-box band diagram) as a frozen historical reference only.
- **Not required:** paid Figma, Dev Mode, new frames, annotated measurements, or hi-fi polish as a delivery gate.

---

## Design → implementation iteration

See [`design-to-implementation.md`](./design-to-implementation.md): markdown SoT → Brand only for new kit primitives → visual iteration on **FE Reading** (not a Brand Reading demo). Icons / tooltips are deferred kit Features, not layout blockers.

---

## Out of scope here

- Hi-fi Figma / pixel polish as SoT or tooling dependency
- HTTP / DTO field maps (live in adopting-app Feature specs)
- App navigation chrome and feature backlog (product / FE)
