# Reading Model

The Reading Model defines the **semantic structure** of a Symbol view. It specifies what information is presented, the role of each information layer, and their relationships — independently of layout, visual design, or implementation.

Entity vocabulary: [`domain-language.md`](./domain-language.md). Principles: [`ui-philosophy.md`](./ui-philosophy.md). Labels: [`../writing/terminology.md`](../writing/terminology.md). Visual composition: [`reading-composition-model.md`](./reading-composition-model.md). Spatial Regions: [`reading-layout-blueprint.md`](./reading-layout-blueprint.md). Structural arrangement: [`reading-layout-specification.md`](./reading-layout-specification.md).

---

## Scope

**In scope**
- Which information belongs in a Symbol view
- The role of each information layer
- How layers relate (dependency and meaning)

**Out of scope**
- Layout, chrome, navigation, or screen composition
- Visual design, typography, or component choices
- API shapes, payloads, destinations, or feature implementation

This model does not redefine domain entities. It structures how those entities form a **reading** of one Symbol.

---

## Premise

1. A Symbol view presents **one Symbol**. The Symbol is the only root of the reading.
2. The reading is layered: each layer answers one question and has a fixed role relative to the others.
3. **Analysis is the interpretive message.** Market Data and Evidence support that message; they do not replace it.
4. Every score or label in the reading must be explainable through Evidence (or qualified by Diagnostics).
5. Use **Symbol**, never **Asset**, as the protagonist term.

---

## Layer map

| Layer | Role | Question |
|-------|------|----------|
| Identity | Orient the reading | What am I looking at? |
| Analysis | Interpret the Symbol | How should I read this Symbol? |
| Narrative | State the takeaway in language | What is the message? |
| Diagnostics | Qualify trust | Can I trust this reading? |
| Classification | Label the Symbol by dimension | How is this Symbol tagged? |
| Evidence | Justify scores and labels | Why does this say that? |
| Market Data | Provide raw market truth | What is the market showing? |

---

## Relationships

```
Symbol
  │
  ├─ Identity ────────────────────────────────── frame of the reading
  │
  ├─ Market Data ──► may feed Evidence Features ─ raw inputs, not interpretation
  │
  ├─ Analysis
  │     Regime / Risk / Economic / Exposure
  │            │
  │            ├── Narrative (assessment-level message)
  │            ├── Evidence (Drivers → Features → Contributions)
  │            ├── Diagnostics (insufficient / partial / stale)
  │            │
  │            └── Recommendation ── Narrative (+ hard gate)
  │
  └─ Classification
        signals per dimension (Regime / Risk / Economic / Exposure)
             ├── Narrative (signal reason)
             ├── Evidence (optional attribution)
             └── Diagnostics (when inputs were weak)
```

### Semantic dependency

1. **Symbol** selected  
2. **Identity** frames the reading  
3. **Analysis** delivers the interpretation  
4. **Narrative** states the message of Analysis (and of Classification reasons)  
5. **Evidence** explains Analysis (and optionally Classification)  
6. **Classification** packages discrete labels for the same dimensions  
7. **Market Data** supplies microstructure; it may become Evidence only when cited  
8. **Diagnostics** qualifies confidence across Analysis and Classification  

Meaning order is fixed: Interpretation before raw numbers. Evidence is subordinate to a claim. Classification is a sibling of Analysis, not a child and not a substitute.

---

## Layers

### Identity

**Role:** Name and situate the Symbol. Stable descriptors only.

| Includes | Excludes |
|----------|----------|
| Display name, base / quote, venue or pair form | Price, scores, signals, recommendations |
| Static orientation for the reading | Time-varying market structure, candle timeframes |

Changing Symbol resets the reading. Identity remains the frame.

---

### Analysis

**Role:** Deterministic interpretation of the Symbol. Primary analytical message of the reading.

| Dimension | Answers |
|-----------|---------|
| Regime | What market regime is this? |
| Risk | How risky is the setup? |
| Economic | Is there economic edge? |
| Exposure | How much capacity / size fits? |
| Recommendation | What strategy stance follows? |

| Includes | Excludes |
|----------|----------|
| The five dimensions above | Overall State / Overall Score as a rollup that replaces them |
| Scores and levels tied to those dimensions | Raw Market Data |
| Links to Narrative, Evidence, Diagnostics | Classification signal lists |

