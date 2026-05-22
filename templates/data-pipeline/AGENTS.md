# Agent Instructions

This file provides guidance to AI coding agents (Claude, Copilot, Cursor, etc.) when working in this repository.

## Project Overview

<!-- Describe what data this pipeline processes and its primary purpose. -->

`{{projectName}}` is a data pipeline project using **{{transformationTool}}** for transformations and **{{orchestrator}}** for orchestration.

## Repository Structure

```
{{projectName}}/
├── pipelines/         # Pipeline / DAG definitions
├── transformations/   # Data transformation logic (SQL models, scripts)
├── tests/             # Data quality and unit tests
├── schemas/           # Source and target schema definitions
└── docs/              # Architecture and decision records
```

<!-- Update the directory tree above to match the actual layout of this repository. -->

## Setup

```sh
# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run tests
pytest tests/
```

## Core Principles

### Idempotency

All pipelines and transformations must be **idempotent**: running a pipeline multiple times with the same input must produce the same output. This enables safe retries and backfills.

- Use `INSERT OVERWRITE` or `MERGE` rather than `INSERT INTO` where data could be re-processed.
- Never rely on incremental state that isn't captured in the data itself.
- Test that running a pipeline twice in a row produces no changes on the second run.

### Backfills

When modifying an existing transformation, consider whether historical data needs to be reprocessed:

- If the change affects output semantics, a backfill is required.
- Document backfill requirements in the PR description.
- Backfills should be runnable as a separate, parameterized job.

### Data Quality

- Define data quality checks (row counts, null checks, referential integrity) alongside transformations.
- A pipeline that produces bad data silently is worse than a pipeline that fails loudly.
- Add `assert` / `test` blocks in `tests/` for every new transformation.

## Pipeline Conventions

- Each pipeline is a single unit of work with a clear input and output.
- Pipelines are named `<source>_to_<target>` or `<domain>_<action>`.
- Scheduling is defined in the orchestrator configuration — do not hardcode schedule times in pipeline code.

## Schema Changes

Schema changes (adding, removing, or renaming columns) require careful coordination:

1. **Adding a column:** Safe — add it as nullable, deploy, then backfill.
2. **Removing a column:** Remove all references in downstream pipelines first, then drop the column.
3. **Renaming a column:** Treat as an add + remove — add the new column, migrate, then drop the old one.

## Adding a New Pipeline

1. Define the pipeline in `pipelines/`.
2. Write the transformation logic in `transformations/`.
3. Add data quality tests in `tests/`.
4. Register the pipeline in the orchestrator DAG/workflow.
5. Document the data flow in [docs/architecture/README.md](docs/architecture/README.md).

## Architecture Decisions

See [docs/architecture/README.md](docs/architecture/README.md) for the data flow and [docs/adr/](docs/adr/) for individual Architecture Decision Records.

## Glossary

See [docs/GLOSSARY.md](docs/GLOSSARY.md) for data engineering terminology.

## What to Avoid

- Do not write non-idempotent pipelines — they are the leading cause of data inconsistency.
- Do not drop or rename columns without a migration plan for downstream consumers.
- Do not hardcode dates, environment names, or connection strings in pipeline code.
- Do not commit credentials or connection strings — use environment variables or a secrets manager.
- Do not process data in place if the original must be preserved — always write to a new target.
