import type {
  DocumentStats,
  FieldTermFrequencies,
  FieldWeights,
  SearchDocument,
  SearchIndexData,
} from './types'
import { FIELD_WEIGHTS } from './weights'
import { termFrequencies, tokenize } from './tokenizer'

function emptyFieldFrequencies(): FieldTermFrequencies {
  return {
    title: {},
    headings: {},
    description: {},
    body: {},
    code: {},
  }
}

function fieldLength(freqs: Record<string, number>): number {
  return Object.values(freqs).reduce((sum, n) => sum + n, 0)
}

/**
 * Build per-document term statistics used by ranking algorithms.
 */
export function buildDocumentStats(
  document: SearchDocument,
  weights: FieldWeights = FIELD_WEIGHTS
): DocumentStats {
  const termFrequenciesByField: FieldTermFrequencies = {
    title: termFrequencies(tokenize(document.title, { keepStopWords: true })),
    headings: termFrequencies(tokenize(document.headings.join(' '), { keepStopWords: true })),
    description: termFrequencies(tokenize(document.description ?? '', { keepStopWords: true })),
    body: termFrequencies(tokenize(document.body)),
    code: termFrequencies(tokenize(document.code)),
  }

  const length =
    fieldLength(termFrequenciesByField.title) * weights.title +
    fieldLength(termFrequenciesByField.headings) * weights.headings +
    fieldLength(termFrequenciesByField.description) * weights.description +
    fieldLength(termFrequenciesByField.body) * weights.body +
    fieldLength(termFrequenciesByField.code) * weights.code

  return {
    id: document.id,
    length: Math.max(length, 1),
    termFrequencies: termFrequenciesByField,
  }
}

/**
 * Assemble a full search index from extracted Markdown documents.
 */
export function buildSearchIndex(
  documents: SearchDocument[],
  weights: FieldWeights = FIELD_WEIGHTS
): SearchIndexData {
  const docStats = documents.map((doc) => buildDocumentStats(doc, weights))
  const documentFrequency: Record<string, number> = {}

  for (const stats of docStats) {
    const uniqueTerms = new Set<string>()
    for (const field of Object.keys(stats.termFrequencies) as (keyof FieldTermFrequencies)[]) {
      for (const term of Object.keys(stats.termFrequencies[field])) {
        uniqueTerms.add(term)
      }
    }
    for (const term of uniqueTerms) {
      documentFrequency[term] = (documentFrequency[term] ?? 0) + 1
    }
  }

  const N = Math.max(documents.length, 1)
  const idf: Record<string, number> = {}
  for (const [term, df] of Object.entries(documentFrequency)) {
    // Smooth IDF so rare and common terms stay well-behaved.
    idf[term] = Math.log((N + 1) / (df + 1)) + 1
  }

  const totalLength = docStats.reduce((sum, stats) => {
    const length = Number.isFinite(stats.length) ? stats.length : 1
    return sum + length
  }, 0)
  const avgDocLength = Math.max(totalLength / Math.max(docStats.length, 1), 1)

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    weights,
    documents,
    idf,
    avgDocLength,
    docStats,
  }
}
