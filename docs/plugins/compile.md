---
title: Compile Plugin
description: Workspace build/compile commands, recompile, and reload of the volt-user library.
---

# Compile Plugin

**Help query:** "What does the compile plugin do?" / "How do I use compile in Volt?"

The **compile** plugin owns workspace build workflows: prompt for a build command and stream output, re-run the last build, and reload the running **user library** after rebuilding `volt-user`.

| | |
| --- | --- |
| Package name | `compile` |
| Module | `user/compile.rs` |

## What it does

- Prompt for and run a workspace build command in a popup
- Re-run the last build command
- Reload the hot-swapped user library after a volt-user rebuild
- Supply per-language default build commands via `default_build_command()`

## Commands

| Command | Description |
| --- | --- |
| `workspace.compile` | Prompt for the build command, then stream it in a popup. |
| `workspace.recompile` | Re-run the last build command for the active workspace. |
| `workspace.reload-user-library` | Reload the running user library state after rebuilding volt-user. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `S-F5` | `workspace.recompile` | Global |

## Notes

In release User Source Tree installs, compile/reload pairs with `workspace.compile` hot-reload staging. See Build the user package and Hot reload docs.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
