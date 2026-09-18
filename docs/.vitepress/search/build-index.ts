/**
 * Build-time Markdown → search index generator.
 *
 * Invoked automatically via `predev` / `prebuild` npm scripts so documentation
 * authors never maintain the index by hand.
 */

import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSearchIndex } from './index'
import type { HeadingAnchor, SearchDocument } from './types'
import { FIELD_WEIGHTS } from './weights'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = join(__dirname, '../..')
const OUTPUT_PATH = join(DOCS_ROOT, 'public', 'search-index.json')

interface Frontmatter {
  title?: string
  description?: string
  [key: string]: unknown
}

function walkMarkdownFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      if (entry === 'public' || entry === 'node_modules') continue
      walkMarkdownFiles(fullPath, files)
    } else if (entry.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

function parseFrontmatter(source: string): { frontmatter: Frontmatter; body: string } {
  if (!source.startsWith('---')) {
    return { frontmatter: {}, body: source }
  }

  const end = source.indexOf('\n---', 3)
  if (end === -1) {
    return { frontmatter: {}, body: source }
  }

  const raw = source.slice(3, end).trim()
  const body = source.slice(end + 4).replace(/^\r?\n/, '')
  const frontmatter: Frontmatter = {}

  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) continue
    const key = match[1]
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    frontmatter[key] = value
  }

  return { frontmatter, body }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

function extractTitle(body: string, frontmatter: Frontmatter, filePath: string): string {
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) {
    return frontmatter.title.trim()
  }

  const heading = body.match(/^#\s+(.+)$/m)
  if (heading) return heading[1].trim()

  const base = filePath.split(sep).pop()?.replace(/\.md$/, '') ?? 'page'
  return base
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function extractHeadings(body: string): HeadingAnchor[] {
  const headings: HeadingAnchor[] = []
  const headingRe = /^(#{2,6})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = headingRe.exec(body)) !== null) {
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
    if (!text) continue
    headings.push({ text, slug: slugify(text) })
  }
  return headings
}

/**
 * Split Markdown into searchable body text vs code blocks.
 * Code is indexed separately at a much lower weight.
 */
function splitBodyAndCode(markdown: string): { body: string; code: string } {
  const codeChunks: string[] = []
  const withoutFenced = markdown.replace(/```[\s\S]*?```/g, (block) => {
    const lines = block.split(/\r?\n/).slice(1, -1)
    codeChunks.push(lines.join('\n'))
    return '\n'
  })

  // Inline code is kept lightly in body but also collected.
  const withoutInline = withoutFenced.replace(/`([^`]+)`/g, (_full, code: string) => {
    codeChunks.push(code)
    return ' '
  })

  const body = withoutInline
    // Drop remaining Markdown chrome that adds noise to search.
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~>|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return { body, code: codeChunks.join(' ') }
}

function filePathToUrl(filePath: string): string {
  let rel = relative(DOCS_ROOT, filePath).split(sep).join('/')
  if (rel.endsWith('/index.md')) {
    rel = rel.slice(0, -'/index.md'.length) || ''
    return `/${rel}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
  }
  if (rel === 'index.md') return '/'
  return `/${rel.replace(/\.md$/, '')}`
}

function toDocument(filePath: string): SearchDocument {
  const source = readFileSync(filePath, 'utf8')
  const { frontmatter, body: markdown } = parseFrontmatter(source)
  const title = extractTitle(markdown, frontmatter, filePath)
  const headingAnchors = extractHeadings(markdown)
  const { body, code } = splitBodyAndCode(markdown)
  const url = filePathToUrl(filePath)
  const description =
    typeof frontmatter.description === 'string' ? frontmatter.description.trim() : undefined

  return {
    id: url,
    url,
    title,
    description,
    headings: headingAnchors.map((h) => h.text),
    body,
    code,
    headingAnchors,
  }
}

function main(): void {
  const files = walkMarkdownFiles(DOCS_ROOT)
  const documents = files.map(toDocument)
  const index = buildSearchIndex(documents, FIELD_WEIGHTS)

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, JSON.stringify(index), 'utf8')

  console.log(
    `[search] Indexed ${documents.length} page(s) → ${relative(process.cwd(), OUTPUT_PATH)}`
  )
}

main()
