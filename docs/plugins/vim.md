---
title: Vim Plugin
description: Modal editing — motions, operators, visual mode, command-line, and the Space leader map that reaches other plugins.
---

# Vim Plugin

**Help query:** "What does the vim plugin do?" / "How do I use vim in Volt?"

The **vim** plugin is Volt's modal editing package: Normal/Insert/Visual motions and operators, command-line, macros/marks/search, and a large **Space** leader map that reaches workspace, git, oil, terminal, ACP, and other plugins.

| | |
| --- | --- |
| Package name | `vim` |
| Module | `user/vim.rs` |

## What it does

- Provide vim-style modal editing (motions, operators, visual mode)
- Open the vim command-line and related edit commands
- Expose the default Space leader map to other packages
- Bind window navigation and common workflow chords

## Commands

| Command | Description |
| --- | --- |
| `vim.command-line` | Opens the vim command-line. |
| `vim.enter-normal-mode` | Enters Normal mode. |
| `vim.*` | Large set of motion/operator/edit commands registered in package() — see user/vim.rs. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Escape` | `vim.enter-normal-mode` | Global |
| `Space (leader)` | `many plugin commands` | Workspace Normal |
| `Ctrl+h/j/k/l` | `workspace.window-*` | Workspace / Popup |
| `: / Alt+x` | `command-line / command picker` | Workspace |
| `Space g s` | `git.status-open` | Leader example |
| `Space o t` | `terminal.open` | Leader example |

## Notes

Change the leader by editing `LEADER_KEY` in `user/vim.rs` (default `Space`), then rebuild volt-user. Exact motion tables are large — open `user/vim.rs` or the keybindings picker (F7) for the live list.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
