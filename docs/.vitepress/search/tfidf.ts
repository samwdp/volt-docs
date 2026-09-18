import type {
  DocumentStats,
  FieldTermFrequencies,
  FieldWeights,
  RelevanceScorer,
  SearchIndexData,
} from './types'

/**
 * Classic TF-IDF scorer with field weighting, document-length normalization,
 * and a small bonus for exact query-term matches in title/headings.
 *
 * BM25 can replace this later by implementing {@link RelevanceScorer}.
 */
export class TfIdfScorer implements RelevanceScorer {
  readonly name = 'tf-idf'

  score(
    queryTerms: string[],
    index: SearchIndexData,
    documentId: string
  ): { score: number; matchedTerms: string[] } {
    const stats = index.docStats.find((entry) => entry.id === documentId)
    if (!stats || queryTerms.length === 0) {
      return { score: 0, matchedTerms: [] }
    }

    const matchedTerms: string[] = []
    let score = 0

    for (const term of queryTerms) {
      const idf = index.idf[term]
      if (idf === undefined) continue

      const fieldContribution = weightedTermFrequency(term, stats, index.weights)
      if (fieldContribution <= 0) continue

      matchedTerms.push(term)

      const tf = fieldContribution
      // Length-normalized TF-IDF: dampen long documents relative to the corpus average.
      const avgLen =
        Number.isFinite(index.avgDocLength) && index.avgDocLength > 0
          ? index.avgDocLength
          : 1
      const docLen = Number.isFinite(stats.length) && stats.length > 0 ? stats.length : 1
      const lengthNorm = 1 / (1 + Math.log(1 + docLen / avgLen))
      let termScore = tf * idf * lengthNorm

      // Exact-match boost when the term appears in title or headings.
      if ((stats.termFrequencies.title[term] ?? 0) > 0) {
        termScore *= 1.35
      } else if ((stats.termFrequencies.headings[term] ?? 0) > 0) {
        termScore *= 1.2
      }

      score += termScore
    }

    // Soft boost when more of the query terms match (multi-term queries).
    if (matchedTerms.length > 1) {
      const coverage = matchedTerms.length / queryTerms.length
      score *= 1 + 0.25 * coverage
    }

    return { score, matchedTerms }
  }
}

function weightedTermFrequency(
  term: string,
  stats: DocumentStats,
  weights: FieldWeights
): number {
  const fields = stats.termFrequencies
  const w = weights ?? {
    title: 5,
    headings: 4,
    description: 3,
    body: 1,
    code: 0.25,
  }
  return (
    logTf(fields.title[term]) * w.title +
    logTf(fields.headings[term]) * w.headings +
    logTf(fields.description[term]) * w.description +
    logTf(fields.body[term]) * w.body +
    logTf(fields.code[term]) * w.code
  )
}

function logTf(raw: number | undefined): number {
  if (!raw || raw <= 0) return 0
  return 1 + Math.log(raw)
}

/** Reserved for a future BM25 implementation — same {@link RelevanceScorer} contract. */
export class Bm25Scorer implements RelevanceScorer {
  readonly name = 'bm25'

  // Intentionally unimplemented placeholder so the UI can swap scorers later.
  score(
    _queryTerms: string[],
    _index: SearchIndexData,
    _documentId: string
  ): { score: number; matchedTerms: string[] } {
    throw new Error('BM25 scorer is not implemented yet. Use TfIdfScorer.')
  }
}

export type { FieldTermFrequencies }
