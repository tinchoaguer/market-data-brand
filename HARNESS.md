# Harness Adoption

This project adopts the AI Harness for Specification-Driven Development.

## PROJECT_ROOT

This repository (`market-data-brand/`) is PROJECT_ROOT.

## Governance location

```
../harness/governance/
```

Relative to this repo:

| Document | Path |
|----------|------|
| AGENTS.md | `../harness/governance/AGENTS.md` |
| workflow.md | `../harness/governance/workflow.md` |
| spec_guidelines.md | `../harness/governance/spec_guidelines.md` |
| deployment.md | `../harness/governance/deployment.md` |

## Agents

Install from `../harness/agents/` to `~/.cursor/agents/`.

## Project layout

```
market-data-brand/
    knowledge/       # project context (architecture, ADRs)
    work/            # backlog and progress
    specs/           # feature specifications
    src/             # design tokens, Brand Studio, logo, UI kit
    scripts/         # token generation, logo export
```

## Starting a feature

1. Add an entry to `work/feature_list.json`
2. Open this repo as the Cursor workspace
3. Start the Orchestrator agent
4. Run: `Start Feature <slug>`
