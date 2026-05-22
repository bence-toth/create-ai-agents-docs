# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this project does and its primary purpose. -->

## Repository Structure

<!-- Describe the key directories and what they contain. -->

## Development Workflow

### Setup

```sh
# Install dependencies
npm install

# Run tests
npm test

# Lint
npm run lint
```

### Making Changes

1. Create a branch for your change.
2. Follow the code style enforced by the linter and formatter.
3. Write or update tests for any logic changes.
4. Run the full test suite before committing.
5. Keep commits small and focused; use conventional commit messages.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design notes and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not commit secrets, tokens, or credentials.
- Do not introduce new runtime dependencies without discussion.
- Do not bypass linting or test failures with `--no-verify`.
