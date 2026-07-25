# Domain Language

Canonical information model for the Market Data UI.

This document defines **what exists on screen**, how entities relate, and which layer each piece of information belongs to. It is the vocabulary for wireframes, specs, and copy. It is not an API schema.

Read with [`ui-philosophy.md`](./ui-philosophy.md), [`reading-model.md`](./reading-model.md) (semantic structure), [`reading-composition-model.md`](./reading-composition-model.md) (visual composition), [`reading-layout-blueprint.md`](./reading-layout-blueprint.md) (spatial Regions), [`reading-layout-specification.md`](./reading-layout-specification.md) (structural arrangement), and [`../writing/terminology.md`](../writing/terminology.md).

---

## Root

```
Symbol
│
├── Identity
├── Market Data
├── Analysis
│   ├── Regime
│   ├── Risk
│   ├── Economic
│   ├── Exposure
│   └── Recommendation
├── Classification
│   ├── Regime signals
│   ├── Risk signals
│   ├── Economic signals
│   └── Exposure signals
├── Evidence
│   ├── Drivers
│   ├── Features
│   └── Contributions
├── Narrative
└── Diagnostics
```

**Symbol** is the only root. The UI never presents a multi-asset dashboard as the primary surface. One Symbol at a time; the Symbol is always the protagonist.

Do not use **Asset** in UI language. Use **Symbol**.

---

## Entity definitions

### Symbol

The instrument under inspection.

| Owns | Does not own |
|------|----------------|
| The current focus of the workstation | Portfolio-wide views as the primary frame |
| Path / selection context for every child entity | Cross-symbol comparison as default |

Everything below hangs off the selected Symbol.

---

### Identity

Who / what the Symbol is — stable descriptors, not live market values.

| Includes | Excludes |
|----------|----------|
| Display name, base / quote, venue or pair form | Price, scores, signals |
| Static labels that orient the analyst | Time-varying market structure |

Identity answers: *What am I looking at?*

If Identity is thin today, the slot still exists: progressive disclosure may expand it later without moving Price or Analysis into this node.

---

### Market Data

Live market structure for the Symbol. Raw market truth before interpretation.

| Includes | Excludes |
|----------|----------|
| Price | Regime, Risk, Economic, Exposure |
| Order book (Bids, Asks) | Scores, signals, recommendations |
| Candles (by timeframe) | Narrative explanations |

Market Data answers: *What is the market showing right now?*

**Naming:** Use **Market Data**, not “Market State”. “State” is reserved away from Regime language; Market Data is the microstructure surface.

In the philosophy: numbers here are **evidence material**, not the analytical message. The message lives in Analysis → Narrative.

---

### Analysis

Deterministic interpretation of the Symbol. The primary analytical message.

Analysis precedes raw numbers in visual hierarchy. Each dimension below is a first-class assessment.

| Dimension | Answers | Typical payload |
|-----------|---------|-----------------|
| **Regime** | What market regime is this? | Label + reasons |
| **Risk** | How risky is the setup? | Score + components |
| **Economic** | Is there economic edge? | Edge + components |
| **Exposure** | How much capacity / size fits? | Profile + factors |
| **Recommendation** | What strategy stance follows? | Preferred / allowed / forbidden + rationale |

Analysis answers: *How should I read this Symbol?*

**Rules:**

- Every score shown under Analysis must be explainable via **Evidence**.
- Every assessment may surface a short **Narrative** slice; the full story may live under Narrative.
- Analysis does not replace Classification. Analysis is continuous / scored interpretation; Classification is discrete signal packaging of the same dimensions.

---

### Classification

Discrete signals derived from Analysis dimensions. A parallel reading of the same four axes, not a fifth analytical engine in the UI tree.

| Signal group | Source dimension |
|--------------|------------------|
| Regime signals | Regime |
| Risk signals | Risk |
| Economic signals | Economic |
| Exposure signals | Exposure |

Classification answers: *How is this Symbol labeled / tagged for each dimension?*

**Rules:**

- Classification is a sibling of Analysis under Symbol, not a child of Analysis.
- Signal **reason** text is Narrative material; signal **score / source** may point into Evidence.
- Do not invent alternate labels (Tags, Categories) for this surface.

---

### Evidence

The explainability layer. Why a score or label is what it is.

Numbers without Evidence violate the philosophy (“Every metric must have a reason. Every score must be explainable.”).

| Kind | Role |
|------|------|
| **Drivers** | Named forces that push an assessment (e.g. volatility, liquidity stress). Human-facing causes. |
| **Features** | Measured inputs behind drivers (e.g. ATR expansion, book imbalance). Observable facts. |
| **Contributions** | Quantified weight of each driver / feature toward a score. Attribution. |

Evidence answers: *Why does this number or label say that?*

**Rules:**

- Evidence is subordinate to an Assessment or Signal. It is never a free-floating dashboard.
- Progressive disclosure: summary first; Drivers → Features → Contributions on demand.
- Market Data may *feed* Features, but Market Data itself is not Evidence until it is cited as support for an assessment.

