# Reading Composition Model

The Reading Composition Model defines how a Reading is visually composed.

It specifies the visual hierarchy of each Reading layer, the user's expected attention flow, and the presentation rules that govern composition.

It intentionally does not define layouts, components, spacing, colors, or implementation.

Entity vocabulary: [`domain-language.md`](./domain-language.md).

Semantic structure: [`reading-model.md`](./reading-model.md).

Principles: [`ui-philosophy.md`](./ui-philosophy.md).

---

## Scope

### In scope

- Visual priority of each Reading layer
- Attention order
- Progressive disclosure
- Relative prominence
- Composition rules

### Out of scope

- Screen layouts
- Grid systems
- Components
- Responsive behavior
- Styling
- Navigation
- Interaction details

Spatial Regions: [`reading-layout-blueprint.md`](./reading-layout-blueprint.md). Structural arrangement: [`reading-layout-specification.md`](./reading-layout-specification.md).

---

## Goal

A user should understand the Reading of a Symbol within a few seconds.

The Reading should progressively reveal complexity.

The interface should always communicate meaning before detail.

---

## Composition Principles

### 1. One protagonist

Every Reading has exactly one protagonist:

**The Symbol.**

Nothing competes with it.

---

### 2. Interpretation before evidence

The interface first explains the market.

Only afterwards does it justify the explanation.

Never expose Evidence before the interpretation it supports.

---

### 3. Progressive disclosure

Information is revealed in layers.

Each layer adds depth.

Users should never be required to inspect lower layers to understand higher ones.

Within Evidence, Drivers are more prominent than Features and Contributions.

---

### 4. Visual hierarchy follows semantic hierarchy

The most important information occupies the greatest visual prominence.

Visual emphasis is determined by semantic importance — not by data density.

---

### 5. Raw data is never the message

Market Data exists to support interpretation.

It should not dominate the Reading.

---

## Visual Priority

| Priority | Layer | Purpose |
|----------|-------|---------|
| P0 | Identity | Orient the user |
| P1 | Analysis (+ Recommendation) | Primary interpretation |
| P2 | Narrative | Human explanation bound to claims |
| P3 | Classification | Structured labels |
| P4 | Evidence | Explainability |
| P5 | Market Data | Raw observation |
| — | Diagnostics | Trust qualification (cross-cutting) |

Diagnostics is not ranked in the happy-path stack. When healthy it stays quiet; when it blocks or qualifies a conclusion, it may elevate above lower layers without replacing Analysis as the message.

---

## Reading Flow

A healthy Reading should naturally answer these questions in order. Questions match the Reading Model.

### Step 1

What am I looking at?

↓

Identity

---

### Step 2

How should I read this Symbol?

↓

Analysis (+ Recommendation)

---

### Step 3

What is the message?

↓

Narrative

---

### Step 4

How is this Symbol tagged?

↓

Classification

---

### Step 5

Why does this say that?

↓

Evidence

---

### Step 6

What is the market showing?

↓

Market Data

---

Diagnostics may interrupt this flow when trust is compromised. It is not a late optional epilogue the user only reaches after Market Data.

---

## Visibility

Every layer does not require the same visibility.

| Layer | Default visibility |
|-------|--------------------|
| Identity | Always visible |
| Analysis | Always visible |
| Narrative | Always visible with its claim |
| Classification | Available; compact and subordinate |
| Evidence | Secondary; attached to claims |
| Market Data | Secondary |
| Diagnostics | Contextual (quiet when healthy; elevated when blocking) |

Visibility does not imply screen position. Narrative prominence does not require a region labeled “Narrative”.

---

## Composition Rules

### Identity

Must immediately orient the user.

There should never be ambiguity regarding which Symbol is being read.

---

### Analysis

Must visually dominate every analytical layer.

Recommendation rides with Analysis at the same priority tier.

The user should understand the analytical conclusion without inspecting lower layers.

---

### Narrative

Must reinforce Analysis (and Classification reasons).

Narrative never replaces Analysis.

It is composed next to the claim it explains — not as a detached essay.

---

### Classification

Should summarize.

It should never become more visually prominent than Analysis.

---

### Evidence

Supports claims.

Evidence should always appear attached to the interpretation it explains.

Evidence should never appear as isolated metrics.

---

### Market Data

Represents observable market behavior.

It should support exploration.

It should not compete with Analysis.

---

### Diagnostics

Only communicates limitations.

It should never compete with analytical conclusions when data is healthy.

When it blocks a conclusion, it must be unmistakable without becoming the Reading’s hero message.

---

## Anti-patterns

Avoid:

- Equal visual weight for every layer
- Starting a Reading with Market Data
- Presenting Evidence before Analysis
- Large tables before conclusions
- Diagnostics competing with Analysis when healthy
- Hiding blocking Diagnostics at the end of the Reading
- Narrative replacing analytical results
- Classification becoming the primary message

---

## Non-goals

This document does not specify:

- where layers are placed
- how many columns exist
- whether cards are used
- charts
- responsive behavior
- component APIs

Spatial Regions: [`reading-layout-blueprint.md`](./reading-layout-blueprint.md). Structural arrangement: [`reading-layout-specification.md`](./reading-layout-specification.md).
