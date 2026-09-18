---
title: Autocomplete Plugin
description: Provider-backed autocomplete with async suggestions from LSP, buffer tokens, calculator, and more.
---

# Autocomplete Plugin

**Help query:** "What does the autocomplete plugin do?" / "How do I use autocomplete in Volt?"

The **autocomplete** plugin drives insert-mode completion. Providers (LSP, calculator, buffer words, DB query buffers, …) compete in an or-group; higher-priority providers suppress lower ones when they return results.

| | |
| --- | --- |
| Package name | `autocomplete` |
| Module | `user/autocomplete.rs` |

## What it does

- Trigger a completion popup
- Navigate and accept/cancel candidates
- Order providers so LSP wins when available

## Commands

| Command | Description |
| --- | --- |
| `autocomplete.trigger` | Triggers autocomplete at the cursor. |
| `autocomplete.next` | Selects the next completion candidate. |
| `autocomplete.previous` | Selects the previous completion candidate. |
| `autocomplete.accept` | Accepts the selected completion. |
| `autocomplete.cancel` | Cancels the autocomplete popup. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+Space` | `autocomplete.trigger` | Global (Insert) |
| `Ctrl+n` | `autocomplete.next` | Autocomplete |
| `Ctrl+p` | `autocomplete.previous` | Autocomplete |
| `Ctrl+y` | `autocomplete.accept` | Autocomplete |

## Notes

To add a provider for your own plugin, see Autocomplete providers under User packages.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
