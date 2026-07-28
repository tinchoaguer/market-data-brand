# Design → implementation iteration

How layout and UX structure move from markdown SoT into product UI **without paid Figma** and without treating Brand Studio as a second product.

Companion SoT: [`reading-layout-implementation.md`](./reading-layout-implementation.md), [`analysis/analysis-layout-implementation.md`](./analysis/analysis-layout-implementation.md).

---

## Principle

| Concern | Where it lives | Where you look at it |
|---------|----------------|----------------------|
| Semantics, Regions, ratios, density, chrome recipes | This tree (markdown) | Diff / review of docs |
| Reusable UI primitives (Stack, Cluster shares, Tooltip, Icon, …) | Brand UI kit + UiLab | Brand Studio |
| Symbol Reading composition with real data | Consuming app (e.g. `market-data-fe`) | FE Reading in the browser |

**Do not** rebuild the Reading workstation as a Brand Studio demo. Studio previews **kit primitives**; FE previews **product layout**.

Icons, tooltips, and similar ornamentation are **not** prerequisites for layout harmony. Ship spatial ratios and density first; add kit affordances when a concrete FE need appears.

---

## Loop

```text
1. Design in markdown
   Update layout Implementation (+ adopt into app knowledge/ux contracts)
        │
        ▼
2. Classify the gap
   Screen / Region composition only? ──────────────► FE Feature
   Missing public @market-data/brand/ui export? ───► Brand Feature
        │                                              (UiLab preview)
        │                                                    │
        ▼                                                    ▼
3. Implement + visual check
   FE: Reading with real (or fixture) data
   Brand: Studio lab for the new primitive only
        │
        ▼
4. Review checklist (no Dev Mode)
   Analysis dominates? Classification capped?
   Supporting row not 50/50 by default?
   Chrome weight matches prominence?
        │
        ▼
5. Adjust
   Wrong ratios / density → markdown + FE
   Wrong primitive API → Brand, then consume in FE
```

### Design-ready gate (no Figma)

Implementation markdown + ASCII band map + success criteria in that doc. That **is** the design artifact.

### Iteration-seen gate

Browser review of FE Reading (or Studio only if the change was a kit primitive). Optional screenshot notes in the Feature review — not a second app in Brand.

---

## Brand vs FE decision

| Change reads like… | Open Feature in |
|--------------------|-----------------|
| Band ratios, Region chrome, Classification density, Assessment peer skeleton | **FE** |
| New `ClusterItem` share, Tooltip, Icon set, denser Table variant | **Brand** (then FE consumes) |
| Shared wording / tokens | **Brand** |

Harness does not coordinate multi-repo Features: link related slugs in descriptions; land Brand exports before FE work that depends on them.

---

## Deferred kit (explicit)

Do **not** block layout passes on:

- Icon library
- Tooltip / popover
- Hi-fi illustration
- New Figma frames

Open Brand Features for those when FE has a named use (e.g. Evidence reference, Diagnostics elevation), not as a decorative set first.

---

## Anti-patterns

| Avoid | Prefer |
|-------|--------|
| Full Reading demo in Brand Studio | FE Reading + markdown SoT |
| Waiting on paid Figma to iterate | Markdown Implementation + browser |
| FE Tailwind / utility `className` for layout | Brand layout primitives |
| Equal Card walls while “tuning density” | Chrome recipes in Implementation docs |
| Brand Feature for every pixel tweak | FE composition until a reusable primitive is clear |
