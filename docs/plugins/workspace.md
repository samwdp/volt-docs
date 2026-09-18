---
title: Workspace Plugin
description: Workspace creation, switching, deletion, cloning, file listing, search, marks, and formatting.
---

# Workspace Plugin

**Help query:** "What does the workspace plugin do?" / "How do I use workspace in Volt?"

The **workspace** plugin manages Volt workspaces: create/switch/delete/clone, open dashboards, list files, search the project, save, format, window navigation, and numbered marks.

| | |
| --- | --- |
| Package name | `workspace` |
| Module | `user/workspace.rs` |

## What it does

- Create, switch, delete, and clone workspaces
- List files and search the workspace
- Save buffers, format, and move between windows
- Set and jump to workspace marks

## Commands

| Command | Description |
| --- | --- |
| `workspace.new` | Creates a new workspace. |
| `workspace.switch` | Switches workspace. |
| `workspace.delete` | Deletes a workspace. |
| `workspace.dashboard` | Opens the workspace dashboard. |
| `workspace.clone` | Clones a workspace / project. |
| `workspace.list-files` | Lists workspace files. |
| `workspace.search` | Searches the workspace. |
| `workspace.save` | Saves workspace buffers. |
| `workspace.format` | Formats the active buffer. |
| `workspace.next` | Goes to the next workspace. |
| `workspace.previous` | Goes to the previous workspace. |
| `workspace.marks` | Shows workspace marks. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Many chords are provided by the vim leader map (`Space w`, `Space p`, window `Ctrl+h/j/k/l`, and similar). Project discovery roots live in `user/config/workspace.yaml`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
