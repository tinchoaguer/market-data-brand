# Writing Guidelines

Agent-facing rules for all user-facing copy owned by this design system. Spec Writer and Implementer must follow these when authoring specs and implementing UI text.

## Voice

- **Tone:** Precise, calm, formal, and data-first.
- Prefer short declarative sentences.
- Technical terms are welcome when they match [`terminology.md`](./terminology.md).
- Prefer clarity over cleverness.

## Avoid

- Hype, marketing fluff, and vague slogans
- Emoji in product UI copy
- Exclamation marks in normal UI chrome (labels, buttons, errors)
- Casual slang or conversational filler (“Oops”, “Hang tight”, “Let’s go”)
- Anthropomorphizing the product (“we couldn’t find…”) unless a human support flow requires it

## Capitalization

| Context | Rule | Example |
|---------|------|---------|
| Product name | Title Case as in terminology | Market Data |
| Buttons / primary actions | Sentence case | Save changes |
| Form labels / field labels | Sentence case | Order book |
| Page / section titles | Sentence case unless the title is a proper noun | Market structure |
| ALL CAPS | Do not use for emphasis in body UI | — |

## Punctuation

- End full sentences with a period.
- Do not put a period on single-word or short fragment labels (`Save`, `Cancel`, `Symbol`).
- Use the ellipsis character `…` (U+2026), not three dots `...`, for ongoing states (`Loading…`).
- Prefer em dash sparingly; commas or periods usually suffice.
- Do not use trailing exclamation marks in system messages.

## Length

- Buttons: 1–3 words when possible.
- Inline errors: one short sentence.
- Empty states: one sentence describing the state; optional one sentence for the next action.
- Descriptions and taglines: one or two sentences maximum.

## Errors and recovery

- State what failed without blame.
- Prefer calm defaults: `Something went wrong`.
- Pair errors with a clear recovery action when possible: `Try again`.
- Do not invent witty error copy.

## Empty states

- Describe the absence factually.
- If an action exists, use a clear CTA that matches shared `common` / `cta` keys when applicable.

## Internationalization

- Copy lives in locale catalogs (`src/locales/<locale>.json`), not hardcoded in components.
- Use stable key paths (`common.save`, `labels.orderBook`).
- Do not embed locale-specific grammar into key names.
- Default locale is `en`. Additional locales may be added later without changing key structure.

## Source of truth

- Runtime strings: `src/locales/en.json` (exported via `@market-data/brand/wording`)
- Tone and style: this document
- Product terms: [`terminology.md`](./terminology.md)
- Reusable DS inventory: [`ui-copy.md`](./ui-copy.md)
