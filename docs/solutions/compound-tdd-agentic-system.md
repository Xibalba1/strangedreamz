---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Compound TDD Agentic System

## Purpose

This document is a portable bootstrap guide for running a software repo with compound engineering, red-green test-driven development, repo-local agent playbooks, and conservative release discipline.

Seed a new repo with this document when you want humans and agents to share one operating system for planning, implementation, review, release, and learning.

The system exists to make work safer now and easier later. It is intentionally lightweight at the start, then becomes more specific only after the project earns that specificity through repeated work.

## Philosophy

The system combines two loops.

The correctness loop is:

```text
Red -> Green -> Refactor
```

The learning loop is:

```text
Plan -> Work -> Review -> Compound
```

The practical implementation loop is:

```text
Plan -> Red -> Green -> Refactor -> Commit -> Push -> Review -> Compound
```

The broader operating loop is:

```text
Orient -> Classify -> Execute Loop -> Record
```

Red-green TDD protects the current change. Compound engineering protects the next change. Next-action routing prevents agents from starting new implementation when the repo actually needs review, merge, release, or production validation.

## Core Principles

- Plans are working memory.
- Decisions are durable.
- Learnings compound.
- Behavior changes should begin with a failing executable expectation.
- Tests should describe user-visible behavior, domain rules, data contracts, safety boundaries, and important workflows.
- Documentation should declare whether it is active, historical, or superseded.
- Repo-local playbooks should capture repeated workflows before they become formal skills.
- Broad prompts should be routed before action.
- Pushed, reviewed, merged, and deployed are different states.
- Agent teams are a scaling tactic, not the default mode.

## Bootstrap Sequence

Use this sequence when starting a new repo or converting an existing repo.

```text
1. Inventory the repo.
2. Create or update AGENTS.md.
3. Add freshness frontmatter to Markdown docs.
4. Create the compound docs structure.
5. Move or seed project docs.
6. Seed repo-local playbooks.
7. Add next-action routing.
8. Add release promotion guidance.
9. Add playbook usage tracking.
10. Capture deferred agent-team orchestration.
11. Create the first real project roadmap.
12. Run the first implementation loop.
```

## 1. Inventory The Repo

Before adding process, inspect what already exists.

Look for:

- `README.md`.
- Product requirements, project briefs, tickets, or seed notes.
- Architecture, infrastructure, or design docs.
- Existing validation commands.
- Existing CI.
- Existing deployment runbooks.
- Existing agent instructions such as `AGENTS.md`, `CLAUDE.md`, or tool-specific instructions.
- Existing stale or conflicting docs.

Do not assume a blank slate. Preserve useful context, mark old context historical or superseded, and avoid overwriting user work.

## 2. Create Or Update `AGENTS.md`

`AGENTS.md` is the repo's durable operating file. It should be short, action-oriented, and visible to future agents before they touch code.

It should contain stable rules, not task-by-task diary entries. Put longer procedures in `docs/agent-skills/`.

Recommended structure:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
superseded_by:
---

# AGENTS.md

## Project Context

Describe what the project is, who it serves, the current source of truth, and the highest-risk product or technical constraints.

## Operating Loop

Start broad work by orienting and classifying the next loop:

Orient -> Classify -> Execute Loop -> Record

Use these loops:

- Implementation: Plan -> Red -> Green -> Refactor -> Commit -> Push -> Review -> Compound
- Review: Inspect branch/MR/PR/CI -> Address feedback -> Validate -> Mark ready or document blocker
- Release: Confirm source -> Deploy -> Smoke -> Record -> Handoff

## Next Action Routing

For broad prompts such as "what's next?", "continue", "lead the way", "is this ready?", or "ship it", use `docs/agent-skills/next-action-router.md` before choosing work.

Do not start a new implementation slice when existing branch, review, CI, merge, release, deployment, or production smoke work is the next blocker.

## TDD Expectations

For behavior changes, write the failing test first. The test should describe user-visible behavior, a domain rule, a data contract, or a safety boundary, not private implementation details.

If test-first work is impractical, document why and name the closest useful validation before implementing.

## Commit And Push Checkpoints

For non-trivial work:

