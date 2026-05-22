# Architecture

High-level overview of the CLI tool design.

## Overview

<!-- Describe the tool's purpose, primary users, and design goals (e.g. fast startup, composable, scriptable). -->

## Command Tree

<!-- Document the full command hierarchy. -->

```
{{projectName}}
├── --version
├── --help
├── <command>
│   ├── --help
│   └── [subcommand]
└── ...
```

## Argument Parsing

<!-- Describe the argument parsing library used and any conventions around it. -->

## Configuration Resolution

Configuration is resolved in this order (highest priority first):

1. CLI flags
2. Environment variables
3. Project-level config file
4. User-level config file
5. Built-in defaults

<!-- Describe the config file format and location. -->

## Plugin System

<!-- If applicable, describe any plugin or extension mechanism. Otherwise remove this section. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, APIs, or system dependencies this tool requires. -->
