import { wording } from '../tokens/wording.ts'
import './TokensLab.css'

export function WordingLab() {
  return (
    <div className="tokens-lab">
      <header className="tokens-lab-header">
        <h1>Wording</h1>
        <p>
          Brand copy lives in <code>src/tokens/wording.ts</code>. Import via{' '}
          <code>@market-data/brand/wording</code> — not CSS.
        </p>
      </header>

      <section className="tokens-lab-section">
        <h2>Identity</h2>
        <dl className="wording-lab-dl">
          <div>
            <dt>Product name</dt>
            <dd>{wording.productName}</dd>
          </div>
          <div>
            <dt>Short name</dt>
            <dd>{wording.productNameShort}</dd>
          </div>
          <div>
            <dt>Tagline</dt>
            <dd className="wording-lab-tagline">{wording.tagline}</dd>
          </div>
          <div>
            <dt>Description</dt>
            <dd>{wording.description}</dd>
          </div>
        </dl>
      </section>

      <section className="tokens-lab-section">
        <h2>CTAs</h2>
        <ul className="wording-lab-list">
          {Object.entries(wording.cta).map(([key, value]) => (
            <li key={key}>
              <code>{key}</code>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tokens-lab-section">
        <h2>UI labels</h2>
        <ul className="wording-lab-list">
          {Object.entries(wording.labels).map(([key, value]) => (
            <li key={key}>
              <code>{key}</code>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tokens-lab-section">
        <h2>Voice</h2>
        <dl className="wording-lab-dl">
          <div>
            <dt>Tone</dt>
            <dd>{wording.voice.tone}</dd>
          </div>
          <div>
            <dt>Avoid</dt>
            <dd>{wording.voice.avoid}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
