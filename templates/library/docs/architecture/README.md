# Architecture

High-level overview of the library design.

## Overview

<!-- Describe the library's purpose, its primary use cases, and any design goals (e.g. zero dependencies, tree-shakable, isomorphic). -->

## Module Structure

<!-- Describe the internal module layout and what each module is responsible for. -->

| Module         | Purpose                        |
| -------------- | ------------------------------ |
| `src/index.ts` | Public entry point — re-exports only |
| <!-- src/core.ts --> | <!-- Core logic --> |

## Public vs. Internal

- **Public:** anything exported from `src/index.ts`
- **Internal:** everything else — do not import internal modules directly from consuming code

## Extension Points

<!-- Describe any plugin systems, hooks, or extension mechanisms the library provides. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List runtime dependencies and why each one is justified. -->
