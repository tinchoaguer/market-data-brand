# Analysis Presentation Model

The Analysis Presentation Model defines how the Analysis layer communicates the interpretation of a Symbol.

It specifies the semantic structure of an Analysis, the role of each element, and the order in which analytical knowledge is presented.

It intentionally avoids layout, components, styling, or implementation details.

Entity vocabulary: [`../domain-language.md`](../domain-language.md).

Reading semantics: [`../reading-model.md`](../reading-model.md).

Analysis organization: [`analysis-information-architecture.md`](./analysis-information-architecture.md).

Analysis composition: [`analysis-composition-model.md`](./analysis-composition-model.md).

Analysis layout: [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md).

Reading composition: [`../reading-composition-model.md`](../reading-composition-model.md).

Reading layout: [`../reading-layout-blueprint.md`](../reading-layout-blueprint.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Reading Model | What information exists in a Symbol reading and how layers relate |
| Analysis Information Architecture | Logical organization, ownership, and boundaries inside Analysis |
| Analysis Presentation Model (this doc) | Semantic roles and presentation rules for Analysis units |
| Analysis Composition Model | Attention flow, priority, and progressive disclosure within Analysis |
| Analysis Layout Blueprint | Spatial Regions inside the Reading’s Analysis Region |
| Analysis Layout Specification | Structural arrangement of those Regions |
| Reading Composition Model | Visual priority and attention flow across Reading layers |
| Reading Layout Blueprint | Spatial Regions that host Reading layers |

This document deep-dives how Analysis units are presented. Ownership lives in the Information Architecture; attention priority lives in the Composition Model; spatial Regions live in the Layout Blueprint. It does not redefine Reading layers outside Analysis.

---

## Purpose

Analysis is the primary interpretation of a Symbol.

Its purpose is to transform observable market behavior into an understandable analytical assessment.

Analysis communicates meaning.

It does not expose raw observations.

---

## Scope

### In scope

- Analysis structure
- Analytical dimensions (Assessments)
- Recommendation as an Analysis outcome
- Narrative bound to Analysis claims
- Relationships between Analysis elements
- Information hierarchy inside Analysis
- Analytical narrative rules

### Out of scope

- Layout, components, styling
- Market Data presentation
- Evidence structure (Drivers → Features → Contributions)
- Diagnostics presentation mechanics
- Classification packaging (sibling layer; see Reading Model)

---

## Principle

Analysis answers a single question.

> How should I read this Symbol?

Everything contained within Analysis contributes to answering that question.

---

## Analysis Structure

Analysis is composed of independent analytical **dimensions**.

Each dimension is an **Assessment**: one aspect of market behavior, scored or labeled, and explainable through Evidence.

Together the Assessments produce a coherent interpretation.

Current Assessment dimensions:

| Dimension | Answers |
|-----------|---------|
| Regime | What market regime is this? |
| Risk | How risky is the setup? |
| Economic | Is there economic edge? |
| Exposure | How much capacity / size fits? |

Analysis also includes:

| Element | Role |
|---------|------|
| Recommendation | What strategy stance follows from the interpretation? |
| Narrative | Verbal message bound to each claim |

Recommendation is part of Analysis. It is not a fifth Assessment engine and not a separate Reading layer.

The model is extensible. Additional Assessment dimensions may be introduced without changing the overall structure. Do not introduce an Overall State / Overall Score that replaces the dimensions.

---

## Dimension Responsibilities

Every Assessment dimension has a single responsibility.

Each Assessment should communicate:

- its **assessment** (label, score, or level);
- its **narrative** slice (what that assessment means);
- a path into **Evidence** (why it says that).

Dimensions should remain independent.

No dimension should explain another.

### What dimensions do not communicate

| Not a dimension responsibility | Belongs to |
|--------------------------------|------------|
| Confidence / data-quality status | Diagnostics |
| Strategy stance (preferred / allowed / forbidden) | Recommendation |
| Discrete signal packaging of the same axes | Classification |
| Raw market microstructure | Market Data |
| Driver / Feature / Contribution tables | Evidence |

Confidence is never an Assessment dimension.

---

## Assessment Presentation

An Assessment is the atomic unit of Analysis presentation.

| Includes | Excludes |
|----------|----------|
| Dimension identity (Regime, Risk, Economic, Exposure) | Overall rollup that hides the four axes |
| Assessment outcome (label, score, or level) | Raw Market Data |
| Short Narrative bound to that outcome | Full Evidence tables as the primary message |
| Link or attachment point into Evidence | Classification signal lists |
| Qualification by Diagnostics when inputs are weak | Diagnostic codes shown as the assessment itself |

Every Assessment shown under Analysis must be explainable via Evidence (or qualified by Diagnostics when it cannot be concluded).

---

## Recommendation

Recommendation expresses the preferred analytical action derived from the current interpretation.

| Includes | Excludes |
|----------|----------|
| Preferred / allowed / forbidden stance | Advice, tips, or suggestions as labels |
| Hard-gate outcomes that block a stance | Justification tables (those are Evidence) |
| Narrative rationale / hard-gate reasons | Per-dimension mini-recommendations that replace the Assessment |

Recommendations summarize.

They never justify themselves.

Their justification belongs to Evidence (and their verbal rationale to Narrative).

Recommendation rides with Analysis as the same interpretive message. It is not a separate Region or Reading layer.

---

## Narrative

Narrative translates analytical results into human language.

Narrative exists to reinforce interpretation.

It never replaces structured analysis.

| Bound to | Role |
|----------|------|
| Assessment | States what the dimension concludes |
| Recommendation | States stance rationale and hard-gate reasons |

Narrative is composed next to the claim it explains — not as a detached essay.

Narrative is a semantic layer of the Reading, rendered inside Analysis claims. It is not a chrome-labeled section of its own.

---

## Relationships

```
Analysis
  │
  ├── Assessments
  │     Regime / Risk / Economic / Exposure
  │            │
  │            ├── Narrative (assessment-level message)
  │            ├── Evidence (Drivers → Features → Contributions)
  │            └── Diagnostics (insufficient / partial / stale)
  │
  └── Recommendation
           ├── Narrative (rationale / hard gate)
           ├── Evidence (when stance needs attribution)
           └── Diagnostics (when inputs block a stance)
```

### Semantic dependency inside Analysis

1. **Assessments** deliver the dimensional interpretation.
2. **Narrative** states the message of each Assessment (and of Recommendation).
3. **Evidence** explains Assessment and Recommendation claims.
4. **Recommendation** synthesizes stance from the interpretation (and hard gates).
5. **Diagnostics** qualify confidence across Assessments and Recommendation.

### Relationships to sibling Reading layers

| Layer | Relation to Analysis |
|-------|----------------------|
| Classification | Sibling packaging of the same four axes; not a child of Analysis |
| Evidence | Supports Analysis claims; never free-floating |
| Diagnostics | Qualifies Analysis; never replaces it |
| Market Data | May feed Evidence Features; never the interpretive message |
| Identity | Frames the Symbol being interpreted; outside Analysis |

Analysis never depends on Market Data presentation.

Classification is derived from the same dimensions as Analysis. Analysis does not own Classification as a nested element.

---

## Information Hierarchy

Within Analysis, information progresses from interpretation toward explanation.

| Order | Present | Purpose |
|-------|---------|---------|
| 1 | Assessments (Regime, Risk, Economic, Exposure) | Dimensional interpretation |
| 2 | Recommendation | Stance that follows |
| 3 | Narrative (bound to claims) | Human takeaway for each claim |
| 4 | Evidence (on demand) | Why the claim says that |
| 5 | Diagnostics (contextual) | Whether the claim can be trusted |

The user should first understand the analytical outcome.

Supporting context and Evidence appear afterwards.

Contradictory Assessments remain visible. Resolution, if any, is left to the user — not hidden by a single rollup score.

---

## Composition Rules

1. Analysis communicates one coherent story for the Symbol.
2. Every Assessment dimension contributes to that story.
3. Contradictory dimensions stay visible rather than hidden.
4. Analysis avoids unnecessary repetition across dimensions.
5. Narrative reinforces Assessments and Recommendation; it never replaces them.
6. Recommendation summarizes stance; it never becomes a fifth Assessment engine.
7. No Overall State / Overall Score replaces the four Assessment dimensions.
8. Confidence stays in Diagnostics — never promoted to an Assessment dimension.

---

## Anti-patterns

Avoid:

| Avoid | Prefer |
|-------|--------|
| Presenting raw metrics as Analysis | Assessments with Evidence on demand |
| Explaining Evidence before Analysis | Interpretation first, then Evidence |
| Mixing Diagnostics into analytical conclusions | Diagnostics as trust qualification |
| Repeating the same conclusion across multiple dimensions | One claim per dimension |
| One dimension dominating all others without justification | Independent Assessments, equal structural role |
| Overall State / Overall Score as a fifth engine | Regime, Risk, Economic, Exposure (+ Recommendation) |
| Confidence as an Assessment dimension | Diagnostics |
| Per-dimension “mini-recommendations” that replace Recommendation | One Recommendation outcome under Analysis |
| Classification copy duplicated as Analysis essays | Assessments in Analysis; compact signals in Classification |
| Detached Narrative essay away from claims | Narrative bound to Assessment / Recommendation |

---

## Success Criteria

A successful Analysis allows a user to:

- understand how to read the Symbol;
- identify the major Assessment drivers (Regime, Risk, Economic, Exposure);
- recognize conflicting signals across dimensions;
- read the Recommendation stance without leaving Analysis;
- continue into Evidence only when deeper understanding is required;
- notice Diagnostics when trust is compromised, without confusing them for conclusions.
