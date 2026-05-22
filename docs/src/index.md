# create-ai-agents-docs

Scaffold AI agent-friendly documentation into any repository with a single command.

## Quick start

```sh
npx create-ai-agents-docs
```

This runs in interactive mode and guides you through template selection and output directory.

## Non-interactive usage

```sh
# Use the built-in default template
npx create-ai-agents-docs --template default

# Use a template from a GitHub repository
npx create-ai-agents-docs --template https://github.com/org/repo

# Use a template from a local path
npx create-ai-agents-docs --template ./my-custom-template

# Specify the output directory (defaults to current directory)
npx create-ai-agents-docs --output ./my-project

# Overwrite existing files
npx create-ai-agents-docs --force
```

## Flags

| Flag         | Short | Description                              | Default     |
| ------------ | ----- | ---------------------------------------- | ----------- |
| `--template` | `-t`  | Template name, GitHub URL, or local path | `default`   |
| `--output`   | `-o`  | Directory to scaffold files into         | current dir |
| `--force`    | `-f`  | Overwrite existing files                 | `false`     |
| `--help`     | `-h`  | Show usage information                   |             |
| `--version`  | `-v`  | Show version number                      |             |

## Built-in templates

### `default`

A comprehensive starter for AI agent-friendly documentation. Includes:

- `AGENTS.md` — instructions and context for AI agents working in the repository
- `CONTRIBUTING.md` — contribution guidelines
- `docs/GLOSSARY.md` — project terminology
- `docs/architecture/README.md` — architecture overview
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration

## External templates

Point `--template` at any GitHub repo or local directory that follows the template structure. See the [Template Authoring Guide](template-authoring.html) for details.
