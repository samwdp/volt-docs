---
title: Workspace Dock Plugin
description: Vertical workspace dock listing open workspaces with j/k navigation and Ctrl+d delete.
---

# Workspace Dock Plugin

**Help query:** "What does the workspace-dock plugin do?" / "How do I use workspace-dock in Volt?" / "How do I delete from the workspace dock?"

The **workspace-dock** plugin shows a vertical dock listing open workspaces. Toggle it, move with `j`/`k`, and delete the selected workspace with `Ctrl+d` (runs `workspace.delete`).

| | |
| --- | --- |
| Package name | `workspace-dock` |
| Module | `user/workspace_dock.rs` |

## What it does

- Toggle the workspace dock (when it is not permanently docked)
- Move selection to the next/previous workspace entry
- Delete the selected workspace from the dock

## Commands

| Command | Description |
| --- | --- |
| `workspace.dock.toggle` | Shows or hides the workspace dock when it is not permanently docked. |
| `workspace.dock.previous` | Moves to the previous workspace in the dock list. |
| `workspace.dock.next` | Moves to the next workspace in the dock list. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `j` | `workspace.dock.next` | WorkspaceDock |
| `k` | `workspace.dock.previous` | WorkspaceDock |
| `Ctrl+d` | `workspace.delete` | WorkspaceDock |

## Notes

Dock visibility preferences live under `ui.workspace_dock` in config (`WorkspaceDockConfig`: side and whether permanently docked). Pair with `workspace.switch` for the open-workspace / project picker (`Ctrl+d` delete there too).

## Related pages

- [Workspace Plugin](/plugins/workspace)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
