# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install all dependencies from the workspace root: `{{workspaceTool}} install`
3. Create a branch: `git checkout -b feat/my-change`

## Development

- Follow the code style enforced by each package's linter and formatter.
- Write tests for new behavior in the relevant package.
- Keep commits small and focused on a single package where possible.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
  - `feat(<package>):` — new feature in a package
  - `fix(<package>):` — bug fix in a package
  - `docs:` — documentation only
  - `chore:` — tooling, deps, build
  - `refactor(<package>):` — no behavior change

## Before Submitting

- Run `{{workspaceTool}} run test --recursive` and ensure all tests pass.
- Run `{{workspaceTool}} run lint --recursive` and fix any lint errors.
- If you changed a shared package, verify that dependent packages still build.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Include the affected package name(s) in the PR title.
3. Describe what changed and why, including any cross-package effects.
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Adding a New Package

See the [Adding a New Package](AGENTS.md#adding-a-new-package) section in `AGENTS.md`.

## Reporting Issues

Please use the issue tracker with a clear title, the affected package name, and reproduction steps.
