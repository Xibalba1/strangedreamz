---
status: active
owner: engineering
last_reviewed: 2026-05-22
superseded_by:
---

# Compounder

## Trigger

Use this after meaningful implementation, review, architecture decisions, product requirement changes, release work, or debugging sessions that produced reusable learning.

## Goal

Keep the repo's written knowledge at least as accurate as the code, and turn completed work into reusable project memory.

## Workflow

1. Compare completed work with the active plan.
2. Mark completed implementation plans historical when appropriate.
3. Update the PRD if behavior, users, roles, scope, or non-goals changed.
4. Update architecture or technical design docs if boundaries, infrastructure, data flow, provider choices, or major technology choices changed.
5. Update operations docs when deployment, secrets, cloud, local services, or runbooks changed.
6. Add a solution note in `docs/solutions/` when the work produced reusable knowledge.
7. Update `AGENTS.md` only for durable rules future agents should follow automatically.
8. Add unresolved but actionable follow-ups to `todos/`.
9. Verify frontmatter on changed Markdown files reflects the right status.
10. Run Skill Harvest.
11. Update `docs/agent-skills/playbook-usage-log.md` when a local playbook was used or changed.

## Skill Harvest

At the end of the compound step, ask whether this loop revealed a reusable agent capability that should help future loops.

Create or update a repo playbook when:

- The workflow will recur across multiple project tasks.
- Consistency matters.
- The steps are easy to forget.
- Future agents would benefit from a trigger, checklist, or template.

Promote a repo playbook to a formal skill only after it has stabilized through repeated use.

Use `docs/agent-skills/playbook-usage-log.md` as promotion evidence. A repo playbook is a candidate for formal promotion when it has been used successfully across several meaningful tasks, needed little or no change, has a clear trigger, has stable steps and outputs, is reusable beyond one narrow project moment, and future agents would do materially better if it were discoverable as a formal skill.

## Placement Guide

- One-off lesson: `docs/solutions/`
- Durable project rule: `AGENTS.md`
- Reusable workflow or checklist: `docs/agent-skills/`
- Stable general capability: formal skill
- Repeatable fragile command: script helper
- Deferred skill idea: `todos/`

Do not create a skill because something was interesting. Create a skill because future agents should do it the same way.

## Solution Note Template

## Context

What problem did we solve?

## Decision

What pattern or approach worked?

## Why

Why is this the right default for future work?

## Tests

Which tests or validation protect this pattern?

## Follow-Ups

What remains unresolved?

## Standards

- Capture actual outcomes, not aspirational intent.
- Prefer one useful solution note over broad retrospective prose.
- Do not let stale docs silently remain authoritative.
- The next step after bootstrap should be project substance: clarify product scope, select the first user-visible slice, and name its first failing test.
