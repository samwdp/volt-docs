---
title: Show Paren Plugin
description: Highlights the matching delimiter, including HTML/XML tags in html/xml/jsx/tsx buffers.
---

# Show Paren Plugin

**Help query:** "What does the show-paren plugin do?" / "How do I use show-paren in Volt?"

The **show-paren** plugin highlights the matching delimiter under/near the cursor. In HTML/XML/JSX/TSX buffers it also matches tags.

| | |
| --- | --- |
| Package name | `show-paren` |
| Module | `user/show_paren.rs` |

## What it does

- Highlight the matching paren/bracket/delimiter
- Match HTML/XML tags in relevant buffers
- Toggle show-paren highlighting

## Commands

| Command | Description |
| --- | --- |
| `show-paren.toggle` | Toggles matching delimiter highlighting. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `leader sp` (default Space) | `show-paren.toggle` | Workspace (Normal) |

## Notes

Enablement can also be driven by `ui.show_paren_enabled` in config.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
