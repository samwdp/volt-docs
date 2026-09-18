---
title: Undotree Plugin
description: Undo tree history navigation via a searchable undo-tree picker.
---

# Undotree Plugin

**Help query:** "What does the undotree plugin do?" / "How do I use undotree in Volt?"

The **undotree** plugin opens undo history as a navigable picker so you can jump through the buffer's undo tree rather than only stepping linearly.

| | |
| --- | --- |
| Package name | `undotree` |
| Module | `user/undotree.rs` |

## What it does

- Open the undo-tree picker for the active buffer
- Navigate historical undo nodes

## Commands

| Command | Description |
| --- | --- |
| `undo-tree.open` | Opens the undo-tree picker. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Often opened from the vim leader popup menus (`Space o u` in default maps).
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
