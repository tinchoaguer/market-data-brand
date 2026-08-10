# Terminology

Canonical product language for Market Data. Use these terms consistently in specs, UI copy, and documentation. Do not invent synonyms for the same concept.

## Product identity

| Canonical | Use | Do not use |
|-----------|-----|------------|
| Market Data | Full product name | Market Information, MarketData (as display name), MD Platform |
| MD | Short name / compact chrome only | M.D., Md |

## Domain concepts

| Canonical | Notes | Do not use |
|-----------|-------|------------|
| Symbol | Instrument ticker / identifier; UI protagonist | Asset, Ticker (in UI labels), Instrument ID |
| Identity | Stable Symbol descriptors (name, pair form) | Profile (as the section label) |
| Market Data | Live market structure surface (Price, Order book, Candles) | Market State, Quote wall |
| Price | Current or displayed price | Quote (as the field label), Value |
| Order book | Full depth book UI | Orderbook, Book, Market depth (as the primary label) |
| Bids | Buy side of the book | Bid side, Buy orders (as the column label) |
| Asks | Sell side of the book | Ask side, Offers, Sell orders (as the column label) |
| Candles | OHLC candle series | Candlesticks (unless explaining the chart type once), Bars |
| Analysis | Deterministic market analysis views | Insights, Analytics (as the primary nav label) |
| Regime | Market regime classification | State, Mode, Phase (for this concept) |
| Risk | Risk signal / classification | Danger, Hazard |
| Economic | Economic classification dimension | Economy, Macro (as the label) |
| Exposure | Exposure classification dimension | Position size (unless a distinct metric) |
| Recommendation | System recommendation output | Advice, Suggestion, Tip |
| Classification | Classification signals views | Tags, Categories (as the primary nav label) |
| Evidence | Explainability layer for scores and labels | Breakdown (as the sole name), Metrics dump |
| Drivers | Named forces behind an assessment | Factors (prefer Drivers in new UI) |
| Features | Measured inputs behind drivers | Inputs (as the primary label) |
| Contributions | Quantified attribution toward a score | Weights (unless showing pure %) |
| Narrative | Verbal takeaway of analysis / signals | Story, Insight blurb (as the chrome label) |
| Diagnostics | Data-quality / confidence status | Errors presented as Analysis |

Information architecture for these entities: [`../visual-definitions/domain-language.md`](../visual-definitions/domain-language.md).

## Shared UI chrome

| Canonical | Notes |
|-----------|-------|
| Save | Persist changes |
| Cancel | Dismiss without saving |
| Loading… | In-progress fetch or compute (use ellipsis character) |
| Something went wrong | Generic error |
| Try again | Generic retry action |
| Toggle color theme | Accessible name for the theme-toggle control |
| Live | Quiet status footer indicator for an active data stream |

## Writing rule

If a new product concept needs a lasting name, add it here in the same change that introduces the UI string. Prefer one canonical term over parallel aliases.
