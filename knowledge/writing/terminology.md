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
| Symbol | Instrument ticker / identifier | Ticker (in UI labels), Instrument ID |
| Price | Current or displayed price | Quote (as the field label), Value |
| Order book | Full depth book UI | Orderbook, Book, Market depth (as the primary label) |
| Bids | Buy side of the book | Bid side, Buy orders (as the column label) |
| Asks | Sell side of the book | Ask side, Offers, Sell orders (as the column label) |
| Candles | OHLC candle series | Candlesticks (unless explaining the chart type once), Bars |
| Regime | Market regime classification | State, Mode, Phase (for this concept) |
| Risk | Risk signal / classification | Danger, Hazard |
| Economic | Economic classification dimension | Economy, Macro (as the label) |
| Exposure | Exposure classification dimension | Position size (unless a distinct metric) |
| Recommendation | System recommendation output | Advice, Suggestion, Tip |
| Analysis | Deterministic market analysis views | Insights, Analytics (as the primary nav label) |
| Classification | Classification signals views | Tags, Categories (as the primary nav label) |

## Shared UI chrome

| Canonical | Notes |
|-----------|-------|
| Save | Persist changes |
| Cancel | Dismiss without saving |
| Loading… | In-progress fetch or compute (use ellipsis character) |
| Something went wrong | Generic error |
| Try again | Generic retry action |

## Writing rule

If a new product concept needs a lasting name, add it here in the same change that introduces the UI string. Prefer one canonical term over parallel aliases.
