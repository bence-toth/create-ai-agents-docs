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

Point `--template` at any GitHub repository or local directory that follows the template structure. GitHub repositories are cloned with `git clone --depth 1`; local paths are used directly.

```sh
npx create-ai-agents-docs --template https://github.com/org/my-template
npx create-ai-agents-docs --template ./path/to/my-template
npx create-ai-agents-docs --template /absolute/path/to/my-template
```

## Template authoring

A template is a directory of files to scaffold. Any files in the directory are copied to the target when the template is applied.

### Template structure

```
my-template/
├── template.json        # optional config (not copied to target)
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
