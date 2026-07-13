import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import en from '../locales/en.json'

type JsonLeaf = string | number | boolean | null
type JsonValue = JsonLeaf | { [key: string]: JsonValue } | JsonValue[]

function flattenLeaves(
  value: JsonValue,
  prefix = '',
): Record<string, string> {
  if (typeof value === 'string') {
    return prefix ? { [prefix]: value } : {}
  }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Unexpected non-object catalog value at ${prefix || '/'}`)
  }

  const out: Record<string, string> = {}
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key
    Object.assign(out, flattenLeaves(child, path))
  }
  return out
}

function parseInventory(markdown: string): Record<string, string> {
  const start = markdown.indexOf('<!-- inventory:start -->')
  const end = markdown.indexOf('<!-- inventory:end -->')
  if (start < 0 || end < 0 || end <= start) {
    throw new Error('ui-copy.md is missing inventory markers')
  }

  const section = markdown.slice(start, end)
  const rows = [...section.matchAll(/^\| `([^`]+)` \| (.+) \|$/gm)]
  const inventory: Record<string, string> = {}
  for (const match of rows) {
    const key = match[1]
    const english = match[2].trim()
    inventory[key] = english
  }
  return inventory
}

describe('wording catalog parity', () => {
  it('keeps knowledge/writing/ui-copy.md inventory aligned with src/locales/en.json', () => {
    const uiCopyPath = resolve(
      process.cwd(),
      'knowledge/writing/ui-copy.md',
    )
    const markdown = readFileSync(uiCopyPath, 'utf8')
    const inventory = parseInventory(markdown)
    const catalog = flattenLeaves(en as JsonValue)

    expect(Object.keys(inventory).sort()).toEqual(Object.keys(catalog).sort())
    expect(inventory).toEqual(catalog)
  })
})
