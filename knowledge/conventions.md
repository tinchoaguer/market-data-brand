# Conventions

## Language

- Code, specs, and harness artifacts: **English**

## UI copy

Spec Writer and Implementer **must** read `knowledge/writing/` before writing specs or implementing user-facing text:

- [`writing/writing-guidelines.md`](./writing/writing-guidelines.md) — tone, capitalization, punctuation
- [`writing/terminology.md`](./writing/terminology.md) — canonical product terms
- [`writing/ui-copy.md`](./writing/ui-copy.md) — shared DS inventory and ownership rules

Rules:

- Shared design-system strings live in `src/locales/en.json` and are exported via `@market-data/brand/wording`
- Do not hardcode user-facing English in components
- Keep `knowledge/writing/ui-copy.md` inventory in sync with `src/locales/en.json`
- Feature-specific copy belongs in the consuming product app, not in this package

## Tokens

- Edit TypeScript under `src/tokens/*.ts` as the source of truth
- Run `npm run tokens:generate` after token changes
- Never hand-edit `src/css/tokens.css` (generated)

## Styling ownership

- Visual design decisions live in this package
- Consumers use public components, CSS variables, and documented exports
- Do not require product apps to install Tailwind or copy shadcn internals

## Package exports

- Expose consumer APIs via `package.json` `exports`
- Prefer subpath exports (`./tokens.css`, `./wording`, `./logo`, `./ui`, `./locales/en`)
- Keep React as a peer-compatible dependency for library consumers when shipping UI components

## Naming

- Semantic token names (`color.bg`, `space-4`) over raw palette in product UI
- Component names match responsibility (`Button`, `Select`, `Badge`)

## Brand Studio

- Studio and labs under `src/brand/` are for local preview; they are not the public product UI
- Prefer reusing the same exported components in Studio that consumers will import

## Specifications

Follow `../harness/governance/spec_guidelines.md`:

- EARS notation in `requirements.md`
- REQ-NNN identifiers
- Traceability across requirements, design, tasks, code, and tests
- Include a **Copy / Wording** section in `design.md` when the feature adds or changes user-facing text

## Git

- One feature per harness workflow cycle
- Commits after Implementation stage completes and review approves (project policy)
