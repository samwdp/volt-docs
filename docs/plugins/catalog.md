---
title: Builtin Plugin Catalog
description: Index of every Volt builtin user plugin with links to full documentation pages.
---

# Builtin Plugin Catalog

**Help query:** "What plugins ship with Volt?" / "Where is the calculator plugin docs?"

Each builtin feature package has its **own documentation page** describing what it does, commands, and keybindings. Language packages (`lang-*`) are covered under [Add a language](/languages/add-language).

## Feature plugins

| Package | What it is | Docs |
| --- | --- | --- |
| `acp` | Agent Client Protocol clients, sessions, dock | [ACP Plugin](/plugins/acp) |
| `autocomplete` | Provider-backed insert completions | [Autocomplete Plugin](/plugins/autocomplete) |
| `browser` | Embedded browser buffers, tabs, bookmarks, dock | [Browser Plugin](/plugins/browser) |
| `buffer` | Save, close, wrap file buffers | [Buffer Plugin](/plugins/buffer) |
| `calculator` | Expression evaluator Input/Output buffer | [Calculator Plugin](/plugins/calculator) |
| `compile` | Workspace build, recompile, reload user lib | [Compile Plugin](/plugins/compile) |
| `dap` | Debug Adapter Protocol sessions | [DAP Plugin](/plugins/dap) |
| `db` | Database connections, SQL, schema, dashboard | [DB Plugin](/plugins/db) |
| `dotnet` | NuGet list/search/install section buffers | [Dotnet Plugin](/plugins/dotnet) |
| `git` | Magit-style status/commit/diff/log buffers | [Git Plugin](/plugins/git) |
| `help` | Docs question prompt → search in browser split | [Help Plugin](/plugins/help) |
| `hover` | Cursor hover overlay + providers | [Hover Plugin](/plugins/hover) |
| `image` | Native image zoom / SVG mode | [Image Plugin](/plugins/image) |
| `interactive` | Interactive readonly/input buffers | [Interactive Plugin](/plugins/interactive) |
| `issues` | Workspace Issue Store board & capture | [Issues Plugin](/plugins/issues) |
| `lsp` | Language servers, navigation, diagnostics | [LSP Plugin](/plugins/lsp) |
| `multicursor` | Multi-cursor match selections | [Multicursor Plugin](/plugins/multicursor) |
| `oil` | oil.nvim-style directory buffers | [Oil Plugin](/plugins/oil) |
| `pane` | Splits and pane layout | [Pane Plugin](/plugins/pane) |
| `pdf` | Native PDF navigation/editing | [PDF Plugin](/plugins/pdf) |
| `picker` | Fuzzy pickers + quickfix | [Picker Plugin](/plugins/picker) |
| `rainbow-parens` | Depth-colored delimiter highlights | [Rainbow Parens Plugin](/plugins/rainbow-parens) |
| `show-paren` | Matching delimiter / tag highlight | [Show Paren Plugin](/plugins/show-paren) |
| `terminal` | Builtin terminal buffers | [Terminal Plugin](/plugins/terminal) |
| `treesitter` | Grammar install / recompile | [Tree-sitter Plugin](/plugins/treesitter) |
| `undotree` | Undo history picker | [Undotree Plugin](/plugins/undotree) |
| `vim` | Modal editing + Space leader map | [Vim Plugin](/plugins/vim) |
| `workspace` | Workspaces, search, marks, format | [Workspace Plugin](/plugins/workspace) |
| `workspace-dock` | Vertical open-workspace dock | [Workspace Dock Plugin](/plugins/workspace-dock) |

## Supporting modules (not packages)

These shape the editor but are not `PluginPackage` entries in `packages()`:

| Module | Role |
| --- | --- |
| `user/config.rs` | YAML load path |
| `user/theme.rs` | Theme registry / default id |
| `user/statusline.rs` | Statusline rendering |
| `user/keymap.rs` | Extra keymap wiring |
| `user/ligatures.rs` | Ligatures (YAML-backed) |

## Related pages

- [Edit a plugin](/user-packages/edit-plugin)
- [Create a plugin](/user-packages/create-plugin)
- [Configuration](/configuration)
