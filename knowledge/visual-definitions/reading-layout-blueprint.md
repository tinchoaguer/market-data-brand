# Reading Layout Blueprint

The Reading Layout Blueprint defines how a Reading is **spatially organized**.

It groups the semantic layers from the Reading Model into spatial **Regions** that later Layout Specifications can implement with any visual system.

It intentionally avoids grids, columns, cards, spacing, responsive behavior, styling, or component APIs.

Entity vocabulary: [`domain-language.md`](./domain-language.md).

Semantic structure: [`reading-model.md`](./reading-model.md).

Visual hierarchy: [`reading-composition-model.md`](./reading-composition-model.md).

Principles: [`ui-philosophy.md`](./ui-philosophy.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Reading Model | What information exists and how layers relate |
| Reading Composition Model | Visual priority, attention flow, prominence |
| Reading Layout Blueprint (this doc) | Spatial Regions and their responsibilities |
| Reading Layout Specification | Structural arrangement of those Regions |
| Implementation / wireframes (later) | Grids, components, spacing tokens, responsive rules |

---

## Purpose

Create a stable spatial structure for complex analytical information without overwhelming the user.

Regions are the building blocks. They are not screen boxes with fixed coordinates.

---

## Scope

### In scope

- Regions
- Region responsibilities
- Region relationships
- Region visibility and permanence
- Mapping from Reading layers → Regions

### Out of scope

- Components, cards, grids, columns
- Responsive layouts and styling
- Interaction mechanics (expand/collapse widgets, routes)
- Pixel placement or wireframes

---

## Layer → Region map

| Reading layer | Region | Notes |
|---------------|--------|-------|
| Identity | Context Region | Sole content of Context |
| Analysis (incl. Recommendation) | Analysis Region | Primary Region |
| Narrative | Analysis Region | Bound to claims; not its own Region |
| Classification | Classification Region | Compact; subordinate to Analysis |
| Evidence | Evidence Region | Attached to claims; depth expandable |
| Market Data | Market Data Region | Secondary exploration |
| Diagnostics | Diagnostics Region | Cross-cutting; contextual |

---

## Regions

### Context Region

**Purpose:** Orient the user. Establish which Symbol is being read before interpretation.

| | |
|--|--|
| Contains | Identity |
| Visibility | Always visible |
| Permanence | Persistent |
| Priority | High (frame only — not the message) |

---

### Analysis Region

**Purpose:** Present the primary interpretation of the Symbol. This is the primary Region of every Reading.

| | |
|--|--|
| Contains | Analysis (including Recommendation), Narrative |
| Visibility | Always visible |
| Permanence | Persistent |
| Priority | Highest |

Recommendation is not a separate Region. Narrative is composed with Analysis claims, not as a detached Region.

---

### Classification Region

**Purpose:** Summarize the same dimensions as Analysis with discrete structured labels.

| | |
|--|--|
| Contains | Classification |
| Visibility | Available; compact and subordinate |
| Permanence | Persistent when present |
| Priority | Below Analysis (never equal prominence) |

Classification must not read as a second primary Region.

---

### Evidence Region

**Purpose:** Provide explainability for analytical (and optionally Classification) claims.

| | |
|--|--|
| Contains | Evidence (Drivers → Features → Contributions) |
| Visibility | Secondary; Drivers may surface with claims |
| Permanence | Expandable depth |
| Priority | Medium |

Evidence never appears as a free-floating Region unrelated to a claim. Deeper Features / Contributions are disclosed after Drivers.

---

### Market Data Region

**Purpose:** Expose observable market information. Supports exploration; does not replace Analysis.

| | |
|--|--|
| Contains | Market Data |
| Visibility | Secondary |
| Permanence | Persistent when present; may offer expandable depth |
| Priority | Medium (below Analysis and Classification) |

---

### Diagnostics Region

**Purpose:** Communicate confidence, limitations, and data-quality status. Qualifies the Reading; never becomes the Reading.

| | |
|--|--|
| Contains | Diagnostics |
| Visibility | Contextual (quiet when healthy; elevated when blocking) |
| Permanence | Optional / situational |
| Priority | Cross-cutting — not a fixed Low in all states |

When Diagnostics block a conclusion, the Region may elevate without replacing the Analysis Region as the message center.

---

## Region relationships

The Blueprint defines **conceptual adjacency**. It does not define physical position.

| Region | Relates as |
|--------|------------|
| Context | Precedes every other Region |
| Analysis | Center of the Reading; every interpretive Region relates to it |
| Classification | Depends on Analysis; stays associated with that interpretation |
| Evidence | Supports Analysis (and optionally Classification claims); never independent |
| Market Data | Complements Analysis without competing for attention |
| Diagnostics | Qualifies the whole Reading; may interrupt when trust is compromised |

---

## Region characteristics

| Region | Default visibility | Expansion | Composition priority |
|--------|--------------------|-----------|----------------------|
| Context | Always visible | Fixed | High (frame) |
| Analysis | Always visible | Fixed | Highest |
| Classification | Available; compact | Fixed | Below Analysis |
| Evidence | Secondary | Expandable depth | Medium |
| Market Data | Secondary | Optional depth | Medium |
| Diagnostics | Contextual | Optional | Cross-cutting |

Priorities here align with the Reading Composition Model. Visibility does not imply screen coordinates.

---

## Composition constraints

1. A Reading contains exactly one Context Region.
2. A Reading contains exactly one Analysis Region.
3. Evidence always supports a claim (Analysis, and optionally Classification).
4. Classification always derives from Analysis and stays subordinate to it.
5. Diagnostics never replace Analysis as the message; when blocking, they must still be unmistakable.
6. Market Data never becomes the primary interpretation.
7. Narrative lives in the Analysis Region (and in Classification reasons), not as its own Region.

---

## Anti-patterns

Avoid:

- Multiple Analysis Regions
- Detached Evidence (unrelated to a claim)
- Classification without Analysis, or Classification at equal prominence to Analysis
- Diagnostics competing with interpretation when healthy
- Hiding blocking Diagnostics as if they were a late optional Region
- Market Data replacing Analysis
- Regions with equivalent visual importance
- A standalone Narrative Region detached from claims

---

## Next document

Structural arrangement (placement, sizing, scroll, expansion): [`reading-layout-specification.md`](./reading-layout-specification.md).

This Blueprint stops at Regions and their responsibilities.
