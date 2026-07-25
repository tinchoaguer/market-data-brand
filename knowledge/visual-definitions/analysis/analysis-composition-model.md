# Analysis Composition Model

The Analysis Composition Model defines how analytical knowledge is composed and progressively communicated within an Analysis.

It establishes the visual and cognitive hierarchy of analytical information independently of layout, styling, or implementation.

Entity vocabulary: [`../domain-language.md`](../domain-language.md).

Reading semantics: [`../reading-model.md`](../reading-model.md).

Reading composition: [`../reading-composition-model.md`](../reading-composition-model.md).

Analysis organization: [`analysis-information-architecture.md`](./analysis-information-architecture.md).

Analysis presentation: [`analysis-presentation-model.md`](./analysis-presentation-model.md).

Analysis layout: [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md).

---

## Document stack

| Document | Defines |
|----------|---------|
| Reading Model | What information exists in a Symbol reading and how layers relate |
| Analysis Information Architecture | Logical organization, ownership, and boundaries inside Analysis |
| Analysis Presentation Model | Semantic roles and presentation rules for Analysis units |
| Analysis Composition Model (this doc) | Attention flow, priority, and progressive disclosure *within* Analysis |
| Analysis Layout Blueprint | Spatial Regions inside the Reading’s Analysis Region |
| Analysis Layout Specification | Structural arrangement of those Regions |
| Reading Composition Model | Visual priority across Reading layers (Analysis is P1 of the Reading) |

This document composes Analysis. It does not invent Overall Assessment or Synthesis nodes. Ownership lives in the Information Architecture; claim semantics live in the Presentation Model.

---

## Purpose

Analysis communicates an interpretation of a Symbol.

Its objective is to maximize understanding while minimizing cognitive effort.

The user should understand the dimensional interpretation — and the Recommendation stance — before exploring Evidence or Diagnostics.

---

## Scope

### In scope

- Analytical attention flow inside Analysis
- Progressive disclosure inside Analysis
- Relative prominence of Analysis units
- Composition rules for Assessments, Recommendation, Narrative, and references
- Cognitive-load constraints

### Out of scope

- Layout, components, styling, responsive behavior
- Interaction mechanics (expand/collapse widgets, routes)
- Reading-wide layer priority (see Reading Composition Model)
- Evidence internal structure (Drivers → Features → Contributions)
- Spatial Regions (see [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md); Reading-wide Regions in [`../reading-layout-blueprint.md`](../reading-layout-blueprint.md))

---

## Composition Principles

### Interpretation before explanation

Analysis always presents its interpretation before exposing supporting reasoning.

Users should understand *how to read the Symbol* before exploring *why*.

---

### One analytical story

Analysis communicates a single coherent interpretation.

Every element contributes to the same story.

Dimensions may conflict; that conflict is part of the story.

Competing alternate Analyses should never exist.

---

### Progressive understanding

Information is progressively revealed.

Each step deepens understanding without invalidating what came before.

---

### Coherence without rollup

Users should perceive Analysis as one interpretation composed of multiple Assessment perspectives.

Individual dimensions enrich the story — they do not compete as separate Analyses.

Coherence does not require an Overall Assessment or Synthesis node.

---

### Evidence depth is optional

A complete interpretive understanding should be possible without inspecting Evidence tables.

Assessment outcomes and Recommendation must be understandable on their own.

Exploration of Evidence increases explainability, not the existence of the interpretation.

Diagnostics may elevate when trust is compromised; that elevation is qualification, not a new interpretation.

---

## Analytical Attention Flow

Analysis should naturally answer these questions in order.

Questions align with the Reading Model and Analysis Presentation Model.

---

### Step 1

How should I read this Symbol?

↓

Assessment Dimensions

- Regime
- Risk
- Economic
- Exposure

---

### Step 2

What stance follows?

↓

Recommendation

---

### Step 3

What is the message?

↓

Narrative (bound to Assessments and Recommendation)

---

### Step 4

Why does this say that?

↓

