# Analysis Layout Specification

The Analysis Layout Specification defines how the Regions from the Analysis Layout Blueprint are **structurally arranged** within an Analysis.

It establishes placement, relative space, scroll behavior, and expansion inside the Reading’s Analysis Region — independently of visual style, design-system components, grids, or responsive breakpoints.

Entity vocabulary: [`../domain-language.md`](../domain-language.md).

Reading semantics: [`../reading-model.md`](../reading-model.md).

Reading composition: [`../reading-composition-model.md`](../reading-composition-model.md).

Reading layout: [`../reading-layout-blueprint.md`](../reading-layout-blueprint.md).

Reading layout structure: [`../reading-layout-specification.md`](../reading-layout-specification.md).

Analysis organization: [`analysis-information-architecture.md`](./analysis-information-architecture.md).

Analysis presentation: [`analysis-presentation-model.md`](./analysis-presentation-model.md).

Analysis composition: [`analysis-composition-model.md`](./analysis-composition-model.md).

Analysis regions: [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Analysis Information Architecture | Logical organization and ownership inside Analysis |
| Analysis Presentation Model | Semantic roles and presentation rules |
| Analysis Composition Model | Attention flow and priority within Analysis |
| Analysis Layout Blueprint | Spatial Regions inside the Reading’s Analysis Region |
| Analysis Layout Specification (this doc) | Structural arrangement of those Regions |
| Reading Layout Specification | Structural arrangement of Reading-wide Regions |
| Implementation / wireframes (later) | Grids, components, spacing tokens, responsive rules |

This Specification nests under the Reading Layout Specification’s Analysis Region. It does not invent Overall Assessment or Synthesis Regions.

---

## Purpose

Transform the Assessments Region into a coherent analytical workspace.

The user should grasp the dimensional interpretation — and the Recommendation stance — in the initial viewport, then explore Evidence and Diagnostics without losing the analytical message.

---

## Scope

### In scope

- Placement inside the Reading’s Analysis Region
- Relative sizing (importance vs exploration capacity)
- Spatial relationships within Assessments
- Layout reading flow inside Analysis
- Scroll strategy inside Analysis
- Expansion strategy
- Persistence in the viewport
- Dimension collection structure

### Out of scope

- Components, cards, grids, columns
- Spacing values, colors, typography
- Design-system APIs
- Concrete interaction widgets
- Responsive breakpoints
- Arrangement of Reading Regions outside Analysis (owned by Reading Layout Specification)

---

## Layout philosophy

1. Analysis is an interpretation workspace, not a metrics wall.
2. Interpretation is always prioritized over explanation.
3. Explanation is always prioritized over free exploration.
4. The user never loses access to Assessments while exploring support.
5. The layout minimizes cognitive effort: meaning first, depth on demand.

---

## Workspace strategy

| Kind | Content | Role |
|------|---------|------|
| Persistent | Assessments Region (dimensions + Recommendation + Narrative) | Continuously available; the message |
| Collection | Assessment Dimensions (Regime / Risk / Economic / Exposure) | Peer perspectives inside Assessments |
| Attached | Evidence (Reading Region) | Explainability on demand |
| Cross-cutting | Diagnostics (Reading Region) | Quiet when healthy; elevated when blocking |
| Sibling / support | Classification, Market Data (Reading Regions) | Outside Analysis ownership; adjacent per Reading Spec |

The workspace is organized around one dominant analytical narrative carried by the Assessments Region.

Supporting Reading Regions reinforce that narrative without competing for attention.

---

## Region placement

### Assessments Region

- Occupies the primary workspace inside the Reading’s Analysis Region.
- Greatest visual prominence.
- Contains Assessment Dimensions, Recommendation, and Narrative bound to claims.
- Must appear as the entry point of Analysis.
- Must remain in the initial viewport; remain available throughout the session whenever practical.

---

### Assessment Dimensions (collection within Assessments)

- Grouped as a peer collection inside the Assessments Region.
- Each Dimension uses the same structural pattern.
- Dimensions remain visually related; no Dimension becomes a separate primary Region.
- Contradictory Dimensions stay visible rather than collapsed into a rollup.

---

### Recommendation (within Assessments)

- Positioned with the Assessments Region — not as its own Region.
- Perceived as the practical stance that follows the dimensional interpretation.
- Never appears detached from Assessments.
- Remains compact relative to the Dimension collection.

---

### Narrative (within Assessments)

- Composed next to the claim it explains (Assessment or Recommendation).
- Never placed as a detached essay Region.

---

### Evidence attachment

- Positioned close to the claim it supports.
- Owned as the Reading Evidence Region; attached, not embedded as Analysis content.
- Never appears as an independent workspace before interpretation.

---

### Diagnostics attachment

- Cross-cutting — not fixed at the end of the Analysis path.
- When healthy: outside primary analytical focus; quiet / minimal.
- When blocking: unmistakable near the affected Assessment or Recommendation, without replacing Assessments as the message center.

---

## Region sizing

Relative size expresses **allocated space**, not semantic priority. Semantic priority remains in the Analysis Composition Model (Assessments > Recommendation > Narrative > Evidence; Diagnostics cross-cutting).

| Content | Relative space | Notes |
|---------|----------------|-------|
| Assessments Region | Extra large | Primary workspace (whole Analysis message) |
| Dimension collection | Large (within Assessments) | Peer collection capacity |
| Recommendation | Small / compact (within Assessments) | Stance summary |
| Narrative | Compact with claims | Not a large essay block |
| Evidence (Reading) | Large when expanded | Exploration capacity; compact when collapsed |
| Diagnostics (Reading) | Minimal when healthy; may grow when blocking | Never Extra large |

Evidence may occupy large space when expanded without outranking Assessments in prominence.

---

## Reading flow

A healthy Analysis layout guides attention in this order (aligned with Analysis Composition):

1. Assessment Dimensions (Regime, Risk, Economic, Exposure)  
2. Recommendation  
3. Narrative (bound to claims)  
4. Evidence (attached; on demand)  

Diagnostics are not a fixed final step. They may interrupt this sequence when trust is compromised.

After the initial interpretation, the user may navigate freely among Dimensions and attachments.

There is no Overall Assessment step and no Synthesis step.

---

## Scroll strategy

- The initial viewport must contain enough of the Assessments Region for the user to understand the dimensional interpretation and Recommendation **without scrolling**.
- Scrolling reveals depth (additional Dimension detail, Evidence, Diagnostics detail) — not the primary interpretation.
- Attached Reading Regions may extend beyond the initial viewport.

---

## Expansion strategy

| Content | Expansion |
|---------|-----------|
| Assessments Region | Fixed (message does not hide behind expand) |
| Assessment outcomes | Always visible; detail may expand without replacing outcomes |
| Recommendation | Remains compact |
| Narrative | Remains bound to claims; does not expand into a detached essay |
| Evidence (Reading) | Expands by depth: Drivers first, then Features / Contributions |
| Diagnostics (Reading) | Collapsible / contextual; expands when blocking |

Expansion should always increase understanding.

Expansion should never replace the primary interpretation.

---

## Persistence

**Should remain available whenever practical**

- Assessments Region (including Recommendation)

**May leave the viewport after the interpretation is understood**

- Expanded Dimension detail
- Evidence
- Diagnostics (when not blocking)

---

## Collection strategy

The Dimension set is a **collection** inside the Assessments Region, not a set of competing primary Regions.

Each Dimension represents one analytical perspective.

Every Dimension shares the same conceptual structure.

Future Assessment dimensions integrate into the collection without changing the workspace organization.

Dimensions do not require a parent Overall Assessment or Synthesis block to be readable.

---

## Spatial rules

1. Assessment Dimensions remain grouped together inside one Assessments Region.
2. Recommendation remains associated with Assessments.
3. Narrative remains bound to the claim it explains.
4. Evidence remains associated with the claim it explains.
5. Diagnostics stay detached from the analytical narrative when healthy; when blocking, they attach to the affected claim without becoming the hero Region.
6. The workspace communicates one coherent interpretation — not multiple Analyses.

---

## Constraints

- Exactly one Assessments Region inside the Reading’s Analysis Region.
- No Overall Assessment Region.
- No Synthesis Region.
- No standalone Recommendation Region.
- No standalone Narrative Region.
- One or more Assessment Dimensions (currently four: Regime, Risk, Economic, Exposure).
- Zero or more Evidence attachments (each tied to a claim).
- Diagnostics may elevate when active without becoming a second primary Region.

---

## Anti-patterns

Avoid layouts where:

| Avoid | Prefer |
|-------|--------|
| Overall Assessment or Synthesis Regions | One Assessments Region |
| Standalone Recommendation Region | Recommendation composed with Assessments |
| Detached Narrative essay | Narrative bound to claims |
| Evidence before Assessments | Interpretation before explanation |
| Recommendation before Assessments | Stance after dimensional reading |
| Every Dimension as a separate primary Region | One peer collection |
| Dimensions collapsed behind a rollup | Visible peer Assessments |
| Equal visual emphasis for Assessments and Evidence | Assessments dominate |
| User must scroll to understand the interpretation | Assessments + Recommendation in initial viewport |
| User must inspect every Evidence table to understand Analysis | Outcomes first; Evidence on demand |
| Blocking Diagnostics hidden at the end | Elevate near the affected claim |

---

## Success criteria

A successful Analysis layout allows a user to:

- understand how to read the Symbol from Assessment Dimensions without scrolling;
- read the Recommendation stance without leaving Assessments;
- recognize how each Dimension contributes, including conflicts;
- explore Evidence attached to claims when deeper explainability is desired;
- notice blocking Diagnostics immediately; ignore Diagnostics when healthy;
- maintain orientation throughout the analytical workflow.
