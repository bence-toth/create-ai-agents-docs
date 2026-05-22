# Template Authoring Guide

This guide explains how to create custom templates for `create-ai-agents-docs`.

## Template structure

A template is a directory of files to scaffold. Any files in the directory are copied to the target directory when the template is used.

```
my-template/
├── template.json        # optional config (not copied to target)
├── AGENTS.md
├── CONTRIBUTING.md
└── docs/
    └── GLOSSARY.md
```

## template.json

Templates may include a `template.json` at their root to configure variables, post-copy hooks, and ignored files.

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

All fields are optional.

### variables

Variables prompt the user for values and substitute `{{variableName}}` placeholders in file contents.

```md
# {{projectName}}

Maintained by {{author}}.
```

If a variable has a `default`, it is used when the user presses Enter without typing a value.

### hooks.postCopy

A shell command (or semicolon-separated commands) run in the target directory after files are copied.

### ignore

A list of file paths relative to the template root that should not be copied to the target. `template.json` is always ignored automatically.

## Using a template

### From a GitHub repository

```sh
npx create-ai-agents-docs --template https://github.com/org/my-template
```

The repository is cloned with `git clone --depth 1`. The template files are read from the repository root.

### From a local path

```sh
npx create-ai-agents-docs --template ./path/to/my-template
npx create-ai-agents-docs --template /absolute/path/to/my-template
```

## Tips

- Keep templates focused. A template should scaffold a specific kind of project, not try to cover every use case.
- Use `{{variableName}}` placeholders for values that differ between projects (project name, author, etc.).
- The `description` field in `template.json` is shown in interactive mode — keep it short (under 60 characters).
- Test your template locally with `--template ./path/to/template --output /tmp/test-output` before publishing.
