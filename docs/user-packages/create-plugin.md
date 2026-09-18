---
title: Create a New User Plugin
description: Step-by-step guide to create a new Volt user plugin — module file, PluginPackage, register in lib.rs, build and test.
---

# Create a New User Plugin

**Help query:** "How do I create a new user plugin?" / "How do I add a plugin?" / "How do I write a PluginPackage?"

There is **no scaffold CLI** in `cargo xtask` today. Creating a plugin is a short manual checklist: add a Rust module, export `package()`, register it in `user/lib.rs`, then [build the user package](/user-packages/build).

If you already have an empty module file, skip ahead to [After scaffold — what next?](/user-packages/after-scaffold).

## Walkthrough: a `hello` plugin

This plugin logs a greeting from the command palette and binds `Ctrl+Shift+h`.

### Step 1 — Create the module file

Create `user/hello.rs`:

```rust
use editor_plugin_api::{
    PluginAction, PluginCommand, PluginKeyBinding, PluginKeymapScope,
    PluginPackage,
};

/// Returns the metadata for the hello package.
pub fn package() -> PluginPackage {
    PluginPackage::new("hello", true, "A simple greeting plugin.")
        .with_commands(vec![
            PluginCommand::new(
                "hello.greet",
                "Logs a friendly greeting to the message log.",
                vec![PluginAction::log_message("Hello from Volt!")],
            ),
        ])
        .with_key_bindings(vec![
            PluginKeyBinding::new(
                "Ctrl+Shift+h",
                "hello.greet",
                PluginKeymapScope::Global,
            ),
        ])
}
```

The `package()` function is the whole metadata surface the host needs for a minimal plugin.

### Step 2 — Register the module

In `user/lib.rs`, declare the module with the other `pub mod` lines:

```rust
/// A simple greeting plugin.
pub mod hello;
```

Add it to `packages()`:

```rust
pub fn packages() -> Vec<PluginPackage> {
    let mut pkgs = vec![
        buffer::package(),
        acp::package(),
        // ... existing packages ...
        hello::package(),
    ];
    pkgs.extend(lang::packages());
    pkgs
}
```

If either step is missing, the plugin will not load — this is the most common "I created a file but nothing happened" failure.

### Step 3 — Build and test

```bash
cargo build -p volt-user
cargo xtask test
cargo run -p volt -- --shell-hidden
cargo run -p volt -- --bootstrap-demo
```

Then in the editor:

1. Open the command palette (`F3` or `:`)
2. Run `hello.greet`
3. Or press `Ctrl+Shift+h`

## Patterns beyond hello

### Hook-only commands

Many builtins only emit hooks and let the host implement behavior. See `user/pane.rs`:

```rust
PluginCommand::new(
    "pane.split-horizontal",
    "Splits the active workspace horizontally.",
    vec![PluginAction::emit_hook("ui.pane.split-horizontal", None::<&str>)],
)
```

### Buffer + evaluator

For split-pane plugin buffers, copy the structure of `user/calculator.rs`:

1. Declare a `PluginBuffer` with sections
2. Emit `plugin_hooks::EVALUATE` from a command
3. Implement `evaluate(input: &str) -> Vec<String>`
4. Match your handler id in `UserLibraryImpl::run_plugin_buffer_evaluator` in `user/lib.rs`

Current section API:

```rust
PluginBufferSections::new(vec![
    PluginBufferSection::new("Input")
        .with_writable(true)
        .with_initial_lines(initial_buffer_lines()),
    PluginBufferSection::new("Output")
        .with_min_lines(1)
        .with_initial_lines(vec!["…".to_owned()])
        .with_update(PluginBufferSectionUpdate::Replace),
])
```

### Language packages

Language support belongs under `user/lang/`. Prefer the common helper documented in [Add a language](/languages/add-language).

### Autocomplete providers

Define `autocomplete_provider()` in your module and register it in `user/autocomplete.rs` `backends()`. See [Autocomplete providers](/user-packages/autocomplete).

### Runtime YAML

If your plugin needs user-tunable settings without a rebuild, add a child YAML file and extend `user/config.rs`. See [Configuration](/configuration#add-config-to-your-own-plugin).

## Checklist

- [ ] `user/<name>.rs` exports `pub fn package() -> PluginPackage`
- [ ] `pub mod <name>;` in `user/lib.rs`
- [ ] `<name>::package()` listed in `packages()`
- [ ] Extra trait hooks wired (evaluator / autocomplete) if needed
- [ ] `cargo build -p volt-user` succeeds
- [ ] Command appears in palette / bootstrap demo
- [ ] `cargo xtask clippy` clean

## Related help topics

- [After scaffold — what next?](/user-packages/after-scaffold)
- [Plugin concepts](/user-packages/concepts)
- [Build the user package](/user-packages/build)
- [Edit an existing plugin](/user-packages/edit-plugin)
