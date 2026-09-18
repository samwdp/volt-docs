---
title: PDF Plugin
description: Native PDF buffer navigation, rotation, and page deletion.
---

# PDF Plugin

**Help query:** "What does the pdf plugin do?" / "How do I use pdf in Volt?"

The **pdf** plugin controls native PDF buffers: next/previous page, rotate clockwise, delete page, and save. It is commonly used with LaTeX open mode.

| | |
| --- | --- |
| Package name | `pdf` |
| Module | `user/pdf.rs` |

## What it does

- Navigate PDF pages
- Rotate pages
- Delete a page and save the PDF buffer

## Commands

| Command | Description |
| --- | --- |
| `pdf.next-page` | Goes to the next PDF page. |
| `pdf.previous-page` | Goes to the previous PDF page. |
| `pdf.rotate-clockwise` | Rotates the current page clockwise. |
| `pdf.delete-page` | Deletes the current page. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `PageDown` | `pdf.next-page` | PDF buffer |
| `PageUp` | `pdf.previous-page` | PDF buffer |
| `Ctrl+r` | `pdf.rotate-clockwise` | PDF buffer |
| `D` | `pdf.delete-page` | PDF buffer |
| `S` | `buffer.save` | PDF buffer |

## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
