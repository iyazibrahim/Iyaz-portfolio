const WORDS_PER_MINUTE = 200

function collectLexicalText(node: unknown, parts: string[]) {
  if (!node || typeof node !== 'object') return

  const record = node as Record<string, unknown>

  if (typeof record.text === 'string' && record.text.trim()) {
    parts.push(record.text)
  }

  // Payload stores the editor state as { root: { children: [...] } }.
  if (record.root && typeof record.root === 'object') {
    collectLexicalText(record.root, parts)
  }

  if (Array.isArray(record.children)) {
    for (const child of record.children) {
      collectLexicalText(child, parts)
    }
  }

  if (record.fields && typeof record.fields === 'object') {
    collectLexicalText(record.fields, parts)
  }
}

export function estimateReadingTime(content: unknown): number {
  const parts: string[] = []
  collectLexicalText(content, parts)
  const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length

  if (words === 0) return 1
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function formatReadingTime(minutes?: number | null) {
  const value = Math.round(Number(minutes))
  if (!Number.isFinite(value) || value < 1) return null
  return `${value} min read`
}
