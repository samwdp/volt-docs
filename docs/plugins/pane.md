---
title: Pane Plugin
description: Pane layout — split horizontal/vertical, close splits, and switch split focus.
---

# Pane Plugin

**Help query:** "What does the pane plugin do?" / "How do I use pane in Volt?"

The **pane** plugin exposes split layout commands. It emits host `ui.pane.*` hooks for horizontal/vertical splits, closing the focused split, and switching splits. Golden-ratio sizing can be configured under `ui.pane` in YAML.

| | |
| --- | --- |
| Package name | `pane` |
| Module | `user/pane.rs` |

## What it does

- Split the active workspace horizontally or vertically
- Close the focused split
- Switch between splits

## Commands

| Command | Description |
| --- | --- |
| `pane.split-horizontal` | Splits the active workspace horizontally. |
| `pane.split-vertical` | Splits the active workspace vertically. |
| `pane.close` | Closes the currently focused split. |
| `pane.switch-split` | Switches focus between splits. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Vim leader often binds `Space d w` to `pane.close`. Pane layout preferences live in `user/config/ui.yaml`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