- Work on a task branch.
- Commit after each coherent green slice.
- Push meaningful green checkpoints.
- Prefer early draft PRs/MRs when CI feedback matters.
- Treat pushed branches as review-ready, not production-ready.
- End substantial handoffs with commit status, push status, tests run, and uncommitted files.

## Compound Engineering Expectations

- Put non-trivial plans, PRDs, roadmaps, and design notes in `docs/plans/`.
- Put completed reusable learnings in `docs/solutions/`.
- Put rough ideas and seeds in `docs/brainstorms/`.
- Put repo-local agent playbooks in `docs/agent-skills/`.
- Put operational runbooks in `docs/operations/` or `docs/runbooks/`.
- Put unresolved actionable follow-ups in `todos/`.
- Track playbook usage and promotion evidence in `docs/agent-skills/playbook-usage-log.md`.

## Repo Agent Playbooks

Use the repo-local playbooks in `docs/agent-skills/` when their trigger applies:

- `planning-slice.md`
- `tdd-implementer.md`
- `review.md`
- `compounder.md`
- `next-action-router.md`
- `release-promotion.md`
- `playbook-usage-log.md`

These are project-local playbooks, not formal skills yet. Promote only after repeated stable use.

## Doc Freshness Protocol

At the end of every non-trivial task, check whether the change invalidates active planning, architecture, product, design, or operations docs.

- Update the PRD when product behavior, users, roles, scope, or non-goals change.
- Update architecture docs when boundaries, infrastructure, data flow, provider choices, or major technology choices change.
- Treat implementation plans as historical once completed.
- Capture actual reusable outcomes in `docs/solutions/`.
- Update `AGENTS.md` only for durable rules future agents should automatically follow.
- Run Skill Harvest during Compound.
- Update the playbook usage log when a repo-local playbook was used or changed.

Do not let stale docs silently remain authoritative. If a doc is superseded, mark it clearly in frontmatter.

## Validation Commands

List canonical commands for this repo, for example:

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run test:e2e`
- `npm run build`

Include setup commands for databases, queues, object storage, emulators, migrations, or local services.

## Release And Deployment

Name the release runbook and source-of-truth deployment target.

Default policy:

- Production deploys reviewed default-branch code.
- Feature-branch and hotfix deploys require explicit approval.
- Merged code is release-eligible, not automatically live unless auto-deploy is configured, verified, and documented.
- Production is current only when release identity and smoke checks prove it.

## Architecture Decisions

Record durable technical decisions that future agents should not rediscover or casually reverse.
```

## 3. Add Freshness Frontmatter

Every project Markdown document should start with:

```yaml
---
status: active # active | historical | superseded
owner: product # product | engineering | design | operations | project
last_reviewed: YYYY-MM-DD
superseded_by:
---
```

Status meanings:

- `active`: current source of truth or currently relevant guidance.
- `historical`: useful record of completed work, but no longer a live plan.
- `superseded`: replaced by another document.

Use `superseded_by` to point to the replacement when one exists.

## 4. Create The Compound Docs Structure

Create:

```text
docs/
  plans/
  solutions/
  brainstorms/
  agent-skills/
  operations/      # or docs/runbooks/
todos/
```

Use them this way:

- `docs/plans/`: active and historical plans, PRDs, architecture docs, roadmaps, implementation slices.
- `docs/solutions/`: completed work notes, reusable implementation lessons, testing patterns, operational lessons.
- `docs/brainstorms/`: early seeds, rough ideas, exploratory notes.
- `docs/agent-skills/`: repo-local playbooks with triggers and checklists.
- `docs/operations/` or `docs/runbooks/`: human-facing deployment and operational procedures.
- `todos/`: deferred but actionable work.

## 5. Seed Or Move Project Docs

At minimum, seed:

```text
docs/plans/product-source.md
docs/plans/architecture.md
docs/plans/initial-roadmap.md
docs/brainstorms/project-seed.md
```

If the project already has real docs, move them into the right place and add frontmatter.

The first roadmap should name:

- Ordered phases.
- User-visible behavior per phase.
- First failing test per phase or slice.
- Likely code areas.
- Validation commands.
- Risks.
- Docs expected to change.
- Whether agent-team orchestration might eventually help.

Avoid process-only bootstrapping for too long. Once the structure exists, move quickly into project substance.

## 6. Seed Repo-Local Playbooks

