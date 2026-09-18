---
title: User Package Troubleshooting
description: Fix missing plugins, failed volt-user builds, keybinding issues, evaluate handlers, and hot-reload problems.
---

# User Package Troubleshooting

**Help query:** "Why isn't my plugin loading?" / "user.dll build failed" / "command missing from palette"

## Plugin does not appear

1. Confirm `pub mod …` exists in `user/lib.rs`
2. Confirm `…::package()` is listed in `packages()`
3. Rebuild: `cargo build -p volt-user`
4. Check `cargo run -p volt -- --bootstrap-demo` lists the package name
5. Confirm Volt is loading the library you just built (`VOLT_USER_LIBRARY`, release vs debug, staged hot path)

See [After scaffold](/user-packages/after-scaffold).

## Build failures

```bash
cargo build -p volt-user
cargo xtask clippy
```

Remember workspace policy:

- no `unsafe`
- no `todo!`, `dbg!`, or `unwrap()`

## Command missing from palette

- Rebuild not applied / wrong DLL loaded
- Typo in `PluginCommand` name
- Package `auto_load` is `false` and never loaded

## Keybinding does nothing

- Wrong `PluginKeymapScope` for the focused UI
- Vim mode filter excludes the current mode
- Chord conflicts with a higher-priority binding
- Oil/terminal chords may live in YAML instead of Rust — check [Configuration](/configuration)

## Evaluate / buffer plugin broken

- Handler id mismatch between `with_evaluate_handler` and `run_plugin_buffer_evaluator`
- Missing match arm in `UserLibraryImpl`
- Using outdated `PluginBufferSections` constructor — prefer the `vec![PluginBufferSection::new(...)]` form from `user/calculator.rs`

## Hot reload / Windows DLL issues

Use `workspace.compile` staging under `volt-user-hot/` instead of overwriting a mapped `user.dll`. See [Hot reload](/user-packages/hot-reload).

## Config not applying

- YAML syntax error keeps previous settings
- Edited the wrong file / wrong install tree
- Expected a Rust metadata change but only edited YAML

## Still stuck?

Collect Volt commit, redacted YAML, `cargo build -p volt-user` output, and `--bootstrap-demo` text, then open an issue on [samwdp/volt](https://github.com/samwdp/volt/issues).
