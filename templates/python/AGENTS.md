# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this project does and its primary purpose. -->

## Repository Structure

```
{{projectName}}/
├── src/{{projectName}}/   # Main package source code
├── tests/                 # Test suite
├── pyproject.toml         # Project metadata and dependencies
└── README.md
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate

# Install dependencies (including dev dependencies)
{{packageManager}} install
```

<!-- Adjust the install command for your package manager:
     pip:    pip install -e ".[dev]"
     poetry: poetry install
     uv:     uv sync  -->

## Development Workflow

### Running Tests

```sh
pytest
pytest tests/unit/          # Run a subset
pytest -x                   # Stop on first failure
pytest --cov                # With coverage
```

### Linting and Formatting

```sh
ruff check .                # Lint
ruff format .               # Format
mypy .                      # Type checking
```

### Making Changes

1. Activate the virtual environment before running any commands.
2. Write or update tests in `tests/` for any logic changes.
3. Ensure `pytest`, `ruff check`, and `mypy` all pass before committing.
4. Keep commits small and focused; use conventional commit messages.

## Type Annotations

- All new functions and methods must have type annotations.
- Use `Optional[X]` or `X | None` (Python 3.10+) for nullable types — do not use bare `None` hints.
- Run `mypy .` to check for type errors.

## Import Style

- Use absolute imports (`from {{projectName}}.module import Thing`), not relative imports, unless inside the same package.
- Group imports in this order: standard library, third-party, local — separated by blank lines.
- Do not use wildcard imports (`from module import *`).

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design notes and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not commit the `.venv/` directory or any other virtual environment.
- Do not commit secrets, tokens, or credentials — use environment variables or a secrets manager.
- Do not use `print()` for logging in production code — use the `logging` module.
- Do not introduce new dependencies without updating `pyproject.toml` and discussing with the team.
- Do not bypass linting or type checks with `# noqa` or `# type: ignore` without a clear comment explaining why.
