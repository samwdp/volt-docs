---
title: Tree-sitter Plugin
description: Tree-sitter grammar installation picker and recompile-installed grammars command.
---

# Tree-sitter Plugin

**Help query:** "What does the treesitter plugin do?" / "How do I use treesitter in Volt?"

The **treesitter** plugin manages grammar installation. Use it to install languages via a picker and recompile already-installed grammars.

| | |
| --- | --- |
| Package name | `treesitter` |
| Module | `user/treesitter.rs` |

## What it does

- Open a picker of tree-sitter languages to install
- Recompile installed grammars

## Commands

| Command | Description |
| --- | --- |
| `treesitter.install` | Opens the tree-sitter language install picker. |
| `treesitter.recompile-installed` | Recompiles installed tree-sitter grammars. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Per-language highlight packages live under `user/lang/`. See Add a language.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
