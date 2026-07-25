# Reading Layout Specification

The Reading Layout Specification defines how the Regions from the Reading Layout Blueprint are **structurally arranged** within a Reading.

It establishes placement, relative space, scroll behavior, and expansion — independently of visual style, design-system components, grids, or responsive breakpoints.

Entity vocabulary: [`domain-language.md`](./domain-language.md).

Semantic structure: [`reading-model.md`](./reading-model.md).

Visual hierarchy: [`reading-composition-model.md`](./reading-composition-model.md).

Spatial Regions: [`reading-layout-blueprint.md`](./reading-layout-blueprint.md).

Principles: [`ui-philosophy.md`](./ui-philosophy.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Reading Model | What information exists and how layers relate |
| Reading Composition Model | Visual priority, attention flow, prominence |
| Reading Layout Blueprint | Spatial Regions and their responsibilities |
| Reading Layout Specification (this doc) | Structural arrangement of those Regions |
| Implementation / wireframes (later) | Grids, components, spacing tokens, responsive rules |

---

## Purpose

Transform Reading Regions into a coherent screen structure.

The user should keep awareness of the Symbol, grasp the interpretation in the initial viewport, and explore supporting Regions without losing the analytical message.

---

## Scope

### In scope

- Region placement (structural, not pixel)
- Relative region sizing (importance vs exploration capacity)
- Spatial relationships between Regions
- Layout reading flow
- Scroll strategy
- Expansion strategy
- Persistence in the viewport

### Out of scope

- Components, cards, grids, columns
- Spacing values, colors, typography
- Design-system APIs
- Concrete interaction widgets
- Responsive breakpoints

---

## Layout philosophy

1. The interface is an analytical workspace, not a data wall.
2. Interpretation is always prioritized over observation.
3. The user never loses access to the primary interpretation while exploring support.
4. The layout minimizes cognitive effort: meaning first, depth on demand.

---

## Layout strategy

| Kind | Regions | Role |
|------|---------|------|
| Persistent | Context, Analysis | Continuously available; frame + message |
| Associated | Classification | Compact, adjacent to Analysis when present |
| Supporting | Evidence, Market Data | Extra context; must not interrupt the message |
| Cross-cutting | Diagnostics | Quiet when healthy; elevated when blocking |

Persistent Regions remain available. Supporting Regions add depth. Diagnostics qualify trust without becoming a sixth equal workspace.

---

## Region placement

### Context Region

- Placed at the beginning of the Reading (entry point).
- Always visible as the Symbol frame.
- Must not compete with Analysis for message prominence.

---

### Analysis Region

- Occupies the primary workspace.
- Greatest visual prominence.
- Includes Narrative and Recommendation with Analysis claims.
- Must remain in the initial viewport; remain available throughout the session whenever practical.

---

### Classification Region

- Placed immediately adjacent to the Analysis Region.
- Perceived as a direct consequence of Analysis — compact, never a second primary workspace.

---

### Evidence Region

- Positioned close to the claim it supports (Analysis, optionally Classification).
- May grow as complexity increases.
- Never appears as an independent workspace before interpretation.

---

### Market Data Region

- Placed in a supporting workspace.
- Accessible without replacing or burying Analysis.
- Visually distinct from Evidence (observation ≠ explainability).

---

### Diagnostics Region

- Cross-cutting — not fixed at the end of the layout path.
- When healthy: outside the primary analytical focus; quiet / minimal.
- When blocking or strongly qualifying: unmistakable near the affected Reading, without replacing Analysis as the message center.

---

## Region sizing

Relative size expresses **allocated space**, not semantic priority. Semantic priority remains in the Composition Model (Analysis > Classification > Evidence > Market Data; Diagnostics cross-cutting).

| Region | Relative space | Notes |
|--------|----------------|-------|
| Analysis | Extra large | Primary workspace |
| Evidence | Large when expanded | Exploration capacity; compact when collapsed |
| Market Data | Medium | Supporting observation |
| Classification | Small | Compact labels |
| Context | Small | Frame only |
| Diagnostics | Minimal when healthy; may grow when blocking | Never Extra large |

Evidence may occupy large space when expanded without outranking Classification in prominence.

---

## Reading flow

A healthy layout guides attention in this order (aligned with Composition; Narrative lives inside Analysis):

1. Context  
2. Analysis (including Narrative and Recommendation)  
3. Classification  
4. Evidence  
5. Market Data  

Diagnostics are not step 6 of every Reading. They may interrupt this sequence when trust is compromised.

After the initial interpretation, the user may navigate freely among Regions.

---

## Scroll strategy

- The initial viewport must contain enough Context + Analysis for the user to identify the Symbol and understand the analytical conclusion **without scrolling**.
- Scrolling reveals depth (Evidence, Market Data, expanded detail) — not the primary interpretation.
- Supporting Regions may extend beyond the initial viewport.

---

## Expansion strategy

| Region | Expansion |
|--------|-----------|
| Analysis | Fixed (message does not hide behind expand) |
| Classification | Remains compact |
| Evidence | Expands by depth: Drivers first, then Features / Contributions |
| Market Data | May expand with available observations |
| Diagnostics | Collapsible / contextual; expands when blocking |

---

## Persistence

**Should remain available whenever practical**

- Context
- Analysis

**Should stay associated with Analysis when present**

- Classification (compact; may leave the initial viewport after Analysis is understood)

**May leave the viewport**

- Evidence
- Market Data
- Diagnostics (when not blocking)

---

## Spatial rules

1. Analysis and Classification remain visually connected.
2. Evidence remains associated with the claim it explains.
3. Market Data remains visually distinct from Evidence.
4. Context never competes with Analysis for message prominence.
5. Diagnostics stay detached from the analytical narrative when healthy; when blocking, they attach to the affected Reading without becoming the hero Region.

---

## Constraints

- Exactly one Context Region.
- Exactly one Analysis Region.
- Zero or one Classification Region.
- Zero or more Evidence presentations (each tied to a claim).
- Zero or more Market Data presentations.
- Zero or one Diagnostics Region (may elevate when active).

---

## Anti-patterns

Avoid layouts where:

- Market Data dominates the interface
- Evidence appears before Analysis
- Classification is isolated from Analysis, or matches Analysis prominence
- Diagnostics compete with Analysis when healthy
- Blocking Diagnostics are hidden at the end of the Reading
- Every Region receives identical visual importance
- The user must scroll to understand the analytical conclusion
- Narrative is placed as a detached Region away from Analysis claims

---

## Success criteria

A successful layout allows a user to:

- Immediately identify the Symbol
- Understand the analytical interpretation without scrolling
- Read Classification with minimal effort, subordinate to Analysis
- Explore Evidence naturally, attached to claims
- Inspect Market Data without losing analytical context
- Notice blocking Diagnostics immediately; ignore Diagnostics when healthy
