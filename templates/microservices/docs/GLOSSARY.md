# Glossary

Distributed systems terms used throughout this codebase.

<!-- Add terms in alphabetical order. -->

| Term             | Definition                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| bounded context  | A clearly defined boundary within which a particular domain model applies — maps to a service in this system                   |
| correlation ID   | A unique identifier attached to a request that is propagated across service calls, enabling distributed tracing                |
| event            | An immutable record of something that happened in a service, published for other services to react to                          |
| idempotent       | An operation that produces the same result regardless of how many times it is applied — required for all event consumers       |
| saga             | A pattern for managing distributed transactions across multiple services using a sequence of local transactions and compensating actions |
| service contract | The formal definition of a service's API or events that other services depend on                                               |
| service mesh     | Infrastructure layer that handles service-to-service communication, including retries, load balancing, and observability       |
