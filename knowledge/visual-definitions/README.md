# Visual definitions

Canonical UX definitions for Market Data as an **analysis workstation**. These documents define semantics, composition, and spatial structure for a Symbol Reading — independently of Figma hi-fi polish and of frontend implementation.

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

---

## How to read

1. Start with **Shared** (`ui-philosophy` → `domain-language`).
2. For a full Symbol workspace: **Reading stack** in order.
3. For internals of Analysis: **Analysis stack** in order (after Reading Model / Composition).
4. Do not treat layout specs as component or styling guides — grids, cards, and tokens belong elsewhere.

---

## Out of scope here

- Hi-fi Figma / pixel polish as SoT
- HTTP / DTO field maps (live in adopting-app Feature specs)
- App navigation chrome and feature backlog (product / FE)
