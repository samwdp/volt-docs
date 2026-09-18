---
title: Browser Plugin
description: Embedded browser buffers and popup browsing inside Volt.
---

# Browser Plugin

**Help query:** "What does the browser plugin do?" / "How do I use browser in Volt?"

The **browser** plugin opens an embedded browser buffer (`*browser*`) for in-editor browsing. You can open in the pane or a popup, focus the URL input, and navigate.

| | |
| --- | --- |
| Package name | `browser` |
| Module | `user/browser.rs` |

## What it does

- Open an embedded browser buffer or popup
- Focus the URL input and submit navigation
- Open a URL from the current buffer / browse the current file where supported

## Commands

| Command | Description |
| --- | --- |
| `browser.open` | Opens the embedded browser buffer. |
| `browser.open-popup` | Opens the browser in a popup window. |
| `browser.url` | Prompts for or applies a URL navigation. |
| `browser.open-buffer` | Opens browser content related to the current buffer. |
| `browser.focus-input` | Focuses the browser URL input. |
| `browser.navigate` | Submits navigation from the URL input. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `I` | `browser.focus-input` | Workspace (Normal) on browser buffer |
| `Enter / Ctrl+Enter` | `browser.navigate` | Workspace (Insert) |

## Notes

Buffer kind comes from `buffer_kinds::BROWSER`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
