---
title: Build the User Package
description: How to build the volt-user library — cargo commands, artifacts, release installs, and workspace.compile hot reload.
---

# Build the User Package

**Help query:** "How do I build the user package?" / "How do I rebuild volt-user?" / "Where is user.dll?"

The user package is the `volt-user` Cargo crate. Building it produces the shared library Volt loads for plugins.

## From the Volt git checkout

Run these from the repository root.

### Debug build

```bash
cargo build -p volt-user
```

### Release build

```bash
cargo build -p volt-user --release
```

### Editor + user library together

```bash
cargo build -p volt -p volt-user
cargo build -p volt -p volt-user --release
```

## Output artifacts

| Platform | User library | Editor binary |
| --- | --- | --- |
| Windows | `target/<profile>/user.dll` | `target/<profile>/volt.exe` |
| Linux | `target/<profile>/libuser.so` | `target/<profile>/volt` |
| macOS | `target/<profile>/libuser.dylib` | `target/<profile>/volt` |

`<profile>` is `debug` or `release`.

## Verify the build

```bash
# Headless one-frame smoke test
cargo run -p volt -- --shell-hidden

# Print registered packages / subsystem summary
cargo run -p volt -- --bootstrap-demo

# Tests and lints
cargo xtask test
cargo xtask clippy
```

Interactive launch:

```bash
cargo run -p volt
```

## From a release User Source Tree

Shipped installs can include a `user/` tree beside the binary. Rebuild **there**, not in an unrelated git checkout:

```bash
cd /path/to/install/user
cargo build --release -p volt-user
```

Or use the in-editor command **`workspace.compile`**. It prefills `cargo build --release -p volt-user`, stages the artifact under `user/target/<profile>/volt-user-hot/`, and hot-reloads into the running process (important on Windows, where mapped DLLs cannot be overwritten in place).

Details: [Hot reload](/user-packages/hot-reload).

## Point Volt at a specific library

Override the loaded library with:

```bash
# Windows example
set VOLT_USER_LIBRARY=C:\path\to\user.dll
```

Use the platform library filename (`user.dll`, `libuser.so`, or `libuser.dylib`).

## When do I need to rebuild?

| Change | Rebuild `volt-user`? |
| --- | --- |
| New / edited `.rs` plugin module | Yes |
| Register package in `lib.rs` | Yes |
| Commands, hooks, Rust keybindings | Yes |
| Evaluator / autocomplete wiring | Yes |
| `user/config/*.yaml` | No (hot reload) |
| `user/themes/*.toml` | No (theme watcher) |

## Developer command cheat sheet

| Command | Purpose |
| --- | --- |
| `cargo build -p volt-user` | Build user library (debug) |
| `cargo build -p volt-user --release` | Build user library (release) |
| `cargo build -p volt` | Build editor binary |
| `workspace.compile` | Rebuild + hot-reload shipped user tree |
| `cargo xtask fmt` | Format |
| `cargo xtask check` | `cargo check` |
| `cargo xtask clippy` | Clippy (warnings denied) |
| `cargo xtask test` | Workspace tests |
| `cargo xtask ci` | Full CI |

## Lint policy

Workspace lints forbid `unsafe_code` and deny `dbg!`, `todo!`, and `unwrap()`. Run `cargo xtask clippy` before submitting changes.

## Related help topics

- [Create a new plugin](/user-packages/create-plugin)
- [After scaffolding a plugin](/user-packages/after-scaffold)
- [Troubleshooting builds](/user-packages/troubleshooting)
