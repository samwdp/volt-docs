---
title: Autocomplete Providers
description: How Volt autocomplete providers work and how to register a provider for your user plugin.
---

# Autocomplete Providers

**Help query:** "How do I add autocomplete to my plugin?" / "How do autocomplete providers work?"

Autocomplete is backed by providers registered in `user/autocomplete.rs` via `backends()`. Providers in the same **or-group** compete: once a higher-priority provider returns results, lower ones in that group are skipped.

## Default priority

| Priority | Provider | Or-group | Notes |
| --- | --- | --- | --- |
| 1 | `lsp` | `source` | Completions from an attached language server |
| 2 | `calculator` | `source` | Active in calculator buffers |
| 3 | `buffer` | `source` | Words already present in the buffer |

## Add a provider for your plugin

In your module:

```rust
pub fn autocomplete_provider() -> AutocompleteProviderConfig {
    AutocompleteProviderConfig::new(
        "myplugin",
        "My Plugin",
        MY_PROVIDER_ICON,
        MY_ITEM_ICON,
    )
    .with_buffer_kind(MY_BUFFER_KIND)
    .with_or_group(autocomplete::PROVIDER_SOURCE_GROUP)
    .with_items(my_autocomplete_items())
}
```

In `user/autocomplete.rs` `backends()`:

```rust
myplugin::autocomplete_provider(),
```

Then [rebuild the user package](/user-packages/build).

## Related pages

- [Create a plugin](/user-packages/create-plugin)
- [After scaffold](/user-packages/after-scaffold)
- [Calculator plugin](/plugins/catalog#calculator)
