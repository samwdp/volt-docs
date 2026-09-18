---
title: Interactive Plugin
description: Interactive readonly and input buffer workflows with submit/clear.
---

# Interactive Plugin

**Help query:** "What does the interactive plugin do?" / "How do I use interactive in Volt?"

The **interactive** plugin opens interactive buffers for readonly display or user input collection, with submit and clear commands for input workflows.

| | |
| --- | --- |
| Package name | `interactive` |
| Module | `user/interactive.rs` |

## What it does

- Open readonly interactive buffers
- Open input interactive buffers
- Submit or clear interactive input

## Commands

| Command | Description |
| --- | --- |
| `interactive.open-readonly` | Opens a readonly interactive buffer. |
| `interactive.open-input` | Opens an interactive input buffer. |
| `interactive.input-submit` | Submits interactive input. |
| `interactive.input-clear` | Clears interactive input. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+Enter` | `interactive.input-submit` | Workspace (Insert) |
| `Ctrl+l` | `interactive.input-clear` | Workspace (Insert) |

## Notes

Buffer names include `*interactive*` and `*interactive-input*`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
