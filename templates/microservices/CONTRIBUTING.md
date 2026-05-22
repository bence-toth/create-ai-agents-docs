# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Navigate to the service you want to work on: `cd services/<service-name>`
3. Install its dependencies and follow its local setup instructions.
4. Create a branch: `git checkout -b feat/my-change`

## Development

- Respect service boundaries — do not access other services' databases.
- Implement retries and timeouts for all outbound service calls.
- Ensure event consumers are idempotent.
- Write or update tests for any logic changes.
- Keep commits small and focused; scope them to a single service where possible.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(<service>):` — new feature in a service
  - `fix(<service>):` — bug fix in a service
  - `feat!(<service>):` — breaking contract change (requires consumer updates)
  - `docs:` — documentation only
  - `chore:` — tooling, deps, infrastructure
  - `refactor(<service>):` — no behavior change
  - `test(<service>):` — tests only

## Contract Changes

If your change modifies an API or event contract:

1. Make the change backwards-compatible if possible.
2. Update `docs/contracts/README.md`.
3. List affected consumer services in the PR description.
4. Confirm all consumers are updated before merging.

## Before Submitting

Run the tests for all services affected by your change:

```sh
cd services/<service-name> && npm test
```

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Note which service(s) are affected.
3. For contract changes, list all affected consumers and confirm they are updated.
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Adding a New Service

See the [Adding a New Service](AGENTS.md#adding-a-new-service) section in `AGENTS.md`.

## Reporting Issues

Please use the issue tracker. Include the affected service name, correlation ID (if available), and reproduction steps.
