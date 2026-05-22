# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what this platform does and its primary purpose. -->

`{{projectName}}` is a distributed system made up of multiple independently deployable services communicating via **{{communicationPattern}}**.

## Repository Structure

```
{{projectName}}/
├── services/
│   ├── <service-a>/   # One directory per service
│   ├── <service-b>/
│   └── <service-c>/
├── shared/            # Shared types, event schemas, client libraries
├── infrastructure/    # Deployment manifests and IaC
└── docs/
    ├── contracts/     # API and event contracts between services
    ├── architecture/
    └── adr/
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Service Map

<!-- List every service, what it owns, and how it communicates. Update this whenever a service is added or removed. -->

| Service | Responsibility | Owns | Communicates via |
| ------- | -------------- | ---- | ---------------- |
| <!-- service-a --> | <!-- what it does --> | <!-- its database/data --> | <!-- REST / gRPC / events --> |

## Service Boundaries

Each service is an independent unit with its own:

- **Codebase** — under `services/<service-name>/`
- **Database** — no service may read or write another service's database directly
- **Deployment** — services are deployed independently

When you need data that another service owns, call its API or consume its events — never access its database.

## Inter-Service Communication

This platform uses **{{communicationPattern}}** for inter-service communication.

### Synchronous calls (REST / gRPC)

- Call other services through their published API, not internal endpoints.
- Implement retries with exponential backoff for transient failures.
- Set timeouts on all outbound calls — never wait indefinitely.
- Document synchronous dependencies in [docs/contracts/README.md](docs/contracts/README.md).

### Asynchronous events

- Publish events when your service's state changes in a way that other services might care about.
- Consumers must be idempotent — the same event may be delivered more than once.
- Event schema changes must be backwards-compatible; use schema versioning for breaking changes.
- Document event contracts in [docs/contracts/README.md](docs/contracts/README.md).

## Cross-Service Changes

Changes that affect the contract between services (API shape, event schema) require coordinated rollout:

1. Make the change backwards-compatible (add fields, do not remove or rename them).
2. Deploy the producer with the new contract.
3. Migrate consumers to use the new contract.
4. Once all consumers are migrated, remove the old contract in a follow-up release.

Never deploy a breaking contract change to a single service without first updating all its consumers.

## Observability

Every service must:

- **Log** structured JSON to stdout, including a `correlationId` that is propagated across service calls.
- **Emit metrics** for request rate, error rate, and latency.
- **Produce traces** for all inbound and outbound calls.

Use the `correlationId` when investigating an issue — it lets you trace a request across service boundaries.

## Adding a New Service

1. Create a new directory under `services/<service-name>/`.
2. Define the service's API and/or event contracts in `docs/contracts/`.
3. Add the service to the infrastructure deployment manifests.
4. Register the service in the service map above.

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for the system design and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for distributed systems terminology.

## What to Avoid

- Do not access another service's database directly — go through its API or events.
- Do not make synchronous calls in a tight loop — prefer batching or events for high-volume flows.
- Do not deploy a breaking API or event schema change without updating all consumers first.
- Do not swallow errors from downstream services — propagate or log them with the correlation ID.
- Do not commit secrets or credentials.
