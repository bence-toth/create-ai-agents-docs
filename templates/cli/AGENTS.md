# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this CLI tool does and who uses it. -->

`{{projectName}}` is a command-line tool written in **{{language}}**.

## Repository Structure

```
{{projectName}}/
├── src/
│   ├── commands/      # One file per top-level command
│   ├── lib/           # Shared logic used across commands
│   └── index.ts       # Entry point — registers commands and parses argv
├── tests/
│   ├── unit/
│   └── integration/
└── docs/
    └── commands/      # Per-command documentation
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install dependencies
npm install

# Build
npm run build

# Run in development (without building)
npm run dev -- <command> [args]

# Run tests
npm test
```

## Command Structure

Commands follow this pattern:

```
{{projectName}} <command> [subcommand] [flags] [arguments]
```

- **Commands** are the top-level verbs (e.g. `init`, `build`, `deploy`).
- **Subcommands** extend a command (e.g. `{{projectName}} config get`, `{{projectName}} config set`).
- **Flags** modify behavior and follow POSIX conventions: `--flag value` or `--flag=value`; short forms `-f value` for single-character flags.
- **Arguments** are positional values that a command operates on.

## Adding a New Command

1. Create a file in `src/commands/<command-name>.ts` (or equivalent).
2. Register it in `src/index.ts`.
3. Add integration tests in `tests/integration/`.
4. Document it in `docs/commands/<command-name>.md`.
5. Update the help text — every command must have a `--help` description.

## Output Conventions

- **stdout** — all intended output (data, success messages). This is what callers pipe or redirect.
- **stderr** — diagnostic output (errors, warnings, progress indicators). This never pollutes stdout.
- **Exit codes:**
  - `0` — success
  - `1` — general error (invalid input, runtime failure)
  - `2` — misuse (unknown command, missing required argument)
- Use structured output (JSON) when the `--json` flag is present, so callers can parse output programmatically.
- Write human-readable output by default; machine-readable output on `--json`.

## Help Text Style

- Every command must have a one-line description used in `--help` listings.
- Include usage examples in the per-command help.
- Flag descriptions should state the type, default, and effect.

## Configuration

<!-- Describe how the CLI finds its configuration (config file location, env vars, flags precedence). -->

Configuration is resolved in this order (highest priority first):

1. Flags passed at the command line
2. Environment variables
3. Project-level config file (`.{{projectName}}rc` or `{{projectName}}.config.json`)
4. User-level config file (`~/.config/{{projectName}}/config.json`)
5. Built-in defaults

## Testing CLI Commands

Integration tests should invoke the CLI as a subprocess and assert on stdout, stderr, and exit code. Do not call command functions directly in integration tests — test the full CLI surface.

```sh
npm run test:integration
```

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design notes and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not write to stdout for diagnostic output — use stderr.
- Do not exit with code `0` when an error occurred.
- Do not parse flags manually — use the argument parsing library.
- Do not make network requests without informing the user (show a spinner or message).
- Do not commit build artifacts (`dist/`, `bin/`).
