# Architecture

High-level overview of the full-stack application design.

## Overview

<!-- Describe the application at a high level: what it does, who uses it, and how the pieces fit together. -->

## System Diagram

```
Browser ({{frontend}})
    │
    │ HTTP / WebSocket
    ▼
Server ({{backend}})
    │
    │ SQL / ORM
    ▼
Database
```

## Project Structure

| Directory  | Language / Framework | Responsibility                               |
| ---------- | -------------------- | -------------------------------------------- |
| `client/`  | {{frontend}}         | UI, routing, state management, API calls     |
| `server/`  | {{backend}}          | Business logic, API endpoints, auth, DB access|
| `shared/`  | TypeScript           | Types, validation schemas, shared constants  |

## Authentication Flow

<!-- Describe how users authenticate: sessions, JWTs, OAuth, etc. -->

## Data Fetching Strategy

<!-- Describe how the client fetches data: REST, GraphQL, SWR, React Query, server components, etc. -->

## State Management

<!-- Describe how client-side state is managed. -->

## Database

<!-- Describe the database, ORM, and migration strategy. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, APIs, or infrastructure this application depends on. -->
