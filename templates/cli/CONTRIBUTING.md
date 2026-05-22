# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Try it locally: `node dist/index.js --help`
5. Create a branch: `git checkout -b feat/my-change`

## Development

- Follow the output conventions: data to stdout, diagnostics to stderr.
- Use the correct exit codes (`0` success, `1` error, `2` misuse).
- Write integration tests that invoke the CLI as a subprocess.
- Every new command needs a `--help` description and documentation in `docs/commands/`.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new command or flag
  - `fix:` — bug fix
  - `docs:` — documentation only
  - `chore:` — tooling, deps, build
  - `refactor:` — no behavior change
  - `test:` — tests only

## Before Submitting

```sh
npm test
npm run lint
npm run build
```

Manually run the affected commands and verify stdout/stderr/exit code behavior.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Include example command invocations and their expected output in the PR description.
3. Note any changes to the public command interface (new flags, changed defaults, removed options).
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker. Include the `{{projectName}} --version` output, the exact command you ran, and the actual vs. expected output.
