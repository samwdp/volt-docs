---
title: Help Plugin
description: Open Volt docs search from the editor — F1 prompts for a question and opens results in a browser split.
---

# Help Plugin

**Help query:** "What does the help plugin do?" / "How do I open docs search?" / "What is F1 in Volt?"

The **help** plugin prompts for a docs question, then opens the Volt documentation search page in an embedded browser split. Default chord is **F1**. The only intended edit in `user/help.rs` is that keybind.

| | |
| --- | --- |
| Package name | `help` |
| Module | `user/help.rs` |

## What it does

- Prompt for a natural-language docs question
- Build the docs search URL (`/volt-docs/search?q=…`)
- Open that URL in a browser split via the help open hook

## Commands

| Command | Description |
| --- | --- |
| `help` | Asks for a question, then opens the Volt docs search page in a browser split. |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `F1` | `help` | Global |

## Notes

Search URL shape matches the VitePress site base: `https://samwdp.github.io/volt-docs/search?q=<urlencoded question>`. In-editor help uses the same path under the app's docs host.

## Related pages

- [Search / Help](/search)
- [Browser Plugin](/plugins/browser)
- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
