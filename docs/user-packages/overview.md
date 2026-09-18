---
title: User Packages Overview
description: How Volt's compiled user library works — plugins, the plugin host, and the editor-plugin-api SDK boundary.
---

# User Packages Overview

Volt's extension system is a **compiled user library**. Every plugin is a Rust module under `user/`, compiled into a shared library that the editor loads at startup:

| Platform | Library name |
| --- | --- |
| Windows | `user.dll` |
| Linux | `libuser.so` |
| macOS | `libuser.dylib` |

The Cargo package is named `volt-user`; the built library artifact is named `user`.

## Architecture

```
volt (binary)
  → editor-plugin-host   loads packages, wires hooks & commands
  → user/sdk             stable ABI (crate editor-plugin-api)
  → user/ (volt-user)    your compiled plugins
       ├─ lib.rs         package registry & UserLibraryImpl
       ├─ vim.rs, oil.rs, calculator.rs, …
       └─ lang/          per-language packages
```

- **Plugin host** (`crates/editor-plugin-host`) reads `PluginPackage` metadata and registers commands, keybindings, hooks, and buffers.
- **SDK** (`user/sdk`, crate `editor-plugin-api`) is the only stable ABI boundary. Builtin plugins author against the SDK (plus crates.io), not against internal engine crates.
- The user library builds as both a **cdylib** (runtime load) and an **rlib** (dev / in-process API).

## User Source Tree (release installs)

Release builds can ship a **User Source Tree** beside the binary so you can edit builtin plugins and rebuild without the full Volt git checkout:

```bash
cd /path/to/install/user
cargo build --release -p volt-user
```

Inside a running release editor, `workspace.compile` prefills that build and hot-reloads the new library. See [Hot reload](/user-packages/hot-reload).

## What lives in the user package

| Kind | Examples | Rebuild? |
| --- | --- | --- |
| Feature plugins | `vim`, `oil`, `lsp`, `git`, `terminal` | Yes (Rust) |
| Language packages | `lang-rust`, `lang-python`, … | Yes |
| Runtime YAML | `config/ui.yaml`, `config/oil.yaml` | Usually no |
| Themes | `themes/*.toml`, `global.toml` | Usually no |
| Trait wiring | evaluators, autocomplete backends | Yes |

## Common help questions

| You ask | Go here |
| --- | --- |
| How do I build the user package? | [Build](/user-packages/build) |
| How do I create a new user plugin? | [Create a plugin](/user-packages/create-plugin) |
| I scaffolded a plugin — what next? | [After scaffold](/user-packages/after-scaffold) |
| How do I edit the vim / oil / compile plugin? | [Edit a plugin](/user-packages/edit-plugin) |
| What are packages, commands, hooks? | [Concepts](/user-packages/concepts) |
| Which builtins exist? | [Plugin catalog](/plugins/catalog) |

## Related pages

- [Getting started](/getting-started)
- [Configuration](/configuration)
- [Troubleshooting](/user-packages/troubleshooting)
