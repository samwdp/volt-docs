---
title: Rainbow Parens Plugin
description: Tree-sitter rainbow delimiter highlighting for brackets, with a toggle command.
---

# Rainbow Parens Plugin

**Help query:** "What does the rainbow-parens plugin do?" / "How do I use rainbow-parens in Volt?"

The **rainbow-parens** plugin colors matching delimiters by nesting depth using tree-sitter. Toggle it on or off when the rainbow effect helps (or distracts).

| | |
| --- | --- |
| Package name | `rainbow-parens` |
| Module | `user/rainbow_parens.rs` |

## What it does

- Highlight nested brackets with depth-based colors
- Toggle rainbow delimiter highlighting

## Commands

| Command | Description |
| --- | --- |
| `rainbow.parens.toggle` | Toggles rainbow delimiter highlighting. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `leader rp` (default Space) | `rainbow.parens.toggle` | Workspace (Normal) |

## Notes

Enablement can also be driven by `ui.rainbow_parens_enabled` in config.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
