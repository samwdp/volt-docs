---
title: Plugin Concepts
description: PluginPackage, commands, actions, hooks, keybindings, and plugin buffers — the building blocks of Volt user plugins.
---

# Plugin Concepts

Every Volt extension is expressed as a `PluginPackage` plus optional host callbacks (evaluators, autocomplete providers). Understanding these pieces answers most "how does a plugin work?" help queries.

## Packages

A `PluginPackage` is the top-level unit of extension:

| Field | Description |
| --- | --- |
| `name` | Unique id (`"calculator"`, `"lsp"`, `"hello"`) |
| `auto_load` | `true` registers at startup; `false` is on-demand |
| `description` | Human-readable summary |
| `commands` | Commands the package exports |
| `key_bindings` | Keyboard chords mapped to commands |
| `hook_declarations` | Custom hooks the package introduces |
| `hook_bindings` | Run a command when a hook fires |
| `buffers` | Plugin-owned buffer types |

```rust
PluginPackage::new("my-plugin", true, "A short description.")
    .with_commands(vec![/* PluginCommand */])
    .with_key_bindings(vec![/* PluginKeyBinding */])
    .with_hook_declarations(vec![/* PluginHookDeclaration */])
    .with_hook_bindings(vec![/* PluginHookBinding */])
    .with_buffers(vec![/* PluginBuffer */])
```

Packages are collected in `user/lib.rs` inside `packages()` (plus `lang::packages()` for languages).

## Commands

A `PluginCommand` has a name, description, and a list of **actions**:

```rust
PluginCommand::new(
    "my-plugin.greet",
    "Logs a greeting message.",
    vec![PluginAction::log_message("Hello from my-plugin!")],
)
```

Commands appear in the command palette (`F3` or `:`).

## Actions

There are three `PluginAction` kinds today:

| Factory | What it does |
| --- | --- |
| `PluginAction::log_message(msg)` | Writes a diagnostic through the host |
| `PluginAction::open_buffer(name, kind, popup_title)` | Creates or surfaces a buffer |
| `PluginAction::emit_hook(hook, detail)` | Fires a hook for other subscribers |

```rust
PluginAction::open_buffer("*calculator*", "calculator", None::<&str>);
PluginAction::open_buffer("*terminal-popup*", "terminal", Some("Terminal"));
PluginAction::emit_hook("lsp.server-start", Some("rust-analyzer"));
```

Richer behavior goes through hooks that the host (or other packages) already understand.

## Hooks

Hooks are the event bus. Packages **declare** hooks and **bind** commands to them.

```rust
PluginHookDeclaration::new(
    "lang.rust.attached",
    "Runs after the Rust language package attaches to a buffer.",
);

PluginHookBinding::new(
    "buffer.file-open",
    "lang-rust.auto-attach",
    "lang-rust.attach",
    Some(".rs"),
);
```

Common host-owned hooks:

| Hook | Detail | Description |
| --- | --- | --- |
| `buffer.file-open` | basename / extension | File buffer opened |
| `buffer.save` | — | Save active buffer |
| `buffer.close` | — | Close active buffer |
| `plugin.evaluate` | — | Evaluate a plugin buffer |
| `plugin.switch-pane` | — | Switch panes in a split buffer |
| `plugin.run-command` | language | Open a compilation buffer |
| `plugin.rerun-command` | — | Re-run last compilation |
| `ui.picker.open` | picker variant | Open a picker |
| `workspace.save` | — | Save all modified buffers |
| `workspace.format` | — | Format active buffer |

Protocol constants also live in the SDK (`plugin_hooks`, `lsp_hooks`, `picker_hooks`, `dap_hooks`, …).

## Keybindings

```rust
PluginKeyBinding::new(
    "F5",
    "workspace.compile",
    PluginKeymapScope::Global,
)
```

Chord strings use `Ctrl+`, `Alt+`, `Shift+`, and `Gui+` (legacy `C-` still works).

Important scopes:

| Scope | When active |
| --- | --- |
| `Global` | Always |
| `Workspace` | Workspace pane focused |
| `Popup` | Inside a popup |
| `WorkspaceDock` | Workspace dock focused |
| `AcpDock` | ACP dock focused |
| `Autocomplete` | Autocomplete UI |
| `Hover` | Hover UI |
| `Dap` | DAP UI |
| `Multicursor` | Multicursor mode |

Bindings can also restrict Vim mode (`Normal`, `Insert`, `Visual`, or `Any`).

## Plugin buffers

Plugins declare custom buffer kinds. The host owns lifecycle; the plugin supplies initial content, optional sections, and an evaluate handler.

Current API (prefer this over older two-string constructors):

```rust
PluginBufferSections::new(vec![
    PluginBufferSection::new("Input")
        .with_writable(true)
        .with_initial_lines(initial_buffer_lines()),
    PluginBufferSection::new("Output")
        .with_min_lines(1)
        .with_initial_lines(vec!["(press Ctrl+c Ctrl+c to evaluate)".to_owned()])
        .with_update(PluginBufferSectionUpdate::Replace),
])
```

See `user/calculator.rs` for a full evaluate cycle, and wire the handler in `UserLibraryImpl::run_plugin_buffer_evaluator` inside `user/lib.rs`.

### Section-tree buffers

For magit-style trees (collapse headers, interactable items), declare:

```rust
PluginBuffer::new("my-kind", vec!["Loading…".to_owned()])
    .with_section_handler("my.handler")
```

That sets `PluginBufferContentMode::SectionTree`. Host hooks `plugin.section.refresh|activate|toggle|prev-item|next-item` call `UserLibrary::run_plugin_section_handler`, which uses the evaluator JSON protocol (`section:<handler>`). See `user/dotnet.rs`.

## In-process Volt API

New host capabilities for packages go through the SDK function table:

- `volt::buf` — buffer introspection (including section action / set cursor)
- `volt::job` — Silent Commands (`run_silent`)
- `volt::workspace_root` — active workspace path
- `volt::lsp` — language server requests
- `volt::ui` — UI helpers such as opening locations
- `volt::hook` — hook-related helpers

Author against `editor-plugin-api`, not internal `crates/editor-*` paths.

## Related pages

- [Create a plugin](/user-packages/create-plugin)
- [After scaffold checklist](/user-packages/after-scaffold)
- [Edit a plugin](/user-packages/edit-plugin)
