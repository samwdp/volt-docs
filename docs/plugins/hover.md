---
title: Hover Plugin
description: Cursor-anchored hover overlay with ordered providers (LSP, diagnostics, calculator, …).
---

# Hover Plugin

**Help query:** "What does the hover plugin do?" / "How do I use hover in Volt?"

The **hover** plugin shows a cursor-anchored hover overlay. Providers are ordered (LSP, signature help, diagnostics, calculator, …). You can toggle/focus the overlay and move between hover entries.

| | |
| --- | --- |
| Package name | `hover` |
| Module | `user/hover.rs` |

## What it does

- Toggle and focus the hover overlay
- Cycle hover provider results
- Surface LSP / diagnostics / calculator hover content

## Commands

| Command | Description |
| --- | --- |
| `hover.toggle` | Toggles the hover overlay. |
| `hover.focus` | Focuses the hover overlay. |
| `hover.next` | Shows the next hover entry. |
| `hover.previous` | Shows the previous hover entry. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+n` | `hover.next` | Hover (Normal) |
| `Ctrl+p` | `hover.previous` | Hover (Normal) |

## Notes

A `K` toggle chord constant exists in source; confirm whether it is bound in your build's `package()` keybindings.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
