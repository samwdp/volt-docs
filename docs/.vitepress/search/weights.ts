import type { FieldWeights } from './types'

/**
 * Single configuration object for field weighting.
 * Adjust these values to change how titles, headings, and body text rank.
 */
export const FIELD_WEIGHTS: FieldWeights = {
  title: 5,
  headings: 4,
  description: 3,
  body: 1,
  code: 0.25,
}
