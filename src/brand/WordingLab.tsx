import { wording } from '../tokens/wording.ts'
import './TokensLab.css'

function entriesOf(record: Record<string, string>) {
  return Object.entries(record)
}

export function WordingLab() {
  return (
    <div className="tokens-lab">
      <header className="tokens-lab-header">
        <h1>Wording</h1>
        <p>
          Shared copy lives in <code>src/locales/en.json</code> and is exported via{' '}
          <code>@market-data/brand/wording</code>. Guidelines:{' '}
          <code>knowledge/writing/</code>.
        </p>
      </header>

      <section className="tokens-lab-section">
        <h2>Product</h2>
        <dl className="wording-lab-dl">
          <div>
            <dt>Name</dt>
            <dd>{wording.product.name}</dd>
          </div>
          <div>
            <dt>Short name</dt>
            <dd>{wording.product.nameShort}</dd>
          </div>
          <div>
            <dt>Tagline</dt>
            <dd className="wording-lab-tagline">{wording.product.tagline}</dd>
          </div>
          <div>
            <dt>Description</dt>
            <dd>{wording.product.description}</dd>
          </div>
        </dl>
      </section>

      <section className="tokens-lab-section">
        <h2>Common</h2>
        <ul className="wording-lab-list">
          {entriesOf(wording.common).map(([key, value]) => (
            <li key={key}>
              <code>{key}</code>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tokens-lab-section">
        <h2>CTAs</h2>
        <ul className="wording-lab-list">
          {entriesOf(wording.cta).map(([key, value]) => (
            <li key={key}>
              <code>{key}</code>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tokens-lab-section">
        <h2>Labels</h2>
        <ul className="wording-lab-list">
          {entriesOf(wording.labels).map(([key, value]) => (
            <li key={key}>
              <code>{key}</code>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
