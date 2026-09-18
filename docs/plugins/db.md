---
title: DB Plugin
description: Database sessions — connections, schema browsing, SQL query buffers, history, snippets, and dashboard.
---

# DB Plugin

**Help query:** "What does the db plugin do?" / "How do I use db in Volt?"

The **db** plugin turns Volt into a lightweight database workbench: connect to databases, browse schema, run SQL in query buffers, keep history/snippets, and use a multi-pane dashboard.

| | |
| --- | --- |
| Package name | `db` |
| Module | `user/db.rs` |

## What it does

- Connect and disconnect database sessions
- Browse tables/schema and refresh metadata
- Open SQL query buffers and execute statements
- Manage connection history, snippets, and a dashboard multiview

## Commands

| Command | Description |
| --- | --- |
| `db.connect` | Starts a database connection flow. |
| `db.disconnect` | Disconnects the active database session. |
| `db.show-tables` | Shows tables for the active connection. |
| `db.new-query-buffer` | Opens a new SQL query buffer. |
| `db.execute-sql` | Executes SQL from the query buffer. |
| `db.show-connections` | Shows saved/active connections. |
| `db.show-history` | Shows query history. |
| `db.show-snippets` | Shows SQL snippets. |
| `db.save-snippet` | Saves the current query as a snippet. |
| `db.refresh-schema` | Refreshes schema metadata. |
| `db.dashboard` | Opens the DB dashboard. |
| `db.multiview` | Opens the DB multiview layout. |
| `db.switch-pane` | Switches focus between DB panes. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `Ctrl+c Ctrl+c` | `db.execute-sql` | Query / dashboard buffers |
| `Ctrl+s` | `db.save-snippet` | Query buffers |
| `Ctrl+Tab` | `db.switch-pane` | DB panes |
| `Enter` | `db.activate-line / db.submit-connect` | Browsers / connect popup |

## Notes

Buffer names follow `*db-*` patterns (query, schema, history, snippets, results, dashboard).
## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
- [Plugin concepts](/user-packages/concepts)
