# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Copy the example environment file: `cp .env.example .env`
4. Start a local database and run migrations: `npm run migrate`
5. Create a branch: `git checkout -b feat/my-change`

## Development

- Business logic goes in `src/services/`, not in route handlers.
- Validate all request input at the route layer before calling services.
- Write integration tests for new endpoints — unit tests alone are not sufficient.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new endpoint or feature
  - `fix:` — bug fix
  - `docs:` — documentation only
  - `chore:` — tooling, deps, migrations
  - `refactor:` — no behavior change
  - `test:` — tests only

## Database Changes

- Create a new migration file — never edit existing ones.
- Include both `up` and `down` migrations.
- Test the `down` migration locally before opening a PR.

## Before Submitting

```sh
npm test
npm run lint
```

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Describe what changed, which endpoints are affected, and any migration steps.
3. Ensure all CI checks are green.
4. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker with a clear title, the affected endpoint, and reproduction steps.
