---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# CLI-First Agent Tooling

## Context

Strange Dreamz agents should use available project CLIs whenever those tools can inspect source-of-truth state more accurately than memory or guesswork. This matters for GitHub review state, Hetzner infrastructure, Docker deployment checks, release smoke probes, and canonical npm validation.

## Decision

Keep the canonical CLI surface in `docs/operations/cli-inventory.md`, and keep an executable local availability check in `scripts/cli-inventory.mjs`.

Future agents should read the inventory during orientation for implementation, review, release, infrastructure, provider, or operations work. When spawning worker agents, the parent agent should include the relevant inventory excerpt in the worker prompt.

## Why

This makes CLI usage an explicit project habit instead of transient session memory. It also catches setup drift early; for example, the inventory check reports when the shell is not using the Node and npm versions required by `.nvmrc` and `package.json`.

## Tests

- `scripts/cli-inventory.test.mjs` verifies required CLI entries, agent-ready report formatting, minimum-version mismatch reporting, and secret-looking output redaction.
- `npm run cli:inventory` verifies real local CLI availability.
- Canonical validation remains `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build`.

## Follow-Ups

Add new entries to both `docs/operations/cli-inventory.md` and `scripts/cli-inventory.mjs` whenever a future provider, observability service, database, queue, storage service, or deployment workflow introduces another CLI that agents should use by default.
