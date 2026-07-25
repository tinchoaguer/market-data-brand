# Analysis Information Architecture

The Analysis Information Architecture defines the logical organization of analytical knowledge.

Its purpose is to transform independent analytical evaluations into a coherent understanding of a Symbol.

This document defines information architecture only.

It intentionally avoids presentation, layout, components, interaction, or implementation details.

Entity vocabulary: [`../domain-language.md`](../domain-language.md).

Reading semantics: [`../reading-model.md`](../reading-model.md).

Reading composition: [`../reading-composition-model.md`](../reading-composition-model.md).

Analysis presentation: [`analysis-presentation-model.md`](./analysis-presentation-model.md).

Analysis composition: [`analysis-composition-model.md`](./analysis-composition-model.md).

Analysis layout: [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Reading Model | What information exists in a Symbol reading and how layers relate |
| Analysis Information Architecture (this doc) | Logical organization, ownership, and boundaries inside Analysis |
| Analysis Presentation Model | Semantic roles and presentation rules for Analysis units |
| Analysis Composition Model | Attention flow, priority, and progressive disclosure within Analysis |
| Analysis Layout Blueprint | Spatial Regions inside the Reading’s Analysis Region |
| Analysis Layout Specification | Structural arrangement of those Regions |
| Reading Composition Model | Visual priority across Reading layers |

This document organizes knowledge. Presentation, Composition, and Layout decide how that knowledge is shown, attended, and spatially grouped.

---

## Purpose

Analysis is the primary source of interpretive knowledge within a Reading.

Its purpose is not to expose every analytical result.

Its purpose is to organize analytical knowledge into an understandable structure.

The Information Architecture defines that structure.

---

## Scope

### In scope

- Logical levels inside Analysis
- Ownership of Analysis knowledge units
- Relationships among those units
- Boundaries with Evidence, Market Data, Diagnostics, and Classification
- Extensibility of Assessment dimensions

### Out of scope

- Presentation order, prominence, or Narrative binding rules (see Presentation Model)
- Layout, components, interaction
- Evidence structure (Drivers → Features → Contributions)
- Classification signal packaging

---

## Design Principles

### Organize knowledge, not data

Analysis communicates conclusions.

Raw observations belong to Evidence or Market Data.

---

### One analytical story

An Analysis should be perceived as one coherent interpretation.

Individual Assessment dimensions contribute to that interpretation.

They do not compete as alternate Analyses.

Contradictory dimensions remain visible; coherence does not require a rollup score.

---

### Progressive understanding

Understanding should emerge from interpretation toward supporting detail.

Users move from Assessments and Recommendation toward Evidence and Diagnostics.

Not the opposite.

---

### Independent dimensions

Each Assessment dimension evaluates one aspect of market behavior.

Dimensions remain independent peers.

No dimension owns another.

Their combination — not a separate Overall Assessment — creates the complete Analysis.

---

## Information Hierarchy

Analysis is organized into four logical levels.

There is no Overall Assessment / Overall Score level. The four Assessment dimensions *are* the interpretation.

---

### Level 1 — Assessment Dimensions

Describe the interpretation from parallel perspectives.

| Dimension | Answers |
|-----------|---------|
| Regime | What market regime is this? |
| Risk | How risky is the setup? |
| Economic | Is there economic edge? |
| Exposure | How much capacity / size fits? |

Each dimension is an **Assessment**: one claim about the Symbol, explainable through Evidence and speakable through Narrative.

Dimensions are parallel.

No dimension owns another.

Cross-dimension relationships (reinforcing signals, conflicting signals, relative prominence of drivers) are properties of this set. They are not a separate owned node.

---

### Level 2 — Recommendation

Represents the preferred analytical stance derived from the Assessments (and hard gates).

| Includes | Excludes |
|----------|----------|
| Preferred / allowed / forbidden stance | A fifth Assessment engine |
| Hard-gate outcomes | New dimensional interpretation |
| Stance as a summary of the reading | Justification tables (Evidence) |

Recommendation never introduces new dimensional knowledge.

It summarizes stance; it does not replace the Assessments.

---

### Level 3 — Narrative material

Narrative is the verbal form of Analysis claims.

It is bound to Assessments and Recommendation.

It is not a free-floating essay and not a chrome-labeled ownership root.

Narrative material belongs with the claim it explains. Full Narrative rules live in the Presentation Model and Reading Model.

---

### Level 4 — References

Analysis references additional information without containing it.

| Reference | Answers |
|-----------|---------|
| Evidence | Why does this claim say that? |
| Diagnostics | Can I trust this claim? |
| Classification | How is this Symbol tagged on the same axes? |
| Market Data | What is the market showing? |

Referenced information remains outside Analysis ownership.

Classification is a sibling Reading layer, not a child of Analysis.

---

## Information Relationships

```
Analysis
  │
  ├── Assessments (parallel)
  │     Regime / Risk / Economic / Exposure
  │            │
  │            ├── Narrative (bound to claim)
  │            ├── Evidence (reference)
  │            └── Diagnostics (reference)
  │
  └── Recommendation
           ├── Narrative (rationale / hard gate)
           ├── Evidence (reference, when needed)
           └── Diagnostics (reference, when blocking)
```

### Dependency direction

1. **Assessments** are the primary interpretive units.
2. **Recommendation** derives stance from Assessments (and hard gates).
3. **Narrative** states the message of each owned claim.
4. **Evidence / Diagnostics / Market Data / Classification** are referenced, not owned.

Never invert: Recommendation does not invent Assessments; Evidence does not become Analysis.

---

## Ownership

Analysis owns:

- Assessment dimensions (Regime, Risk, Economic, Exposure)
- Recommendation
- Narrative material bound to those claims

Analysis references:

- Evidence
- Diagnostics
- Classification
- Market Data

Analysis never owns those referenced layers.

---

## Information Boundaries

| Layer | Answers |
|-------|---------|
| Analysis | How should I read this Symbol? |
| Evidence | Why does this say that? |
| Market Data | What is the market showing? |
| Diagnostics | Can I trust this reading? |
| Classification | How is this Symbol tagged? |

These responsibilities should never overlap.

Confidence is Diagnostics, never an Assessment dimension.

---

## Extensibility

The architecture is dimension-driven.

New Assessment dimensions may be introduced without modifying the overall structure.

A new dimension must be:

- an interpretive Assessment axis;
- independent of existing dimensions;
- explainable through Evidence;
- free of Overall Score / rollup semantics.

Do not extend Analysis by:

- promoting Evidence kinds (Drivers, Features, Contributions) into dimensions;
- promoting Market Data surfaces into dimensions;
- adding Overall State / Overall Score as a parent of the dimensions.

---

## Anti-patterns

Avoid:

| Avoid | Prefer |
|-------|--------|
| Overall Assessment / Overall Score as Level 1 | Parallel Assessment dimensions as the interpretation |
| Synthesis as an owned intermediate node | Visible cross-dimension relationships + Recommendation |
| Mixing observations with interpretation | Conclusions in Analysis; observations in Evidence / Market Data |
| Dimensions explaining each other | Independent peers |
| Multiple competing Analyses for one Symbol | One Analysis, multiple Assessments |
| Embedding Evidence or Market Data inside Analysis | References outward |
| Treating Recommendation as an independent analysis | Recommendation as derived stance |
| Confidence as an Assessment dimension | Diagnostics |
| Classification nested under Analysis | Classification as sibling packaging |

---

## Success Criteria

A successful Information Architecture allows a user to:

- understand how to read the Symbol from the Assessment dimensions;
- identify which dimensions carry the interpretation;
- recognize reinforcing and conflicting signals across dimensions;
- read Recommendation as stance, not as a substitute Analysis;
- navigate toward Evidence, Diagnostics, Classification, or Market Data without losing the Analysis context.