Evidence (references; on demand)

---

### Step 5

Can I trust this?

↓

Diagnostics (contextual; elevates when blocking)

---

There is no Overall Assessment step and no Synthesis step.

Cross-dimension reinforcing or conflicting signals are read from the Assessment set itself.

---

## Information Priority

| Priority | Information | Purpose |
|----------|-------------|---------|
| P0 | Assessment Dimensions | Primary interpretation |
| P1 | Recommendation | Stance that follows |
| P2 | Narrative | Human takeaway bound to claims |
| P3 | Evidence references | Explainability on demand |
| — | Diagnostics | Trust qualification (cross-cutting) |

Priority expresses analytical importance inside Analysis.

It does not define screen position.

Diagnostics is not ranked in the happy-path stack. When healthy it stays quiet; when it blocks or qualifies a conclusion, it may elevate without replacing Assessments as the message.

Within Assessments, dimensions are structural peers. Relative emphasis may follow analytical strength, but no dimension permanently owns the Analysis.

---

## Visibility

| Information | Default visibility |
|-------------|--------------------|
| Assessment Dimensions | Always visible |
| Recommendation | Always visible |
| Narrative | Always visible with its claim |
| Evidence references | Secondary; attached to claims |
| Diagnostics | Contextual (quiet when healthy; elevated when blocking) |

Visibility does not imply layout.

Narrative prominence does not require a region labeled “Narrative”.

---

## Composition Rules

### Assessment Dimensions

Collectively dominate Analysis.

They *are* the primary analytical conclusion — not supporting detail under an Overall Assessment.

Dimensions remain independent peers.

No dimension should permanently dominate unless the current reading analytically justifies temporary emphasis.

Contradictory dimensions stay visible rather than collapsed into a single rollup.

---

### Recommendation

Rides with Analysis at high priority.

It summarizes stance.

It does not justify itself.

It never becomes a fifth Assessment engine or a second Analysis.

---

### Narrative

Reinforces Assessments and Recommendation.

Narrative never replaces scored or labeled Assessments.

It is composed next to the claim it explains — not as a detached essay.

---

### Evidence references

Support explainability.

They invite exploration without interrupting the interpretive flow.

Evidence should appear attached to the claim it supports — never as free-floating metrics.

---

### Diagnostics

Only communicate limitations and trust status.

When healthy, they stay quiet.

When blocking, they must be unmistakable without becoming the Analysis hero message.

---

## Cognitive Load

Analysis should minimize simultaneous decisions.

Users should never need to choose among multiple competing Analyses.

They may need to hold conflicting dimension signals — that is intentional and preferable to a false rollup.

Analytical complexity should emerge progressively: Assessments and Recommendation first; Evidence and deep Diagnostics later.

---

## Anti-patterns

Avoid:

| Avoid | Prefer |
|-------|--------|
| Overall Assessment / Overall Score as P0 | Assessment Dimensions as P0 |
| Synthesis as a required attention step | Cross-dimension relationships read from Assessments |
| Presenting Evidence before Assessments | Interpretation before explanation |
| Giving every dimension identical visual noise when one reading is clearly dominant | Peer structure with justified temporary emphasis |
| Hiding conflicting dimensions behind a rollup | Visible contradictions |
| Mixing Evidence into the primary interpretation | Evidence as secondary references |
| Fragmenting into multiple Analyses | One Analysis, multiple Assessments |
| Multiple competing Recommendations | One Recommendation stance |
| Diagnostics as the hero when healthy | Quiet Diagnostics; elevate only when blocking |
| Detached Narrative essay | Narrative bound to claims |

---

## Success Criteria

A successful Analysis composition allows the user to:

- understand how to read the Symbol from the Assessment dimensions;
- read the Recommendation stance without leaving Analysis;
- recognize reinforcing and conflicting signals across dimensions;
- grasp Narrative takeaways bound to those claims;
- explore Evidence only when deeper explainability is desired;
- notice Diagnostics when trust is compromised, without confusing them for conclusions.
