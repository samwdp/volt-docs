---
title: Change Theme and Font
description: How to change Volt's default theme, switch builtin themes, edit colors, and set font options.
---

# Change Theme and Font

**Help query:** "How do I change the theme?" / "How do I change the font in Volt?"

For the full list of shipped themes, see [Builtin themes](/guides/builtin-themes).

## Switch theme interactively

Open the theme picker with **`F6`** (default keymap), or use the themes picker from the command palette (`F3`).

## Builtin themes (quick list)

| Id | Name |
| --- | --- |
| `gruvbox-dark` | Gruvbox Dark (default) |
| `gruvbox-light` | Gruvbox Light |
| `rosepine-dark` | RosePine Dark |
| `volt-arc` | Volt Arc |
| `volt-dark` | Volt Dark |
| `volt-light` | Volt Light |
| `vscode-dark` | VS Code Dark |
| `vscode-light` | VS Code Light |

## Change the default theme

In `user/theme.rs`:

```rust
const DEFAULT_THEME_ID: &str = "gruvbox-dark";
```

Set that to any builtin id (or a custom theme id you add). Rebuild is required for the default-id constant change. Named theme files themselves reload via the theme watcher.

## Edit colors

Named themes live in `user/themes/*.toml` (`[pallet]` / `[palette]` and `[tokens]`).

## Edit font and shared options

`user/themes/global.toml`:

```toml
[options]
font = "Liga Berkeley Mono"
font_size = 18
scrolloff = 5
```

Use `"default"` for Volt's fallback font selection.

## Related pages

- [Builtin themes](/guides/builtin-themes)
- [Configuration](/configuration)
- [Edit a plugin](/user-packages/edit-plugin)
