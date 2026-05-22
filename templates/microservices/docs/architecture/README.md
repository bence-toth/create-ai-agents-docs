# Architecture

High-level overview of the distributed system design.

## Overview

<!-- Describe the platform at a high level: what it does, who uses it, and how many services it comprises. -->

## Service Map

<!-- Describe each service, what it owns, and how it communicates with others. A diagram is helpful here. -->

```
[Service A] ──REST──▶ [Service B]
     │
   events
     ▼
[Service C]
```

<!-- Update the diagram above to reflect the actual service topology. -->

## Data Ownership

| Service | Owns |
| ------- | ---- |
| <!-- service-a --> | <!-- users table, user profile data --> |

No service may read or write another service's data store directly.

## Communication Patterns

<!-- Describe when synchronous vs. asynchronous communication is used. -->

| Pattern    | Used for                                              |
| ---------- | ----------------------------------------------------- |
| REST       | Synchronous queries where the caller needs a response |
| gRPC       | High-throughput synchronous calls between services    |
| Events     | State change notifications, fan-out, eventual consistency |

## Observability Stack

<!-- Describe logging, metrics, and tracing infrastructure. -->

| Concern  | Tool     | Notes                                     |
| -------- | -------- | ----------------------------------------- |
| Logging  | <!-- --> | Structured JSON, includes correlationId   |
| Metrics  | <!-- --> | Request rate, error rate, latency         |
| Tracing  | <!-- --> | Distributed traces across service calls   |

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, infrastructure, or third-party APIs this platform depends on. -->
