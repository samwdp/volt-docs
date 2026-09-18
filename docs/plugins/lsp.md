---
title: LSP Plugin
description: Language server integration — start/stop, navigation, diagnostics, code actions, Copilot, and auto-start on file open.
---

# LSP Plugin

**Help query:** "What does the lsp plugin do?" / "How do I use lsp in Volt?"

The **lsp** plugin is Volt's language server integration. It starts and stops servers, jumps to definition/references/implementation, shows diagnostics and code actions, supports Copilot sign-in, and auto-starts the right server when matching files open.

| | |
| --- | --- |
| Package name | `lsp` |
| Module | `user/lsp.rs` |

## What it does

- Start, stop, and restart language servers (including per-server start commands)
- Go to definition, references, and implementation
- Show diagnostics and code actions
- Install servers via picker and manage Copilot auth
- Auto-start servers from buffer.file-open hook bindings by extension

## Commands

| Command | Description |
| --- | --- |
| `lsp.start` | Starts the language server for the active context. |
| `lsp.stop` | Stops the active language server. |
| `lsp.restart` | Restarts the active language server. |
| `lsp.log` | Opens the LSP log. |
| `lsp.definition` | Goes to definition. |
| `lsp.references` | Finds references. |
| `lsp.implementation` | Goes to implementation. |
| `lsp.diagnostics` | Shows diagnostics. |
| `lsp.code-actions` | Shows available code actions. |
| `lsp.copilot-sign-in` | Signs in to Copilot. |
| `lsp.copilot-sign-out` | Signs out of Copilot. |
| `lsp.install-server` | Opens the language server install picker. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+Space` | `lsp.code-actions` | Workspace (Normal) |

## Notes

Many additional `lsp.start-*` per-server commands exist (rust-analyzer, pyright, gopls, and others). Auto-start bindings fire on `buffer.file-open` for registered extensions. See `user/lsp.rs` for the full server table.
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
