---
title: Multicursor Plugin
description: Multiple cursor editing — add next/previous match and select all matches.
---

# Multicursor Plugin

**Help query:** "What does the multicursor plugin do?" / "How do I use multicursor in Volt?"

The **multicursor** plugin adds multiple-cursor style selections: add the next or previous match under the cursor, or select all matches, then edit them together through the vim edit pipeline.

| | |
| --- | --- |
| Package name | `multicursor` |
| Module | `user/multicursor.rs` |

## What it does

- Add the next matching selection
- Add the previous matching selection
- Select all matches of the current selection

## Commands

| Command | Description |
| --- | --- |
| `multicursor.add-next-match` | Adds the next match as a cursor/selection. |
| `multicursor.add-previous-match` | Adds the previous match as a cursor/selection. |
| `multicursor.select-all-matches` | Selects all matches. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `g n` | `multicursor.add-next-match` | Workspace Normal/Visual |
| `g N` | `multicursor.add-previous-match` | Workspace Normal/Visual |
| `n / p` | `next / previous match` | Multicursor scope |

## Notes

Actions flow through `editor.vim.edit` hooks with multicursor details.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
