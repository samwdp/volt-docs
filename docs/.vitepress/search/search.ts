import { tokenize } from './tokenizer'
import { TfIdfScorer } from './tfidf'
import type { HeadingAnchor, RelevanceScorer, SearchIndexData, SearchResult } from './types'

export interface SearchOptions {
  /** Maximum number of results to return. */
  limit?: number
  /** Minimum score required to include a result. */
  minScore?: number
  /** Ranking backend — defaults to TF-IDF. Swap for BM25 later. */
  scorer?: RelevanceScorer
}

/**
 * Run a ranked documentation search against a prebuilt index.
 * Pure client-side; no network or server required after the index is loaded.
 */
export function search(
  query: string,
  index: SearchIndexData,
  options: SearchOptions = {}
): SearchResult[] {
  const limit = options.limit ?? 10
  const minScore = options.minScore ?? 0.05
  const scorer = options.scorer ?? new TfIdfScorer()

  const queryTerms = tokenize(query)
  if (queryTerms.length === 0) return []

  const results: SearchResult[] = []

  for (const document of index.documents) {
    const { score, matchedTerms } = scorer.score(queryTerms, index, document.id)
    if (score < minScore || matchedTerms.length === 0) continue

    const matchedHeading = findBestHeading(document.headingAnchors, matchedTerms)
    results.push({
      document,
      score,
      matchedTerms,
      matchedHeading,
      snippet: buildSnippet(document, matchedTerms),
    })
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit)
}

function findBestHeading(
  headings: HeadingAnchor[],
  matchedTerms: string[]
): HeadingAnchor | undefined {
  if (!headings.length) return undefined

  let best: HeadingAnchor | undefined
  let bestHits = 0

  for (const heading of headings) {
    const tokens = new Set(tokenize(heading.text, { keepStopWords: true }))
    const hits = matchedTerms.filter((term) => tokens.has(term)).length
    if (hits > bestHits) {
      bestHits = hits
      best = heading
    }
  }

  return bestHits > 0 ? best : undefined
}

function buildSnippet(
  document: { description?: string; body: string; title: string },
  matchedTerms: string[]
): string {
  if (document.description?.trim()) {
    return truncate(document.description.trim(), 160)
  }

  const body = document.body.replace(/\s+/g, ' ').trim()
  if (!body) return document.title

  const lower = body.toLowerCase()
  let bestIndex = -1
  for (const term of matchedTerms) {
    const idx = lower.indexOf(term)
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx
    }
  }

  if (bestIndex === -1) return truncate(body, 160)

  const start = Math.max(0, bestIndex - 40)
  const excerpt = body.slice(start, start + 160)
  return `${start > 0 ? '…' : ''}${truncate(excerpt, 160)}`
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}
