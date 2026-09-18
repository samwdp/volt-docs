---
title: Picker Plugin
description: Fuzzy pickers with preview layout — commands, buffers, keybindings, themes, quickfix, and workspace providers.
---

# Picker Plugin

**Help query:** "What does the picker plugin do?" / "How do I use picker preview in Volt?" / "How do I open the command palette?"

The **picker** plugin is Volt's fuzzy/searchable list UI. It opens providers for commands, buffers, keybindings, themes, icon fonts, quickfix, and many subsystem pickers. Preview pickers show a list beside a file/content preview that fills available height (up to the shared repository file preview line cap).

| | |
| --- | --- |
| Package name | `picker` |
| Module | `user/picker.rs` |

## What it does

- Open command, buffer, keybinding, theme, and icon-font pickers
- Navigate picker results and submit/cancel
- Drive quickfix mark/next/previous workflows
- Host other packages' picker providers (ACP clients, treesitter languages, workspace projects/switch/files, and more)
- Show richer previews for buffers and workspace files (path plus body lines, capped at `REPOSITORY_FILE_PREVIEW_MAX_LINES` = 256)

## Layout

Defaults from `user/picker.rs`:

| Constant | Default | Meaning |
| --- | --- | --- |
| `WIDTH_FRACTION` | `0.8` | Picker card width as a fraction of the window |
| `HEIGHT_FRACTION` | `0.8` | Picker card height as a fraction of the window |
| `SPLIT_FRACTION` | `0.5` | Horizontal divider inside a preview picker (`0.0..=1.0`) |

Label truncation uses `truncate_strategy()` from `user/config/ui.yaml` (`ui.picker_truncate_strategy`).

## Commands

| Command | Description |
| --- | --- |
| `picker.open-commands` | Opens the command picker popup. |
| `picker.open-buffers` | Opens the buffer picker popup. |
| `picker.open-keybindings` | Opens the keybinding picker popup. |
| `picker.open-themes` | Opens the theme picker popup. |
| `picker.open-icon-fonts` | Opens the bundled icon font picker popup. |
| `picker.select-next` | Moves to the next picker result. |
| `picker.select-previous` | Moves to the previous picker result. |
| `picker.submit` | Submits the selected picker item. |
| `picker.cancel` | Cancels the picker. |
| `quickfix.open` | Opens quickfix. |
| `quickfix.next` | Goes to the next quickfix match. |
| `quickfix.previous` | Goes to the previous quickfix match. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `F3` | `picker.open-commands` | Global |
| `F4` | `picker.open-buffers` | Global |
| `F6` | `picker.open-themes` | Global |
| `F7` | `picker.open-keybindings` | Global |
| `Ctrl+n` | `popup.next` | Popup |
| `Ctrl+p` | `popup.previous` | Popup |
| `Enter` | `picker.submit` | Popup |
| `Escape` | `picker.cancel` | Popup |

### Provider extras (examples)

| Provider | Chord | Command |
| --- | --- | --- |
| `workspace.switch` | `Ctrl+d` | `workspace.delete` |
| `workspace.dashboard` | `Ctrl+d` | `workspace.worktree-remove` |
| `workspace.search` | `Ctrl+q` | `quickfix.open` |

## Related pages

- [Workspace Plugin](/plugins/workspace)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
