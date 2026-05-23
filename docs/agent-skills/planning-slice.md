---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Planning Slice

## Trigger

Use this before non-trivial implementation, especially when a feature idea, PRD section, bug, operational need, or vague request needs to become a small buildable slice.

## Goal

Turn the idea into the smallest useful vertical slice that can be built with TDD, reviewed safely, and compounded afterward.

## Workflow

1. Read `AGENTS.md`, `docs/plans/PRD_V0.md`, and relevant docs in `docs/plans/`, `docs/operations/`, and `docs/solutions/`.
2. Define the user-visible behavior, domain rule, data contract, or operational outcome.
3. Identify the smallest slice that proves the behavior end to end.
4. Name the first failing test before naming implementation details.
5. List affected areas, likely files, risks, and validation commands.
6. Note non-goals so the slice stays thin.
7. Check whether PRD, architecture, design, operations, or `AGENTS.md` may need updates.
8. Write the plan in `docs/plans/` for non-trivial work.

## Plan Template

## Behavior

What user-visible behavior, domain rule, or operational outcome will exist?

## Smallest Slice

What is the smallest useful increment?

## Non-Goals

What should stay out of this slice?

## First Failing Test

Which executable expectation should fail first, and what should it prove?

## Implementation Notes

Expected files, modules, boundaries, interfaces, migrations, or integration points.

## Risks

Security, data integrity, authorization, concurrency, UX, operations, provider, migration, or performance concerns.

## Validation

Targeted and broader commands to run. Use placeholders until the stack defines canonical commands.

## Doc Freshness

Docs likely to update or mark historical after the work.

## Standards

- A plan is not ready until it names the first failing test or explicitly justifies why executable testing is not available.
- Prefer thin vertical slices over broad subsystem plans.
- Do not design risky behavior without naming how it will be tested.
- Keep product claims aligned to `docs/plans/PRD_V0.md` unless the user provides a newer source.
