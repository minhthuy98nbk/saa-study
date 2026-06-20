// MyMemory free translation API — English → Vietnamese, no auth required
const cache = new Map<string, string | null>()

export async function translateWord(word: string): Promise<string | null> {
  const key = word.toLowerCase()
  if (cache.has(key)) return cache.get(key)!

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`
    )
    if (!res.ok) { cache.set(key, null); return null }

    const data = await res.json()
    const translated: string | undefined = data.responseData?.translatedText

    // MyMemory echoes back the original if it can't translate
    const result = translated && translated.toLowerCase() !== key ? translated : null
    cache.set(key, result)
    return result
  } catch {
    cache.set(key, null)
    return null
  }
}
