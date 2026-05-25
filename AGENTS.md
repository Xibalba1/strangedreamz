---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# AGENTS.md

## Project Context

This repo is for **Strange Dreamz: Living Video Panel**, a web experience where users collectively steer a four-panel AI video wall through theme submissions, voting, prompt mutation, realtime presentation effects, and interval-based video replacement.

Current product source:

- `docs/plans/PRD_V0.md`

Current implementation status:

- The selected TypeScript stack has been scaffolded in code.
- Initial stack decision is recorded in `docs/plans/initial-stack-decision.md`.
- Canonical local validation commands are established below.
- CI workflow, Hetzner deployment target, and initial release runbooks are established in `docs/operations/`.
- Project-relevant CLI inventory is recorded in `docs/operations/cli-inventory.md`.
- Production is current only after deployment and smoke evidence are recorded.
- Do not invent architecture or product requirements beyond the repo's existing product source.

## Operating Loop

Start broad work by orienting and classifying the next loop:

```text
Orient -> Classify -> Execute Loop -> Record
```

Use these loops:

- Implementation: `Plan -> Red -> Green -> Refactor -> Commit -> Push -> Review -> Compound`
- Review: `Inspect branch/PR/CI -> Address feedback -> Validate -> Merge or document blocker`
- Release: `Confirm source -> Deploy -> Smoke -> Record -> Handoff`

## Next Action Routing

For broad prompts such as "what's next?", "continue", "lead the way", "is this ready?", or "ship it", use `docs/agent-skills/next-action-router.md` before choosing work.

Do not start a new implementation slice when existing branch, review, CI, merge, release, deployment, or production smoke work is the next blocker.

For prompts that ask to run, continue, or lead the Compound Engineering outer loop, use `docs/agent-skills/compound-outer-loop.md`. That playbook should select the next formal Compound Engineering skill as the inner executor instead of requiring the user to name each inner skill manually.

The Compound Engineering outer loop is not a single inner-skill invocation. When the user asks the agent to lead with Compound Engineering, carry the current block of work through chained CE skill selection until it reaches the full-loop terminal state: merged, deployed to production, smoke-validated, recorded in release evidence, and handed off. Stop earlier only when blocked by CI, review feedback, merge conflict, missing approval, release safety, or an explicit user pause; document the blocker before handing off. After each inner skill completes, reclassify the repo state before choosing the next step.

## TDD Expectations

For behavior changes, write the failing test first. The test should describe user-visible behavior, a domain rule, a data contract, an operational check, or a safety boundary, not private implementation details.

If test-first work is impractical, document why and name the closest useful validation before implementing.

Every future implementation slice must name its first failing test before product code is written.

## Commit And Push Discipline

For non-trivial work:

- Work on a task branch.
- Commit after each coherent green slice.
- Push meaningful green checkpoints.
- Prefer early draft PRs when CI feedback matters.
- Treat pushed branches as review-ready, not production-ready.
- Treat review-ready as an intermediate state in a full Compound Engineering loop, not a terminal state, unless a blocker or explicit pause prevents merge and release.
- End substantial handoffs with commit status, push status, tests run, review status, deployment status, and uncommitted files.

## Compound Engineering Expectations

- Put non-trivial plans, PRDs, roadmaps, and design notes in `docs/plans/`.
- Put completed reusable learnings in `docs/solutions/`.
- Put rough ideas and seeds in `docs/brainstorms/`.
- Put repo-local agent playbooks in `docs/agent-skills/`.
- Put operational runbooks in `docs/operations/`.
- Put unresolved actionable follow-ups in `todos/`.
- Track playbook usage and promotion evidence in `docs/agent-skills/playbook-usage-log.md`.

## Repo Agent Playbooks

Use the repo-local playbooks in `docs/agent-skills/` when their trigger applies:

- `planning-slice.md`
- `tdd-implementer.md`
- `review.md`
- `compounder.md`
- `next-action-router.md`
- `compound-outer-loop.md`
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

Canonical validation commands use Node.js 22.22.3 from `.nvmrc`.

Setup:

- `nvm install`
- `nvm use`
- `npm install`

Validation:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

Also record required setup commands for databases, queues, object storage, emulators, migrations, or local services.

## CLI-First Tooling

Prefer project-relevant CLIs over manual guessing when a CLI can inspect the source of truth.

- Read `docs/operations/cli-inventory.md` during orientation for implementation, review, release, infrastructure, provider, or operations work.
- Run `npm run cli:inventory` when local tool availability is uncertain.
- Use `git` for repo state, `gh` for GitHub/CI/PR state, `hcloud` for Hetzner Cloud state, `docker` and `docker compose` for production-style runtime state, `ssh` for documented VPS access, `curl` for endpoint probes, and npm scripts for canonical project validation.
- When spawning worker agents, include the relevant CLI inventory excerpt in their task prompt so they know which local tools to prefer.
- Keep `docs/operations/cli-inventory.md` and `scripts/cli-inventory.mjs` updated whenever a workflow starts depending on a new CLI or retires an old one.
- Do not request, paste, or expose secrets in chat. Use local CLI authentication flows and redact secret-looking command output.

## Release And Deployment

Release and deployment target:

- Provider: Hetzner Cloud
- Project: `strangedreamz`
- Production server: `strangedreamz-prod-ash-1`
- Public IPv4: `87.99.136.176`
- Runbooks: `docs/operations/`

Default release policy:

- Production deploys reviewed default-branch code.
- Feature-branch and hotfix deploys require explicit approval.
- Pushed branches are review-ready, not production-ready.
- Draft PRs are not production-ready.
- Merged code is release-eligible, not automatically live unless auto-deploy is configured, verified, and documented.
- Production is current only when release identity and smoke checks prove it.
- Do not deploy until `docs/operations/` contains the target environment, deployment mechanism, release identity check, smoke checks, and rollback expectations.

## Architecture Decisions

No durable architecture decisions have been recorded yet.

Future decisions should capture:

- The decision.
- The source of truth or context.
- Alternatives considered.
- Validation and operational impact.
- Conditions that would justify revisiting the decision.
