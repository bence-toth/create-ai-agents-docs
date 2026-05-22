# Contributing to create-ai-agents-docs

## Development setup

```bash
git clone https://github.com/bence-toth/create-ai-agents-docs
cd create-ai-agents-docs
npm install
```

No build step. The package runs directly from source as ESM.

## Running locally without publishing

### Via npm link (preferred for rapid iteration)

```bash
# In the create-ai-agents-docs directory
npm link

# The command is now available globally from your local source:
create-ai-agents-docs --help

# When done, unlink:
npm unlink -g create-ai-agents-docs
```

### Via npm pack (simulate the published package)

```bash
# In the create-ai-agents-docs directory
npm pack

# This creates create-ai-agents-docs-0.1.0.tgz. Install it elsewhere:
npm install /path/to/create-ai-agents-docs-0.1.0.tgz
```

### Direct invocation (for CLI testing)

```bash
node bin/create-ai-agents-docs.js --help
node bin/create-ai-agents-docs.js --template default --output /tmp/test-output
```

## Running tests

```bash
npm test                  # all tests
npm run test:coverage     # all tests with LCOV coverage report (coverage/lcov.info)
```

Tests use the Node.js built-in test runner (`node:test`). No external test framework.

Tests create real temporary directories and clean them up afterward. No external services or API keys required.

## Lint and format

```bash
npm run lint          # ESLint
npm run format        # Prettier (writes in place)
npm run format:check  # Prettier (check only, used in CI)
```

Prettier is the source of truth for style. ESLint only enforces correctness rules (`no-unused-vars`, `eqeqeq`, `prefer-const`, etc.) — no style rules that overlap with Prettier.

## Project layout

```
bin/
  create-ai-agents-docs.js  – CLI entry point
lib/
  cli.js                    – argument parsing
  copy-template.js          – file copying logic
  fetch-template.js         – GitHub/local template fetching
  prompt.js                 – interactive prompting
  resolve-template.js       – template resolution (name → path → URL)
templates/
  default/                  – built-in default template
test/                       – unit and integration tests
docs/
  build.mjs                 – converts README.md → docs/dist/index.html
  template.html             – HTML/CSS template for the documentation site
```

## Documentation site

The docs site is a single HTML page generated from `README.md`.

```bash
npm run docs:build    # build docs/dist/index.html
npm run docs:preview  # build and serve locally (via npx serve)
```

`docs/dist/` is gitignored. The site is published automatically to GitHub Pages on every push to `main` via `.github/workflows/pages.yml`.

## Commit style

Small, atomic commits. Each commit should be self-contained and leave the test suite passing.

Subject line format: `<type>: <what changed>` where type is one of:

- `feat` – new behavior
- `fix` – bug fix
- `test` – test-only change
- `refactor` – no behavior change
- `docs` – documentation only
- `chore` – tooling, deps, CI

No period at the end of the subject line. Keep the subject under 72 characters.

## Pull requests

- One logical change per PR.
- All tests must pass (`npm test`).
- Lint and format must be clean (`npm run lint && npm run format:check`).
- Update tests to cover new behavior.

## Publishing

### Automated publishing (recommended)

Releases are automated via GitHub Actions on version tag pushes. To cut a release:

1. Bump `version` in `package.json`.
2. Commit: `git commit -m "chore: bump to v1.x.x"`.
3. Tag: `git tag -a v1.x.x -m "Release v1.x.x"`.
4. Push: `git push origin main --tags`.

The `publish.yml` workflow runs `npm publish` automatically when a `v*` tag is pushed. An `NPM_TOKEN` secret must be configured in the repository settings.

### Manual publishing

```bash
# Verify the package before publishing
npm run build        # runs tests, lint, and format checks
npm run pack         # dry-run, shows what would be packed

# Publish to NPM
npm publish
```

**Prerequisites:**

- You must be logged in: `npm login`
- You must have publish permissions for the `create-ai-agents-docs` package on NPM
- The version in `package.json` must not already exist on NPM
