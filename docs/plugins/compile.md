---
title: Compile Plugin
description: Workspace build/compile commands — stream output, recompile, and hot-reload the volt-user library.
---

# Compile Plugin

**Help query:** "What does the compile plugin do?" / "How do I use compile in Volt?" / "How do I reload user.dll?"

The **compile** plugin owns workspace build workflows: prompt for a build command and stream output, re-run the last build, and reload the running **User Library** after rebuilding `volt-user`. On successful `workspace.compile` in a User Source Tree install, the host stages a unique library copy and hot-reloads it automatically.

| | |
| --- | --- |
| Package name | `compile` |
| Module | `user/compile.rs` |

## What it does

- Prompt for and run a workspace build command in a `*compile <workspace>*` popup
- Prefill from workspace root markers (User Source Tree: `cargo build --release -p volt-user`)
- Re-run the last build command for the active workspace
- Hot-reload the User Library after a successful rebuild (Windows stages under `target/<profile>/volt-user-hot/`)
- Optionally reload without rebuilding via `workspace.reload-user-library`
- Supply per-language default build commands via `default_build_command()`

## Commands

| Command | Description |
| --- | --- |
| `workspace.compile` | Prompt for the build command, then stream it in a popup. |
| `workspace.recompile` | Re-run the last build command for the active workspace. |
| `workspace.reload-user-library` | Reload the running user library state after rebuilding `volt-user`. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `S-F5` | `workspace.recompile` | Global |

## Notes

In release User Source Tree installs, compile/reload pairs with hot-reload staging. See [Build the user package](/user-packages/build) and [Hot reload](/user-packages/hot-reload).

## Related pages

- [Hot reload](/user-packages/hot-reload)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
