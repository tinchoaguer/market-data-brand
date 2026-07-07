import { buildAttachedHandlePath } from '../geometry/handle-geometry.ts'
import type { LogoConfig, LogoTheme } from '../types.ts'

interface MagnifyingGlassProps {
  config: LogoConfig
  theme: LogoTheme
  ringGradientId?: string
}

interface HandlePathProps {
  path: string
  stroke: string
  strokeWidth: number
}

function HandlePath({ path, stroke, strokeWidth }: HandlePathProps) {
  return <path d={path} stroke={stroke} strokeWidth={strokeWidth} />
}

export function MagnifyingGlass({
  config,
  theme,
  ringGradientId = 'ringGradient',
}: MagnifyingGlassProps) {
  const { lens, magnifyingGlass } = config
  const ringTransform = `rotate(${lens.rotation} ${lens.cx} ${lens.cy})`
  const { handleNarrow, handleBottom, ringBgStroke, ringFgStroke } = magnifyingGlass
  const narrowPath = buildAttachedHandlePath(lens, handleNarrow)
  const bottomPath = buildAttachedHandlePath(lens, handleBottom)
  const gradientStroke = `url(#${ringGradientId})`

  return (
    <g id="magnifying-glass" strokeLinecap="round">
      <circle
        cx={lens.cx}
        cy={lens.cy}
        r={lens.r}
        fill="none"
        stroke={theme.colors.ringBg}
        strokeWidth={ringBgStroke}
        transform={ringTransform}
      />
      <HandlePath
        path={narrowPath}
        stroke={theme.colors.ringBg}
        strokeWidth={handleNarrow.bgStroke}
      />
      <HandlePath
        path={bottomPath}
        stroke={theme.colors.ringBg}
        strokeWidth={handleBottom.bgStroke}
      />
      <HandlePath
        path={narrowPath}
        stroke={gradientStroke}
        strokeWidth={handleNarrow.strokeWidth}
      />
      <HandlePath
        path={bottomPath}
        stroke={gradientStroke}
        strokeWidth={handleBottom.strokeWidth}
      />
      <circle
        cx={lens.cx}
        cy={lens.cy}
        r={lens.r}
        fill="none"
        stroke={gradientStroke}
        strokeWidth={ringFgStroke}
        transform={ringTransform}
      />
    </g>
  )
}
