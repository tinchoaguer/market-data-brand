import { useState } from 'react'
import { LogoLab } from './LogoLab.tsx'
import { TokensLab } from './TokensLab.tsx'
import { WordingLab } from './WordingLab.tsx'
import { wording } from '../tokens/wording.ts'
import './BrandStudio.css'

const TABS = [
  { id: 'logo', label: 'Logo' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'wording', label: 'Wording' },
] as const

type TabId = (typeof TABS)[number]['id']

export function BrandStudio() {
  const [tab, setTab] = useState<TabId>('logo')

  return (
    <div className="brand-studio">
      <nav className="brand-studio-nav" aria-label="Brand sections">
        <div className="brand-studio-brand">
          <strong>{wording.productName}</strong>
          <span>Brand</span>
        </div>
        <div className="brand-studio-tabs" role="tablist">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={
                tab === item.id
                  ? 'brand-studio-tab brand-studio-tab--active'
                  : 'brand-studio-tab'
              }
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="brand-studio-main">
        {tab === 'logo' ? <LogoLab /> : null}
        {tab === 'tokens' ? <TokensLab /> : null}
        {tab === 'wording' ? <WordingLab /> : null}
      </main>
    </div>
  )
}
