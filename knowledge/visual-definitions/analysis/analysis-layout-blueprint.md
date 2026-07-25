# Analysis Layout Blueprint

The Analysis Layout Blueprint defines the **internal spatial organization** of an Analysis.

It subdivides the Reading’s Analysis Region into analytical Regions that later Layout Specifications can implement without changing the analytical experience.

This document defines spatial Regions only.

It intentionally avoids components, styling, spacing, responsive behavior, or implementation details.

Entity vocabulary: [`../domain-language.md`](../domain-language.md).

Reading semantics: [`../reading-model.md`](../reading-model.md).

Reading composition: [`../reading-composition-model.md`](../reading-composition-model.md).

Reading layout: [`../reading-layout-blueprint.md`](../reading-layout-blueprint.md).

Analysis organization: [`analysis-information-architecture.md`](./analysis-information-architecture.md).

Analysis presentation: [`analysis-presentation-model.md`](./analysis-presentation-model.md).

Analysis composition: [`analysis-composition-model.md`](./analysis-composition-model.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Analysis Information Architecture | Logical organization and ownership inside Analysis |
| Analysis Presentation Model | Semantic roles and presentation rules |
| Analysis Composition Model | Attention flow and priority within Analysis |
| Analysis Layout Blueprint (this doc) | Spatial Regions *inside* the Reading’s Analysis Region |
| Analysis Layout Specification | Structural arrangement of those Regions |
| Reading Layout Blueprint | Reading-wide Regions (Analysis Region is one of them) |

This Blueprint nests under the Reading Layout Blueprint. It does not invent Overall Assessment or Synthesis Regions.

---

## Purpose

Create a stable spatial structure for Analysis without overwhelming the user.

Regions are building blocks. They are not screen boxes with fixed coordinates.

The Blueprint transforms Information Architecture into spatial organization while remaining independent of any particular UI system.

---

## Scope

### In scope

- Regions inside the Reading’s Analysis Region
- Region responsibilities
- Region relationships and conceptual adjacency
- Region visibility and permanence
- Mapping from Analysis units → Regions

### Out of scope

- Components, cards, grids, columns
- Responsive layouts and styling
- Interaction mechanics (expand/collapse widgets, routes)
- Pixel placement or wireframes
- Reading-wide Regions outside Analysis (Context, Classification, Evidence, Market Data, Diagnostics)

---

## Design Principles

### One interpretation

Analysis communicates a single analytical story.

The spatial organization reinforces that unity.

---

### Stable orientation

The user should always know where the primary interpretation lives: the Assessments Region.

Supporting information should never compete with it.

---

### Progressive exploration

Regions encourage exploration without forcing it.

Evidence and Diagnostics enrich understanding.

They never replace the primary interpretation.

---

### Spatial consistency

Each Region has one responsibility.

A Region should never communicate multiple unrelated concepts.

Recommendation and Narrative are composed with Assessments — they do not become competing primary Regions.

---

## Unit → Region map

| Analysis unit | Region | Notes |
|---------------|--------|-------|
| Assessment Dimensions (Regime / Risk / Economic / Exposure) | Assessments Region | Primary Region |
| Recommendation | Assessments Region | Not its own Region; composed with Assessments |
| Narrative | Assessments Region | Bound to claims; not its own Region |
| Evidence | Reading Evidence Region | Referenced / attached to claims; not owned here |
| Diagnostics | Reading Diagnostics Region | Cross-cutting; may surface near claims |
| Classification | Reading Classification Region | Sibling packaging; not nested under Analysis |
| Market Data | Reading Market Data Region | Referenced for exploration; not owned here |

There is no Overall Assessment Region and no Synthesis Region.

---

## Regions

### Assessments Region

**Purpose:** Present the primary interpretation of the Symbol. This is the primary Region of every Analysis.

Answers: *How should I read this Symbol?*

| | |
|--|--|
| Contains | Assessment Dimensions (Regime, Risk, Economic, Exposure); Recommendation; Narrative bound to those claims |
| Visibility | Always visible |
| Permanence | Persistent |
| Priority | Highest |

Dimensions remain grouped as peers. Contradictory Assessments stay visible rather than collapsed into a rollup.

Recommendation is not a separate Region. Narrative is composed with claims, not as a detached Region.

Additional Assessment dimensions may be introduced without changing this Region’s role.

---

### Attachment adjacency (not Analysis-owned Regions)

Analysis references supporting Reading Regions. Those Regions are defined by the Reading Layout Blueprint. They are not duplicated as Analysis-owned Regions.

| Attachment | Relates to | Role relative to Analysis |
|------------|------------|---------------------------|
| Evidence | Evidence Region | Explainability attached to claims; secondary |
| Diagnostics | Diagnostics Region | Trust qualification; quiet when healthy, elevated when blocking |
| Classification | Classification Region | Compact sibling packaging of the same axes |
| Market Data | Market Data Region | Observable market truth for exploration |

Attachment means conceptual adjacency to claims — not embedding Evidence tables, Market Data, or Diagnostics content inside the Assessments Region.

---

## Region relationships

The Blueprint defines **conceptual adjacency**. It does not define physical position.

| Region / attachment | Relates as |
|---------------------|------------|
| Assessments Region | Center of the Analysis; every interpretive unit relates to it |
| Recommendation | Lives inside Assessments Region; stance associated with the dimensional interpretation |
| Narrative | Lives inside Assessments Region; bound to the claim it explains |
| Evidence | Supports Assessment / Recommendation claims; never independent |
| Diagnostics | Qualifies Assessments / Recommendation; may interrupt when trust is compromised |
| Classification | Sibling of Analysis at Reading level; stays associated, never nested as an Analysis Region |
| Market Data | Complements Analysis without competing for attention |

---

## Region characteristics

| Region | Default visibility | Expansion | Composition priority |
|--------|--------------------|-----------|----------------------|
| Assessments Region | Always visible | Fixed (message does not hide) | Highest |
| Evidence (Reading) | Secondary; Drivers may surface with claims | Expandable depth | Medium |
| Diagnostics (Reading) | Contextual | Optional | Cross-cutting |
| Classification (Reading) | Available; compact | Fixed | Below Analysis |
| Market Data (Reading) | Secondary | Optional depth | Medium |

Priorities align with the Analysis Composition Model and Reading Composition Model.

Visibility does not imply screen coordinates.

---

## Composition constraints

1. A Reading contains exactly one Analysis Region (Reading Layout Blueprint).
2. That Analysis Region contains exactly one Assessments Region.
3. There is no Overall Assessment Region and no Synthesis Region.
4. Recommendation lives in the Assessments Region — not as its own Region.
5. Narrative lives in the Assessments Region — not as its own Region.
6. Evidence always supports a claim; it is never a free-floating Analysis Region.
7. Diagnostics never replace Assessments as the message; when blocking, they must still be unmistakable.
8. Classification and Market Data are not nested as Analysis-owned Regions.
9. Assessment dimensions remain grouped; no dimension becomes a separate primary Region.

---

## Anti-patterns

Avoid:

| Avoid | Prefer |
|-------|--------|
| Overall Assessment Region | Assessments Region as primary |
| Synthesis Region | Cross-dimension relationships read from Assessments |
| Multiple Assessments Regions | Exactly one Assessments Region |
| Standalone Recommendation Region | Recommendation composed with Assessments |
| Standalone Narrative Region | Narrative bound to claims |
| Dimensions as “supporting” under a rollup | Dimensions as the primary interpretation |
| Embedding Evidence / Market Data inside Assessments | Attachment to Reading Regions |
| Detached Recommendation away from Assessments | Recommendation associated with the dimensional reading |
| Regions competing for primary attention | One primary Assessments Region |
| Fragmenting Analysis across unrelated areas | One coherent Assessments Region |

---

## Next document

Structural arrangement (placement, sizing, scroll, expansion): [`analysis-layout-specification.md`](./analysis-layout-specification.md).

This Blueprint stops at Regions and their responsibilities inside Analysis.
