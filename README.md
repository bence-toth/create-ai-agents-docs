# create-ai-agents-docs

Scaffold AI agent-friendly documentation into any repository with a single command.

## Usage

```sh
npx create-ai-agents-docs
```

This runs in interactive mode and guides you through template selection and output directory.

### Non-interactive

```sh
# Use the built-in default template
npx create-ai-agents-docs --template default

# Use a template from a GitHub repository
npx create-ai-agents-docs --template https://github.com/some-org/some-repo

# Use a template from a local path
npx create-ai-agents-docs --template ./my-custom-template

# Specify the output directory (defaults to current directory)
npx create-ai-agents-docs --output ./my-project
```

### Flags

| Flag         | Description                              | Default     |
| ------------ | ---------------------------------------- | ----------- |
| `--template` | Template name, GitHub URL, or local path | `default`   |
| `--output`   | Directory to scaffold files into         | current dir |
| `--force`    | Overwrite existing files                 | `false`     |
| `--help`     | Show usage information                   |             |
| `--version`  | Show version number                      |             |

## Built-in templates

### `default`

A comprehensive starter for AI agent-friendly documentation. Includes:

- `AGENTS.md` — instructions and context for AI agents working in the repository
- `CLAUDE.md` — symlink to `AGENTS.md` (Claude Code)
- `.cursorrules` — symlink to `AGENTS.md` (Cursor)
- `.windsurfrules` — symlink to `AGENTS.md` (Windsurf)
- `.clinerules` — symlink to `AGENTS.md` (Cline)
- `GEMINI.md` — symlink to `AGENTS.md` (Gemini CLI)
- `.github/copilot-instructions.md` — symlink to `AGENTS.md` (GitHub Copilot)
- `CONTRIBUTING.md` — contribution guidelines
- `docs/GLOSSARY.md` — project terminology
- `docs/architecture/README.md` — architecture overview
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration

### `microservices`

For distributed systems composed of multiple independently deployable services. Prompts for project name and communication pattern (REST/gRPC/events/mixed). Includes:

- `AGENTS.md` — service map, data ownership rules, inter-service communication patterns, cross-service change rollout process, observability requirements
- `CONTRIBUTING.md` — microservices contribution workflow including contract change coordination
- `docs/contracts/README.md` — API and event contract documentation templates with versioning guidance
- `docs/GLOSSARY.md` — distributed systems terminology (bounded context, correlation ID, idempotent, saga, service contract)
- `docs/architecture/README.md` — service map, data ownership, communication patterns, observability stack
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `cli`

For command-line tools and developer utilities written in TypeScript, Go, Rust, or Python. Prompts for project name and language. Includes:

- `AGENTS.md` — command/subcommand structure, stdout vs. stderr conventions, exit code rules, configuration resolution order, how to add a new command
- `CONTRIBUTING.md` — CLI contribution workflow including output behavior verification
- `docs/commands/README.md` — command reference template with flags, arguments, and exit codes
- `docs/GLOSSARY.md` — CLI terminology (command, subcommand, flag, argument, stdout, stderr, exit code)
- `docs/architecture/README.md` — command tree, argument parsing, configuration resolution, plugin system
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `fullstack`

For full-stack web applications with a frontend, backend, and database in one repository. Prompts for project name, frontend framework, and backend language. Includes:

- `AGENTS.md` — client/server boundary rules, shared code conventions, API contract discipline, environment variable safety, database migration workflow
- `CONTRIBUTING.md` — full-stack contribution workflow including cross-layer change guidance
- `docs/GLOSSARY.md` — full-stack terminology (client, server, shared, API contract)
- `docs/architecture/README.md` — system diagram, auth flow, data fetching strategy, state management, database
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `design-system`

For component libraries and design systems built with React, Vue, Web Components, or Svelte. Prompts for project name and framework. Includes:

- `AGENTS.md` — component authoring guidelines, WCAG 2.1 AA accessibility requirements, design token rules, Storybook story requirements, visual regression testing
- `CONTRIBUTING.md` — design system contribution workflow including an accessibility checklist
- `docs/components/README.md` — component inventory with status tracking (Stable/Beta/Deprecated)
- `docs/GLOSSARY.md` — design system terminology (tokens, variants, slots, visual regression)
- `docs/architecture/README.md` — token hierarchy, component composition model, theming, component categories
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `data-pipeline`

For data engineering projects — ETL/ELT pipelines, data warehouses, dbt, Airflow, Dagster, or Spark. Prompts for project name, orchestrator, and transformation tool. Includes:

- `AGENTS.md` — idempotency rules, backfill guidance, data quality requirements, schema change process, pipeline conventions
- `CONTRIBUTING.md` — data pipeline contribution workflow including backfill and schema change documentation
- `docs/GLOSSARY.md` — data engineering terminology (DAG, backfill, idempotent, raw/staging/mart layers)
- `docs/architecture/README.md` — data flow diagram, source systems, pipeline inventory, data quality strategy
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `infrastructure`

For Infrastructure-as-Code projects — Terraform, Pulumi, CloudFormation, or Kubernetes. Prompts for project name and IaC tool. Includes:

