# Volt Docs

Product site and documentation for the [Volt](https://github.com/samwdp/volt) native text editor.

Built with [VitePress](https://vitepress.dev/). The home page is the editor frontend (architecture, crates, commands); Markdown pages under `docs/` are the help corpus. Search is a custom **client-side TF-IDF** ranker — no AI, no embeddings, no backend. The site deploys as static files to GitHub Pages and is intended to replace the static `docs/` tree in the Volt repo as a submodule.

## In-editor help

From Volt, a `help` command can open the search results page with the user's question:

```text
https://samwdp.github.io/volt-docs/search?q=<urlencoded question>
```

Locally:

```text
http://localhost:5173/volt-docs/search?q=how+do+I+build+the+user+package
```

Docs are written so natural-language plugin questions rank well, for example:

- How do I build the user package?
- How do I create a new user plugin?
- How do I edit the vim plugin?
- I scaffolded a new plugin — what do I do next?

## Agent skills (this repo)

Project skills live under `.cursor/skills/`:

| Skill | Use when |
| --- | --- |
| `create-volt-docs` | Add a new help-oriented docs page (plugin, guide, workflow) |
| `refresh-volt-docs` | Sync existing docs from the Volt source tree and reindex search |

Attach or name the skill in chat, or rely on description-based discovery.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

This generates the search index, then starts the VitePress dev server.

## Build

```bash
npm run build
```

Flow:

```
npm run build
    → generate search index (prebuild)
    → vitepress build
    → static site in docs/.vitepress/dist
```

You do **not** commit or hand-edit the search index.

## Add documentation

1. Create or edit a Markdown file under `docs/`.
2. Add a sidebar / nav link in `docs/.vitepress/config.ts` if it should appear in navigation.
3. Commit and push — GitHub Actions rebuilds and deploys.

Authoritative plugin material is mirrored from the Volt repo (`P:/volt/docs/user-packages.md`, `user/README.md`, config/language guides). Prefer concrete help-oriented pages over dumping everything into one file.

## How search works

```
Markdown files
    ↓
build-time indexing (docs/.vitepress/search/build-index.ts)
    ↓
docs/public/search-index.json
    ↓
browser loads index
    ↓
tokenize query
    ↓
TF-IDF relevance scoring
    ↓
ranked documentation pages
```

Implementation:

```
docs/.vitepress/search/
├── tokenizer.ts
├── index.ts
├── tfidf.ts
├── search.ts
├── types.ts
├── weights.ts
└── build-index.ts
```

### Modify search weighting

Edit `docs/.vitepress/search/weights.ts`:

```ts
export const FIELD_WEIGHTS = {
  title: 5,
  headings: 4,
  description: 3,
  body: 1,
  code: 0.25,
}
```

Dev builds show raw scores in the UI; production hides them (`SHOW_SEARCH_SCORES` in the search Vue components).

## GitHub Pages

Workflow: `.github/workflows/deploy.yml`

### Repository settings

1. **Settings → Pages**
2. **Build and deployment → Source → GitHub Actions**

`base` is `/volt-docs/` for `https://samwdp.github.io/volt-docs/`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Index + local VitePress server |
| `npm run build` | Index + static production build |
| `npm run preview` | Preview the production build |
| `npm run index` | Regenerate the search index only |
