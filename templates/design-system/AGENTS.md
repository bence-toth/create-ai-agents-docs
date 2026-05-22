# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this design system provides and which products or teams consume it. -->

`{{projectName}}` is a design system and component library built with **{{framework}}**.

## Repository Structure

```
{{projectName}}/
├── src/
│   ├── components/    # UI components
│   ├── tokens/        # Design tokens (colors, spacing, typography, etc.)
│   ├── hooks/         # Shared hooks / composables
│   └── utils/         # Shared utilities
├── stories/           # Storybook stories
└── tests/             # Visual regression and unit tests
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

## Design Tokens

Design tokens are the single source of truth for visual properties. They live in `src/tokens/`.

- **Do not** hardcode color values, spacing values, or font sizes in component styles — always reference a token.
- Token names follow the pattern `<category>-<variant>-<scale>` (e.g. `color-primary-500`, `spacing-md`).
- Adding new tokens requires updating both the token definition and the token documentation.
- Changing or removing tokens is a **breaking change** — follow the deprecation process.

## Component Authoring

### API design

- Keep the component API minimal and composable. Prefer primitives over highly-specific components.
- All props must be documented with types and descriptions (JSDoc or TypeScript types).
- Use consistent prop naming across components: `variant`, `size`, `disabled`, `onChange`, `children`, etc.
- Every component must accept a `className` prop (or equivalent) for consumer overrides.

### Accessibility

All components must meet **WCAG 2.1 AA** requirements:

- Interactive elements must be keyboard-navigable and have visible focus indicators.
- Color alone must not convey meaning — pair color with an icon, label, or pattern.
- All images and icons must have appropriate `alt` text or `aria-label`.
- Run `axe` or equivalent accessibility checks on every component before release.

### Storybook stories

Every component must have a Storybook story that demonstrates:

- The default state
- All significant variants (size, color, state)
- Edge cases (long text, empty, loading, error)

## Tokens and Theming

<!-- Describe the token hierarchy and theming approach. -->

Tokens are organized into tiers:

1. **Primitive tokens** — raw values (e.g. `blue-500: #3b82f6`)
2. **Semantic tokens** — purpose-based aliases (e.g. `color-primary: {blue-500}`)
3. **Component tokens** — component-specific overrides (e.g. `button-background: {color-primary}`)

Theming is achieved by overriding semantic tokens — never override primitive tokens in a theme.

## Visual Regression Testing

Visual regression tests are run automatically in CI. If your change intentionally modifies a component's appearance, update the baseline snapshots:

```sh
npm run test:visual -- --update-snapshots
```

## Adding a New Component

1. Create the component in `src/components/<ComponentName>/`.
2. Export it from `src/index.ts`.
3. Write unit tests in `tests/`.
4. Write Storybook stories in `stories/`.
5. Document it in [docs/components/README.md](docs/components/README.md).
6. Run accessibility checks before opening a PR.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design notes and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for design system terminology.

## What to Avoid

- Do not hardcode visual values — always use tokens.
- Do not add component-specific business logic — components must be generic and reusable.
- Do not skip accessibility checks.
- Do not remove or rename tokens or props without deprecating them first.
- Do not add peer dependencies that consumers are not already likely to have.
