---
title: Buffer Plugin
description: Buffer save, close, close-picker, and line-wrap commands for file-backed buffers.
---

# Buffer Plugin

**Help query:** "What does the buffer plugin do?" / "How do I use buffer in Volt?"

The **buffer** plugin is a thin command surface for everyday file-buffer operations: save, close, open the close picker, and toggle line wrapping. Commands mostly emit host hooks rather than implementing IO themselves.

| | |
| --- | --- |
| Package name | `buffer` |
| Module | `user/buffer.rs` |

## What it does

- Saves the active file-backed buffer to disk
- Closes the active buffer
- Opens the buffer close picker
- Toggles automatic line wrapping on the active buffer

## Commands

| Command | Description |
| --- | --- |
| `buffer.save` | Saves the active file-backed buffer to disk. |
| `buffer.close` | Closes the active buffer. |
| `buffer.close-picker` | Opens the buffer close picker. |
| `buffer.toggle_line_wrap` | Toggles automatic line wrapping for the active buffer. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Typical leader bindings (from the vim package) also map workspace save / buffer close onto related flows. Prefer the command palette if you are unsure of the chord.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
