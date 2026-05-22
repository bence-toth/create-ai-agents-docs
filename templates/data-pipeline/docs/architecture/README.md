# Architecture

High-level overview of the data pipeline design.

## Overview

<!-- Describe what data flows through this system and who or what consumes the outputs. -->

## Data Flow

<!-- Describe how data moves from source systems to final outputs. A diagram is helpful here. -->

```
Source Systems
  └─▶ Raw Layer (landing)
        └─▶ Staging Layer (clean, typed, deduplicated)
              └─▶ Marts (business-facing, aggregated)
                    └─▶ BI Tools / Consumers
```

## Source Systems

<!-- List the upstream data sources this pipeline ingests from. -->

| Source       | Type          | Ingestion Method       | Frequency |
| ------------ | ------------- | ---------------------- | --------- |
| <!-- name --> | <!-- DB/API/file --> | <!-- batch/streaming --> | <!-- hourly/daily --> |

## Pipeline Inventory

<!-- List all pipelines and what they do. -->

| Pipeline | Input | Output | Schedule |
| -------- | ----- | ------ | -------- |
| <!-- name --> | <!-- source tables --> | <!-- target table --> | <!-- cron/trigger --> |

## Data Quality Checks

<!-- Describe the data quality strategy: where checks run, what they test, and what happens on failure. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, data sources, or infrastructure this pipeline depends on. -->
