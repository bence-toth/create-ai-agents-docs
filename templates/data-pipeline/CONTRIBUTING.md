# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `pip install -r requirements.txt`
3. Copy the example environment file: `cp .env.example .env`
4. Create a branch: `git checkout -b feat/my-change`

## Development

- All pipelines must be idempotent — test by running them twice and verifying no changes on the second run.
- Write data quality tests for every new transformation.
- Document schema changes and their migration plan in the PR description.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new pipeline or transformation
  - `fix:` — bug fix in existing logic
  - `docs:` — documentation only
  - `chore:` — tooling, deps, config
  - `refactor:` — no behavior change
  - `test:` — tests only

## Before Submitting

```sh
pytest tests/
```

If your change modifies output semantics, state whether a backfill is required in the PR description.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Describe the data flow change and any downstream impact.
3. Note whether a backfill is required.
4. Note any schema changes and the migration plan.
5. Ensure all CI checks are green.
6. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker with a clear title, affected pipeline(s), and steps to reproduce.
