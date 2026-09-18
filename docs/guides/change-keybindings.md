---
title: Change Keybindings
description: How to change Volt keybindings in plugin Rust modules or oil YAML configuration.
---

# Change Keybindings

**Help query:** "How do I change keybindings?" / "How do I rebind F5?" / "How do I change the vim leader?"

## Rust plugin bindings

Most chords are declared on a `PluginPackage` with `PluginKeyBinding::new(chord, command, scope)`.

1. Find the plugin in the [catalog](/plugins/catalog)
2. Edit the chord string in that module
3. [Rebuild the user package](/user-packages/build)

Examples live on [Edit a plugin](/user-packages/edit-plugin#changing-keybindings).

## Oil keybindings (YAML)

Edit `user/config/oil.yaml` — no rebuild required.

## Scope matters

If a binding "does nothing", check `PluginKeymapScope` and optional Vim mode filters in [Plugin concepts](/user-packages/concepts#keybindings).

## Related pages

- [Edit a plugin](/user-packages/edit-plugin)
- [Configuration](/configuration)
