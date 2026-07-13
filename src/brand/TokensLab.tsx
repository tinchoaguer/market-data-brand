import { color, fontSize, fontWeight, palette, space } from '../tokens/index.ts'
import { wording } from '../tokens/wording.ts'
import './TokensLab.css'

const SEMANTIC_SWATCHES = [
  { key: 'bg', value: color.bg },
  { key: 'surface', value: color.surface },
  { key: 'text', value: color.text },
  { key: 'textMuted', value: color.textMuted },
  { key: 'accent', value: color.accent },
  { key: 'positive', value: color.positive },
  { key: 'warning', value: color.warning },
  { key: 'danger', value: color.danger },
  { key: 'info', value: color.info },
] as const

const TYPE_SAMPLES = [
  { name: '3xl / bold', size: fontSize['3xl'], weight: fontWeight.bold },
  { name: 'xl / semibold', size: fontSize.xl, weight: fontWeight.semibold },
  { name: 'md / regular', size: fontSize.md, weight: fontWeight.regular },
  { name: 'sm / medium', size: fontSize.sm, weight: fontWeight.medium },
] as const

export function TokensLab() {
  return (
    <div className="tokens-lab">
      <header className="tokens-lab-header">
        <h1>Tokens</h1>
        <p>
          TypeScript in <code>src/tokens/</code> is the source of truth. Run{' '}
          <code>npm run tokens:generate</code> to refresh <code>tokens.css</code>.
        </p>
      </header>

      <section className="tokens-lab-section">
        <h2>Semantic color</h2>
        <div className="tokens-lab-swatches">
          {SEMANTIC_SWATCHES.map((swatch) => (
            <div key={swatch.key} className="tokens-lab-swatch">
              <span
                className="tokens-lab-swatch__chip"
                style={{ background: swatch.value }}
              />
              <span className="tokens-lab-swatch__name">{swatch.key}</span>
              <code>{swatch.value}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="tokens-lab-section">
        <h2>Palette</h2>
        <div className="tokens-lab-swatches">
          {Object.entries(palette).map(([key, value]) => (
            <div key={key} className="tokens-lab-swatch">
              <span className="tokens-lab-swatch__chip" style={{ background: value }} />
              <span className="tokens-lab-swatch__name">{key}</span>
              <code>{value}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="tokens-lab-section">
        <h2>Typography</h2>
        <div className="tokens-lab-type">
          {TYPE_SAMPLES.map((sample) => (
            <p
              key={sample.name}
              style={{
                margin: 0,
                fontSize: sample.size,
                fontWeight: sample.weight,
                color: color.text,
              }}
            >
              {wording.product.name} — {sample.name}
            </p>
          ))}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: fontSize.sm,
              color: color.textMuted,
            }}
          >
            Mono · 42,150.25 · BTC/USDT
          </p>
        </div>
      </section>

      <section className="tokens-lab-section">
        <h2>Space</h2>
        <div className="tokens-lab-space">
          {([1, 2, 3, 4, 6, 8, 12] as const).map((step) => (
            <div key={step} className="tokens-lab-space__row">
              <code>space-{step}</code>
              <span
                className="tokens-lab-space__bar"
                style={{ width: space[step], background: color.accent }}
              />
              <code>{space[step]}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
