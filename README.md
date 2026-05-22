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
- `CONTRIBUTING.md` — contribution guidelines
- `docs/GLOSSARY.md` — project terminology
- `docs/architecture/README.md` — architecture overview
- `docs/adr/adr-template.md` — Architecture Decision Record template
- `.claude/settings.json` — Claude Code configuration

## External templates

Point `--template` at any GitHub repo or local directory that follows the template structure. Templates may include a `template.json` to define variables (with user prompts), post-copy hooks, and files to ignore.

See [Template Authoring](docs/TEMPLATE_AUTHORING.md) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
