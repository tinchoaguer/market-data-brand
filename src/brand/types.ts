export type BarColorKey = 'bar1' | 'bar2' | 'bar3' | 'bar4' | 'bar5'

export interface Point {
  x: number
  y: number
}

export interface BarSpec {
  height: number
  color: BarColorKey
}

export interface HandleSpec {
  angleDeg: number
  length: number
  overlapOffset: number
  strokeWidth: number
  bgStroke: number
}

export interface LogoConfig {
  canvas: {
    size: number
    cornerRadius: number
  }
  chart: {
    origin: { x: number; y: number }
    barsOffset: { x: number; y: number }
    trendOffset: { x: number; y: number }
    barWidth: number
    barGap: number
    barRadius: number
    baselineY: number
    bars: BarSpec[]
  }
  trend: {
    points: Point[]
    strokeWidth: number
    arrowStrokeWidth: number
    arrowHeadLength: number
    arrowHeadWidth: number
    nodeRadius: number
  }
  lens: {
    cx: number
    cy: number
    r: number
    rotation: number
    magnification: number
    clipInset: number
  }
  magnifyingGlass: {
    ringBgStroke: number
    ringFgStroke: number
    handleNarrow: HandleSpec
    handleBottom: HandleSpec
  }
}

export interface LogoTheme {
  colors: {
    background: string
    bar1: string
    bar2: string
    bar3: string
    bar4: string
    bar5: string
    trend: string
    ringBg: string
  }
  gradient: {
    ring: {
      from: string
      to: string
    }
  }
}
