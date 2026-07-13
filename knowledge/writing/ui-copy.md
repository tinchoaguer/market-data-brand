# UI Copy (Design System)

Reusable design-system copy for consumers of `@market-data/brand`. Spec Writer and Implementer must read this with [`writing-guidelines.md`](./writing-guidelines.md) and [`terminology.md`](./terminology.md).

## Ownership

| Kind | Lives in | When to use |
|------|----------|-------------|
| **Design system (shared)** | This package: `src/locales/en.json` → `@market-data/brand/wording` | Product identity, shared chrome (Save, Cancel, Loading…), shared domain labels, shared CTAs |
| **Feature / screen-specific** | The consuming product app’s own locale catalogs | Copy that only makes sense for one screen or flow |

Add a string to this package only when at least two surfaces (or a shared primitive) need the same wording, or when it is core product identity / shared chrome.

## Key naming

- Nested JSON paths, camelCase leaf keys: `common.save`, `labels.orderBook`, `product.name`
- Group by concern: `product`, `common`, `cta`, `labels`
- Do not put locale or grammar in the key name
- Prefer stable keys; rename only with a coordinated consumer update

## Runtime source of truth

- Edit `src/locales/en.json`
- Consumers import `@market-data/brand/wording` (typed object loaded from the default locale)
- Keep this inventory table in sync with `en.json` in the same change
- A contract test asserts inventory keys and values match `en.json`

## Inventory

<!-- inventory:start -->
| Key | English |
|-----|---------|
| `product.name` | Market Data |
| `product.nameShort` | MD |
| `product.tagline` | See the market through a clearer lens. |
| `product.description` | Inspect live market structure, deterministic analysis, and classification signals in one place. |
| `common.save` | Save |
| `common.cancel` | Cancel |
| `common.loading` | Loading… |
| `common.error` | Something went wrong |
| `common.retry` | Try again |
| `cta.viewMarket` | View market data |
| `cta.viewAnalysis` | View analysis |
| `cta.viewClassification` | View classification |
| `labels.symbol` | Symbol |
| `labels.price` | Price |
| `labels.orderBook` | Order book |
| `labels.bids` | Bids |
| `labels.asks` | Asks |
| `labels.candles` | Candles |
| `labels.regime` | Regime |
| `labels.risk` | Risk |
| `labels.economic` | Economic |
| `labels.exposure` | Exposure |
| `labels.recommendation` | Recommendation |
<!-- inventory:end -->

## Spec and implementation checklist

1. Prefer an existing inventory key before inventing new copy.
2. New shared strings: update `en.json`, this inventory, and terminology if a new concept is introduced.
3. Do not hardcode user-facing English in components; read from the wording export.
4. Feature-only strings belong in the consumer app’s catalogs, still following writing guidelines and terminology.
