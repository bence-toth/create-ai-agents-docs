# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Build the library: `npm run build`
4. Create a branch: `git checkout -b feat/my-change`

## Development

- Keep the public API surface small — every new export is a long-term commitment.
- Write tests for all new behavior and edge cases.
- Do not mutate function arguments.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new public feature (minor version bump)
  - `fix:` — bug fix (patch version bump)
  - `feat!:` or `BREAKING CHANGE:` — breaking change (major version bump)
  - `docs:` — documentation only
  - `chore:` — tooling, deps, build
  - `refactor:` — no behavior change
  - `test:` — tests only

## Breaking Changes

If your change removes, renames, or alters the signature of an exported symbol, it is a **breaking change** and requires a major version bump. Before proposing a breaking change, check if the symbol can be deprecated instead.

## Before Submitting

```sh
npm test
npm run lint
npm run build
```

Ensure the build output looks correct and no unexpected symbols are exported.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Clearly label the PR as `feat`, `fix`, or `breaking` so the maintainer can apply the correct version bump.
3. Include before/after examples if the public API changed.
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker. For bugs, include the library version, runtime (Node version, browser, etc.), and a minimal reproduction.
