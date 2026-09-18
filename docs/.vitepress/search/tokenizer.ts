/**
 * Lightweight tokenizer for natural-language documentation queries.
 * Case-insensitive, punctuation-stripped, whitespace-normalized.
 * Not a full NLP parser — just enough to turn phrases into useful terms.
 */

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'as',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'must',
  'can',
  'i',
  'me',
  'my',
  'we',
  'you',
  'your',
  'it',
  'its',
  'this',
  'that',
  'these',
  'those',
  'with',
  'from',
  'by',
  'about',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'up',
  'down',
  'out',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  'just',
  'also',
])

/**
 * Normalize and tokenize free-form text into search terms.
 * Keeps tokens of length >= 2 after stripping punctuation.
 */
export function tokenize(text: string, options?: { keepStopWords?: boolean }): string[] {
  if (!text) return []

  const keepStopWords = options?.keepStopWords ?? false
  const normalized = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  if (!normalized) return []

  const tokens = normalized.split(/\s+/).filter((token) => token.length >= 2)

  if (keepStopWords) return tokens
  return tokens.filter((token) => !STOP_WORDS.has(token))
}

/** Count term frequencies for a token list. */
export function termFrequencies(tokens: string[]): Record<string, number> {
  // null-prototype map so tokens like "constructor" cannot hit Object.prototype.
  const freqs: Record<string, number> = Object.create(null)
  for (const token of tokens) {
    freqs[token] = (freqs[token] ?? 0) + 1
  }
  return freqs
}
