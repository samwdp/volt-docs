---
title: LSP Plugin
description: Language server integration — start/stop from pickers, navigation, diagnostics, code actions, Copilot, and auto-start on file open.
---

# LSP Plugin

**Help query:** "What does the lsp plugin do?" / "How do I use lsp in Volt?" / "How do I start rust-analyzer?"

The **lsp** plugin is Volt's language server integration. It starts and stops servers, jumps to definition/references/implementation, shows diagnostics and code actions, supports Copilot sign-in, and auto-starts the right server when matching files open. Live sessions are Owned Processes: Workspace Close and Application Quit tear them down through Process Launch.

| | |
| --- | --- |
| Package name | `lsp` |
| Module | `user/lsp.rs` |

## What it does

- Start, stop, and restart language servers (stop/restart choose a live session from a picker)
- Go to definition, references, and implementation
- Show diagnostics and code actions
- Install servers via picker and manage Copilot auth
- Auto-start servers from `buffer.file-open` hook bindings by extension
- Expose per-server `lsp.start-*` commands (rust-analyzer, marksman, typescript-language-server, and others)

## Commands

| Command | Description |
| --- | --- |
| `lsp.start` | Starts the language servers registered for the active file. |
| `lsp.stop` | Stops a live Language Server Session chosen from a picker. |
| `lsp.restart` | Restarts a live Language Server Session chosen from a picker. |
| `lsp.log` | Opens the live LSP transport log buffer. |
| `lsp.definition` | Jumps to the LSP definition under the cursor. |
| `lsp.references` | Finds LSP references for the symbol under the cursor. |
| `lsp.implementation` | Jumps to LSP implementations for the symbol under the cursor. |
| `lsp.diagnostics` | Opens a picker of current LSP diagnostics from live servers. |
| `lsp.code-actions` / `lsp.code-action` | Opens LSP code actions available at the cursor. |
| `lsp.copilot-sign-in` | Starts GitHub Copilot device authentication for the active file. |
| `lsp.copilot-sign-out` | Signs the active GitHub Copilot language server session out. |
| `lsp.install-server` | Installs a Language Server from a picker, or a Spec id. |

Additional `lsp.start-*` commands exist per registered server — see `user/lsp.rs`.

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+Space` | `lsp.code-actions` | Workspace (Normal) |

## Notes

Auto-start bindings fire on `buffer.file-open` for registered extensions (`.rs`, `.md`, `.ts`/`.tsx`/`.js`/`.jsx`, `.cs`/`.razor`/`.cshtml`, and more). Language-server specs are exported from `user/lsp.rs` via `language_servers()`.

## Related pages

- [ACP Plugin](/plugins/acp)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
