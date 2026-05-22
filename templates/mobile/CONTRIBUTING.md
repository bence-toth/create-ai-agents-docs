# Contributing

Thank you for taking the time to contribute!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. iOS: `cd ios && bundle exec pod install && cd ..`
4. Create a branch: `git checkout -b feat/my-change`

## Development

- Test on **both iOS and Android** before submitting.
- Write or update tests for any logic changes.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new feature
  - `fix:` — bug fix
  - `fix(ios):` / `fix(android):` — platform-specific bug fix
  - `docs:` — documentation only
  - `chore:` — tooling, deps, native builds
  - `refactor:` — no behavior change
  - `test:` — tests only

## Platform-Specific Code

- Prefer cross-platform implementations.
- If a change only affects one platform, note this in the PR description and ensure the other platform still works.
- Native module changes require running `pod install` (iOS) or a Gradle sync (Android) before testing.

## Before Submitting

```sh
npm test
npm run lint
```

Run the app manually on both iOS and Android to verify the change works as expected.

## Submitting a Pull Request

1. Push your branch and open a PR against `main`.
2. Include screenshots or screen recordings for UI changes.
3. Note which platforms were tested.
4. Ensure all CI checks are green.
5. A maintainer will review and merge.

## Reporting Issues

Please use the issue tracker. Include the platform (iOS/Android), OS version, device/simulator, and reproduction steps.
