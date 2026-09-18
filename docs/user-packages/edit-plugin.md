---
title: Edit a User Plugin
description: How to edit builtin Volt plugins — change keybindings, add commands, modify vim, oil, compile, terminal, and statusline.
---

# Edit a User Plugin

**Help query:** "How do I edit X plugin?" / "How do I change vim keybindings?" / "How do I customize a builtin plugin?"

All builtin plugins are ordinary Rust modules under `user/`. Open the module, change it, then [rebuild the user package](/user-packages/build) unless the setting already lives in YAML/TOML.

## Find the right file

Use the [plugin catalog](/plugins/catalog) to map package name → module. Examples:

| You want to edit… | Open… |
| --- | --- |
| Vim chords / leader | `user/vim.rs` |
| Compile / `F5` | `user/compile.rs` |
| Oil browser | prefer `user/config/oil.yaml`, else `user/oil.rs` |
| Terminal shell | prefer `user/config/ui.yaml` |
| Calculator buffer | `user/calculator.rs` |
| LSP lifecycle | `user/lsp.rs` |
| Statusline | `user/statusline.rs` |
| Default theme | `user/theme.rs` + `user/themes/` |

## Changing keybindings

Find `.with_key_bindings(vec![...])` in the plugin's `package()` (or buffer-local bindings) and change the chord string.

**Example — compile from `F5` to `Ctrl+B`** in `user/compile.rs`:

```rust
// Before
PluginKeyBinding::new("F5", "workspace.compile", PluginKeymapScope::Global),

// After
PluginKeyBinding::new("Ctrl+B", "workspace.compile", PluginKeymapScope::Global),
```

**Example — Vim leader** in `user/vim.rs`:

```rust
const LEADER_KEY: &str = "Comma"; // was "Space"
```

More: [Change keybindings](/guides/change-keybindings).

## Adding a command to an existing plugin

Append a `PluginCommand` inside `.with_commands(vec![...])`.

**Example — save-all on the buffer package** in `user/buffer.rs`:

```rust
PluginCommand::new(
    "buffer.save-all",
    "Saves all modified file buffers.",
    vec![PluginAction::emit_hook("workspace.save", None::<&str>)],
)
```

Rebuild, then run the new command from the palette.

## Changing the terminal shell (no rebuild)

Edit `user/config/ui.yaml`:

```yaml
terminal:
  program: pwsh
  args: ["-NoLogo"]
```

See [Change the terminal shell](/guides/change-terminal-shell).

## Oil defaults and chords (no rebuild)

Edit `user/config/oil.yaml`:

```yaml
defaults:
  show_hidden: true
  sort_mode: type-then-name
  trash_enabled: true

keybindings:
  open_entry: Enter
  toggle_hidden: "."
```

## Adding a build command for a language

In `user/compile.rs`, extend `default_build_command()`:

```rust
pub fn default_build_command(language: &str) -> Option<&'static str> {
    let commands: &[(&str, &str)] = &[
        ("rust", "cargo build"),
        ("typescript", "npm run build"),
        ("zig", "zig build"),
    ];
    commands
        .iter()
        .find_map(|(lang, cmd)| (*lang == language).then_some(*cmd))
}
```

## Editing the statusline

`user/statusline.rs` renders from a `StatuslineContext` (`vim_mode`, `buffer_name`, `line`, `column`, `git_branch`, `lsp_diagnostics`, …). Edit the rendering functions, then rebuild.

## Themes and fonts

- Default theme id: `DEFAULT_THEME_ID` in `user/theme.rs`
- Colors: `user/themes/<id>.toml`
- Font / shared options: `user/themes/global.toml`

Theme picker: `F6` by default. Guide: [Change theme and font](/guides/change-theme).

## After you edit

1. Decide: Rust change → `cargo build -p volt-user` (or `workspace.compile`)
2. YAML/theme change → save and confirm hot reload
3. Verify with `--bootstrap-demo` / command palette / chord
4. `cargo xtask clippy` before committing

## Related help topics

- [Plugin catalog](/plugins/catalog)
- [Create a new plugin](/user-packages/create-plugin)
- [Configuration](/configuration)
- [Hot reload](/user-packages/hot-reload)
