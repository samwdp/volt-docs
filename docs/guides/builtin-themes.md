---
title: Builtin Themes
description: What builtin themes ship with Volt — the full list of theme ids, display names, and where theme files live.
---

# Builtin Themes

**Help query:** "What are the builtin themes?" / "What themes does Volt ship with?" / "List Volt themes"

Volt ships **eight named color themes** as TOML files under `user/themes/`. Shared editor options (font, scrolloff, language defaults, window transparency) live separately in `user/themes/global.toml` — that file is **not** a selectable theme.

## Builtin theme list

| Theme id | Display name | File |
| --- | --- | --- |
| `gruvbox-dark` | Gruvbox Dark | `user/themes/gruvbox-dark.toml` |
| `gruvbox-light` | Gruvbox Light | `user/themes/gruvbox-light.toml` |
| `rosepine-dark` | RosePine Dark | `user/themes/rosepine-dark.toml` |
| `volt-arc` | Volt Arc | `user/themes/volt-arc.toml` |
| `volt-dark` | Volt Dark | `user/themes/volt-dark.toml` |
| `volt-light` | Volt Light | `user/themes/volt-light.toml` |
| `vscode-dark` | VS Code Dark | `user/themes/vscode-dark.toml` |
| `vscode-light` | VS Code Light | `user/themes/vscode-light.toml` |

Each named theme file declares:

```toml
id = "gruvbox-dark"
name = "Gruvbox Dark"

[pallet]
# …palette colors…

[tokens]
# …token → palette mappings…
```

(`pallet` and `palette` are both accepted section names.)

## Default theme

The default theme id is selected in `user/theme.rs`:

```rust
const DEFAULT_THEME_ID: &str = "gruvbox-dark";
```

Changing that constant requires rebuilding `volt-user`. Switching themes interactively does not.

## How to switch themes

1. Open the theme picker with **`F6`** (default keymap), or run the themes picker command from the command palette
2. Or change `DEFAULT_THEME_ID` and [rebuild the user package](/user-packages/build)

See [Change theme and font](/guides/change-theme) for fonts, `global.toml` options, and editing colors.

## Not a theme: `global.toml`

`user/themes/global.toml` holds shared options applied across themes, for example:

- `font`, `font_size`, emoji font settings
- `scrolloff`, cursor/corner roundness
- `window.transparency` (`none`, `blur`, `acrylic`, `mica`, `mica-tabbed`)
- per-language defaults under `[langs.*]`

## Related pages

- [Change theme and font](/guides/change-theme)
- [Picker plugin](/plugins/picker) — theme picker UI
- [Configuration](/configuration)
