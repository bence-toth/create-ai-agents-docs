# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this monorepo contains and its primary purpose. -->

This is a monorepo managed with **{{workspaceTool}}**, containing multiple packages and/or services that share tooling and infrastructure.

## Workspace Structure

```
{{projectName}}/
├── packages/          # Shared libraries consumed by other packages
├── apps/              # Deployable applications and services
├── tools/             # Internal tooling and scripts
└── package.json       # Workspace root — do not add app dependencies here
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Package Boundaries

- Each package in `packages/` and `apps/` is an independent unit with its own `package.json`.
- Do **not** import across packages using relative paths (e.g. `../../packages/foo`). Use the package name as declared in its `package.json`.
- Circular dependencies between packages are not allowed.
- Shared code belongs in `packages/`, not duplicated across apps.

## Running Commands

### Workspace root (affects all packages)

```sh
# Install all dependencies
{{workspaceTool}} install

# Run all tests across the workspace
{{workspaceTool}} run test --recursive

# Lint all packages
{{workspaceTool}} run lint --recursive

# Build all packages in dependency order
{{workspaceTool}} run build --recursive
```

### Single package

```sh
# Run commands scoped to one package
{{workspaceTool}} --filter <package-name> run test
{{workspaceTool}} --filter <package-name> run build
```

<!-- Adjust the filter flag syntax above for your workspace tool:
     pnpm:      --filter <package-name>
     npm:       --workspace <package-name>
     yarn:      --cwd packages/<package-name>
     nx:        nx run <package-name>:<target>
     turborepo: turbo run <target> --filter=<package-name>  -->

## Making Changes

1. Identify which package(s) your change touches.
2. Run tests for each affected package before committing.
3. If you change a shared package in `packages/`, check whether dependent packages still build and pass tests.
4. Keep changes to a single package per commit where possible.

## Adding a New Package

1. Create a new directory under `packages/` or `apps/` with its own `package.json`.
2. Declare it in the workspace root `package.json` workspaces field.
3. Re-run `{{workspaceTool}} install` to link it.
4. Add it to the CI pipeline.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for the high-level design and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not add runtime dependencies to the workspace root `package.json` — they belong in the individual package.
- Do not bypass package boundaries with relative cross-package imports.
- Do not commit secrets, tokens, or credentials.
- Do not skip CI checks with `--no-verify`.
