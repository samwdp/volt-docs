---
title: Calculator Plugin
description: What the calculator plugin does — expression evaluator buffer with Input/Output panes, evaluate chord, and math functions.
---

# Calculator Plugin

**Help query:** "What does the calculator plugin do?" / "How do I use the calculator?" / "How do I evaluate expressions in Volt?"

The **calculator** plugin (`user/calculator.rs`) provides an **expression evaluator buffer**. You write assignments and math expressions in an Input pane, evaluate them, and read results in an Output pane — without leaving the editor.

| | |
| --- | --- |
| Package name | `calculator` |
| Module | `user/calculator.rs` |
| Buffer name | `*calculator*` |
| Buffer kind | `calculator` |

## What it does

1. Opens a split buffer with **Input** (writable) and **Output** (results) sections
2. Parses lines as comments (`# …`), assignments (`name = expr`), or expressions
3. Evaluates with a recursive-descent math engine (functions + constants)
4. Replaces the Output section with results when you evaluate
5. Supplies calculator-scoped **autocomplete** and **hover** for built-in functions/constants

## Open the calculator

| Action | How |
| --- | --- |
| Command | `calculator.open` (command palette) |
| Typical leader path | via picker / command palette (`F3`) |

```text
calculator.open
```

## Evaluate and switch panes

| Command | Description | Default chord |
| --- | --- | --- |
| `calculator.evaluate` | Evaluate Input → write results to Output | `Ctrl+c Ctrl+c` |
| `calculator.switch-pane` | Focus Input ↔ Output | `Ctrl+Tab` |

Bindings apply in the **Workspace** scope while the calculator buffer is active. Evaluate emits the host hook `plugin.evaluate`; the user library handler id is `calculator.evaluate-buffer`.

## Example session

Initial Input content looks like:

```text
# Write expressions below. Press Ctrl+c Ctrl+c to evaluate…
a = 1
b = 2
sqrt(a + b)
```

Press `Ctrl+c Ctrl+c`. Output shows the evaluated results. Change values, evaluate again.

## Language surface

Supported ideas (see `user/calculator.rs` for the full implementation):

- Arithmetic operators and parentheses
- Assignments reused by later lines
- Functions such as `sqrt`, trig, logs, `pow`, and related helpers
- Constants such as `pi`, `e`, `tau`, `inf`, `nan`
- `#` line comments

Autocomplete and hover providers are limited to calculator buffers so they do not compete with LSP elsewhere.

## Commands reference

| Command | Description |
| --- | --- |
| `calculator.open` | Open the calculator buffer in the active pane |
| `calculator.evaluate` | Evaluate input and replace the Output section |
| `calculator.switch-pane` | Switch focus between Input and Output |

## Related pages

- [Builtin plugin catalog](/plugins/catalog)
- [Create a plugin](/user-packages/create-plugin) — calculator is the reference buffer+evaluator pattern
- [Autocomplete providers](/user-packages/autocomplete)