- `AGENTS.md` — plan-before-apply workflow, environment hierarchy (dev/staging/prod), state management rules, naming conventions, blast radius awareness
- `CONTRIBUTING.md` — IaC contribution workflow including staged rollout and peer review requirements
- `docs/GLOSSARY.md` — infrastructure terminology (blast radius, drift, idempotent, plan, state)
- `docs/architecture/README.md` — environment topology, network layout, compute resources, IAM, secrets management
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `mobile`

For mobile applications built with React Native, Flutter, SwiftUI, or Kotlin. Prompts for project name and framework. Includes:

- `AGENTS.md` — platform-specific guidance (iOS/Android), build commands, simulator/emulator setup, navigation structure, platform-conditional code patterns
- `CONTRIBUTING.md` — mobile contribution workflow including cross-platform testing requirements
- `docs/GLOSSARY.md` — mobile terminology (bridge, native module, simulator, emulator)
- `docs/architecture/README.md` — navigation structure, state management, data fetching, native modules
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `library`

For reusable packages published to a registry (npm, PyPI, crates.io, Maven). Prompts for package name and registry. Includes:

- `AGENTS.md` — public API rules, semantic versioning policy, deprecation process, how to add a new feature without breaking changes
- `CONTRIBUTING.md` — library contribution workflow including breaking change guidance
- `docs/api/README.md` — public API reference template
- `docs/GLOSSARY.md` — library terminology (public API, consumer, breaking change)
- `docs/architecture/README.md` — module structure, public vs. internal, extension points
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `api-service`

For backend API services — REST or GraphQL, with a database, auth, and deployment. Prompts for project name and API style. Includes:

- `AGENTS.md` — API conventions, request validation rules, auth patterns, database migration workflow, how to add a new endpoint
- `CONTRIBUTING.md` — API-focused contribution workflow including migration guidance
- `docs/api/README.md` — endpoint documentation template
- `docs/GLOSSARY.md` — project terminology
- `docs/architecture/README.md` — request lifecycle, service layers, data model, auth
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `python`

For Python projects — web apps (Django, Flask, FastAPI), scripts, data science, or libraries. Prompts for project name and package manager (pip/poetry/uv). Includes:

- `AGENTS.md` — virtual environment setup, pytest usage, ruff/mypy workflow, type annotation and import style rules
- `CONTRIBUTING.md` — Python-specific contribution workflow including the full check suite
- `docs/GLOSSARY.md` — project terminology
- `docs/architecture/README.md` — architecture overview
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

### `monorepo`

For multi-package workspaces managed with Nx, Turborepo, pnpm workspaces, npm workspaces, or Yarn workspaces. Prompts for project name and workspace tool. Includes:

- `AGENTS.md` — workspace map, package boundary rules, how to run commands at workspace root vs. package level, and how to add new packages
- `CONTRIBUTING.md` — monorepo contribution workflow, cross-package change guidance
- `docs/GLOSSARY.md` — workspace terminology (app, package, root, workspace)
- `docs/architecture/README.md` — package dependency graph, shared packages, deployment units
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration
- Agent symlinks (CLAUDE.md, .cursorrules, .windsurfrules, .clinerules, GEMINI.md, .github/copilot-instructions.md)

## External templates

Point `--template` at any GitHub repository or local directory that follows the template structure. GitHub repositories are cloned with `git clone --depth 1`; local paths are used directly.

```sh
npx create-ai-agents-docs --template https://github.com/org/my-template
npx create-ai-agents-docs --template ./path/to/my-template
npx create-ai-agents-docs --template /absolute/path/to/my-template
```

## Template authoring

To build a custom template, use the [create-ai-agents-docs-template](https://github.com/bence-toth/create-ai-agents-docs-template) starter kit — it contains the default template's files as a starting point.

A template is a directory of files to scaffold. Any files in the directory are copied to the target when the template is applied.

### Template structure

```
my-template/
├── template.json   # optional config (not copied to target)
├── AGENTS.md
├── CONTRIBUTING.md
└── docs/
    └── GLOSSARY.md
```

### template.json

Templates may include a `template.json` at their root to configure variables, post-copy hooks, and ignored files. All fields are optional.

```json
{
  "name": "My Custom Template",
  "description": "A short description shown in interactive mode",
  "variables": {
    "projectName": {
      "prompt": "What is your project name?",
      "default": "my-project"
    },
    "author": {
      "prompt": "Author name?"
    }
  },
  "hooks": {
    "postCopy": "echo 'Done! Run npm install to get started.'"
  },
  "ignore": ["README-template.md"]
}
```

#### Variables

Variables prompt the user for values and substitute `{{variableName}}` placeholders in file contents.

```md
# {{projectName}}

Maintained by {{author}}.
```

If a variable has a `default`, it is used when the user presses Enter without typing a value.

#### Post-copy hooks

`hooks.postCopy` is a shell command (or semicolon-separated commands) run in the target directory after files are copied.

#### Ignore list

`ignore` is a list of file paths relative to the template root that should not be copied to the target. `template.json` is always excluded automatically.

### Tips

- Keep templates focused. A template should scaffold a specific kind of project, not try to cover every use case.
- Use `{{variableName}}` placeholders for values that differ between projects (project name, author, etc.).
- The `description` field in `template.json` is shown in interactive mode — keep it under 60 characters.
- Test your template locally before publishing: `npx create-ai-agents-docs --template ./my-template --output /tmp/test-output`

## License

[Licensed under MIT.](https://github.com/bence-toth/create-ai-agents-docs/blob/main/LICENSE) Do what you will.
