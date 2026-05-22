# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Create and activate a virtual environment:
   ```sh
   python -m venv .venv
   source .venv/bin/activate   # On Windows: .venv\Scripts\activate
   ```
3. Install all dependencies including dev tools:
   ```sh
   {{packageManager}} install
   ```
4. Create a branch: `git checkout -b feat/my-change`

## Development

- Write type-annotated code; run `mypy .` to check.
- Write tests in `tests/` for any new or changed behavior.
- Run `ruff check .` and `ruff format .` before committing.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new feature
  - `fix:` — bug fix
  - `docs:` — documentation only
  - `chore:` — tooling, deps, build
  - `refactor:` — no behavior change
  - `test:` — tests only

## Before Submitting

Run the full check suite:

```sh
pytest --cov
ruff check .
mypy .
```

All checks must pass before opening a PR.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Fill in the PR description: what changed and why.
3. Ensure all CI checks are green.
4. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker with a clear title and reproduction steps.
