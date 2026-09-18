---
title: Workspace Dock Plugin
description: Vertical workspace dock listing open workspaces with next/previous navigation.
---

# Workspace Dock Plugin

**Help query:** "What does the workspace-dock plugin do?" / "How do I use workspace-dock in Volt?"

The **workspace-dock** plugin shows a vertical dock listing open workspaces. Toggle it, move with j/k, and delete the selected workspace from the dock.

| | |
| --- | --- |
| Package name | `workspace-dock` |
| Module | `user/workspace_dock.rs` |

## What it does

- Toggle the workspace dock
- Move selection to the next/previous workspace entry
- Delete the selected workspace from the dock

## Commands

| Command | Description |
| --- | --- |
| `workspace.dock.toggle` | Toggles the workspace dock. |
| `workspace.dock.previous` | Selects the previous dock entry. |
| `workspace.dock.next` | Selects the next dock entry. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `j / k` | `workspace.dock.next / previous` | WorkspaceDock |
| `Ctrl+d` | `workspace.delete` | WorkspaceDock |

## Notes

Dock visibility preferences can live under `ui.workspace_dock` in config.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
