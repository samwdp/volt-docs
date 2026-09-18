# Page templates

Copy the closest template. Replace bracketed fields. Keep the Help query line.

## Plugin page

Path: `docs/plugins/<slug>.md`

```markdown
---
title: <Name> Plugin
description: What the <name> plugin does — <one-line capability summary>.
---

# <Name> Plugin

**Help query:** "What does the <name> plugin do?" / "How do I use <name> in Volt?"

<2–4 sentence summary grounded in source.>

| | |
| --- | --- |
| Package name | `<name>` |
| Module | `user/<file>.rs` |

## What it does

- <capability>
- <capability>

## Commands

| Command | Description |
| --- | --- |
| `<cmd>` | <from PluginCommand description> |

## Keybindings

| Chord | Command | Scope |
| --- | --- | --- |
| `<chord>` | `<cmd>` | <scope> |

_Or:_ No package-level keybindings (may be bound from vim leader maps or YAML).

## Notes

<YAML paths, buffer names, related hooks — only if present in source.>

## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Edit a plugin](/user-packages/edit-plugin)
```

After writing: add a row to `docs/plugins/catalog.md` and an item under **Builtin plugins** in `docs/.vitepress/config.ts`.

## Guide / list page

Path: `docs/guides/<slug>.md`

```markdown
---
title: <Title>
description: <Help-shaped description naming the list or how-to.>
---

# <Title>

**Help query:** "<natural question>" / "<variant>"

<Short intro.>

## <Primary section — the answer>

| … | … |
| --- | --- |
| … | … |

## Related pages

- <links>
```

Use this for catalogs (themes, commands) and how-tos (change font, change shell).

## User-package workflow page

Path: `docs/user-packages/<slug>.md`

Same frontmatter + Help query pattern. Emphasize concrete cargo/commands:

- `cargo build -p volt-user`
- `workspace.compile`
- register in `user/lib.rs` `packages()`
