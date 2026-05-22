# Service Contracts

Formal definitions of the APIs and events that services expose to each other.

## API Contracts

<!-- Document each synchronous API contract below. -->

### `<service-name>` API

**Base URL:** `http://<service-name>:8080`

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/health` | `GET` | Health check |
| <!-- /resource --> | <!-- GET --> | <!-- Description --> |

---

## Event Contracts

<!-- Document each event schema below. -->

### `<EventName>`

Published by: `<service-name>`
Consumed by: `<service-a>`, `<service-b>`

**Schema**

```json
{
  "eventType": "<EventName>",
  "version": "1",
  "correlationId": "string",
  "occurredAt": "ISO 8601 timestamp",
  "payload": {
    // event-specific fields
  }
}
```

**Versioning**

- New fields may be added in a minor version — consumers must ignore unknown fields.
- Removing or renaming fields requires a new major version.

---

<!-- Repeat the patterns above for each API and event contract. -->
