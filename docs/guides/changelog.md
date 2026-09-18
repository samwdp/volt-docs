---
title: Changelog
description: Recent Volt editor changes relevant to docs, plugins, and in-editor help — filter by date and type.
---

# Changelog

**Help query:** "What changed in Volt?" / "Volt changelog" / "Recent Volt features"

Filter-friendly log of user-facing editor changes mirrored into these docs. Issue links use GitHub: `#N` → `https://github.com/samwdp/volt/issues/N`.

## 2026-09-18

| Type | Summary |
| --- | --- |
| feat | Embedded browser: tabs, bookmarks, bookmark-add, and browser dock (`j`/`k`/`Ctrl+d`) — [Browser](/plugins/browser) |
| feat | In-editor help: `help` command + **F1** opens docs search in a browser split — [Help](/plugins/help) |
| feat | Picker previews show more file body lines (shared 256-line cap) and configurable split fraction — [Picker](/plugins/picker) |
| fix | User Library hot reload after `workspace.compile` (Windows staging under `volt-user-hot/`) — [Hot reload](/user-packages/hot-reload) |

## 2026-09-17

| Type | Summary |
| --- | --- |
| feat | Workspace dock + switch picker keybinds: dock `j`/`k`/`Ctrl+d`; switch picker `Ctrl+d` deletes — [Workspace dock](/plugins/workspace-dock), [Workspace](/plugins/workspace) |

## 2026-09-13

| Type | Summary |
| --- | --- |
| feat | Owned Process / Process Launch lifecycle: Workspace Close and Application Quit tear down terminals, jobs, LSP, DAP, and ACP helpers ([#94](https://github.com/samwdp/volt/issues/94); also [#87](https://github.com/samwdp/volt/issues/87), [#88](https://github.com/samwdp/volt/issues/88), [#89](https://github.com/samwdp/volt/issues/89)) |

## 2026-09-12

| Type | Summary |
| --- | --- |
| feat | LSP lifecycle/start commands and ACP dock, plan/output pane switch, session/model pickers — [LSP](/plugins/lsp), [ACP](/plugins/acp) |

## Related pages

- [Getting Started](/getting-started)
- [Builtin plugin catalog](/plugins/catalog)
