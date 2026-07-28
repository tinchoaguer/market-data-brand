# Analysis Layout Implementation

Translates Analysis Layout Specification into **implementable rules** inside the Reading’s Analysis Region: Assessments workspace proportions, peer collection layout, Recommendation placement, and density.

Does **not** depend on Figma authoring. Reading-wide bands and chrome: [`../reading-layout-implementation.md`](../reading-layout-implementation.md).

Upstream: [`analysis-layout-specification.md`](./analysis-layout-specification.md), [`analysis-layout-blueprint.md`](./analysis-layout-blueprint.md), [`analysis-composition-model.md`](./analysis-composition-model.md).

---

## Tooling policy

Same as Reading Layout Implementation: markdown + brand UI kit are SoT. Existing Reading Layout Wireframe is optional band context only. No hi-fi Figma, Dev Mode, or paid-plan gates.

---

## Workspace map (inside Analysis Region)

```text
┌─ Analysis Region (one primary surface) ─────────────────────┐
│  Assessments workspace                                        │
│  ┌─────────┬─────────┬─────────┬─────────┐                   │
│  │ Regime  │ Risk    │ Economic│ Exposure│  peer collection  │
│  │ (same   │ (same   │ (same   │ (same   │                   │
│  │ skeleton)│ skeleton)│ skeleton)│ skeleton)│                 │
│  └─────────┴─────────┴─────────┴─────────┘                   │
│  ┌─ Recommendation (compact full width of Assessments) ────┐ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

Narrative stays **bound to each claim** (peer or Recommendation), not a detached essay block.

Evidence and Diagnostics are Reading Regions — attach by reference, do not embed as Analysis-owned tables.

---

## Peer collection

| Rule | Intent |
|------|--------|
| One Assessments workspace | Exactly one; no Overall / Synthesis Region |
| Shared skeleton | Every peer: identity → outcome (label/score/level) → short Narrative → optional Evidence reference |
| Equal structure, not equal height | Peers share pattern; do not stretch empty peers to match the tallest with filler chrome |
| Desktop | Prefer a **2×2** or single row of four only when width keeps outcomes readable; below `md`, stack in Regime → Risk → Economic → Exposure order |
| No nested Region Cards | Peer units are sections inside the Analysis surface — not four mini-Analysis Cards |

### Peer unit skeleton (required fields)

1. Dimension identity (`Label` / equivalent)
2. Outcome (level / summary badge or compact value)
3. Claim-bound Narrative (muted; placeholder only when narrative slot is intentionally shown empty)
4. Evidence reference control when explainability exists for that claim

Omit components / factors tables from the peer body (Evidence owns depth).

---

## Recommendation

| Rule | Intent |
|------|--------|
| After peers | Document and visual order: dimensions first, then stance |
| Compact | Full width of Assessments, shorter than the peer collection block |
| Same Region | Inside Assessments — not a sibling Reading Region |
| Narrative | Bound to Recommendation claim only |

---

## Relative space (inside Analysis)

| Content | Space | UI |
|---------|-------|-----|
| Assessments Region | Extra large | Fills Analysis primary surface |
| Dimension collection | Large within Assessments | Majority of Assessments height/width |
| Recommendation | Compact | One short band under peers |
| Narrative | Compact with claims | One short paragraph per claim max in the first view |

---

## Density

- Prefer outcome + one-line Narrative over long summaries duplicated as both summary and Narrative.
- Evidence CTA is secondary (`outline` / small control) — does not dominate the peer.
- Do not mirror Classification table density inside Assessment peers.

---

## Chrome

- Analysis Region: **one** primary `Card` (Reading shell) is enough.
- Assessments heading: `SectionHeading` once for the workspace.
- Peers: `Stack gap="sm"` (or denser) without per-peer Cards unless a future kit primitive defines an Assessment peer surface.
- Avoid a second Card wrapper around Assessments inside the Analysis Card.

---

## Scroll / viewport

Initial viewport must show the peer outcomes (or clear placeholders) **and** Recommendation without scrolling away from Analysis. Long Narrative or Evidence depth must not push Recommendation below the fold when peers alone fit.

---

## Success criteria

- Four peers read as one collection with a shared pattern
- Recommendation is visibly the stance after dimensions, still inside Assessments
- No Overall / Synthesis / Confidence peer
- Layout changes do not require new Figma frames

---

## Out of scope

- Reading-wide band ratios (Reading Layout Implementation)
- Evidence Drivers → Features → Contributions composition
- Hi-fi illustration or Figma tooling
