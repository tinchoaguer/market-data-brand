import { arrowPathFromLastSegment, pathFromPoints } from '../geometry/trend-geometry.ts'
import type { LogoConfig, LogoTheme } from '../types.ts'

interface ChartTrendProps {
  config: LogoConfig
  theme: LogoTheme
  groupId?: string
}

export function ChartTrend({ config, theme, groupId = 'trend' }: ChartTrendProps) {
  const {
    points,
    strokeWidth,
    arrowStrokeWidth,
    arrowHeadLength,
    arrowHeadWidth,
    nodeRadius,
  } = config.trend
  const trendColor = theme.colors.trend
  const linePath = pathFromPoints(points)
  const arrowPath = arrowPathFromLastSegment(points, arrowHeadLength, arrowHeadWidth)

  return (
    <g id={groupId} fill={trendColor} stroke={trendColor}>
      <path
        d={linePath}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      {arrowPath ? (
        <path
          d={arrowPath}
          strokeLinecap="round"
          strokeWidth={arrowStrokeWidth}
        />
      ) : null}
      <g id={`${groupId}-nodes`}>
        {points.slice(0, -1).map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={nodeRadius}
          />
        ))}
      </g>
    </g>
  )
}
