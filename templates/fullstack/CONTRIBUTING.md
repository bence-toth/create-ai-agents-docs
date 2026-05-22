# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install all dependencies from the workspace root: `npm install`
3. Copy environment files: `cp server/.env.example server/.env`
4. Run database migrations: `npm run migrate`
5. Start the development server: `npm run dev`
6. Create a branch: `git checkout -b feat/my-change`

## Development

- Keep the client/server boundary clean — no cross-side imports.
- Update `shared/` types whenever the API shape changes.
- Write tests for both sides when a change spans the stack.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(client):` / `feat(server):` / `feat:` — new feature
  - `fix(client):` / `fix(server):` — bug fix
  - `docs:` — documentation only
  - `chore:` — tooling, deps, migrations
  - `refactor:` — no behavior change
  - `test:` — tests only

## Before Submitting

```sh
npm test
npm run lint
```

For changes that span the client and server, verify the full round-trip manually.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Note whether the change is client-only, server-only, or spans both.
3. If the API contract changed, confirm that client and server are updated together.
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker with a clear title, whether it is a client or server issue, and reproduction steps.
