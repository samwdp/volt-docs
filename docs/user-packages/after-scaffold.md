---
title: After Scaffolding a Plugin
description: You have a scaffolded new Volt plugin module — register it, wire handlers, build, and verify. Checklist for what to do next.
---

# After Scaffolding a Plugin — What Next?

**Help query:** "I have a scaffolded new plugin what do I do next?" / "Plugin scaffold next steps" / "My new plugin doesn't show up"

Volt does not ship a generator today, but the situation is the same whether you copied `hello.rs`, duplicated `pane.rs`, or an external tool dropped a stub module: **a file on disk is not enough**. The host only sees packages listed from `user/lib.rs`.

Follow this order.

## 1. Confirm the module exports `package()`

Your file must expose:

```rust
pub fn package() -> PluginPackage { /* ... */ }
```

At minimum include a unique `name`, `auto_load: true` while developing, one command, and optionally a keybinding. See [Create a plugin](/user-packages/create-plugin) for a full stub.

## 2. Register the module in `user/lib.rs`

Two edits are required:

```rust
pub mod my_plugin; // near the other pub mod lines
```

```rust
pub fn packages() -> Vec<PluginPackage> {
    let mut pkgs = vec![
        // ...
        my_plugin::package(),
    ];
    pkgs.extend(lang::packages());
    pkgs
}
```

If you only did one of these, the crate may compile while the plugin still never loads.

## 3. Wire optional host callbacks

Ask whether your scaffold needs more than metadata:

| Feature | Where to wire |
| --- | --- |
| Buffer evaluate handler | `UserLibraryImpl::run_plugin_buffer_evaluator` in `user/lib.rs` |
| Autocomplete provider | `user/autocomplete.rs` → `backends()` |
| Hover provider | Hover registration used by your buffer kind |
| Custom `run_volt_command` | `UserLibraryImpl::run_volt_command` if you handle named commands |
| YAML settings | `user/config.yaml` + `user/config.rs` |
| Language grammar | `user/lang/mod.rs` `packages()` **and** `syntax_languages()` |

Skipping this step is the usual reason a buffer opens but evaluate / completions do nothing.

## 4. Build the user package

```bash
cargo build -p volt-user
```

From a release User Source Tree:

```bash
cargo build --release -p volt-user
# or run workspace.compile inside Volt
```

Full details: [Build the user package](/user-packages/build).

## 5. Verify registration

```bash
cargo run -p volt -- --bootstrap-demo
```

Confirm your package name appears in the printed list.

Then smoke-test:

```bash
cargo run -p volt -- --shell-hidden
cargo run -p volt
```

Exercise the command from the palette (`F3` / `:`) and any chord you bound.

## 6. Iterate safely

1. Change Rust → rebuild `volt-user` (or `workspace.compile`)
2. Change YAML/themes → save and rely on hot reload
3. Before sharing: `cargo xtask clippy` and `cargo xtask test`

## 7. Common "scaffold done but broken" fixes

| Symptom | Fix |
| --- | --- |
| Package missing from bootstrap demo | Missing `packages()` entry or `pub mod` |
| Command missing from palette | Rebuild not picked up; wrong library loaded |
| Keybinding does nothing | Wrong `PluginKeymapScope` or Vim mode filter |
| Evaluate does nothing | Handler not matched in `run_plugin_buffer_evaluator` |
| Completions missing | Provider not added to `autocomplete::backends()` |
| Clippy / CI fails | Remove `todo!` / `unwrap!`; run `cargo xtask clippy` |

More: [Troubleshooting](/user-packages/troubleshooting).

## Recommended reading order after a stub exists

1. [Plugin concepts](/user-packages/concepts) — know the vocabulary
2. Finish registration + build (this page)
3. Copy patterns from [plugin catalog](/plugins/catalog) modules closest to your goal (`pane` for hooks, `calculator` for buffers, `lang/*` for languages)
4. [Edit builtins](/user-packages/edit-plugin) when you are modifying an existing package instead of adding one

## Related help topics

- [Create a new user plugin](/user-packages/create-plugin)
- [Build the user package](/user-packages/build)
- [Hot reload](/user-packages/hot-reload)
