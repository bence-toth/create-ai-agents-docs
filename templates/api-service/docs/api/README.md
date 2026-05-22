# API Reference

Documentation for the `{{projectName}}` {{apiStyle}} API.

## Base URL

```
http://localhost:3000   # local development
```

## Authentication

<!-- Describe how to authenticate (e.g., Bearer token in Authorization header, API key, etc.). -->

## Endpoints

<!-- Document each endpoint. Example format below — update or replace with your actual endpoints. -->

### `GET /health`

Returns the service health status. No authentication required.

**Response**

```json
{
  "status": "ok"
}
```

---

<!-- Add more endpoints below following the same pattern:

### `METHOD /path`

Description.

**Request body** (if applicable)

```json
{
  "field": "value"
}
```

**Response**

```json
{
  "field": "value"
}
```

**Error codes**

| Status | Code           | Meaning                     |
| ------ | -------------- | --------------------------- |
| 400    | INVALID_INPUT  | Request body failed validation |
| 401    | UNAUTHORIZED   | Missing or invalid auth token  |
| 404    | NOT_FOUND      | Resource does not exist        |
-->
