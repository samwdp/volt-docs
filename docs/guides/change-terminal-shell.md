---
title: Change the Terminal Shell
description: Configure Volt's builtin terminal shell via user/config/ui.yaml without rebuilding.
---

# Change the Terminal Shell

**Help query:** "How do I change the terminal shell?" / "How do I use pwsh in Volt terminal?"

Prefer YAML so the change applies at runtime.

Edit `user/config/ui.yaml`:

```yaml
terminal:
  program: pwsh
  args: ["-NoLogo"]
```

Save the file. The next terminal buffer opened through `user/terminal.rs` picks up the new shell via `crate::config::load()`.

If `program` is empty, Volt falls back to the platform default compiled into the user library.

## Related pages

- [Configuration](/configuration)
- [Plugin catalog — terminal](/plugins/catalog)
