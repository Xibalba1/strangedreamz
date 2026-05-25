---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# Technical Design: Identity, Actions, And Social Inputs

## Purpose

Define the MVP normal-user identity model, action economy, theme queue, pane votes, Murmurs, echoes, activity feed, genome influence, and lineage inputs.

## Product Requirements Covered

- Normal users use browser-session handles, not accounts.
- Handles are unique within the canonical room and awake day.
- Action limits reset every cycle.
- One current-cycle submission during Submission Window.
- Ten theme boosts per cycle, max five boosts per theme, no self-boosting.
- Six pane votes per cycle, max three pane votes per pane.
- Murmur cooldowns, constrained templates, free text up to 60 characters, echoes/reactions, no threading.
- Activity feed remains distinct from Murmurs.
- Pane votes immediately affect influence meters, genome weights, social callouts, activity, and lineage candidates.
- Lightweight lineage appears at emergence, on pane info, and in the activity feed.

## Domain Boundaries

- Identity binds a handle to a browser session for the awake day.
- Action economy evaluates per-cycle and per-target limits.
- Theme queue evaluates phase-specific eligibility and incubation.
- Pane votes update influence and genome inputs but do not affect pane survival in MVP.
- Murmurs are social commentary, not chat.
- Activity feed records domain events and system actions.
- Lineage composes compact credit from lock-in, boosts, pane influence, and notable murmurs.

## Current Implementation Slice

The first social-action slice implements an in-memory room store for the deterministic MVP shell. It supports browser-session handles, duplicate-handle rejection, one current-cycle theme submission per session, visible queue updates, self-boost prevention, and duplicate-boost prevention for a theme.

This is deliberately not the full action economy yet. Per-cycle boost pools, per-theme caps beyond one boost per session, pane votes, Murmurs, activity events, persistence, moderation, and CSRF/session-hardening remain future slices.

## Mutation Security Boundary

Every normal-user state-changing action must be authorized against the active browser session and handle pair. Handle claim, theme submission, boost, pane vote, murmur, and echo/reaction mutations must be protected against forged, cross-site, replayed, or stale-session requests.

Display mode must not expose mutation affordances, and server-side mutation paths must reject display-mode or unauthenticated attempts even if a client sends them.

## Core Rules

| Area | Rule |
| --- | --- |
| Handles | Unique per room and awake day; moderated; immutable mid-session |
| Submission | One current-cycle submission during Submission Window |
| Incubation | Late submissions carry forward for exactly one eligible cycle |
| Boosts | Per-cycle pool, per-theme cap, no self-boosting |
| Pane votes | Per-cycle pool, per-pane cap, influence only in MVP |
| Murmurs | 30-second posting cooldown; free text capped at 60 characters |
| Echoes | Lighter than murmurs but still throttled |
| Lineage | Compact, current-pane provenance rather than public archive |

## V1 Social Mechanics Boundary

MVP pane votes influence genome, visual infection, callouts, activity, and lineage candidates. Before V1 is considered complete, a separate plan should decide how pane votes contribute to survival, protection, or an equivalent mechanic so beloved panes matter beyond genome influence.

## First Failing Tests For Future Slices

- Handle uniqueness: given one user claims a handle during the awake day, another user trying the same handle is rejected visibly.
- Submission phase: given a user has a handle and the cycle is in Submission Window, submitting a theme makes it eligible in the current cycle.
- Incubation: given Submission Window has ended, a submitted theme appears as incubating for the next cycle.
- Boost limit: given a user has placed five boosts on one theme, a sixth boost on that theme is rejected.
- Self-boost prevention: given a user submitted a theme, that same session cannot boost it.
- Pane vote limit: given a user has voted three times on one pane, another vote on that pane is rejected.
- Murmur cooldown: given a user posted a murmur less than 30 seconds ago, posting another murmur is disabled or rejected.
- Mutation security: given a forged, cross-site, replayed, stale-session, or display-mode request attempts a submission, boost, vote, murmur, or echo, the mutation is rejected and no public event is emitted.
- Lineage composition: given a locked theme, top boosters, dominant pane influence, and a notable murmur, emergence displays compact lineage with appropriate credit.

## Validation Expectations

- Domain tests should focus on action limits, phase eligibility, ownership checks, and cooldown boundaries.
- Workflow tests should prove visible counts, ranks, genome movement, Murmurs, and activity update from successful actions.
- Error-path tests should prove rejections are visible to the originating user and do not leak as public events.
- Security tests should cover stale-session, forged, replayed, and display-mode mutation attempts.

## Open Decisions

- Session storage and cookie strategy for normal users.
- Handle normalization rules.
- Exact ranking and momentum calculation.
- Echo/reaction throttling model.
- Notable murmur selection rule for lineage.
- Genome weighting formula.
- V1 pane survival, protection, or equivalent vote consequence.

## Sources

- `docs/plans/PRD_V0.md`
- `docs/plans/initial-roadmap.md`
- `docs/plans/ARCHITECTURE.md`
