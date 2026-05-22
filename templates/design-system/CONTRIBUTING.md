# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Start Storybook to preview components: `npm run storybook`
4. Create a branch: `git checkout -b feat/my-change`

## Development

- Always use design tokens — never hardcode color, spacing, or typography values.
- Write unit tests for component behavior.
- Write Storybook stories for every new component and variant.
- Run accessibility checks before submitting.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new component or feature
  - `fix:` — bug fix
  - `feat!:` / `BREAKING CHANGE:` — breaking API or token change
  - `docs:` — documentation only
  - `chore:` — tooling, deps, build
  - `refactor:` — no behavior change
  - `test:` — tests only

## Accessibility Checklist

Before submitting a PR for a new or modified component:

- [ ] Keyboard navigation works correctly
- [ ] Focus indicators are visible
- [ ] Color is not the only way meaning is conveyed
- [ ] All interactive elements have accessible labels
- [ ] `axe` (or equivalent) reports no violations

## Before Submitting

```sh
npm test
npm run lint
npm run build
```

If your change modifies visual output, update the visual regression baselines:

```sh
npm run test:visual -- --update-snapshots
```

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Include screenshots or Storybook links for visual changes.
3. Note any breaking changes to the component API or tokens.
4. Ensure all CI checks (tests, lint, visual regression, accessibility) are green.
5. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker with the component name, a clear description, and a reproduction link (Storybook, CodeSandbox, etc.).
