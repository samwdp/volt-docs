---
name: create-volt-docs
description: >-
  Create help-oriented Markdown documentation for the volt-docs VitePress site
  (plugins, guides, user-packages). Use when the user asks to document a Volt
  plugin, feature, theme, command, or help topic; add a new docs page; or write
  docs so in-editor help search can find them.
---

# Create Volt Docs

Author new pages under `docs/` for the Volt documentation site. Source of truth is the **Volt editor repo** (typically `P:/volt` or a sibling `../volt`), not guesswork.

## When this applies

- Document a plugin, theme list, config surface, or workflow
- Fill a gap for a help query (e.g. "what does X do?", "how do I Y?")
- Add pages the search/`help` command should land on

For syncing existing pages after Volt changes, use [refresh-volt-docs](../refresh-volt-docs/SKILL.md).

## Steps

1. **Locate authority** in the Volt repo:
   - Plugins: `user/<name>.rs` + `user/lib.rs` `packages()`
   - Themes: `user/themes/*.toml`, default in `user/theme.rs`
   - Config: `user/config.yaml`, `user/config/*.yaml`, `user/README.md`
   - Broader guides: `docs/user-packages.md`, `docs/config.html`, `docs/language.html`, ADRs under `docs/adr/`
2. **Extract only what source supports** — commands, chords, buffer names, YAML keys. Do not invent APIs.
3. **Choose path** (see layout below) and write the page using [page-templates.md](page-templates.md).
4. **Wire navigation** in `docs/.vitepress/config.ts` (sidebar and/or nav). Update `docs/plugins/catalog.md` when adding a plugin page.
5. **Reindex and verify**:
   ```bash
   npm run index
   ```
   Smoke the intended help queries with the search module (top hit should be the new page). Fix ranking by strengthening title / description / `**Help query:**` lines — not by hacking the scorer.
6. **Build check** when the change is non-trivial:
   ```bash
   npm run build
   ```
   Escape raw `<...>` in prose (`start-<adapter>` → `` `start-<adapter>` ``) so VitePress/Vue does not treat it as HTML.

**Done when:** the page exists, is linked from sidebar/catalog as appropriate, `npm run index` succeeds, and the target help query ranks the new page first.

## Layout

| Kind | Path | Catalog / sidebar |
| --- | --- | --- |
| Feature plugin | `docs/plugins/<slug>.md` | `docs/plugins/catalog.md` + Builtin plugins sidebar |
| How-to / list guide | `docs/guides/<slug>.md` | How-to guides sidebar |
| User-package workflow | `docs/user-packages/<slug>.md` | User packages sidebar |
| Language authoring | `docs/languages/<slug>.md` | Languages & plugins sidebar |

Slug = kebab-case package or topic id (`rainbow-parens`, `builtin-themes`).

## Authoring rules

- Frontmatter: `title`, `description` (search-weighted; put the help intent in the description).
- Near the top: `**Help query:** "…" / "…" / "…"` with natural-language questions users will type after `help`.
- Lead with **what it does**, then commands / keybindings / config.
- Prefer tables for commands and chords.
- Cross-link related pages; keep Markdown as the source of truth.
- In-editor help opens `/volt-docs/search?q=…` — write for that entry point.

## Anti-patterns

- Catalog-only stubs ("plugin exists at `user/x.rs`") without behavior
- Copying outdated snippets from old HTML docs when `user/*.rs` disagrees (prefer source)
- Leaving new pages out of the sidebar/catalog
- Skipping search verification for the motivating query
