---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# In-Memory Social Action Loop

## Context

The first useful realtime illusion needed session handles, theme submission, and boosting without introducing accounts, persistence, realtime infrastructure, moderation providers, or live video generation too early.

## Decision

Keep the first social mutations in a server-owned in-memory room store, expose them through small JSON routes, and render the resulting public room snapshot through the existing client shell.

The store owns handle uniqueness, one theme submission per session, self-boost prevention, duplicate-boost prevention, and public `canBoost` affordances. The React client treats the server snapshot as the source of truth after each mutation.

## Why

This gives the product a testable multi-session social loop while preserving the deterministic shell and avoiding premature infrastructure. The same domain boundaries can later move behind persistence, cookies, CSRF protection, moderation, and realtime fanout without teaching the UI private state rules.

## Tests

- `tests/e2e/session-theme-boost.spec.ts` proves two browser sessions can claim handles, submit a theme, boost it from another session, and see the updated boost count after reload.
- `src/server/roomStore.test.ts` covers duplicate handle rejection, self-boost prevention, and successful boosts from another session.
- `npm run test:e2e` now runs against the production-style static Fastify server so route and static-serving behavior match deployment more closely.

## Follow-Ups

Add pane voting next, still test-first. Before production depends on this state, replace localStorage-only session identity with a hardened browser-session strategy and add persistence, CSRF protection, moderation, per-cycle action pools, and reset semantics.
