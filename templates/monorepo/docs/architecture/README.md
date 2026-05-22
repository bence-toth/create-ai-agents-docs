# Architecture

High-level overview of the monorepo structure and design.

## Overview

<!-- Describe the system at a high level: what it does, its primary actors, and how the pieces fit together. -->

## Package Dependency Graph

<!-- Draw or describe how packages depend on each other.
     Example:
     apps/web  →  packages/ui, packages/api-client
     apps/api  →  packages/domain, packages/db
     packages/ui  →  packages/design-tokens
-->

## Shared Packages

<!-- List and briefly describe each package in packages/. -->

| Package | Purpose |
| ------- | ------- |
| <!-- packages/foo --> | <!-- What it provides --> |

## Applications

<!-- List and briefly describe each app in apps/. -->

| App | Purpose | Port (dev) |
| --- | ------- | ---------- |
| <!-- apps/web --> | <!-- What it does --> | <!-- 3000 --> |

## Deployment Units

<!-- Which apps are deployed, where, and how. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, APIs, or infrastructure this system depends on. -->
