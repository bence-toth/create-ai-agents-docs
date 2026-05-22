# Glossary

Data engineering terms used throughout this codebase.

<!-- Add terms in alphabetical order. -->

| Term           | Definition                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| backfill       | Reprocessing historical data through a pipeline, typically after a logic change                                      |
| DAG            | Directed Acyclic Graph — a representation of a pipeline where each node is a task and edges define execution order   |
| idempotent     | An operation that produces the same result regardless of how many times it is applied with the same input            |
| mart           | A curated, business-facing data set derived from staging data; the final layer consumed by analysts and dashboards   |
| raw layer      | The landing zone for data exactly as received from source systems, with no transformations applied                   |
| staging layer  | An intermediate layer where raw data is cleaned, typed, and deduplicated before being used in marts                  |
| transformation | A query or script that reads from one or more source tables and writes to a target table                             |
