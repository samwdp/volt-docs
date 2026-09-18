---
title: Add a Language
description: How to add language support to Volt — user/lang modules, common helper, syntax registration, and LSP servers.
---

# Add a Language

**Help query:** "How do I add a language?" / "How do I add tree-sitter / LSP for a language?"

Language packages live under `user/lang/`. Prefer the shared helper in `user/lang/common.rs` when it fits; otherwise implement `package()` and `syntax_language()` manually.

## Module layout

1. Create `user/lang/<id>.rs`
2. Export `package()` and usually `syntax_language()`
3. Register in `user/lang/mod.rs`:
   - `pub mod <id>;`
   - add to `packages()`
   - add to `syntax_languages()`
4. Optional: add a `LanguageServerSpec` in `user/lsp.rs` `language_servers()`
5. [Build the user package](/user-packages/build)

Package naming convention from the helper: `lang-{language_id}`, attach command `lang-{id}.attach`, hook `lang.{id}.attached`.

## Using the common helper

The helper builds a standard attach command, file-open hook binding, and syntax configuration. Copy a recent language module that already uses `common::package` / `common::syntax_language` and adjust:

- language id / display name
- file extensions
- grammar source
- capture → theme token mappings

## Manual package sketch

```rust
PluginPackage::new("lang-python", true, "Python language defaults.")
    .with_commands(vec![/* lang-python.attach */])
    .with_hook_declarations(vec![/* lang.python.attached */])
    .with_hook_bindings(vec![
        PluginHookBinding::new(
            "buffer.file-open",
            "lang-python.auto-attach",
            "lang-python.attach",
            Some(".py"),
        ),
    ])
```

## Syntax-only languages

Some grammars register syntax without a full `PluginPackage` (for example commit message highlighting). Follow existing `syntax_languages()`-only patterns in `user/lang/` when you do not need attach hooks.

## LSP server

In `user/lsp.rs`, append a server spec for your language's binary and file types, then rebuild.

## Verify

```bash
cargo build -p volt-user
cargo run -p volt -- --bootstrap-demo
cargo run -p volt
```

Open a file with the new extension and confirm highlighting / LSP attach.

## Related pages

- [Plugin concepts](/user-packages/concepts)
- [Plugin catalog](/plugins/catalog)
- [Build](/user-packages/build)
