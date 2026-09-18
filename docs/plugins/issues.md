---
title: Issues Plugin
description: Workspace Issue Store — board, capture, place, scan, and status workflow.
---

# Issues Plugin

**Help query:** "What does the issues plugin do?" / "How do I use issues in Volt?"

The **issues** plugin is Volt's workspace Issue Store. It provides an issues board buffer, capture/create flows, scanning, placing issues, jumping refs, and status transitions (open → planning → in-progress → closed).

| | |
| --- | --- |
| Package name | `issues` |
| Module | `user/issues.rs` |

## What it does

- Open and navigate the issues board
- Create, capture, scan, and place issues
- Set issue status and jump between refs

## Commands

| Command | Description |
| --- | --- |
| `issues.open-board` | Opens the issues board buffer. |
| `issues.create` | Creates a new issue. |
| `issues.scan` | Scans the workspace for issues. |
| `issues.capture-focused` | Captures an issue from the focused context. |
| `issues.activate-line` | Activates the issue on the current board line. |
| `issues.board-toggle-closed` | Toggles showing closed issues on the board. |
| `issues.set-status.open` | Sets issue status to open. |
| `issues.set-status.planning` | Sets issue status to planning. |
| `issues.set-status.in-progress` | Sets issue status to in-progress. |
| `issues.set-status.closed` | Sets issue status to closed. |
| `issues.place` | Places an issue at a location. |
| `issues.open-from-ref` | Opens an issue from a reference. |
| `issues.jump-refs` | Jumps between issue references. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Space i b` | `issues.open-board` | Workspace (Normal) |
| `Space i c` | `issues.create` | Workspace (Normal) |
| `Space i s` | `issues.scan` | Workspace (Normal) |
| `Space i o` | `issues.activate-line` | Workspace (Normal) |
| `Space i f` | `issues.open-from-ref` | Workspace (Normal) |
| `Space i j` | `issues.jump-refs` | Workspace (Normal) |
| `Space i p` | `issues.place` | Workspace (Normal) |

## Notes

Board buffer name is `*issues-board*`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
