# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this application does and its primary purpose. -->

`{{projectName}}` is a full-stack web application with a **{{frontend}}** frontend and a **{{backend}}** backend.

## Repository Structure

```
{{projectName}}/
├── client/            # Frontend application ({{frontend}})
│   ├── src/
│   └── package.json
├── server/            # Backend API ({{backend}})
│   ├── src/
│   └── package.json
├── shared/            # Types, validation schemas, and constants shared between client and server
└── package.json       # Workspace root
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install all dependencies
npm install

# Start the full stack (client + server) in development mode
npm run dev

# Run all tests
npm test
```

The client runs on **http://localhost:3000** and the server on **http://localhost:4000** in development.

<!-- Update ports to match your actual configuration. -->

## Client/Server Boundary

The boundary between client and server is the API. Respect it strictly:

- The **client** must never import from `server/` — only communicate via API calls.
- The **server** must never import from `client/` — only respond to HTTP requests.
- The **`shared/`** directory is the only code both sides may import.

## Shared Code

`shared/` contains types, validation schemas, and constants that are used on both sides:

- **Types:** Define data shapes once in `shared/` and import them on both client and server.
- **Validation:** Define validation schemas (e.g. Zod, Yup, Joi) in `shared/` so that client and server validate identically.
- **Never put:** business logic, database access, or UI code in `shared/`.

## API Contract

Changes to the API shape affect both the client and server simultaneously. When modifying an API:

1. Update the server endpoint.
2. Update the shared type definitions in `shared/`.
3. Update the client code that calls the endpoint.
4. Test the full round-trip end-to-end.

Do not deploy server and client independently if the API contract changed between them.

## Environment Variables

```
# Server
DATABASE_URL=...
SESSION_SECRET=...

# Client (only variables prefixed with VITE_ / NEXT_PUBLIC_ / REACT_APP_ are exposed to the browser)
VITE_API_URL=http://localhost:4000
```

Never expose server-only secrets (database credentials, private API keys) to the client — even accidentally via the `shared/` package.

## Database Migrations

- Never modify existing migration files — always create a new migration.
- Run migrations before starting the server: `npm run migrate`.
- Test down migrations before merging.

## Making Changes

1. Identify whether the change is client-side, server-side, or spans both.
2. If it spans both, update `shared/` types first, then server, then client.
3. Run `npm test` from the workspace root to verify both sides pass.
4. Use conventional commit messages.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not cross the client/server boundary with imports — use the API.
- Do not duplicate type definitions — define them once in `shared/`.
- Do not expose secrets to the client — check environment variable prefixes.
- Do not commit `.env` files or any credentials.
- Do not deploy a mismatched client and server if the API contract changed.
