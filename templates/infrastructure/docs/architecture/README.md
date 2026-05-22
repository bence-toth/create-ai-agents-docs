# Architecture

High-level overview of the infrastructure topology.

## Overview

<!-- Describe what this infrastructure supports: which applications, services, and teams rely on it. -->

## Environment Topology

<!-- Describe each environment and what it is used for. -->

| Environment | Purpose                          | Access                              |
| ----------- | -------------------------------- | ----------------------------------- |
| dev         | Development and experimentation  | All engineers                       |
| staging     | Pre-release validation           | Engineers and QA                    |
| prod        | Live user traffic                | On-call team, CI/CD pipeline only   |

## Network Layout

<!-- Describe the network architecture: VPCs, subnets, security groups, ingress/egress rules. -->

## Compute and Services

<!-- List the major compute resources and services provisioned. -->

| Resource | Type | Environment(s) | Purpose |
| -------- | ---- | -------------- | ------- |
| <!-- name --> | <!-- EC2/GKE/Lambda/etc. --> | <!-- dev/staging/prod --> | <!-- purpose --> |

## IAM and Access Control

<!-- Describe the access control model: roles, policies, service accounts. -->

## Secrets Management

<!-- Describe how secrets are stored and accessed at runtime. -->

## Key Design Decisions

<!-- Summarize the most important architectural decisions. Link to ADRs for details. -->

See [../adr/](../adr/) for Architecture Decision Records.

## External Dependencies

<!-- List external services, SaaS tools, or third-party APIs this infrastructure depends on. -->
