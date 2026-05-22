# Agent instructions for create-ai-agents-docs

## Project overview

`create-ai-agents-docs` is a Node.js CLI tool (ESM, no build step) that scaffolds AI agent-friendly documentation into any repository or folder, using a built-in or external template. It is published to npm as `create-ai-agents-docs` and invoked via `npx create-ai-agents-docs`.

The entry point is `bin/create-ai-agents-docs.js`. All logic lives in `lib/`. Tests are flat in `test/` (no subdirectories).

## Architecture

```
bin/
  create-ai-agents-docs.js  – CLI entry point
lib/
  cli.js                    – argument parsing (parseArgs)
  copy-template.js          – file copying logic (copyTemplate)
  fetch-template.js         – GitHub/local template fetching (fetchTemplate)
  prompt.js                 – interactive prompting (prompt)
  resolve-template.js       – template resolution: name → path → URL (resolveTemplate)
templates/
  default/                  – built-in default template
    template.json           – template metadata, variables, hooks, ignore list
test/                       – unit and integration tests
docs/
  build.mjs                 – converts README.md → docs/dist/index.html
  template.html             – HTML/CSS template for the documentation site
```

## Key constraints

- **ESM only.** All files use `import`/`export`. No `require()`. No `.mjs` extensions needed because `"type": "module"` is set in `package.json`.
- **No build step.** Source runs directly. Do not add transpilation.
- **Zero runtime dependencies.** Use only Node.js built-ins (`fs/promises`, `child_process`, `path`, `readline`, `os`, `node:test`). Do not add runtime dependencies without a strong reason.
- **Node 20+ only.** Use the built-in test runner (`node:test`), `fs.cp`, `util.parseArgs`, and other Node 20 APIs freely.

## Template resolution order

1. Built-in template names (e.g. `default`) — always take precedence
2. Local filesystem paths — if the value starts with `./`, `../`, or `/`
3. Remote GitHub URLs — if the value starts with `https://`

## Testing

```bash
npm test                 # all tests
npm run test:coverage    # all tests with LCOV coverage report (coverage/lcov.info)
```

- Tests must not require any external service, API key, or network access.
- Use `os.tmpdir()` for any temp files; clean up in `after()` hooks.
- Always run `npm test` after making changes and fix failures before finishing.

## Code style

Run `npm run format` before committing. Prettier config: 2-space indent, single quotes, no semicolons, 100-char line width, trailing commas.

ESLint enforces: `no-unused-vars`, `no-undef`, `eqeqeq`, `no-var`, `prefer-const`.

Write no comments unless the reason is non-obvious. No JSDoc. No multi-line comment blocks.

## Commit style

Each commit must be atomic — one logical change, tests passing.

Format: `<type>: <what changed>` (feat / fix / test / refactor / docs / chore). No period. Under 72 chars.

## Before finishing a task

- Run `npm run build` to verify the project builds cleanly (tests + lint + format check).
- Update `README.md` and `AGENTS.md` to reflect any changes to the public interface, architecture, or key constraints.

## What to avoid

- Do not add runtime dependencies. Check if a Node.js built-in covers the need first.
- Do not add a build step or transpilation.
- Do not use `console.log` in library modules except as deliberate user-facing progress output. Errors should `throw`.
- Do not swallow errors silently. Catch only when there is a meaningful recovery or fallback.
- Do not overwrite existing files in the target directory unless `--force` is passed.
