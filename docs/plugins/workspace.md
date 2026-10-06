---
title: Workspace Plugin
description: Workspace creation (+ Create New), switching, deletion, cloning, file listing, search, marks, windows, and formatting.
---

# Workspace Plugin

**Help query:** "What does the workspace plugin do?" / "How do I switch workspaces?" / "How do I create a new project workspace?" / "How do I delete a workspace from the picker?"

The **workspace** plugin manages Volt workspaces: create/switch/delete/clone, open the worktree dashboard, list Git-visible files, search the project, save, format, window focus, and numbered marks.

| | |
| --- | --- |
| Package name | `workspace` |
| Module | `user/workspace.rs` |

## What it does

- Create or focus a workspace from the project picker, including `+ Create New`
- Switch among open workspaces and discovered projects (`workspace.switch`)
- Delete a workspace (dock, delete picker, or `Ctrl+d` in the switch picker)
- Clone remotes into an oil directory; show checked-out worktrees
- List files visible to Git; search text across the active workspace
- Save buffers, format (preferring LSP when available), and move window focus
- Mark / unmark workspaces and jump to numbered mark slots

## Commands

| Command | Description |
| --- | --- |
| `workspace.new` | Creates or focuses a workspace from the project picker. |
| `workspace.switch` | Switches to an open workspace or opens a discovered project. |
| `workspace.delete` | Deletes the selected or focused workspace, or opens the delete picker. |
| `workspace.dashboard` | Shows checked-out git worktrees for the active workspace. |
| `workspace.clone` | Clones a remote repository (bare or full) into a chosen oil directory. |
| `workspace.list-files` | Lists the current workspace files that are visible to Git. |
| `workspace.search` | Searches text across files in the active workspace. |
| `workspace.save` | Saves all modified file buffers in the active workspace. |
| `workspace.next` | Switches to the next open Project Workspace in open order. |
| `workspace.previous` | Switches to the previous open Project Workspace in open order. |
| `workspace.mark` | Adds the active Project Workspace root to the Mark List. |
| `workspace.unmark` | Removes the active Project Workspace root from the Mark List. |
| `workspace.marks` | Opens the app-wide Mark List as an editable buffer. |
| `workspace.marked-1` … `workspace.marked-4` | Jumps to Mark List slots 1–4. |
| `workspace.worktree-remove` | Force-removes the selected Worktree from disk after closing matching Project Workspaces. |
| `workspace.format` | Formats the active file buffer, preferring LSP formatting when available. |
| `workspace.window-left` / `down` / `up` / `right` | Moves focus to the neighboring window (wraps). |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

Picker extras on `workspace.switch`: `Ctrl+d` runs `workspace.delete`. See also [Workspace Dock](/plugins/workspace-dock) for dock `j` / `k` / `Ctrl+d`.

## Create a new project

`workspace.new` and `workspace.switch` include a `+ Create New` row. The `+` prefix matches the worktree dashboard row `+ new worktree`. The row is always the first item in the unopened-projects section: after already-open projects on `workspace.new`, and after the divider on `workspace.switch`.

Choosing it opens an [oil](/plugins/oil) directory buffer at the first project search root (`user/config/workspace.yaml`). Add one new directory there (a line with a trailing `/`). Volt runs `git init` in that directory and opens it as a project workspace. Adding a file in that oil buffer does not run `git init`. Closing the oil buffer cancels the pending create.

## Notes

Many chords are provided by the vim leader map (`Space w`, `Space p`, window `Ctrl+h/j/k/l`, and similar). Project discovery roots live in `user/config/workspace.yaml`. Closing a workspace tears down Owned Processes tagged to that workspace (terminals, jobs, language tooling) via Process Launch / Process Registry.

## Related pages

- [Workspace Dock Plugin](/plugins/workspace-dock)
- [Picker Plugin](/plugins/picker)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
