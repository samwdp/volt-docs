<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { search as runSearch } from '../../search/search'
import type { SearchIndexData, SearchResult } from '../../search/types'

/**
 * Show raw TF-IDF scores in development builds.
 * Force `false` here if you want scores hidden even during local `npm run dev`.
 */
const SHOW_SEARCH_SCORES = import.meta.env.DEV

const router = useRouter()
const query = ref('')
const open = ref(false)
const loading = ref(true)
const loadError = ref<string | null>(null)
const index = ref<SearchIndexData | null>(null)
const activeIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

const results = computed<SearchResult[]>(() => {
  if (!index.value || !query.value.trim()) return []
  return runSearch(query.value, index.value, { limit: 8 })
})

watch(results, () => {
  activeIndex.value = 0
})

async function loadIndex(): Promise<void> {
  loading.value = true
  loadError.value = null
  try {
    const response = await fetch(withBase('/search-index.json'))
    if (!response.ok) {
      throw new Error(`Failed to load search index (${response.status})`)
    }
    index.value = (await response.json()) as SearchIndexData
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Search index unavailable'
  } finally {
    loading.value = false
  }
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
  open.value = false
  query.value = ''
  void router.go(resultUrl(result))
}

function onKeydown(event: KeyboardEvent): void {
  const isShortcut =
    (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)

  if (isShortcut) {
    event.preventDefault()
    open.value = true
    requestAnimationFrame(() => inputEl.value?.focus())
    return
  }

  if (!open.value) return

  if (event.key === 'Escape') {
    open.value = false
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, Math.max(results.value.length - 1, 0))
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (event.key === 'Enter' && results.value[activeIndex.value]) {
    event.preventDefault()
    navigateTo(results.value[activeIndex.value])
  }
}

function openSearch(): void {
  open.value = true
  requestAnimationFrame(() => inputEl.value?.focus())
}

onMounted(() => {
  void loadIndex()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="doc-search">
    <button class="doc-search__trigger" type="button" aria-label="Search documentation" @click="openSearch">
      <span class="doc-search__trigger-icon" aria-hidden="true">⌕</span>
      <span class="doc-search__trigger-label">Search docs</span>
      <kbd class="doc-search__kbd">Ctrl K</kbd>
    </button>

    <div v-if="open" class="doc-search__overlay" @click.self="open = false">
      <div class="doc-search__panel" role="dialog" aria-modal="true" aria-label="Documentation search">
        <div class="doc-search__input-row">
          <span class="doc-search__input-icon" aria-hidden="true">⌕</span>
          <input
            ref="inputEl"
            v-model="query"
            class="doc-search__input"
            type="search"
            placeholder="How do I create a new user plugin?"
            autocomplete="off"
            spellcheck="false"
          />
          <button class="doc-search__close" type="button" @click="open = false">Esc</button>
        </div>

        <div class="doc-search__body">
          <p v-if="loading" class="doc-search__status">Loading search index…</p>
          <p v-else-if="loadError" class="doc-search__status doc-search__status--error">{{ loadError }}</p>
          <p v-else-if="!query.trim()" class="doc-search__status">
            Ask a natural-language question. Results are ranked with TF-IDF (no AI).
          </p>
          <p v-else-if="results.length === 0" class="doc-search__status">No matching pages.</p>

          <template v-else>
            <p class="doc-search__heading">Search results</p>
            <ul class="doc-search__results" role="listbox">
              <li
                v-for="(result, i) in results"
                :key="result.document.id + (result.matchedHeading?.slug ?? '')"
                class="doc-search__result"
                :class="{ 'is-active': i === activeIndex }"
                role="option"
                :aria-selected="i === activeIndex"
                @mouseenter="activeIndex = i"
                @click="navigateTo(result)"
              >
                <div class="doc-search__result-title">
                  {{ result.document.title }}
                  <span v-if="SHOW_SEARCH_SCORES" class="doc-search__score">
                    {{ result.score.toFixed(3) }}
                  </span>
                </div>
                <div v-if="result.matchedHeading" class="doc-search__result-section">
                  {{ result.matchedHeading.text }}
                </div>
                <div class="doc-search__result-snippet">{{ result.snippet }}</div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc-search {
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
}

.doc-search__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 36px;
  padding: 0 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.doc-search__trigger:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.doc-search__trigger-icon {
  font-size: 1rem;
  line-height: 1;
}

.doc-search__trigger-label {
  font-size: 0.875rem;
}

.doc-search__kbd {
  margin-left: 0.25rem;
  padding: 0.1rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}

.doc-search__overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12vh 1rem 1rem;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.doc-search__panel {
  width: min(640px, 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.doc-search__input-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-search__input-icon {
  color: var(--vp-c-text-3);
  font-size: 1.1rem;
}

.doc-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.doc-search__close {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  padding: 0.2rem 0.45rem;
  cursor: pointer;
}

.doc-search__body {
  max-height: min(60vh, 420px);
  overflow: auto;
  padding: 0.75rem;
}

.doc-search__status {
  margin: 0.5rem 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.doc-search__status--error {
  color: var(--vp-c-danger-1);
}

.doc-search__heading {
  margin: 0.25rem 0.35rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.doc-search__results {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.doc-search__result {
  padding: 0.7rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
}

.doc-search__result.is-active,
.doc-search__result:hover {
  background: var(--vp-c-bg-soft);
}

.doc-search__result-title {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.doc-search__score {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.doc-search__result-section {
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
}

.doc-search__result-snippet {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.45;
}

@media (max-width: 768px) {
  .doc-search__trigger-label,
  .doc-search__kbd {
    display: none;
  }
}
</style>
