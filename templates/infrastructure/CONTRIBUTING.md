# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install the required tooling: `{{tool}}`
3. Configure credentials for the target cloud provider.
4. Create a branch: `git checkout -b feat/my-change`

## Development Workflow

1. Make your changes in `environments/dev/` or in a `modules/` directory.
2. Run `{{tool}} plan` in the target environment and review the output carefully.
3. Apply to `dev` first to validate: `{{tool}} apply`
4. Once validated in `dev`, propagate the change to `staging` and verify.
5. Only apply to `prod` after staging validation and peer review.

## Before Submitting

- Run `{{tool}} plan` and include the plan output (or a summary) in the PR description.
- Ensure no secrets or credentials appear in the diff.
- Assess the blast radius of your change and note it in the PR.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Include the plan output for the lowest environment affected.
3. Note the blast radius and which environments are affected.
4. Tag a second reviewer for any high-blast-radius changes.
5. Ensure all CI checks (linting, plan validation) are green.
6. A maintainer will review and merge; apply to prod only after merge.

## Adding a New Module

See the [Adding a New Module](AGENTS.md#adding-a-new-module) section in `AGENTS.md`.

## Reporting Issues

Please use the issue tracker with a clear title, affected environment, and reproduction steps.