Create these files:

```text
docs/agent-skills/planning-slice.md
docs/agent-skills/tdd-implementer.md
docs/agent-skills/review.md
docs/agent-skills/compounder.md
docs/agent-skills/next-action-router.md
docs/agent-skills/release-promotion.md
docs/agent-skills/playbook-usage-log.md
```

Use project-specific names when helpful, but keep the triggers obvious.

## Planning Slice Playbook

Seed `docs/agent-skills/planning-slice.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
superseded_by:
---

# Planning Slice

## Trigger

Use this before non-trivial implementation, especially when a feature idea, PRD section, bug, operational need, or vague request needs to become a small buildable slice.

## Goal

Turn the idea into the smallest useful vertical slice that can be built with TDD, reviewed safely, and compounded afterward.

## Workflow

1. Read relevant product, architecture, and operating context.
2. Define the user-visible behavior, domain rule, or operational outcome.
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

Targeted and broader commands to run.

## Doc Freshness

Docs likely to update or mark historical after the work.

## Standards

- A plan is not ready until it names the first failing test or explicitly justifies why executable testing is not available.
- Prefer thin vertical slices over broad subsystem plans.
- Do not design risky behavior without naming how it will be tested.
```

## TDD Implementer Playbook

Seed `docs/agent-skills/tdd-implementer.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
superseded_by:
---

# TDD Implementer

## Trigger

Use this while implementing behavior, data contracts, UI workflows, background jobs, migrations, integrations, or operational checks.

## Goal

Keep implementation inside a tight Red -> Green -> Refactor loop.

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

- User-visible behavior.
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
```

## Review Playbook

Seed `docs/agent-skills/review.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
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

Add domain hazards here, such as:

- AI output safety and human review.
- Authorization and tenant isolation.
- Realtime state, reconnect, and stale clients.
- Payments, billing, and financial correctness.
- Medical, legal, or compliance-sensitive claims.
- Object storage and signed URL access.
- Cost-sensitive provider calls.
- Migrations and production data.

## Output Shape

Lead with findings, ordered by severity. Use file and line references when reviewing code.

If no issues are found, say that clearly and name residual risk or test gaps.

## Standards

- Prefer concrete behavioral findings over broad style feedback.
- Treat missing tests for critical behavior as first-class issues.
- Do not accept undocumented deviations from the active plan unless the updated approach is captured during Compound.
```

## Compounder Playbook

Seed `docs/agent-skills/compounder.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
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
```

## Next-Action Router Playbook

Seed `docs/agent-skills/next-action-router.md`:

````md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
superseded_by:
---

# Next Action Router

## Trigger

Use this whenever the user asks a broad prioritization question such as "what's next?", "continue", "lead the way", "pick up from here", "is this ready?", "ship it", or when the user has not named a specific implementation slice.

## Goal

Classify the repo state before acting. Do not assume the next action is implementation just because there is more product scope to build.

## Orientation Checklist

Run the smallest useful read-only checks:

- Is the working tree clean?
- What branch is checked out?
- Is the branch ahead of or behind its upstream?
- Are there local commits not pushed?
- Are there open PRs/MRs for the current branch or latest completed work?
- Is review draft, ready, merged, blocked, or failing CI?
- Does the default branch contain work not deployed?
- Does production report the expected release identity?
- Are there release-blocking todos, failed migrations, smoke failures, or missing runbooks?
- Did the user explicitly ask to deploy, promote, ship, release, or make production current?

Useful commands to adapt:

```bash
git status --short --branch
git log --oneline --decorate -5
git rev-parse HEAD origin/main
gh pr list --state open
glab mr list --state opened
```

Use the hosting and deployment tools that match the repo.

## State Vocabulary

- `local`: changes exist only in the working tree or local commits.
- `pushed`: commits exist on a remote branch, but are not necessarily reviewed, merged, or deployed.
- `review-ready`: a PR/MR exists or should exist, with CI and review still to resolve.
- `merged`: work is on the default branch, but is not necessarily deployed.
- `deployed`: the target environment serves the intended release identity and smoke checks pass.

## Classification Rules

Choose `Implementation` when:

- The working tree state is understood.
- No current PR/MR, CI, merge, or release work blocks the user's goal.
- Production is current enough for the repo's release policy.
- The next valuable action is to plan, test, build, validate, commit, push, review, and compound a new slice.

