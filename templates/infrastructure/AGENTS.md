# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what infrastructure this repository manages and its primary purpose. -->

This repository manages infrastructure using **{{tool}}** for `{{projectName}}`.

## Repository Structure

```
{{projectName}}/
├── environments/
│   ├── dev/           # Development environment
│   ├── staging/       # Staging environment
│   └── prod/          # Production environment
├── modules/           # Reusable infrastructure modules
└── docs/              # Architecture and decision records
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Environment Hierarchy

This repository manages **three environments**: `dev`, `staging`, and `prod`.

- **dev** — freely modifiable, used for experimentation and development
- **staging** — mirrors production, used for pre-release validation
- **prod** — live environment, changes require additional review and approval

Never apply changes directly to `prod` without first validating in `staging`.

## Workflow: Plan Before Apply

**Always plan before applying.** Never run `apply` without reviewing the plan output first.

```sh
# Navigate to the target environment
cd environments/<env>

# Preview changes
{{tool}} plan

# Apply only after reviewing the plan
{{tool}} apply
```

<!-- Adjust commands for your tool:
     Terraform:      terraform plan / terraform apply
     Pulumi:         pulumi preview / pulumi up
     CloudFormation: aws cloudformation deploy --no-execute-changeset (preview) / deploy
     Kubernetes:     kubectl diff / kubectl apply  -->

## State Management

- Infrastructure state is stored remotely — do not run commands that would move state locally.
- Do not manually edit state files.
- If state becomes inconsistent, investigate before applying any changes.

## Naming Conventions

<!-- Describe naming conventions for resources: prefixes, suffixes, environment tags, etc. -->

All resources must be tagged with:
- `environment`: `dev` / `staging` / `prod`
- `managed-by`: `{{tool}}`
- `project`: `{{projectName}}`

## Blast Radius Awareness

Before making a change, assess its blast radius:

- **Low:** Adding a new resource that doesn't affect existing ones
- **Medium:** Modifying a resource configuration (e.g., scaling, policy change)
- **High:** Removing or replacing a resource, changing networking or IAM

Changes with **high blast radius** require a second reviewer and must be applied during a maintenance window.

## Adding a New Module

1. Create the module under `modules/<module-name>/`.
2. Write a `README.md` describing inputs, outputs, and usage.
3. Add the module to the appropriate environment(s) and run `plan` to validate.
4. Do not create a new module for a one-off resource — only extract a module when it will be reused.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for the environment topology and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for infrastructure terminology.

## What to Avoid

- Do not apply infrastructure changes directly from a local machine to `prod` — use CI/CD pipelines.
- Do not hardcode secrets, passwords, or API keys in infrastructure code — use a secrets manager.
- Do not destroy resources without confirming they are safe to remove (check for dependents first).
- Do not skip the `plan` step — surprises in `apply` are much more expensive than surprises in `plan`.
- Do not commit state files (`*.tfstate`, `*.tfstate.backup`) to the repository.
