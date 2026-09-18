---
title: Git Plugin
description: Magit-style git workflows — status, commit, diff, log, stash, and branches as buffers.
---

# Git Plugin

**Help query:** "What does the git plugin do?" / "How do I use git in Volt?"

The **git** plugin surfaces Magit-style git workflows as editor buffers: status, commit, diff, log, stash list, and branches. In-buffer section actions are host-driven beyond the listed open commands.

| | |
| --- | --- |
| Package name | `git` |
| Module | `user/git.rs` |

## What it does

- Open git status (pane or popup)
- Open commit, diff, log, stash, and branches buffers
- Drive section-based git actions inside those buffers

## Commands

| Command | Description |
| --- | --- |
| `git.status` | Shows git status. |
| `git.status-open` | Opens the git status buffer. |
| `git.status-open-popup` | Opens git status in a popup. |
| `git.commit-open` | Opens the git commit buffer. |
| `git.diff` | Opens a git diff buffer. |
| `git.log` | Opens the git log buffer. |
| `git.stash-list` | Opens the stash list. |
| `git.branches` | Opens the branches buffer. |

## Keybindings

_No package-level keybindings declared (may be bound from vim leader maps or YAML)._

## Notes

Default vim leader map includes `Space g s` for `git.status-open`. Buffer names include `*git-status*`, `*git-commit*`, `*git-branches*`, and related buffers.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