Choose `Review` when:

- There is a pushed branch for latest completed work.
- There is an open PR/MR.
- CI is pending or failed.
- Review feedback is unresolved.
- The user asks whether existing work is ready.
- A feature branch exists but is not merged or explicitly approved for release.

Choose `Release` when:

- The user explicitly asks to deploy, promote, ship, release, or make production current.
- Reviewed work is merged to the default branch and production is behind.
- A prior release attempt lacks smoke validation or release recording.

## Stop Conditions

Stop and ask for direction when:

- Unrelated user changes affect the proposed loop.
- CI is failing for unknown reasons.
- The deploy target, URL, cloud project, service, environment, or release identity is missing.
- Production metadata conflicts with git or review state.
- The request implies a feature-branch deploy, hotfix deploy, rollback, production variable change, data migration reversal, or other exceptional operation without explicit approval.

## Output Shape

Report:

- Current state.
- Selected loop.
- Concrete next action.
- Brief reason.

Example:

We are in the review loop. The branch is pushed and has an open draft PR with pending CI, so I will inspect CI and make the PR ready before starting new implementation.

## Standards

- A pushed branch is review-ready, not production-ready.
- A draft PR/MR is not production-ready.
- A merged commit is release-eligible, not automatically deployed unless auto-deploy is configured and documented.
- Production is current only when release identity and smoke checks prove it.
````

## Release Promotion Playbook

Seed `docs/agent-skills/release-promotion.md`:

```md
---
status: active
owner: operations
last_reviewed: YYYY-MM-DD
superseded_by:
---

# Release Promotion

## Trigger

Use this when:

- The user asks to deploy, promote, ship, release, roll back, verify what is live, or make production current.
- The next-action router classifies the next step as the release loop.
- Reviewed default-branch work is ahead of production.
- A prior deployment lacks smoke validation or release recording.

## Goal

Promote reviewed code intentionally, verify the deployed build, and leave a clear release record.

## Default Release Policy

- Production deploys reviewed default-branch code by default.
- Staging deploys default-branch code unless a human approves a feature-branch staging deploy.
- Pushed branches and draft PRs/MRs are review-ready, not production-ready.
- Merged commits are release-eligible, not automatically live unless auto-deploy is configured, verified, and documented.
- Feature-branch, hotfix, rollback, and production variable changes require explicit approval at action time.
- Production is current only when the live environment reports the intended release identity and smoke checks pass.

## Sources Of Truth

- Code readiness: default branch commit and CI.
- Review readiness: PR/MR state, unresolved review threads, and CI.
- Deployment target: recorded runbook, cloud project, service, environment, and URL.
- Live release: deployment platform metadata plus live health or release endpoint.
- Runtime safety: smoke tests, logs, migrations, and changed-surface checks.

## Workflow

1. Run the next-action router first.
2. Confirm target environment.
3. Confirm release source commit from the default branch unless an exception is explicitly approved.
4. Confirm review and CI status for the release source.
5. Read the release runbook.
6. Verify cloud/project/service/environment context before mutation.
7. Verify required secrets, migrations, storage, queues, domains, and dependencies are ready.
8. Set or verify release identity, preferably a Git SHA or documented release identifier exposed by the app.
9. Deploy through the canonical runbook mechanism.
10. Smoke test health, release identity, database or critical dependencies, changed endpoints, and critical user workflows.
11. Check relevant logs.
12. Record release evidence and rollback path.

## Stop Conditions

Stop before deploy when:

- The target environment or URL is unknown.
- The cloud project, service, or environment does not clearly belong to this repo.
- The source is not merged to the default branch and no exception was approved.
- CI is missing, pending, failed, or from a different commit.
- Required runtime dependencies are not provisioned.
- Smoke checks cannot be performed.
- The expected release identity cannot be verified.
- Rollback requires data migration reversal or storage cleanup that has not been planned.

## Handoff Shape

Include:

- Environment and URL.
- Source commit and review link.
- CI status.
- Deployment ID, image tag, cloud resource, or dashboard link.
- Release identity observed in production.
- Smoke checks performed.
- Log checks performed.
- Rollback option.
- Working tree status.
- Gaps or follow-ups.
```

