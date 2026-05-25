---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# Deterministic Shell Proof

## Context

The first product slice needed to move beyond a scaffold without inventing live provider, persistence, or realtime complexity.

## Decision

Use a shared deterministic room snapshot as the first product fixture. Render the same snapshot through interactive `/` and read-only `/display` client modes, and protect that contract with Playwright e2e tests.

## Why

The PRD requires one canonical room that can project to multiple surfaces. A deterministic fixture lets the app prove that shape before adding session handles, submissions, boosts, pane votes, cycle transitions, or provider integration.

## Tests

- `tests/e2e/deterministic-shell.spec.ts`
- `tests/e2e/scaffold.spec.ts`
- `src/shared/scaffold.test.ts`

## Follow-Ups

The next slice should keep the same test-first posture while adding the first social state transition: session handle, eligible theme submission, and boosting with visible rank or count updates.
