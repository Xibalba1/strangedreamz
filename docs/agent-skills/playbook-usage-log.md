---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# Playbook Usage Log

## Purpose

Track repeated use of repo-local playbooks.

This log is promotion evidence, not a task checklist. Use it to notice whether a playbook actually helps across meaningful work, whether its trigger and steps are stable, and whether future agents would benefit if it became a formal reusable skill.

## When To Update

Update this log during Compound, end-of-work, or retrospective steps when:

- A local playbook materially guided planning, implementation, review, release, compounding, or handoff.
- A local playbook changed because a workflow step was unclear, missing, or wrong.
- A completed task provides useful evidence that a playbook is stable or not yet stable.
- A local playbook seems ready to consider for formal promotion.

Do not update this log for every tiny task. Prefer one entry per meaningful slice or workflow loop.

## Fields To Record

- Date.
- Slice / Workflow / Task.
- Playbooks Used.
- Changes Needed.
- Promotion Signal.

## Stable Enough To Promote

A local playbook becomes a candidate for formal promotion when it has been used successfully across several meaningful tasks, needed little or no change, has a clear trigger, has stable steps and outputs, is broadly reusable beyond one narrow project moment, and future agents would do materially better if it were discoverable as a formal skill.

Do not create a formal skill only because a workflow is interesting.

## Usage Ledger

| Date | Slice / Workflow / Task | Playbooks Used | Changes Needed | Promotion Signal |
| --- | --- | --- | --- | --- |
| 2026-05-22 | Repo workflow bootstrap | Planning Slice, Compounder | None yet | Seeded baseline; no promotion evidence yet |
| 2026-05-23 | PRD interview and rewrite | Planning Slice | None | Helped keep PRD work tied to source-of-truth and future testable slices; more use needed before promotion |
| 2026-05-23 | Documentation organization pass | Next Action Router, Compounder | None | Reinforced placement rules for PRDs, reusable methodology notes, brainstorms, and todos |
| 2026-05-23 | Architecture and technical design planning | Planning Slice, Compounder | None | Helped convert PRD and roadmap into stack-neutral architecture docs while preserving first-failing-test discipline |
| 2026-05-24 | Phase 0 stack-selection planning | Planning Slice | None | Helped keep stack selection bounded to operating envelope, validation commands, and the first deterministic shell test |
| 2026-05-24 | Compound Engineering outer-loop routing | Next Action Router, Compound Outer Loop | Added `compound-outer-loop.md` and wired it into `AGENTS.md` | Establishes a repo-local trigger that delegates to formal CE skills without requiring the user to invoke inner loops manually; needs repeated use before promotion |
| 2026-05-24 | Phase 0 operating-envelope slice | Next Action Router, Compound Outer Loop, Planning Slice | None | Routed broad CE prompt into formal `ce-work` execution and kept U1 bounded to documented expected/stress targets without scaffold work |
| 2026-05-24 | Pushed docs checkpoint review | Next Action Router, Compound Outer Loop, Review | None | Routed pushed-but-no-PR state into review before new implementation; caught stale active-doc references after U1 |
| 2026-05-24 | Repo default-branch normalization and stack decision | Next Action Router, Compound Outer Loop, Planning Slice | None | Unblocked future PR review by making `main` the default branch, then used formal `ce-plan` routing for U2 stack selection |
| 2026-05-24 | Stack decision PR review | Next Action Router, Compound Outer Loop, Review | None | Routed draft PR into review before further implementation and caught stale U2 open-question wording |
| 2026-05-24 | TypeScript scaffold and validation bootstrap | Next Action Router, Compound Outer Loop | None | Routed post-merge state into U3 scaffold work, established canonical npm validation commands, and preserved U4 as the first product-behavior test |
| 2026-05-24 | Outer-loop orchestration clarification | Compound Outer Loop, Next Action Router, Compounder | Updated `compound-outer-loop.md` and `AGENTS.md` to define the outer loop as chained CE skill orchestration until a terminal state, not a single inner-skill invocation | Strengthens the trigger semantics for broad prompts like "lead the way with Compound Engineering"; useful promotion evidence if later loops reliably continue through review and compound |
| 2026-05-24 | Scaffold PR review-readiness pass | Next Action Router, Compound Outer Loop, Review, Compounder | None | Demonstrated that a broad CE prompt stayed in Review for an open PR, ran canonical validation, fixed a frontmatter freshness issue, marked the PR ready, and returned to Compound instead of starting U4 prematurely |
| 2026-05-25 | CLI-first agent tooling | Compound Outer Loop, TDD Implementer, Compounder | Added a CLI inventory doc/script and wired CLI-first context into `AGENTS.md`, `compound-outer-loop.md`, and `next-action-router.md` | Shows the outer loop can turn an operating principle into tested tooling, durable agent instructions, and reusable project memory without requiring the user to invoke inner skills separately |
| 2026-05-25 | First Hetzner production promotion | Next Action Router, Release Promotion, Compounder | Added a release evidence record under `docs/operations/releases/` | Shows the router correctly stayed in Release after deployment until release identity, smoke checks, service logs, rollback path, and durable evidence were recorded |
| 2026-05-25 | Deterministic shell proof | Next Action Router, TDD Implementer, Compounder | Marked the shell proof completed in roadmap/architecture docs and captured the deterministic snapshot pattern in `docs/solutions/` | Reinforces the repo rule that broad prompts move through test-first implementation and doc freshness before the next product slice |
| 2026-05-25 | Deterministic shell release promotion | Next Action Router, Compound Outer Loop, Review, Release Promotion, Compounder | Caught and fixed a production-only `/display` static-serving gap before merge, deployed `main`, and added release evidence | Demonstrates the outer loop chaining Review into Release instead of starting the next implementation slice after CI passed |
| 2026-05-25 | Session handle, theme submission, and boost loop | Next Action Router, Compound Outer Loop, TDD Implementer, Compounder | None | Routed a broad CE prompt into the next first-failing-test product slice, kept the store in-memory until persistence is justified, and returned through validation, visual QA, and doc freshness before review |
| 2026-05-25 | Full-loop terminal-state clarification | Compound Outer Loop, Next Action Router | Updated `AGENTS.md` and `compound-outer-loop.md` so full CE loops end at deployed-and-recorded, not merely review-ready | Corrects a too-conservative stop condition and makes merge/release continuation explicit unless blocked by CI, review feedback, merge conflict, missing approval, release safety, or user pause |