**Mapping from today’s payload:** assessment `components` / exposure `factors` are Evidence (Drivers + Contributions). Promote them in the UI model as Evidence, not as anonymous metric rows.

---

### Narrative

The verbal message of the analysis — what the workstation *says*.

| Includes | Excludes |
|----------|----------|
| Recommendation rationale | Raw component tables |
| Hard-gate reasons | Unexplained scores |
| Signal reason copy | Market Data dumps |
| Catalog wait / strategy messages | Diagnostic plumbing codes shown as primary text |

Narrative answers: *What is the takeaway in language?*

**Rules:**

- Narrative is the message; numbers are Evidence.
- Prefer resolved, calm copy over code strings in primary UI.
- Severity may tint Narrative, but Narrative is not Diagnostics.

---

### Diagnostics

Confidence and data-quality status for what is on screen.

| Includes | Excludes |
|----------|----------|
| Insufficient data flags | Regime / Risk conclusions |
| Missing series / empty book conditions | Strategy recommendations |
| Stale or partial input notices | Marketing empty states |

Diagnostics answers: *Can I trust this reading?*

**Rules:**

- Diagnostics constrain Analysis and Classification; they do not compete with them for primary attention.
- When Diagnostics block a conclusion, Narrative may state the limitation; the flag itself remains Diagnostics.
- Do not bury hard failures only inside Evidence tables.

---

## Relationships

```
Symbol
  │
  ├─ Identity ────────────────────────────────── static orientation
  │
  ├─ Market Data ──► Features (Evidence) ─────── raw inputs may become cited features
  │
  ├─ Analysis
  │     Regime / Risk / Economic / Exposure
  │            │
  │            ├── Evidence (Drivers → Features → Contributions)
  │            ├── Narrative (assessment-level message)
  │            └── Diagnostics (insufficient / partial)
  │            │
  │            └──► Recommendation ── Narrative (+ hard gate)
  │
  └─ Classification
        signals per dimension
             ├── Narrative (signal reason)
             ├── Evidence (optional attribution)
             └── Diagnostics (when inputs were weak)
```

### Dependency direction (UI)

1. **Symbol** selected  
2. **Identity** + **Market Data** orient the frame  
3. **Analysis** delivers the reading  
4. **Evidence** explains Analysis  
5. **Narrative** states the message  
6. **Classification** packages discrete signals  
7. **Diagnostics** qualifies confidence throughout  

Never invert: do not lead with Evidence tables or Classification chips before the Analysis message.

---

## Layer roles (one sentence each)

| Layer | Role |
|-------|------|
| Identity | Name the Symbol |
| Market Data | Show market structure |
| Analysis | Interpret the Symbol |
| Classification | Label the Symbol by dimension |
| Evidence | Justify the interpretation |
| Narrative | Speak the takeaway |
| Diagnostics | Qualify trust |

---

## Screen composition rules

Derived from this model + UI philosophy:

1. **One primary question per screen** — map the screen to one layer’s question (above).
2. **One primary action** — usually change Symbol, open Evidence, or follow Recommendation context — never several competing CTAs.
3. **Analysis before Market Data** when both appear — interpretation first, microstructure as support.
4. **Evidence on demand** — Drivers visible near scores; Features / Contributions behind disclosure.
5. **Narrative adjacent to the claim it explains** — not a separate essay detached from Regime / Risk / Recommendation.
6. **Diagnostics visible but secondary** — banner or inline status, never the hero when data is healthy.
7. **Classification does not duplicate Analysis copy** — signals are compact; depth stays in Analysis + Evidence.

---

## Term alignment

| Domain Language | Canonical UI label | Avoid |
|-----------------|--------------------|-------|
| Symbol | Symbol | Asset, Ticker, Instrument |
| Identity | Identity (section) | Profile, Header meta dump |
| Market Data | Market Data / Price / Order book / Candles | Market State, Quote wall |
| Analysis | Analysis | Insights, Analytics |
| Regime / Risk / Economic / Exposure | Same | State / Mode / Phase (for Regime) |
| Recommendation | Recommendation | Advice, Tip, Suggestion |
| Classification | Classification | Tags, Categories |
| Evidence | Evidence (or dimension “Why”) | Breakdown (as sole name), Metrics dump |
| Drivers | Drivers | Factors (prefer Drivers in new UI) |
| Features | Features | Inputs (as primary label) |
| Contributions | Contributions | Weights (unless showing pure %) |
| Narrative | — (rendered as prose, not a chrome label) | Story, Insight blurb |
| Diagnostics | — (status / insufficient data) | Errors as Analysis |

When a lasting UI string is introduced for a new node, update [`../writing/terminology.md`](../writing/terminology.md) and shared wording in the same change.

---

## Out of scope for this model

- Multi-symbol portfolio as the protagonist frame  
- Execution / order entry  
- Charting as a trading terminal  
- Free-form news feeds as Analysis  

Those may exist later as adjacent products; they are not nodes under this Domain Language.
