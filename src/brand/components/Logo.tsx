import { useId } from 'react'
import { defaultLogoTheme } from '../logo-theme.ts'
import type { LogoConfig, LogoTheme } from '../types.ts'
import { ChartBars } from './ChartBars.tsx'
import { ChartTrend } from './ChartTrend.tsx'
import { MagnifyingGlass } from './MagnifyingGlass.tsx'

export interface LogoProps {
  config: LogoConfig
  theme?: LogoTheme
  size?: number
  className?: string
}

function barsTransform(config: LogoConfig): string {
  const { origin, barsOffset } = config.chart
  return `translate(${origin.x + barsOffset.x} ${origin.y + barsOffset.y})`
}

function trendTransform(config: LogoConfig): string {
  const { origin, trendOffset } = config.chart
  return `translate(${origin.x + trendOffset.x} ${origin.y + trendOffset.y})`
}

function lensTransform(config: LogoConfig): string {
  const { cx, cy, magnification } = config.lens
  return `translate(${cx} ${cy}) scale(${magnification}) translate(${-cx} ${-cy})`
}

export function Logo({ config, theme = defaultLogoTheme, size = 512, className }: LogoProps) {
  const { canvas, lens } = config
  const clipRadius = lens.r - lens.clipInset
  const instanceId = useId().replace(/:/g, '')
  const lensClipId = `lens-clip-${instanceId}`
  const ringGradientId = `ring-gradient-${instanceId}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvas.size} ${canvas.size}`}
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <clipPath id={lensClipId}>
          <circle cx={lens.cx} cy={lens.cy} r={clipRadius} />
        </clipPath>
        <linearGradient id={ringGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.gradient.ring.from} />
          <stop offset="100%" stopColor={theme.gradient.ring.to} />
        </linearGradient>
      </defs>
      <rect
        width={canvas.size}
        height={canvas.size}
        rx={canvas.cornerRadius}
        fill={theme.colors.background}
      />
      <g id="logo">
        <g id="chart">
          <g transform={barsTransform(config)}>
            <ChartBars config={config} theme={theme} />
          </g>
          <g transform={trendTransform(config)}>
            <ChartTrend config={config} theme={theme} />
          </g>
          <g clipPath={`url(#${lensClipId})`}>
            <circle
              cx={lens.cx}
              cy={lens.cy}
              r={clipRadius}
              fill={theme.colors.background}
            />
            <g transform={lensTransform(config)}>
              <g transform={barsTransform(config)}>
                <ChartBars config={config} theme={theme} groupId="bars-lens" />
              </g>
              <g transform={trendTransform(config)}>
                <ChartTrend config={config} theme={theme} groupId="trend-lens" />
              </g>
            </g>
          </g>
        </g>
        <MagnifyingGlass config={config} theme={theme} ringGradientId={ringGradientId} />
      </g>
    </svg>
  )
}
