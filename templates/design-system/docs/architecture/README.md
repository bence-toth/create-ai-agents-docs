# Architecture

High-level overview of the design system structure.

## Overview

<!-- Describe the design system's purpose, which products consume it, and its design goals. -->

## Token Hierarchy

```
Primitive tokens  (blue-500: #3b82f6)
    └─▶ Semantic tokens  (color-primary: {blue-500})
              └─▶ Component tokens  (button-background: {color-primary})
```

- **Themes** override semantic tokens only.
- **Components** reference semantic or component tokens only — never primitives.

## Component Composition Model

<!-- Describe how components are composed: slots, compound components, render props, etc. -->

## Theming

<!-- Describe the theming mechanism: CSS custom properties, theme providers, style injection, etc. -->

## Component Categories

<!-- Group components by category. -->

| Category      | Examples                              |
| ------------- | ------------------------------------- |
| Primitives    | Box, Text, Icon                       |
| Inputs        | Button, TextField, Checkbox, Select   |
| Layout        | Stack, Grid, Divider                  |
| Feedback      | Alert, Toast, Spinner                 |
| Navigation    | Tabs, Breadcrumb, Menu                |
| Overlay       | Modal, Popover, Tooltip               |

<!-- Update the table above to reflect the actual component inventory. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List peer dependencies and any third-party libraries used internally. -->
