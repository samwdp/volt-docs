---
title: DAP Plugin
description: Debug Adapter Protocol integration — launch, breakpoints, stepping, locals, REPL, and expressions.
---

# DAP Plugin

**Help query:** "What does the dap plugin do?" / "How do I use dap in Volt?"

The **dap** plugin integrates Debug Adapter Protocol sessions. It launches adapters (codelldb, gdb, and others), manages breakpoints, stepping, threads/stack frames, locals/expressions panes, and a debug REPL.

| | |
| --- | --- |
| Package name | `dap` |
| Module | `user/dap.rs` |

## What it does

- Start, stop, restart, continue, and pause debug sessions
- Step over/into/out and manage breakpoints / logpoints
- Inspect locals, expressions, and use the debug REPL
- Switch threads and stack frames

## Commands

| Command | Description |
| --- | --- |
| `dap.start` | Starts a debug session. |
| `dap.stop` | Stops the active debug session. |
| `dap.restart` | Restarts the active debug session. |
| `dap.continue` | Continues execution. |
| `dap.pause` | Pauses execution. |
| `dap.step` | Steps over. |
| `dap.step-into` | Steps into. |
| `dap.step-out` | Steps out. |
| `dap.toggle-breakpoint` | Toggles a breakpoint at the cursor. |
| `dap.repl` | Opens the DAP REPL. |
| `dap.eval` | Evaluates an expression. |
| `dap.install-server` | Installs or picks a debug adapter. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `F5` | `dap.start / dap.continue` | Global start; Dap scope continue |
| `F10` | `dap.step` | Dap |
| `F11` | `dap.step-into` | Dap |
| `Space t b` | `dap.toggle-breakpoint` | Workspace |

## Notes

Additional commands cover breakpoint conditions, logpoints, expression add/remove, goto-breakpoint, toggle-variable, and `start-<adapter>` variants. See `user/dap.rs`.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
