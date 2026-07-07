import { useCallback, useState, type ReactNode } from 'react'
import { defaultLogoConfig } from './logo-config.ts'
import { defaultLogoTheme } from './logo-theme.ts'
import { Logo } from './components/Logo.tsx'
import type { BarColorKey, HandleSpec, LogoConfig, LogoTheme } from './types.ts'
import './LogoLab.css'

const BAR_COLOR_KEYS: BarColorKey[] = ['bar1', 'bar2', 'bar3', 'bar4', 'bar5']

function cloneConfig(config: LogoConfig): LogoConfig {
  return structuredClone(config)
}

function cloneTheme(theme: LogoTheme): LogoTheme {
  return structuredClone(theme)
}

function NumberControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}) {
  return (
    <label className="logo-lab-control">
      <span className="logo-lab-control__label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="logo-lab-control logo-lab-control--color">
      <span className="logo-lab-control__label">{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
      <code>{value}</code>
    </label>
  )
}

function HandleControls({
  title,
  handle,
  onFieldChange,
}: {
  title: string
  handle: HandleSpec
  onFieldChange: <K extends keyof HandleSpec>(field: K, value: HandleSpec[K]) => void
}) {
  return (
    <div className="logo-lab-handle-group">
      <p className="logo-lab-subsection">{title}</p>
      <NumberControl
        label="Angle"
        value={handle.angleDeg}
        min={0}
        max={360}
        onChange={(angleDeg) => onFieldChange('angleDeg', angleDeg)}
      />
      <NumberControl
        label="Length"
        value={handle.length}
        min={40}
        max={160}
        onChange={(length) => onFieldChange('length', length)}
      />
      <NumberControl
        label="Overlap offset"
        value={handle.overlapOffset}
        min={0}
        max={80}
        onChange={(overlapOffset) => onFieldChange('overlapOffset', overlapOffset)}
      />
      <NumberControl
        label="FG stroke"
        value={handle.strokeWidth}
        min={4}
        max={50}
        onChange={(strokeWidth) => onFieldChange('strokeWidth', strokeWidth)}
      />
      <NumberControl
        label="BG stroke"
        value={handle.bgStroke}
        min={4}
        max={80}
        onChange={(bgStroke) => onFieldChange('bgStroke', bgStroke)}
      />
    </div>
  )
}

const FIELDSET_SECTIONS = ['bars', 'trend', 'lens', 'magnifying-glass', 'theme'] as const
type FieldsetSection = (typeof FIELDSET_SECTIONS)[number]

const DEFAULT_OPEN_SECTIONS = Object.fromEntries(
  FIELDSET_SECTIONS.map((section) => [section, false]),
) as Record<FieldsetSection, boolean>

function CollapsibleFieldset({
  sectionId,
  title,
  open,
  onToggle,
  children,
}: {
  sectionId: FieldsetSection
  title: string
  open: boolean
  onToggle: (sectionId: FieldsetSection) => void
  children: ReactNode
}) {
  const panelId = `logo-lab-panel-${sectionId}`

  return (
    <fieldset
      className={`logo-lab-fieldset${open ? '' : ' logo-lab-fieldset--collapsed'}`}
    >
      <legend className="logo-lab-fieldset__legend">
        <button
          type="button"
          className="logo-lab-fieldset__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(sectionId)}
        >
          <span className="logo-lab-fieldset__chevron" aria-hidden="true" />
          {title}
        </button>
      </legend>
      <div
        id={panelId}
        className="logo-lab-fieldset__body"
        hidden={!open}
      >
        {children}
      </div>
    </fieldset>
  )
}

export function LogoLab() {
  const [config, setConfig] = useState<LogoConfig>(() => cloneConfig(defaultLogoConfig))
  const [theme, setTheme] = useState<LogoTheme>(() => cloneTheme(defaultLogoTheme))
  const [status, setStatus] = useState('')
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS)

  const toggleSection = useCallback((sectionId: FieldsetSection) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }))
  }, [])

  const updateConfig = useCallback((updater: (draft: LogoConfig) => void) => {
    setConfig((current) => {
      const next = cloneConfig(current)
      updater(next)
      return next
    })
  }, [])

  const updateTheme = useCallback((updater: (draft: LogoTheme) => void) => {
    setTheme((current) => {
      const next = cloneTheme(current)
      updater(next)
      return next
    })
  }, [])

  const resetDefaults = () => {
    setConfig(cloneConfig(defaultLogoConfig))
    setTheme(cloneTheme(defaultLogoTheme))
    setStatus('Reset to defaults.')
  }

  const copyConfig = async () => {
    const payload = JSON.stringify({ config, theme }, null, 2)
    await navigator.clipboard.writeText(payload)
    setStatus('Config JSON copied to clipboard.')
  }

  const copySvg = async () => {
    const svg = document.querySelector('.logo-lab-preview svg')
    if (!svg) {
      setStatus('Could not find SVG preview.')
      return
    }
    await navigator.clipboard.writeText(svg.outerHTML)
    setStatus('SVG copied to clipboard. Run npm run logo:export to write favicon.svg.')
  }

  return (
    <div className="logo-lab">
      <header className="logo-lab-header">
        <h1>Logo Lab</h1>
        <p>Chart viewed through a lens — tweak config, then export.</p>
      </header>

      <div className="logo-lab-layout">
        <section className="logo-lab-preview-panel">
          <div className="logo-lab-preview">
            <Logo config={config} theme={theme} size={512} />
          </div>
          <div className="logo-lab-preview logo-lab-preview--small">
            <span className="logo-lab-preview__label">32px favicon preview</span>
            <Logo config={config} theme={theme} size={32} />
          </div>
        </section>

        <section className="logo-lab-controls">
          <CollapsibleFieldset
            sectionId="bars"
            title="Bars"
            open={openSections.bars}
            onToggle={toggleSection}
          >
            {config.chart.bars.map((bar, index) => (
              <NumberControl
                key={index}
                label={`Bar ${index + 1} height`}
                value={bar.height}
                min={20}
                max={420}
                onChange={(height) =>
                  updateConfig((draft) => {
                    draft.chart.bars[index].height = height
                  })
                }
              />
            ))}
            <NumberControl
              label="Bar width"
              value={config.chart.barWidth}
              min={20}
              max={60}
              onChange={(barWidth) =>
                updateConfig((draft) => {
                  draft.chart.barWidth = barWidth
                })
              }
            />
            <NumberControl
              label="Bar gap"
              value={config.chart.barGap}
              min={16}
              max={64}
              onChange={(barGap) =>
                updateConfig((draft) => {
                  draft.chart.barGap = barGap
                })
              }
            />
            <NumberControl
              label="Baseline Y"
              value={config.chart.baselineY}
              min={180}
              max={260}
              onChange={(baselineY) =>
                updateConfig((draft) => {
                  draft.chart.baselineY = baselineY
                })
              }
            />
          </CollapsibleFieldset>

          <CollapsibleFieldset
            sectionId="trend"
            title="Trend"
            open={openSections.trend}
            onToggle={toggleSection}
          >
            {config.trend.points.slice(0, -1).map((point, index) => (
              <NumberControl
                key={index}
                label={`Node ${index + 1} Y`}
                value={point.y}
                min={80}
                max={320}
                onChange={(y) =>
                  updateConfig((draft) => {
                    draft.trend.points[index].y = y
                  })
                }
              />
            ))}
            <NumberControl
              label="Stroke width"
              value={config.trend.strokeWidth}
              min={4}
              max={24}
              onChange={(strokeWidth) =>
                updateConfig((draft) => {
                  draft.trend.strokeWidth = strokeWidth
                })
              }
            />
            <NumberControl
              label="Node radius"
              value={config.trend.nodeRadius}
              min={4}
              max={16}
              onChange={(nodeRadius) =>
                updateConfig((draft) => {
                  draft.trend.nodeRadius = nodeRadius
                })
              }
            />
            <NumberControl
              label="Arrow head length"
              value={config.trend.arrowHeadLength}
              min={8}
              max={60}
              onChange={(arrowHeadLength) =>
                updateConfig((draft) => {
                  draft.trend.arrowHeadLength = arrowHeadLength
                })
              }
            />
            <NumberControl
              label="Arrow head width"
              value={config.trend.arrowHeadWidth}
              min={8}
              max={40}
              onChange={(arrowHeadWidth) =>
                updateConfig((draft) => {
                  draft.trend.arrowHeadWidth = arrowHeadWidth
                })
              }
            />
          </CollapsibleFieldset>

          <CollapsibleFieldset
            sectionId="lens"
            title="Lens"
            open={openSections.lens}
            onToggle={toggleSection}
          >
            <NumberControl
              label="Center X"
              value={config.lens.cx}
              min={180}
              max={340}
              onChange={(cx) =>
                updateConfig((draft) => {
                  draft.lens.cx = cx
                })
              }
            />
            <NumberControl
              label="Center Y"
              value={config.lens.cy}
              min={160}
              max={320}
              onChange={(cy) =>
                updateConfig((draft) => {
                  draft.lens.cy = cy
                })
              }
            />
            <NumberControl
              label="Radius"
              value={config.lens.r}
              min={120}
              max={220}
              onChange={(r) =>
                updateConfig((draft) => {
                  draft.lens.r = r
                })
              }
            />
            <NumberControl
              label="Magnification"
              value={config.lens.magnification}
              min={1}
              max={2}
              step={0.01}
              onChange={(magnification) =>
                updateConfig((draft) => {
                  draft.lens.magnification = magnification
                })
              }
            />
            <NumberControl
              label="Rotation"
              value={config.lens.rotation}
              min={-45}
              max={45}
              onChange={(rotation) =>
                updateConfig((draft) => {
                  draft.lens.rotation = rotation
                })
              }
            />
            <NumberControl
              label="Clip inset"
              value={config.lens.clipInset}
              min={0}
              max={40}
              onChange={(clipInset) =>
                updateConfig((draft) => {
                  draft.lens.clipInset = clipInset
                })
              }
            />
          </CollapsibleFieldset>

          <CollapsibleFieldset
            sectionId="magnifying-glass"
            title="Magnifying glass"
            open={openSections['magnifying-glass']}
            onToggle={toggleSection}
          >
            <NumberControl
              label="Ring bg stroke"
              value={config.magnifyingGlass.ringBgStroke}
              min={10}
              max={50}
              onChange={(ringBgStroke) =>
                updateConfig((draft) => {
                  draft.magnifyingGlass.ringBgStroke = ringBgStroke
                })
              }
            />
            <NumberControl
              label="Ring fg stroke"
              value={config.magnifyingGlass.ringFgStroke}
              min={8}
              max={40}
              onChange={(ringFgStroke) =>
                updateConfig((draft) => {
                  draft.magnifyingGlass.ringFgStroke = ringFgStroke
                })
              }
            />
            <HandleControls
              title="Handle narrow"
              handle={config.magnifyingGlass.handleNarrow}
              onFieldChange={(field, value) =>
                updateConfig((draft) => {
                  draft.magnifyingGlass.handleNarrow[field] = value
                })
              }
            />
            <HandleControls
              title="Handle bottom"
              handle={config.magnifyingGlass.handleBottom}
              onFieldChange={(field, value) =>
                updateConfig((draft) => {
                  draft.magnifyingGlass.handleBottom[field] = value
                })
              }
            />
          </CollapsibleFieldset>

          <CollapsibleFieldset
            sectionId="theme"
            title="Theme"
            open={openSections.theme}
            onToggle={toggleSection}
          >
            <ColorControl
              label="Background"
              value={theme.colors.background}
              onChange={(background) =>
                updateTheme((draft) => {
                  draft.colors.background = background
                })
              }
            />
            {BAR_COLOR_KEYS.map((key) => (
              <ColorControl
                key={key}
                label={key}
                value={theme.colors[key]}
                onChange={(color) =>
                  updateTheme((draft) => {
                    draft.colors[key] = color
                  })
                }
              />
            ))}
            <ColorControl
              label="Trend"
              value={theme.colors.trend}
              onChange={(trendColor) =>
                updateTheme((draft) => {
                  draft.colors.trend = trendColor
                })
              }
            />
            <ColorControl
              label="Gradient from"
              value={theme.gradient.ring.from}
              onChange={(from) =>
                updateTheme((draft) => {
                  draft.gradient.ring.from = from
                })
              }
            />
            <ColorControl
              label="Gradient to"
              value={theme.gradient.ring.to}
              onChange={(to) =>
                updateTheme((draft) => {
                  draft.gradient.ring.to = to
                })
              }
            />
          </CollapsibleFieldset>

          <div className="logo-lab-actions">
            <button type="button" onClick={resetDefaults}>
              Reset to defaults
            </button>
            <button type="button" onClick={copyConfig}>
              Copy config JSON
            </button>
            <button type="button" onClick={copySvg}>
              Copy SVG
            </button>
          </div>
          {status ? <p className="logo-lab-status">{status}</p> : null}
        </section>
      </div>
    </div>
  )
}
