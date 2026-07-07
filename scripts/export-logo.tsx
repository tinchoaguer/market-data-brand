import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { defaultLogoConfig } from '../src/brand/logo-config.ts'
import { Logo } from '../src/brand/components/Logo.tsx'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const outPath = join(scriptDir, '../public/favicon.svg')

const markup = renderToStaticMarkup(createElement(Logo, { config: defaultLogoConfig }))
const svg = `<?xml version="1.0" encoding="UTF-8"?>\n${markup}\n`

writeFileSync(outPath, svg, 'utf8')
console.log(`Wrote ${outPath}`)
