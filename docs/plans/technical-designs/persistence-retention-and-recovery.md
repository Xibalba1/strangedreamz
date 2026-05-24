---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Technical Design: Persistence, Retention, And Recovery

## Purpose

Define what Strange Dreamz persists, what expires, and how the room recovers without turning the product into an archive.

## Product Requirements Covered

- No user-facing archive in MVP or V1.
- Persist only what is needed to operate the live room, recover from short failures, enforce current-session limits, moderate current content, and manage active videos or generation.
- Persist during the awake day: active videos, cycle state, active themes, boosts, pane votes, handles, and action counters.
- Persist across sleep: final four active videos and configured video pool as needed for operation.
- Mostly ephemeral: murmurs, activity feed, handles after sleep, action counters after sleep, themes, and boosts after sleep.
- If cycle state cannot be recovered, restart cleanly and show "The organism reassembled itself."
- Operational logs may exist for debugging and safety but are not product history.
- Aggregate product-learning metrics may persist only as operational learning and must not expose a user-facing archive.

## Retention Matrix

| Data | Awake Day | Across Sleep | User-Facing Archive |
| --- | --- | --- | --- |
| Active pane videos | Persist | Final four persist | No |
| Pane traits and names | Persist while active | Persist with active panes if needed | No |
| Cycle state | Persist for recovery | Expire | No |
| Themes and boosts | Persist for active cycle/day | Expire | No |
| Pane votes and counters | Persist for active cycle/day | Expire | No |
| Handles and sessions | Persist for awake day | Expire | No |
| Murmurs and echoes | Mostly ephemeral | Expire | No |
| Activity feed | Mostly ephemeral | Expire unless needed for live recovery | No |
| Lineage | Persist only as needed for active panes | Persist only with active panes if needed | No public archive |
| Aggregate product metrics | Persist as derived counts or rates | Persist as needed for product learning | No |
| Admin configuration | Persist | Persist | Admin-only |
| Operational logs | Redacted and access-controlled | Retained only by documented safety/debug policy | No |

## Operational Log Policy

Before deployment, define a log retention and redaction policy that preserves ephemerality:

- avoid logging raw handles, prompts, murmurs, rejected content, and session identifiers by default;
- redact or separately protect any safety/audit exception that needs raw content;
- set retention windows for application logs, admin audit logs, moderation traces, provider traces, and error reports;
- restrict access to logs that can identify users or reveal rejected content;
- keep aggregate product metrics separate from raw social text.

## Recovery Modes

- Full recovery: restore active videos, cycle state, themes, boosts, handles, action counters, and live configuration.
- Partial recovery: restore active videos and safe defaults, then emit a visible recovery event.
- Clean cycle restart: when cycle state cannot be trusted, restart the cycle and show the required reassembled event.
- Sleep recovery: after sleep boundary, resume with previous final four videos and fresh social state.
- Product learning recovery: aggregate metrics may survive sleep only as counts or rates, not replayable user history.

## First Failing Tests For Future Slices

- Awake recovery: given a restart during the awake day with valid persisted state, the room restores current videos, phase, themes, boosts, handles, and counters.
- Sleep expiry: given sleep time passes, handles, counters, active themes, boosts, murmurs, and cycle state expire.
- Final-pane persistence: given wake time arrives, the room resumes with the previous day's final four videos.
- Clean restart event: given persisted cycle state is invalid, the room starts a clean cycle and emits "The organism reassembled itself."
- No archive: given a normal user looks for prior-day history, the product exposes no public archive surface.
- Log redaction: given a prompt, murmur, rejected content item, or session identifier is processed, default logs do not retain raw user text or reusable session identifiers.
- Aggregate metrics: given a cycle completes, product-learning counts can update without exposing replayable user history.

## Validation Expectations

- Persistence tests should cover awake-day recovery and sleep-boundary expiry separately.
- Data contract tests should make retention rules explicit for each state category.
- Operations tests should verify recovery messaging reaches interactive and display clients.
- Privacy tests should verify retention and logging rules preserve ephemerality boundaries.

## Open Decisions

- Database or storage engine.
- Snapshot versus event-log approach for recoverable room state.
- Retention duration and access controls for operational logs, audit logs, moderation traces, provider traces, and error reports.
- Backup and restore expectations.
- Whether lineage is stored as pane metadata or derived from recent operational events.

## Sources

- `docs/plans/PRD_V0.md`
- `docs/plans/initial-roadmap.md`
- `docs/plans/ARCHITECTURE.md`
