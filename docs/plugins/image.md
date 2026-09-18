---
title: Image Plugin
description: Native image-viewer zoom and SVG preview/source toggle commands.
---

# Image Plugin

**Help query:** "What does the image plugin do?" / "How do I use image in Volt?"

The **image** plugin controls the native image viewer: zoom in/out/reset and toggle between SVG preview and source.

| | |
| --- | --- |
| Package name | `image` |
| Module | `user/image.rs` |

## What it does

- Zoom the image preview in and out
- Reset zoom
- Toggle SVG preview versus source mode

## Commands

| Command | Description |
| --- | --- |
| `image.zoom-in` | Zooms the image viewer in. |
| `image.zoom-out` | Zooms the image viewer out. |
| `image.zoom-reset` | Resets image zoom. |
| `image.toggle-mode` | Toggles SVG preview vs source mode. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+=` | `image.zoom-in` | Workspace |
| `Ctrl+-` | `image.zoom-out` | Workspace |
| `Ctrl+0` | `image.zoom-reset` | Workspace |
| `Ctrl+c Ctrl+c` | `image.toggle-mode` | Workspace |

## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
