# Review Report — dashboard-surface-kit

```yaml
feature:
  slug: dashboard-surface-kit

decision: APPROVED

summary: >
  Implementation closes dashboard chrome kit gaps per approved requirements,
  design, and tasks. Public UI exports, generated tokens, Studio previews,
  wording, docs, and tests align with the specification. No required fixes.

requirements:
  - id: REQ-001
    status: pass
    notes: ThemeToggle exported; accessible switch with controlled value/onValueChange.
  - id: REQ-002
    status: pass
    notes: Brand Studio UiLab previews ThemeToggle via public UI entry.
  - id: REQ-003
    status: pass
    notes: SegmentedControl + TimeframeControl alias; options/value/onValueChange.
  - id: REQ-004
    status: pass
    notes: UiLab timeframe section previews SegmentedControl.
  - id: REQ-005
    status: pass
    notes: chart tokens + ChartFrame + README recipe.
  - id: REQ-006
    status: pass
    notes: StatusFooter/LiveStatus with indicator + label; live/idle states.
  - id: REQ-007
    status: pass
    notes: UiLab status footer section + layout sample.
  - id: REQ-008
    status: pass
    notes: semantic positive/negative; Text tone and Badge variant.
  - id: REQ-009
    status: pass
    notes: density tokens + AppHeaderBar density="slim".
  - id: REQ-010
    status: pass
    notes: Token SoT in src/tokens; generated CSS; dashboard-tokens.test.
  - id: REQ-011
    status: pass
    notes: New primitives on UI export surface; README documents imports.
  - id: REQ-012
    status: pass
    notes: README Dashboard surface recipes use public CSS vars and kit components.
  - id: REQ-013
    status: pass
    notes: Export regression suite preserves prior exports.
  - id: REQ-014
    status: pass
    notes: common.themeToggle and common.live; wording catalog coverage.
  - id: REQ-015
    status: pass
    notes: Typed props; React peerDependencies ^18 || ^19.
  - id: REQ-016
    status: pass
    notes: Tailwind private; consumers use ui + ui.css.
  - id: REQ-017
    status: pass
    notes: Deterministic generate pipeline; CSS var regression tests.
  - id: REQ-018
    status: pass
    notes: Subpath exports follow existing convention.

acceptance_criteria:
  - criterion: Theme-toggle exported and previewable in Brand Studio
    status: pass
  - criterion: Timeframe pill / segmented control available and previewable
    status: pass
  - criterion: Sparkline/chart-area chrome recipe in brand kit
    status: pass
  - criterion: Live/status footer pattern available and previewable
    status: pass
  - criterion: Semantic up/down via brand tokens/kit styling
    status: pass
  - criterion: Header density / slim dashboard chrome
    status: pass
  - criterion: Tokens via TS → tokens:generate; no hand-edit tokens.css
    status: pass
  - criterion: Public exports documented; Brand Studio previews
    status: pass

findings:
  - severity: recommendation
    location: src/ui/components/chart-frame.tsx
    description: ChartFrame has export smoke coverage but no dedicated mount/slot unit test.
    related_req: REQ-005
  - severity: recommendation
    location: src/ui/components/text.tsx, src/ui/components/badge.tsx
    description: positive/negative Text/Badge tones lack dedicated class-oracle tests.
    related_req: REQ-008
  - severity: recommendation
    location: src/tokens/density.ts / AppHeaderBar
    description: --density-header-control-gap is generated but not applied by AppHeaderBar slim density.
    related_req: REQ-009

tasks_verified:
  - task: All tasks in specs/dashboard-surface-kit/tasks.md
    status: done
```
