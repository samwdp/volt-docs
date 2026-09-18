---
name: refresh-volt-docs
description: >-
  Refresh and sync volt-docs Markdown from the Volt editor source tree, rebuild
  the TF-IDF search index, and verify help queries. Use when the user asks to
  refresh docs, sync docs from volt, update plugin/theme docs after upstream
  changes, reindex search, or fix stale documentation.
---

# Refresh Volt Docs

Bring this site back in sync with the Volt editor repo and regenerate search.

## When this applies

- Volt gained/removed/renamed plugins, themes, commands, or config
- Docs feel stale vs `P:/volt` (or `../volt`)
- User asks to refresh, sync, or reindex documentation

To author a **new** topic from scratch, use [create-volt-docs](../create-volt-docs/SKILL.md). After product work in the Volt repo, prefer the parent [update-volt-docs](../../../../.agents/skills/update-volt-docs/SKILL.md) subagent.

## Steps

1. **Resolve Volt root** — prefer `P:/volt` if present, else `../volt` / `VOLT_REPO`. Abort with a clear message if missing.
2. **Diff inventory against docs:**
   - Feature packages: `user/lib.rs` `packages()` vs files in `docs/plugins/*.md` (exclude `catalog.md`)
   - Themes: `user/themes/*.toml` (skip `global.toml`) vs `docs/guides/builtin-themes.md`
   - Default theme id: `DEFAULT_THEME_ID` in `user/theme.rs`
   - High-churn guides: build/create/edit plugin pages vs current `user/*.rs` APIs
3. **Apply updates:**
   - **Missing plugin** → create page via [create-volt-docs](../create-volt-docs/SKILL.md) + catalog/sidebar
   - **Removed package** → delete or clearly deprecate the page; remove catalog/sidebar entries
   - **Command/keybinding drift** → edit the existing page from source (do not invent)
   - **Theme list drift** → update `docs/guides/builtin-themes.md` and the quick list in `docs/guides/change-theme.md`
4. **Reindex:**
   ```bash
   npm run index
   ```
5. **Verify help queries** (adjust to what you changed). Examples:
   - `what does the calculator plugin do` → `/plugins/calculator`
   - `what are the builtin themes` → `/guides/builtin-themes`
   - `how do I build the user package` → `/user-packages/build`
   - `how do I create a new user plugin` → `/user-packages/create-plugin`
   Run via `npx tsx` importing `docs/.vitepress/search/search.ts` against `docs/public/search-index.json`, or equivalent.
6. **Build** when pages or theme components changed:
   ```bash
   npm run build
   ```

**Done when:** inventory matches Volt for the scoped refresh, index is regenerated, sample queries rank the expected pages, and `npm run build` succeeds if UI/markdown structure changed.

## Scope control

- Default: refresh **what drifted** (new/removed packages + files the user named).
- Full refresh: all plugin pages + builtin themes + user-package workflow pages — only when the user asks for a full sync.
- Do not rewrite unrelated prose for style.

## Search / Pages gotchas

- Result navigation must keep VitePress `base` (`withBase` in search UI) — do not “fix” ranking by breaking URLs.
- Generated index is `docs/public/search-index.json` (gitignored); always regenerate via `npm run index` / `predev` / `prebuild`.
- Help entry URL shape: `/volt-docs/search?q=<urlencoded question>`.
