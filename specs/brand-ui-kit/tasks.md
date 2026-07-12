# Tasks

## Implementation Tasks

Tasks are ordered to minimize implementation dependencies. Each task references related requirements.

- [x] Add private UI toolchain scaffolding (Tailwind, required PostCSS/Vite wiring, Radix, and shadcn-style base setup) confined to brand; do not expose as public consumer API (REQ-003, REQ-005)
- [x] Create `src/ui` module layout: components, theme bridge, and private helpers (`cn` / utilities) (REQ-002, REQ-005)
- [x] Implement theme bridge mapping brand design tokens / CSS variables to component theme variables (REQ-004, REQ-010)
- [x] Implement `Button` primitive with typed props and brand-themed variants (REQ-002, REQ-004, REQ-013)
- [x] Implement `Select` primitive with typed props and accessible private Radix behavior (REQ-002, REQ-004, REQ-013)
- [x] Implement `Card` primitive with typed props and brand surface styling (REQ-002, REQ-004, REQ-013)
- [x] Implement `Table` primitive set with typed props and brand typography/spacing (REQ-002, REQ-004, REQ-013)
- [x] Implement `Badge` primitive with typed props and brand status colors (REQ-002, REQ-004, REQ-013)
- [x] Implement `Skeleton` primitive with typed props and brand muted/loading appearance (REQ-002, REQ-004, REQ-013)
- [x] Implement `Alert` primitive with typed props and brand semantic message variants (REQ-002, REQ-004, REQ-013)
- [x] Add library build configuration that emits distributable React UI modules and TypeScript declaration files (REQ-001, REQ-011, REQ-012, REQ-013)
- [x] Add CSS bundle generation/extraction so the build emits a generated stylesheet including token variables, theme bridge, and styles required by the initial primitives (REQ-001, REQ-004, REQ-010, REQ-012)
- [x] Declare React as a peer-compatible dependency and ensure Tailwind is not a required consumer dependency (REQ-003, REQ-005, REQ-011)
- [x] Wire `package.json` `exports` for the UI kit and generated CSS bundle using subpath conventions; preserve existing tokens, wording, and logo exports (REQ-006, REQ-009, REQ-014)
- [x] Add Brand Studio (or dedicated lab) preview that imports and renders all initial primitives via the public component surface (REQ-007)
- [x] Document public UI and CSS export paths and consumer usage without Tailwind (README and/or package docs) (REQ-008, REQ-014)
- [x] Add smoke tests for each initial primitive (mount / basic role or variant assertions) (REQ-002, REQ-013)
- [x] Add tests or build checks asserting theme-critical CSS variables exist in generated/theme output (REQ-004, REQ-010)
- [x] Add build/export verification that library artifacts and `package.json` export targets exist and resolve (REQ-001, REQ-006, REQ-009, REQ-012, REQ-014)
- [x] Verify consumer-contract checklist: components + CSS importable without Tailwind; private toolchain not listed as required consumer API (REQ-003, REQ-005, REQ-008)

Tasks are ordered to minimize implementation dependencies.
