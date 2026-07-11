type JsonPrimitive = string | number | boolean
export type JsonValue = JsonPrimitive | { readonly [key: string]: JsonValue }

function toKebab(segment: string): string {
  return segment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

/**
 * Flatten nested token objects into CSS custom-property entries.
 * `{ color: { accentStrong: '#5b6cff' } }` → `{ '--color-accent-strong': '#5b6cff' }`
 */
export function flattenTokens(
  tree: Record<string, JsonValue>,
  prefix = '',
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(tree)) {
    const segment = toKebab(key)
    const path = prefix ? `${prefix}-${segment}` : segment
    if (value !== null && typeof value === 'object') {
      Object.assign(result, flattenTokens(value as Record<string, JsonValue>, path))
    } else {
      result[`--${path}`] = String(value)
    }
  }

  return result
}
