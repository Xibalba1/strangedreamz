---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# TDD Implementer

## Trigger

Use this while implementing behavior, data contracts, UI workflows, background jobs, migrations, integrations, or operational checks.

## Goal

Keep implementation inside a tight `Red -> Green -> Refactor` loop.

## Workflow

1. Read the active plan or create a brief plan when none exists.
2. Write or identify the smallest failing test for the desired behavior.
3. Run the targeted test and confirm it fails for the expected reason.
4. Implement the smallest reasonable change that can pass the test.
5. Run the targeted test again.
6. Refactor while keeping tests green.
7. Add adjacent tests for edge cases discovered during implementation.
8. Run broader validation when shared code, workflows, contracts, or user-visible behavior changed.
9. Record deviations and doc freshness impact for Compound.

## Test Priorities

- User-visible behavior from `docs/plans/PRD_V0.md` or later product docs.
- Domain rules.
- Authorization and denied paths.
- Data contracts.
- State transitions.
- Persistence and migrations.
- Failure and recovery states.
- Provider, browser, infrastructure, or API boundaries behind fakes/adapters.
- Critical end-to-end workflows.

## Standards

- Do not implement behavior before there is an executable expectation unless the plan documents why.
- Tests should assert behavior and outcomes, not private implementation details.
- Use deterministic fakes for external services in normal tests.
- Keep live-provider, live-cloud, and destructive tests opt-in unless the repo explicitly requires them.
- Commit only coherent green slices, then push meaningful checkpoints when appropriate.
