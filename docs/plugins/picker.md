---
title: Picker Plugin
description: Generic searchable list UI — commands, buffers, keybindings, themes, quickfix, and more.
---

# Picker Plugin

**Help query:** "What does the picker plugin do?" / "How do I use picker in Volt?"

The **picker** plugin is Volt's fuzzy/searchable list UI. It opens providers for commands, buffers, keybindings, themes, icon fonts, quickfix, and many subsystem pickers, with shared next/previous/submit/cancel bindings.

| | |
| --- | --- |
| Package name | `picker` |
| Module | `user/picker.rs` |

## What it does

- Open command, buffer, keybinding, and theme pickers
- Navigate picker results and submit/cancel
- Drive quickfix mark/next/previous workflows
- Host other packages picker providers (ACP clients, treesitter languages, workspace projects, and more)

## Commands

| Command | Description |
| --- | --- |
| `picker.open-commands` | Opens the command picker. |
| `picker.open-buffers` | Opens the buffer picker. |
| `picker.open-keybindings` | Opens the keybindings picker. |
| `picker.open-themes` | Opens the theme picker. |
| `picker.open-icon-fonts` | Opens the icon font picker. |
| `picker.select-next` | Selects the next picker item. |
| `picker.select-previous` | Selects the previous picker item. |
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
| `Ctrl+n / Ctrl+p` | `picker.select-next / previous` | Popup |
| `Enter` | `picker.submit` | Popup |
| `Escape` | `picker.cancel` | Popup |

## Notes

Picker truncation strategy comes from `user/config/ui.yaml`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
