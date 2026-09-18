---
title: Oil Plugin
description: oil.nvim-inspired directory buffers — open, edit paths, sort, hidden files, trash, and splits.
---

# Oil Plugin

**Help query:** "What does the oil plugin do?" / "How do I use oil in Volt?"

The **oil** plugin provides directory manipulation buffers inspired by oil.nvim. Open a directory as an editable buffer, preview entries, open splits, cycle sort modes, toggle hidden files/trash, and jump to workspace or git worktree roots.

| | |
| --- | --- |
| Package name | `oil` |
| Module | `user/oil.rs` |

## What it does

- Open directories (including parent and workspace root) as buffers
- Open entries in the current pane, splits, or a new pane
- Preview, refresh, cycle sort, toggle hidden/trash
- Set roots and open git worktrees

## Commands

| Command | Description |
| --- | --- |
| `oil.open-directory` | Opens a directory in an oil buffer. |
| `oil.open-parent` | Opens the parent directory. |
| `oil.open-entry` | Opens the entry under the cursor. |
| `oil.open-vertical-split` | Opens the entry in a vertical split. |
| `oil.open-horizontal-split` | Opens the entry in a horizontal split. |
| `oil.preview-entry` | Previews the entry under the cursor. |
| `oil.refresh` | Refreshes the oil buffer. |
| `oil.close` | Closes the oil buffer. |
| `oil.open-workspace-root` | Opens the workspace root in oil. |
| `oil.set-root` | Sets the oil root from the current entry. |
| `oil.show-help` | Shows oil help. |
| `oil.cycle-sort` | Cycles oil sort mode. |
| `oil.toggle-hidden` | Toggles hidden files. |
| `oil.toggle-trash` | Toggles trash behavior. |
| `oil.git-worktree` | Opens a git worktree flow. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `g w n` | `oil.git-worktree` | Workspace (Normal) |

## Notes

Most oil chords (Enter, preview, hidden toggle, and similar) come from `user/config/oil.yaml` defaults rather than package keybindings. Edit that YAML to rebind without rebuilding.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
