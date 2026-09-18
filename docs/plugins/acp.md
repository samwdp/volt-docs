---
title: ACP Plugin
description: Agent Client Protocol integrations — clients, sessions, models, permissions, plan/output panes, and the ACP dock.
---

# ACP Plugin

**Help query:** "What does the acp plugin do?" / "How do I use acp in Volt?" / "How do I open the ACP dock?"

The **acp** plugin integrates **Agent Client Protocol** clients into Volt. It manages client/session/model/mode pickers, permission approve/deny, an ACP buffer with plan/output panes, and an ACP dock for switching sessions. ACP helper processes are Owned Processes tied to workspace lifetime.

| | |
| --- | --- |
| Package name | `acp` |
| Module | `user/acp.rs` |

## What it does

- Pick and connect ACP clients configured in user config
- Create sessions and switch modes/models
- Switch focus between plan and output panes
- Handle permission prompts (approve/deny)
- Provide dock navigation and input focus helpers

## Commands

| Command | Description |
| --- | --- |
| `acp.pick-client` | Opens the ACP client picker. |
| `acp.pick-session` | Opens the ACP session picker for the active client. |
| `acp.new-session` | Creates a new ACP session for the active client in a new buffer. |
| `acp.pick-mode` | Opens the ACP mode picker for the active session. |
| `acp.pick-model` | Opens the ACP model picker for the active session. |
| `acp.cycle-mode` | Cycles to the next ACP session mode. |
| `acp.switch-pane` | Switches focus between the ACP plan and output panes. |
| `acp.complete-slash` | Opens ACP slash command completion. |
| `acp.focus-input` | Focuses the ACP input section and enters insert mode. |
| `acp.disconnect` | Disconnects the active ACP client. |
| `acp.permission-approve` | Approves the latest ACP permission request. |
| `acp.permission-deny` | Denies the latest ACP permission request. |
| `acp.dock.toggle` | Shows or hides the ACP dock for the active workspace. |
| `acp.dock.previous` | Moves to the previous ACP buffer in the dock list. |
| `acp.dock.next` | Moves to the next ACP buffer in the dock list. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Shift+Tab` | `acp.cycle-mode` | Global (Insert) |
| `Ctrl+Tab` | `acp.switch-pane` | Workspace |
| `Ctrl+m` | `acp.pick-model` | Workspace (Normal) |
| `Ctrl+s` | `acp.pick-session` | Workspace (Normal) |
| `j` / `k` | `acp.dock.next` / `previous` | AcpDock |
| `I` | `acp.focus-input` | Workspace (Normal) on ACP buffer |

## Notes

Client list comes from `user/config/acp.yaml` (via `config.yaml`). Buffer kind is `acp`.

## Related pages

- [LSP Plugin](/plugins/lsp)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
