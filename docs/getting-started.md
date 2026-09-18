---
title: Getting Started
description: Install Volt, build the editor and user package, and open your first customized workspace.
---

# Getting Started

Volt is a native text editor built in Rust. Customization lives in a **compiled user library** (`volt-user`) under the `user/` directory — plugins, languages, themes, and keybindings are Rust modules that compile into `user.dll` / `libuser.so` / `libuser.dylib`.

This page gets you running. For the workflows people usually ask help about next, jump to:

- [How to build the user package](/user-packages/build)
- [How to create a new user plugin](/user-packages/create-plugin)
- [I scaffolded a plugin — what next?](/user-packages/after-scaffold)
- [How to edit a builtin plugin](/user-packages/edit-plugin)

## Prerequisites

- Rust stable via [rustup](https://rustup.rs/)
- A C/C++ toolchain for native dependencies
- SDL3 development libraries for the editor shell

## Clone and build

```bash
git clone https://github.com/samwdp/volt.git
cd volt
cargo build -p volt -p volt-user
```

Debug binaries:

| Artifact | Path |
| --- | --- |
| Editor | `target/debug/volt` (`volt.exe` on Windows) |
| User library | `target/debug/user.dll` / `libuser.so` / `libuser.dylib` |

Release:

```bash
cargo build -p volt -p volt-user --release
```

## First launch

```bash
cargo run -p volt
```

Press **F1** (or run `help`) to ask a docs question; Volt opens search in a [browser](/plugins/browser) split. See [Help Plugin](/plugins/help).

Smoke-test without an interactive window:

```bash
cargo run -p volt -- --shell-hidden
```

List registered packages (useful after adding a plugin):

```bash
cargo run -p volt -- --bootstrap-demo
```

## Where customization lives

| Path | Purpose |
| --- | --- |
| `user/*.rs` | Builtin and custom plugin modules |
| `user/lib.rs` | Package registry (`packages()`) |
| `user/lang/` | Language packages |
| `user/config.yaml` + `user/config/` | Runtime YAML (often no rebuild) |
| `user/themes/` | Themes and shared UI options |
| `user/sdk/` | Stable plugin ABI (`editor-plugin-api`) |

Most help queries fall into one of two buckets:

1. **Rebuild required** — Rust package metadata (commands, hooks, keybindings, buffers)
2. **Hot reload** — YAML under `user/config/` and theme TOML under `user/themes/`

See [Configuration](/configuration) and [Build the user package](/user-packages/build).

## Next steps

1. Read [User packages overview](/user-packages/overview)
2. Learn the [core concepts](/user-packages/concepts)
3. Either [create a plugin](/user-packages/create-plugin) or [edit a builtin](/user-packages/edit-plugin)
