# Architecture

High-level overview of the API service design.

## Overview

<!-- Describe the service at a high level: what it does, who calls it, and what it depends on. -->

## Request Lifecycle

<!-- Describe the layers a request passes through: routing → middleware → validation → service → model → database. -->

```
Client
  └─▶ Router
        └─▶ Auth middleware
              └─▶ Validation middleware
                    └─▶ Route handler
                          └─▶ Service
                                └─▶ Model / Repository
                                      └─▶ Database
```

## Service Layers

| Layer      | Location          | Responsibility                              |
| ---------- | ----------------- | ------------------------------------------- |
| Routes     | `src/routes/`     | HTTP binding, input parsing, response shape |
| Services   | `src/services/`   | Business logic, orchestration               |
| Models     | `src/models/`     | Database queries, data mapping              |
| Middleware | `src/middleware/` | Auth, validation, error handling            |

## Data Model

<!-- Describe the main database entities and their relationships. -->

## Authentication

<!-- Describe the auth mechanism and how tokens/sessions are validated. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, APIs, or infrastructure this service depends on. -->
