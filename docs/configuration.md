---
title: Configuration
description: Runtime YAML configuration for Volt — workspace, UI, oil, ACP, hot reload, and when you still need to rebuild.
---

# Configuration

Volt keeps day-to-day settings in YAML under `user/` so you can change behavior **without rebuilding** the user package. Package metadata (commands, hooks, keybindings declared in Rust) still requires a rebuild of `volt-user`.

## Master config file

`user/config.yaml` is a **reference table**, not a YAML include:

```yaml
workspace: config/workspace.yaml
acp: config/acp.yaml
ui: config/ui.yaml
oil: config/oil.yaml
```

Volt reads the master file, then loads each child file at runtime through `user/config.rs`.

## Config sections

### Workspace discovery

`user/config/workspace.yaml` controls where the project picker searches:

```yaml
project_search_roots:
  - path: P:\
    max_depth: 4
  - path: C:\Users\you\
    max_depth: 4
```

Missing paths are filtered out automatically.

### UI, terminal, and pane defaults

`user/config/ui.yaml` covers picker truncation, ligatures, pane layout, and the terminal shell:

```yaml
terminal:
  program: pwsh
  args: ["-NoLogo"]
```

Changing the terminal shell this way does **not** require rebuilding the user package.

### Oil directory browser

`user/config/oil.yaml`:

```yaml
defaults:
  show_hidden: true
  sort_mode: type-then-name
  trash_enabled: true

keybindings:
  open_entry: Enter
  toggle_hidden: "."
```

### ACP clients

`user/config/acp.yaml` lists ACP clients, dock toggles, commands, args, env, and cwd.

## Plugins backed by YAML today

| Plugin module | Config section | Runtime changes |
| --- | --- | --- |
| `workspace.rs` | `workspace` | Project search roots / `max_depth` |
| `acp.rs` | `acp` | Client list and launch settings |
| `picker.rs` | `ui` | Picker label truncation |
| `ligatures.rs` | `ui` | Font ligatures |
| `pane.rs` | `ui.pane` | Golden-ratio pane sizing |
| `terminal.rs` | `ui.terminal` | Default shell |
| `oil.rs` | `oil` | Hidden files, sort, trash, oil keys |

## Themes and fonts

Theme colors live in `user/themes/*.toml`. Shared options (font, font size, scrolloff, language defaults) live in `user/themes/global.toml`:

```toml
[options]
font = "Liga Berkeley Mono"
font_size = 18
scrolloff = 5
```

Default theme id is selected in `user/theme.rs` (`DEFAULT_THEME_ID`). The theme picker opens with `F6` by default.

## Hot reload

The SDL shell watches YAML and theme files and reloads compatible settings while Volt is running. Structural plugin changes — new packages, new commands, new Rust keybindings — still need:

```bash
cargo build -p volt-user
```

or, from a release install, the in-editor `workspace.compile` command. See [Hot reload](/user-packages/hot-reload).

## Add config to your own plugin

1. Create `user/config/myplugin.yaml`
2. Add a pointer in `user/config.yaml` (`myplugin: config/myplugin.yaml`)
3. Extend `user/config.rs` with a `Deserialize` section and load it in `load_from_root`
4. Read values with `crate::config::load().myplugin`

Keep parsing centralized in `config.rs` so every plugin shares one schema and reload path.

## Related help topics

- [Build the user package](/user-packages/build)
- [Edit a plugin](/user-packages/edit-plugin)
- [Change keybindings](/guides/change-keybindings)
- [Change the terminal shell](/guides/change-terminal-shell)
