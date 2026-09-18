<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { search as runSearch } from '../../search/search'
import type { SearchIndexData, SearchResult } from '../../search/types'

const SHOW_SEARCH_SCORES = import.meta.env.DEV

const router = useRouter()
const { page } = useData()

const query = ref('')
const loading = ref(true)
const loadError = ref<string | null>(null)
const index = ref<SearchIndexData | null>(null)

const results = computed<SearchResult[]>(() => {
  if (!index.value || !query.value.trim()) return []
  return runSearch(query.value, index.value, { limit: 12 })
})

async function loadIndex(): Promise<void> {
  loading.value = true
  loadError.value = null
  try {
    const response = await fetch(withBase('/search-index.json'))
    if (!response.ok) throw new Error(`Failed to load search index (${response.status})`)
    index.value = (await response.json()) as SearchIndexData
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Search index unavailable'
  } finally {
    loading.value = false
  }
}

function readQueryFromUrl(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') ?? params.get('query') ?? ''
  if (q) query.value = q
}

function syncQueryToUrl(value: string): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (value.trim()) url.searchParams.set('q', value.trim())
  else url.searchParams.delete('q')
  url.searchParams.delete('query')
  window.history.replaceState({}, '', url.toString())
}

function resultUrl(result: SearchResult): string {
  // Index URLs are site-root paths (e.g. /plugins/calculator). Prefix the
  // VitePress `base` so navigation works on GitHub Pages and local /volt-docs/.
  const path = withBase(result.document.url)
  if (result.matchedHeading?.slug) {
    return `${path}#${result.matchedHeading.slug}`
  }
  return path
}

function navigateTo(result: SearchResult): void {
  void router.go(resultUrl(result))
}

watch(query, (value) => {
  syncQueryToUrl(value)
})

onMounted(() => {
  readQueryFromUrl()
  void loadIndex()
})

// Re-read when VitePress navigates back to this page.
watch(
  () => page.value.relativePath,
  () => {
    readQueryFromUrl()
  }
)
</script>

<template>
  <div class="help-search">
    <label class="help-search__label" for="help-search-input">Search query</label>
    <input
      id="help-search-input"
      v-model="query"
      class="help-search__input"
      type="search"
      placeholder="How do I create a new user plugin?"
      autocomplete="off"
      spellcheck="false"
    />

    <p v-if="loading" class="help-search__status">Loading search index…</p>
    <p v-else-if="loadError" class="help-search__status help-search__status--error">{{ loadError }}</p>
    <p v-else-if="!query.trim()" class="help-search__status">
      Examples: <code>build user package</code>, <code>create new plugin</code>,
      <code>edit vim plugin</code>, <code>scaffolded plugin what next</code>
    </p>
    <p v-else-if="results.length === 0" class="help-search__status">No matching pages.</p>

    <template v-else>
      <p class="help-search__heading">Search results</p>
      <ul class="help-search__results">
        <li
          v-for="result in results"
          :key="result.document.id + (result.matchedHeading?.slug ?? '')"
          class="help-search__result"
          @click="navigateTo(result)"
        >
          <div class="help-search__title">
            <span>{{ result.document.title }}</span>
            <span v-if="SHOW_SEARCH_SCORES" class="help-search__score">{{ result.score.toFixed(3) }}</span>
          </div>
          <div v-if="result.matchedHeading" class="help-search__section">
            {{ result.matchedHeading.text }}
          </div>
          <div class="help-search__snippet">{{ result.snippet }}</div>
          <div class="help-search__url">{{ resultUrl(result) }}</div>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.help-search {
  margin: 1rem 0 2rem;
}

.help-search__label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.help-search__input {
  width: 100%;
  height: 2.75rem;
  padding: 0 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.help-search__input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.help-search__status {
  margin-top: 1rem;
  color: var(--vp-c-text-2);
}

.help-search__status--error {
  color: var(--vp-c-danger-1);
}

.help-search__heading {
  margin: 1.25rem 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.help-search__results {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.help-search__result {
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.help-search__result:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.help-search__title {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.help-search__score {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.help-search__section {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

.help-search__snippet {
  margin-top: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.help-search__url {
  margin-top: 0.35rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
</style>
