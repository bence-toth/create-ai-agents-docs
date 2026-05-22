# Architecture

High-level overview of the mobile app design.

## Overview

<!-- Describe the app at a high level: what it does, who uses it, and how the pieces fit together. -->

## Navigation Structure

<!-- Describe the screen hierarchy and navigation flow. A tree diagram is helpful here. -->

```
Root Navigator
├── Auth Stack
│   ├── LoginScreen
│   └── RegisterScreen
└── Main Tab Navigator
    ├── HomeScreen
    ├── SearchScreen
    └── ProfileScreen
```

<!-- Update the tree above to match the actual navigation structure. -->

## State Management

<!-- Describe the state management approach: what lives in global store vs. local component state. -->

## Data Fetching

<!-- Describe how the app communicates with backend APIs: REST/GraphQL, caching strategy, offline support. -->

## Native Modules

<!-- List any custom native modules and what they provide. -->

| Module | Platform | Purpose |
| ------ | -------- | ------- |
| <!-- module name --> | iOS / Android | <!-- what it does --> |

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, APIs, or device integrations this app depends on. -->
