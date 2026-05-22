# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this app does and its primary purpose. -->

`{{projectName}}` is a mobile application built with **{{framework}}**, targeting iOS and Android.

## Repository Structure

```
{{projectName}}/
├── src/
│   ├── screens/       # Top-level screen components
│   ├── components/    # Reusable UI components
│   ├── navigation/    # Navigation configuration
│   ├── services/      # API calls, device integrations
│   ├── store/         # State management
│   └── utils/         # Shared utilities
├── ios/               # iOS native project
├── android/           # Android native project
└── __tests__/         # Test suite
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install JS dependencies
npm install

# iOS — install CocoaPods dependencies
cd ios && bundle exec pod install && cd ..

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Platform Targets

This app targets both **iOS** and **Android**. When making changes:

- Test on **both platforms** before marking work as done.
- Use platform-conditional code only when necessary: `Platform.OS === 'ios'` / `Platform.OS === 'android'`.
- Platform-specific files can use the `.ios.ts` / `.android.ts` extension for platform-only implementations.
- Native module changes require rebuilding the native project (`npm run ios` / `npm run android`) — Metro hot reload is not sufficient.

## Navigation

<!-- Describe the navigation library (React Navigation, Expo Router, etc.) and the screen hierarchy. -->

Navigation is defined in `src/navigation/`. When adding a new screen:

1. Create the screen component in `src/screens/`.
2. Register it in the appropriate navigator in `src/navigation/`.
3. Add the route type to the navigation type definitions.

## State Management

<!-- Describe the state management approach (Redux, Zustand, Context, etc.). -->

Global state lives in `src/store/`. Prefer local component state for UI-only state that doesn't need to be shared.

## Making Changes

1. Run the app on an iOS simulator and Android emulator before committing.
2. Write or update tests for any logic changes.
3. Keep commits small and focused; use conventional commit messages.

## Testing

```sh
npm test                  # Unit and component tests
npm run test:e2e          # End-to-end tests (requires a running simulator/emulator)
```

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design notes and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not commit auto-generated native build artifacts (`ios/build/`, `android/build/`, `android/.gradle/`).
- Do not add native modules without ensuring they are supported on both platforms (or explicitly document the platform restriction).
- Do not access platform-specific APIs without a fallback or platform check.
- Do not commit secrets or API keys in source files — use environment variables or a secrets service.
- Do not use `console.log` for debugging in production builds.
