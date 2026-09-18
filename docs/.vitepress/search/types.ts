/**
 * Shared types for the documentation search pipeline.
 *
 * Ranking algorithms (TF-IDF today, BM25 later) should implement
 * {@link RelevanceScorer} so the UI and query pipeline stay unchanged.
 */

/** Field weights applied when scoring a document against a query. */
export interface FieldWeights {
  title: number
  headings: number
  description: number
  body: number
  code: number
}

/** A single Markdown page prepared for indexing and retrieval. */
export interface SearchDocument {
  id: string
  url: string
  title: string
  description?: string
  headings: string[]
  /** Plain body text with code blocks removed or down-weighted at index time. */
  body: string
  /** Extracted code-block text, stored separately for low-weight matching. */
  code: string
  /** Optional best heading slug for deep-linking from a result. */
  headingAnchors: HeadingAnchor[]
}

export interface HeadingAnchor {
  text: string
  slug: string
}

/** Serialized index written at build time and loaded in the browser. */
export interface SearchIndexData {
  version: 1
  generatedAt: string
  weights: FieldWeights
  documents: SearchDocument[]
  /** Precomputed IDF values keyed by term. */
  idf: Record<string, number>
  /** Average document length (token count) used for length normalization. */
  avgDocLength: number
  /** Per-document field token frequencies. */
  docStats: DocumentStats[]
}

export interface FieldTermFrequencies {
  title: Record<string, number>
  headings: Record<string, number>
  description: Record<string, number>
  body: Record<string, number>
  code: Record<string, number>
}

export interface DocumentStats {
  id: string
  /** Total token count across weighted fields (for length normalization). */
  length: number
  termFrequencies: FieldTermFrequencies
}

export interface SearchResult {
  document: SearchDocument
  score: number
  matchedTerms: string[]
  /** Best matching heading for deep-linking, when available. */
  matchedHeading?: HeadingAnchor
  snippet: string
}

/**
 * Pluggable ranking backend. Swap TF-IDF for BM25 by implementing this
 * interface and wiring it in `search.ts`.
 */
export interface RelevanceScorer {
  readonly name: string
  score(
    queryTerms: string[],
    index: SearchIndexData,
    documentId: string
  ): { score: number; matchedTerms: string[] }
}
