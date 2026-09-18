---
title: Hot Reload the User Library
description: How Volt hot-reloads the user package with workspace.compile, staging paths, and VOLT_USER_LIBRARY.
---

# Hot Reload the User Library

**Help query:** "How do I hot reload plugins?" / "What is workspace.compile?" / "How do I reload user.dll?"

## In a release install

1. Open the released Volt binary (User Source Tree is the default workspace beside the executable).
2. Run the command **`workspace.compile`** (default chord often `F5` via the compile package — confirm in your keybindings).
3. The prompt prefills `cargo build --release -p volt-user`.
4. On success Volt:
   - Copies the artifact to a unique path under `user/target/<profile>/volt-user-hot/`
   - Loads that copy into the running process
   - Shows a success notification

Staging avoids overwriting a mapped library. That matters especially on **Windows**, where a loaded `user.dll` cannot be replaced in place.

## From source (dev loop)

During development you usually rebuild and restart, or rebuild and relaunch:

```bash
cargo build -p volt-user
cargo run -p volt
```

Headless checks:

```bash
cargo run -p volt -- --shell-hidden
cargo run -p volt -- --bootstrap-demo
```

## Override library path

```bash
# Windows
set VOLT_USER_LIBRARY=P:\volt\target\debug\user.dll
```

Point at the platform-specific artifact name.

## What hot-reloads without rebuilding

| Asset | Mechanism |
| --- | --- |
| `user/config/*.yaml` | Config watcher / `config::load()` |
| `user/themes/*.toml` | Theme watcher |
| Rust package metadata | Requires rebuild (+ hot swap via `workspace.compile` in release) |

## ABI notes

The Plugin SDK is the stable boundary. Hot-reloaded cdylib copies may fall back to host-side workers for some capabilities until non-prefix ABI seams exist. Prefer rebuilding against a matching SDK when you change host APIs.

See ADR 0008 in the Volt repository: *User Source Tree and Plugin SDK boundary*.

## Related help topics

- [Build the user package](/user-packages/build)
- [Troubleshooting](/user-packages/troubleshooting)