Analysis does not replace Classification. Analysis is continuous / scored interpretation; Classification is discrete signal packaging of the same four axes. Recommendation belongs to Analysis.

---

### Narrative

**Role:** The verbal message of the reading — what the workstation *says*.

| Includes | Excludes |
|----------|----------|
| Assessment summaries and rationales | Raw component tables |
| Recommendation rationale / hard-gate reasons | Unexplained scores |
| Signal reason text | Market Data dumps |
| Catalog wait / strategy messages | Diagnostic codes as primary Analysis text |

Narrative is bound to the claim it explains (an Assessment, Recommendation, or signal). It is a semantic layer, not a labeled region of the UI.

---

### Diagnostics

**Role:** Confidence and data-quality status for what the reading asserts.

| Includes | Excludes |
|----------|----------|
| Insufficient / partial / stale input status | Regime / Risk / Economic / Exposure conclusions |
| Constraints that qualify Analysis or Classification | Strategy recommendations |

Diagnostics constrain the reading; they do not compete with Analysis for primacy. When Diagnostics block a conclusion, Narrative may state the limitation; the status itself remains Diagnostics.

---

### Classification

**Role:** Discrete signals derived from Analysis dimensions. Sibling reading of the same four axes.

| Signal group | Source dimension |
|--------------|------------------|
| Regime signals | Regime |
| Risk signals | Risk |
| Economic signals | Economic |
| Exposure signals | Exposure |

Each signal carries **source**, **score**, and **reason** (reason is Narrative material; score / source may point into Evidence).

| Includes | Excludes |
|----------|----------|
| Signal groups above | Primary / Secondary Classification as an alternate taxonomy |
| Compact labels per dimension | Full Assessment essays duplicated from Analysis |

Classification does not invent a fifth analytical engine. Depth stays in Analysis + Evidence.

---

### Evidence

**Role:** Explainability for scores and labels. Subordinate to an Assessment or Signal — never free-floating.

| Kind | Role |
|------|------|
| Drivers | Named forces that push an assessment |
| Features | Measured inputs behind drivers |
| Contributions | Quantified attribution toward a score |

| Includes | Excludes |
|----------|----------|
| Drivers → Features → Contributions | Anonymous metric dumps unrelated to a claim |
| Attribution cited by Analysis or Classification | Market Data unless cited as a Feature |

Market Data may feed Features. Market Data is not Evidence until it is cited as support for an assessment or signal.

---

### Market Data

**Role:** Live market structure for the Symbol. Raw market truth before interpretation.

| Includes | Excludes |
|----------|----------|
| Price | Regime, Risk, Economic, Exposure |
| Order book (Bids, Asks) | Scores, signals, recommendations |
| Candles (by timeframe) | Narrative explanations |

Timeframe belongs to Candles under Market Data, not to Identity. In the reading, Market Data supports interpretation; it is not the interpretive message.

---

## Semantic rules

1. **One root** — Symbol is the only protagonist of the reading.
2. **One role per layer** — do not merge Analysis into Market Data, or Evidence into Narrative.
3. **Interpretation before microstructure** — Analysis meaning precedes Market Data meaning when both are part of the same reading.
4. **Evidence is subordinate** — every score or label must be explainable; Evidence hangs off a claim.
5. **Narrative speaks the claim** — it does not replace scores or Evidence tables.
6. **Diagnostics qualify, they do not conclude** — trust status is not an Assessment.
7. **Classification packages, it does not redefine** — same four dimensions as Analysis; no parallel taxonomy.

---

## Anti-patterns

| Avoid | Prefer |
|-------|--------|
| Asset as root | Symbol |
| Overall State / Overall Score as a fifth engine | Regime, Risk, Economic, Exposure (+ Recommendation) |
| Primary / Secondary Classification | Signal groups per dimension |
| Metrics / Observations as Evidence kinds | Drivers → Features → Contributions |
| Market Data or Classification as the interpretive message | Analysis (+ Narrative) as the message |
| Confidence as an Assessment dimension | Diagnostics as trust qualification |
| Timeframe under Identity | Timeframe under Candles (Market Data) |

---

## Out of product scope

These are not layers of this Reading Model:

- Multi-symbol portfolio as the protagonist frame
- Execution / order entry
- Charting as a trading terminal
- Free-form news feeds as Analysis
