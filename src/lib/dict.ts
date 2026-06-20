import type { DictEntry } from '@/types'

const cache = new Map<string, DictEntry | null>()

export async function lookupWord(word: string): Promise<DictEntry | null> {
  const key = word.toLowerCase()
  if (cache.has(key)) return cache.get(key)!

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`)
    if (!res.ok) { cache.set(key, null); return null }
    const data = await res.json() as Array<{
      word: string
      phonetic?: string
      meanings: Array<{
        partOfSpeech: string
        definitions: Array<{ definition: string; example?: string }>
      }>
    }>
    if (!Array.isArray(data) || data.length === 0) { cache.set(key, null); return null }
    const entry: DictEntry = {
      word: data[0].word,
      phonetic: data[0].phonetic,
      meanings: data[0].meanings.slice(0, 2).map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.slice(0, 2),
      })),
    }
    cache.set(key, entry)
    return entry
  } catch {
    cache.set(key, null)
    return null
  }
}
