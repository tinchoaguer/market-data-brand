/**
 * Brand wording — product copy owned by market-data-brand.
 * Import from `@market-data/brand/wording` in the frontend.
 */
export const wording = {
  productName: 'Market Data',
  productNameShort: 'MD',
  tagline: 'See the market through a clearer lens.',
  description:
    'Inspect live market structure, deterministic analysis, and classification signals in one place.',
  cta: {
    viewMarket: 'View market data',
    viewAnalysis: 'View analysis',
    viewClassification: 'View classification',
  },
  labels: {
    symbol: 'Symbol',
    price: 'Price',
    orderBook: 'Order book',
    bids: 'Bids',
    asks: 'Asks',
    candles: 'Candles',
    regime: 'Regime',
    risk: 'Risk',
    economic: 'Economic',
    exposure: 'Exposure',
    recommendation: 'Recommendation',
    loading: 'Loading…',
    error: 'Something went wrong',
    retry: 'Try again',
  },
  voice: {
    tone: 'Precise, calm, and data-first. Prefer short declarative sentences.',
    avoid: 'Hype, emoji-heavy copy, and vague market slogans.',
  },
} as const

export type Wording = typeof wording
