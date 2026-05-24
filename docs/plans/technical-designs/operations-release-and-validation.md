---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Technical Design: Operations, Release, And Validation

## Purpose

Define the operational process architecture needed before Strange Dreamz can safely deploy, smoke, recover, and introduce external providers.

## Product Requirements Covered

- Canonical validation commands are not established yet.
- Release and deployment targets are not established yet.
- Production deploys reviewed default-branch code until a runbook changes that.
- Feature-branch and hotfix deploys require explicit approval.
- Pushed branches are review-ready, not production-ready.
- Production is current only when release identity and smoke checks prove it.
- Do not deploy until `docs/operations/` contains target environment, deployment mechanism, release identity check, smoke checks, and rollback expectations.
- Future provider integration must measure latency, failure, moderation, cost, and usable-loop rate.

## Operational Boundaries

| Boundary | Required Before Production |
| --- | --- |
| Validation | Install, lint, typecheck if applicable, unit/domain tests, browser/workflow tests, build |
| CI | Runs canonical validation on PRs or merge candidates |
| Deployment | Target environment and mechanism documented |
| Release identity | A way to prove which source revision is live |
| Smoke checks | Room availability, display mode, seed videos, core actions, admin panic path |
| Rollback | Expected rollback or mitigation path |
| Provider operations | Burn-in, quotas, cost controls, backup clip readiness before V1 |
| Secrets | Environment-separated credentials, rotation, revocation, least privilege, no-secret logging |

## Required Runbooks

Create these under `docs/operations/` when the stack and deployment target are selected:

- Deployment runbook.
- Release identity and smoke-check runbook.
- Rollback runbook.
- Provider burn-in runbook before V1 real generation.
- Incident/panic-control runbook for live room safety.
- Secrets management runbook before any live moderation, storage, CDN, or AI provider credential is configured.

## Stack-Selection Validation

The stack-selection slice must prove more than a static page:

- deterministic four-panel rendering from seed data;
- one authoritative room snapshot observed by interactive and display clients;
- one shared-state mutation propagating to all connected clients;
- deterministic time or scheduler testing for cycle behavior;
- browser workflow testing for at least one responsive surface;
- local fake-provider defaults that cannot call live providers by accident.

The selected stack should be rejected or revisited if it cannot support the MVP operating envelope, deterministic time tests, secure session-backed mutations, or deployable smoke checks without disproportionate custom infrastructure.

## Secrets Management Contract

Before V1 provider work or any live external moderation/storage service, document:

- credential source of truth and environment separation;
- CI and deploy-time access boundaries;
- rotation and revocation process;
- least-privilege scopes for provider, moderation, storage, and CDN credentials;
- local development defaults that use fake providers;
- logging rules that prevent secrets from appearing in app logs, provider traces, or failure reports.

## First Failing Tests For Future Slices

- Validation bootstrap: given the selected stack, canonical validation commands run locally and in CI.
- Stack proof: given two interactive clients and one display client observe the same deterministic room, one mutation updates the shared snapshot everywhere without live provider calls.
- Smoke identity: given a deployed environment, a smoke check can report the live release identity.
- Display smoke: given display mode is loaded in the target environment, it shows the wall and rejects interactive actions.
- Admin panic smoke: given an authenticated admin triggers a panic control in a non-production or approved environment, the room reflects the control visibly.
- Provider fake safety: given provider integration is disabled, tests prove no live provider call is required for MVP validation.
- Secret safety: given provider, moderation, storage, or CDN credentials are configured, validation proves secrets are environment-scoped and not emitted in logs.

## Validation Expectations

- Every implementation slice should name its first failing test before product code is written.
- Canonical validation commands should be recorded in `AGENTS.md` after stack selection.
- Deployment must not proceed until operations docs define target, mechanism, identity, smoke, and rollback.
- V1 provider work should include non-live fake-provider tests and separate burn-in metrics.
- Live external integrations must not proceed until secrets management and no-secret logging rules are documented.

## Open Decisions

- Initial stack and package manager.
- CI provider and workflow shape.
- Hosting/deployment target.
- Secrets management.
- Observability/logging approach.
- Production domain and display mode URL shape.
- Provider burn-in environment.

## Sources

- `AGENTS.md`
- `docs/plans/PRD_V0.md`
- `docs/plans/initial-roadmap.md`
- `docs/plans/video-generation-latency-research.md`
- `docs/plans/ARCHITECTURE.md`
