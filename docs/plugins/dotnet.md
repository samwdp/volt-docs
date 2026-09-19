---
title: Dotnet Plugin
description: NuGet package list, search, install, update, and remove via magit-style section buffers driven by the dotnet CLI.
---

# Dotnet Plugin

**Help query:** "What does the dotnet plugin do?" / "How do I manage NuGet packages in Volt?" / "dotnet package search"

The **dotnet** plugin (`user/dotnet.rs`) opens a **section-tree buffer** for NuGet packages. It talks to the `dotnet` CLI through the plugin Volt API (`volt::job`) and builds its UI with the generic `PluginBuffer` section-handler path — no dotnet-specific code in core crates.

| | |
| --- | --- |
| Package name | `dotnet` |
| Module | `user/dotnet.rs` |
| Packages buffer | `*dotnet-packages*` |
| Search buffer | `*dotnet-search*` |

## What it does

1. Lists package references per project from `dotnet package list --format json`
2. Searches NuGet with `dotnet package search --format json`
3. Installs, updates, and removes packages with `dotnet package add` / `update` / `remove`
4. When several `.csproj` files exist, asks which project should receive an install

## Open and refresh

| Command | Description |
| --- | --- |
| `dotnet.open` | Opens `*dotnet-packages*` and refreshes |
| `dotnet.refresh` | Rebuilds the focused section-tree buffer |
| `dotnet.search` | Opens search buffer and prompts for a query |

## Packages buffer keybindings

| Chord | Command | Action |
| --- | --- | --- |
| `h` | `dotnet.prev-item` | Previous package row |
| `j` | `dotnet.next-item` | Next package row |
| `s` | `dotnet.search` | Search NuGet |
| `a` | `dotnet.add` | Install package under cursor |
| `u` | `dotnet.update` | Update package under cursor |
| `d` | `dotnet.delete` | Remove package under cursor |
| `g r` | `dotnet.refresh` | Refresh list |

## Search buffer

Press `s` from the packages buffer (or run `dotnet.search`). Enter a query in the prompt. Results land in `*dotnet-search*`. Use `a` or Enter on a row to install. Multiple projects open a chooser section.

## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Plugin concepts](/user-packages/concepts)
- [Edit a plugin](/user-packages/edit-plugin)
