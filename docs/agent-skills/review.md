---
status: active
owner: engineering
last_reviewed: 2026-05-22
superseded_by:
---

# Review

## Trigger

Use this before merge, handoff, release eligibility, or declaring a non-trivial implementation complete.

## Goal

Find bugs, behavior regressions, missing tests, stale docs, release blockers, and avoidable complexity.

## Review Checklist

- Correctness: does the implementation satisfy the planned behavior?
- Tests: did the change start with a failing test, and do tests cover important edge cases?
- Security: can users or systems do something they should not?
- Data integrity: do schemas, migrations, constraints, and persistence rules match the domain?
- State: are important transitions explicit and tested?
- Failure: are errors, retries, partial states, and recovery paths safe and visible?
- Boundaries: are external services, providers, browser APIs, and infrastructure isolated behind testable interfaces?
- Observability: are important failures and state changes diagnosable?
- UX: does the user receive clear feedback for loading, empty, error, permission, and success states?
- Complexity: did the implementation introduce abstractions before the project earned them?
- Docs: did active PRD, architecture, operations, roadmap, or playbook docs become stale?

## Project-Specific Risk Areas

- Realtime voting and ordering correctness.
- Prompt moderation and generated content safety.
- Video generation latency, failures, and cost spikes.
- Provider abstraction boundaries.
- Browser-side infection effects becoming noisy or inaccessible.
- User identity, rate limits, and abuse prevention once accounts or handles exist.
- Storage, CDN access, and signed URL behavior once real generated videos exist.

## Output Shape

Lead with findings, ordered by severity. Use file and line references when reviewing code.

If no issues are found, say that clearly and name residual risk or test gaps.

## Standards

- Prefer concrete behavioral findings over broad style feedback.
- Treat missing tests for critical behavior as first-class issues.
- Do not accept undocumented deviations from the active plan unless the updated approach is captured during Compound.
- Keep implementation, review, and release states separate: pushed is not reviewed, reviewed is not merged, and merged is not deployed unless the release policy says so and evidence confirms it.
