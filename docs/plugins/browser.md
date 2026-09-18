---
title: Browser Plugin
description: Embedded browser buffers with tabs, bookmarks, dock navigation, and popup browsing inside Volt.
---

# Browser Plugin

**Help query:** "What does the browser plugin do?" / "How do I use browser bookmarks?" / "How do I open the browser dock?"

The **browser** plugin opens an embedded browser buffer (`*browser*`) for in-editor browsing. It supports split and popup opens, multiple tabs, named bookmarks stored in the Volt data folder, and a browser dock for switching buffers and tabs.

| | |
| --- | --- |
| Package name | `browser` |
| Module | `user/browser.rs` |

## What it does

- Open an embedded browser buffer in a split, or in a popup
- Add tabs and switch among them via a tab picker
- Save and open named bookmarks
- Toggle a browser dock and move/close dock entries
- Open a URL from the current buffer, or browse the active file
- Focus the URL input and submit navigation (Enter / Ctrl+Enter); DevTools via F12 / Ctrl+Shift+I

## Commands

| Command | Description |
| --- | --- |
| `browser.open` | Always opens a new browser buffer in a split pane alongside the active buffer. |
| `browser.add-tab` | Creates a new tab in the browser buffer currently in view. |
| `browser.bookmarks` | Opens a picker of saved bookmarks. Uses add-tab when a browser is in view, otherwise open. |
| `browser.bookmark-add` | Saves the current browser page URL as a named bookmark in the Volt data folder. |
| `browser.bookmark-rename` | Renames the selected bookmark in the bookmarks picker (`Ctrl+r`). |
| `browser.tabs` | Opens a picker of tabs in the active browser buffer. |
| `browser.dock` | Toggles the browser dock listing open browser buffers and tabs. |
| `browser.dock.previous` | Moves to the previous entry in the browser dock. |
| `browser.dock.next` | Moves to the next entry in the browser dock. |
| `browser.dock.close` | Closes the selected browser dock buffer or tab. |
| `browser.open-popup` | Opens the browser buffer in the popup window. |
| `browser.url` | Detects a URL in the current buffer and opens it in a split browser buffer. |
| `browser.open-buffer` | Opens the active file in a split browser buffer. |
| `browser.focus-input` | Focuses the browser input section and enters insert mode. |
| `browser.navigate` | Navigates the browser using the current URL prompt text. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `I` | `browser.focus-input` | Workspace (Normal) on browser buffer |
| `Enter` / `Ctrl+Enter` | `browser.navigate` | Workspace (Insert) on browser buffer |
| `Ctrl+r` | `browser.bookmark-rename` | Bookmarks picker extra |
| `j` | `browser.dock.next` | BrowserDock |
| `k` | `browser.dock.previous` | BrowserDock |
| `Ctrl+d` | `browser.dock.close` | BrowserDock |

## Notes

Buffer kind comes from `buffer_kinds::BROWSER`. URL prompt placeholder defaults to `https://example.com`. The [Help Plugin](/plugins/help) opens docs search in a browser split.

## Related pages

- [Help Plugin](/plugins/help)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
