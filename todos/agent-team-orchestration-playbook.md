---
status: active
owner: engineering
last_reviewed: 2026-05-22
superseded_by:
---

# Todo: Agent Team Orchestration Playbook

## Trigger To Promote

Create the playbook when a task:

- Is too large for one linear implementation thread.
- Can be split into independently testable slices.
- Requires explicit contracts between modules or workstreams.
- Needs parallel work plus integration review.
- Has enough coordination risk that role definitions would reduce drift.

## Expected Roles

- Supervisor / Orchestrator: owns the plan, splits work, defines contracts, coordinates handoffs.
- Worker: implements one bounded slice with TDD.
- Reviewer: reviews for bugs, edge cases, and test gaps.
- Integrator: resolves conflicts, checks system coherence, and runs broader validation.
- Compounder: updates docs, captures learnings, and runs Skill Harvest.

## Expected Rule

Use agent teams only when the work can be split into independently testable slices with explicit contracts. Every worker task must name its first failing test and its handoff artifact.

Until the repo has work with that shape, continue using the single-thread loop in `AGENTS.md`.
