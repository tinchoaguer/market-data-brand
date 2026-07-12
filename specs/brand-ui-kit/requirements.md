# Requirements

## Overview

Turn `market-data-brand` into a publishable UI library. The package ships React UI primitives and a generated CSS bundle for product consumers (notably `market-data-fe`). Radix, Tailwind, and shadcn remain private implementation details inside brand. Consumers import components and CSS without installing or configuring Tailwind.

## Goals

- Provide a stable public UI kit surface (`Button`, `Select`, `Card`, `Table`, `Badge`, `Skeleton`, `Alert`) from `@market-data/brand`.
- Bridge component theming from existing brand design tokens so visual identity stays consistent.
- Emit a library build that includes React components and a generated CSS bundle containing token variables and component styles.
- Keep Tailwind, shadcn scaffolding, and Radix wiring private to this package.
- Allow preview of the primitives in Brand Studio (or a dedicated lab) using the same exported components consumers will import.
- Document public package exports so consumers can adopt the kit without reverse-engineering the repo.

## Functional Requirements

```text
REQ-001

The system shall produce a library build that emits React UI components and a generated CSS bundle as package artifacts.
```

```text
REQ-002

The system shall expose the following initial UI primitives as importable React components: Button, Select, Card, Table, Badge, Skeleton, and Alert.
```

```text
REQ-003

When a consumer imports a UI primitive from the brand package, the system shall provide that component without requiring the consumer to install, configure, or run Tailwind CSS.
```

```text
REQ-004

The system shall derive the visual theme of UI primitives from the existing brand design tokens (TypeScript token source of truth and generated CSS custom properties).
```

```text
REQ-005

The system shall keep Tailwind CSS, shadcn/ui scaffolding, Radix primitive wiring, and internal style helpers as private implementation details that are not part of the documented public consumer API.
```

```text
REQ-006

The system shall publish public package export paths for the UI kit components and the generated CSS bundle via `package.json` exports.
```

```text
REQ-007

When Brand Studio (or a dedicated lab within Brand Studio) is running, the system shall allow preview of each initial UI primitive using the same components exported for consumers.
```

```text
REQ-008

The system shall document the public package exports for the UI kit and the generated CSS bundle, including how a consumer imports components and CSS without Tailwind.
```

```text
REQ-009

The system shall preserve existing public exports for tokens, wording, and logo so introducing the UI kit does not remove or break those surfaces.
```

```text
REQ-010

When a consumer includes the generated UI kit CSS bundle in their application, the system shall supply the CSS custom properties and component styles required for the initial primitives to render with brand theme styling.
```

## Non-Functional Requirements

```text
REQ-011

The UI kit shall declare React as a peer-compatible dependency so consumers share a single React runtime with the host application.
```

```text
REQ-012

The generated CSS bundle and component build outputs shall be deterministic for a given token and component source state (repeatable build).
```

```text
REQ-013

UI kit components shall be authored in TypeScript and ship type definitions usable by TypeScript consumers.
```

```text
REQ-014

Public component and CSS export paths shall follow the package’s existing subpath export convention (e.g. `@market-data/brand/...`).
```

## Acceptance Criteria

- [ ] A library build emits React UI components and a generated CSS bundle as consumable package artifacts (REQ-001, REQ-012).
- [ ] Initial primitives are available for import: Button, Select, Card, Table, Badge, Skeleton, and Alert (REQ-002).
- [ ] Component theme is bridged from existing brand design tokens (REQ-004, REQ-010).
- [ ] Brand Studio (or a dedicated lab) can preview all initial primitives using the exported components (REQ-007).
- [ ] Public package exports for the UI kit and CSS are documented (REQ-006, REQ-008, REQ-014).
- [ ] A consumer can import the components and CSS without installing Tailwind (REQ-003, REQ-005, REQ-010).
- [ ] Existing token, wording, and logo exports remain available (REQ-009).
- [ ] Components ship with TypeScript types and React is peer-compatible (REQ-011, REQ-013).
