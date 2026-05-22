# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this API does and its primary purpose. -->

This is a **{{apiStyle}} API** service named `{{projectName}}`.

## Repository Structure

```
{{projectName}}/
├── src/
│   ├── routes/        # Route handlers / resolvers
│   ├── services/      # Business logic
│   ├── models/        # Data models and database access
│   ├── middleware/    # Auth, validation, error handling
│   └── config/        # Environment and app configuration
├── tests/
│   ├── unit/
│   └── integration/
└── migrations/        # Database migration files
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start the development server
npm run dev
```

## API Conventions

### {{apiStyle}} conventions

<!-- REST: describe URL structure, HTTP verb usage, response envelope format, pagination. -->
<!-- GraphQL: describe query/mutation naming, pagination (cursor vs. offset), error format. -->

- **URL structure:** `/<resource>` for collections, `/<resource>/:id` for single items
- **Verbs:** `GET` read, `POST` create, `PUT` replace, `PATCH` partial update, `DELETE` remove
- **Success responses:** `200 OK` for reads/updates, `201 Created` for creates, `204 No Content` for deletes
- **Error responses:** always return `{ "error": { "code": "...", "message": "..." } }`

### Validation

- Validate all incoming request data at the route/controller layer before it reaches the service layer.
- Return `400 Bad Request` for invalid input with a clear error message.
- Do not trust client-supplied IDs that reference other users' resources — always scope queries to the authenticated user.

### Authentication

<!-- Describe the auth mechanism (JWT, sessions, API keys, OAuth, etc.). -->

- Auth is enforced via middleware applied to all protected routes.
- The authenticated principal is available as `req.user` (or equivalent).
- Public endpoints must be explicitly opted out of auth middleware.

## Database Migrations

- Never modify existing migration files — always create a new migration.
- Migrations must be reversible (include a `down` function).
- Run migrations before starting the server: `npm run migrate`.
- Test the down migration before merging to catch rollback issues.

## Adding a New Endpoint

1. Define the route in `src/routes/`.
2. Write the business logic in a service in `src/services/`.
3. Add input validation at the route level.
4. Write integration tests in `tests/integration/` that exercise the full request/response cycle.
5. Document the new endpoint in [docs/api/README.md](docs/api/README.md).

## Testing

```sh
npm test                       # All tests
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests (requires running database)
```

Integration tests hit a real database. Do not mock the database — mock failures lead to undetected schema mismatches.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for high-level design and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for domain-specific terminology.

## What to Avoid

- Do not put business logic in route handlers — keep it in services.
- Do not access the database directly from route handlers — go through models/repositories.
- Do not return raw database errors to the client — map them to appropriate HTTP status codes.
- Do not commit `.env` files or any secrets.
- Do not skip migrations or manually alter the database schema in production.
