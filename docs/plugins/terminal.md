---
title: Terminal Plugin
description: Builtin terminal buffers and popup terminals with configurable shell.
---

# Terminal Plugin

**Help query:** "What does the terminal plugin do?" / "How do I use terminal in Volt?"

The **terminal** plugin opens builtin terminal buffers in the workspace or as a popup. The shell program and args come from `user/config/ui.yaml` (with platform defaults if unset).

| | |
| --- | --- |
| Package name | `terminal` |
| Module | `user/terminal.rs` |

## What it does

- Open a terminal buffer in the workspace
- Open a terminal in a popup window
- Use a configurable shell (pwsh, nu, $SHELL, and similar)

## Commands

| Command | Description |
| --- | --- |
| `terminal.open` | Opens the builtin terminal buffer. |
| `terminal.popup` | Opens a terminal in a popup window. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+`` | `terminal.open` | Global |

## Notes

Configure `terminal.program` / `terminal.args` under `user/config/ui.yaml`. See Change the terminal shell.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
