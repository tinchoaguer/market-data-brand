import { resolveBarColor } from '../logo-theme.ts'
import type { LogoConfig, LogoTheme } from '../types.ts'

interface ChartBarsProps {
  config: LogoConfig
  theme: LogoTheme
  groupId?: string
}

export function ChartBars({ config, theme, groupId = 'bars' }: ChartBarsProps) {
  const { barWidth, barGap, barRadius, baselineY, bars } = config.chart

  return (
    <g id={groupId}>
      {bars.map((bar, index) => {
        const x = index * (barWidth + barGap)
        const y = baselineY - bar.height

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={bar.height}
            rx={barRadius}
            fill={resolveBarColor(theme, bar.color)}
          />
        )
      })}
    </g>
  )
}