## Playbook Usage Log

Seed `docs/agent-skills/playbook-usage-log.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
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
```

## 7. Capture Deferred Agent-Team Orchestration

Do not define a full agent hierarchy too early. Create a todo that describes when to introduce it.

Seed `todos/agent-team-orchestration-playbook.md`:

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
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
```

## 8. Run The System Day To Day

For a specific implementation request:

```text
Read AGENTS.md -> Use planning playbook if non-trivial -> Write plan -> Red -> Green -> Refactor -> Validate -> Review -> Compound
```

For a broad handoff prompt:

```text
Read AGENTS.md -> Use next-action router -> Classify Implementation, Review, or Release -> Execute the selected loop -> Record
```

For a release request:

```text
Router -> Release promotion playbook -> Runbook -> Deploy -> Smoke -> Record -> Handoff
```

For completed meaningful work:

```text
Compounder -> Doc freshness -> Solution note if useful -> Skill Harvest -> Usage log -> Handoff
```

## 9. First Roadmap Template

Create a concrete first roadmap after bootstrapping.

```md
---
status: active
owner: engineering
last_reviewed: YYYY-MM-DD
superseded_by:
---

# Initial Implementation Roadmap

## Product Source

Link to the PRD, seed, ticket, or user-provided source of truth.

## Phase 0: Foundation

### User Outcome

### First Failing Test

### Implementation Slices

### Validation

### Risks

### Docs To Update

## Phase 1: First Useful Workflow

### User Outcome

### First Failing Test

### Implementation Slices

### Validation

### Risks

### Docs To Update

## Phase 2: Persistence / Integration / Operations

### User Outcome

### First Failing Test

### Implementation Slices

### Validation

### Risks

### Docs To Update

## Agent-Team Suitability

Do not introduce agent teams yet unless work can be split into independently testable slices with explicit contracts.
```

## 10. Handoff Template

Use this at the end of meaningful agent work:

```md
## Handoff

Loop: Implementation | Review | Release

Branch:
Commit status:
Push status:
Review status:
Deploy status:

Validation run:

- <command>: <result>

Docs updated:

- <doc>

Uncommitted files:

- <none or list>

Follow-ups:

- <todo or blocker>
```

## Anti-Patterns

- Starting implementation from a broad prompt without routing repo state.
- Treating plans as permanently authoritative.
- Letting stale docs silently remain active.
- Updating `AGENTS.md` with temporary task details.
- Writing behavior before naming the first failing test.
- Testing private implementation details while missing the domain rule.
- Treating review as style cleanup instead of risk discovery.
- Conflating pushed, reviewed, merged, and deployed.
- Deploying without release identity and smoke checks.
- Creating too many formal skills before repo-local playbooks prove stable.
- Building agent teams for small tasks.
- Capturing every interesting idea as a skill instead of waiting for repeated value.

## Bootstrap Completion Checklist

The repo is bootstrapped when:

- `AGENTS.md` exists and defines the operating loop.
- Markdown docs use freshness frontmatter.
- `docs/plans/`, `docs/solutions/`, `docs/brainstorms/`, `docs/agent-skills/`, an operations/runbooks directory, and `todos/` exist.
- Existing docs are moved or clearly classified.
- Planning, TDD, review, compounder, router, release, and usage-log playbooks exist.
- Skill Harvest is part of the compounder playbook.
- Deferred agent-team orchestration is captured in `todos/`.
- Validation commands are recorded.
- Release policy and runbook location are recorded, even if release is initially blocked.
- The first concrete roadmap or implementation slice exists.
- The next action is project substance, not more process design.

## Minimal Setup Summary

For a fresh repo, the shortest useful version is:

```text
1. Create AGENTS.md.
2. Create docs/plans, docs/solutions, docs/brainstorms, docs/agent-skills, docs/operations, and todos.
3. Add Markdown freshness frontmatter.
4. Seed planning, TDD, review, compounder, router, release, and usage-log playbooks.
5. Add deferred agent-team orchestration todo.
6. Create the first roadmap with named first failing tests.
7. Start the first Red -> Green -> Refactor slice.
8. Compound the result.
```

This gives the repo a process spine without freezing it. The system should sharpen through use, not ceremony.
