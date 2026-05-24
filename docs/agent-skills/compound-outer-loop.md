---
status: active
owner: engineering
last_reviewed: 2026-05-24
superseded_by:
---

# Compound Outer Loop

## Trigger

Use this when the user wants the agent to lead the workflow without naming every inner command, especially prompts like:

- "run the outer loop"
- "use the Compound Engineering outer loop"
- "lead the way with Compound Engineering"
- "continue the CE loop"
- "take this through the next Compound Engineering step"

Also use this after `docs/agent-skills/next-action-router.md` classifies broad work and the next action requires a formal Compound Engineering workflow.

## Goal

Let the user trigger one repo-level operating loop while preserving the full value of the formal Compound Engineering skills in `/Users/iank/.codex/plugins/cache/compound-engineering-plugin/compound-engineering`.

This playbook is a thin router. It decides which formal skill should run next, then follows that skill's own `SKILL.md` rather than re-implementing its inner loop locally.

## Core Contract

- The user should not need to name inner skills for normal progression.
- The agent must still use the formal Compound Engineering skill whose trigger matches the current phase.
- Repo-local playbooks add project constraints; they do not replace formal skill instructions.
- Broad work starts with repo state classification before new implementation begins.
- Do not skip review, compounding, documentation freshness, or release-state checks just because implementation is complete.

## Outer Loop

```text
Orient -> Classify -> Select Formal CE Skill -> Execute Skill -> Validate State -> Record
```

## Workflow

1. Orient with the smallest useful read-only checks.
   - Read `AGENTS.md`.
   - Use `docs/agent-skills/next-action-router.md` for broad prompts.
   - Check branch, working tree, pushed state, PR/review state, and release blockers when relevant.

2. Classify the current loop.
   - Implementation: new product, architecture, testing, or documentation work is the next blocker.
   - Review: a branch, PR, CI result, or review finding is the next blocker.
   - Release: deployment, smoke validation, release identity, or production currency is the next blocker.
   - Compound: completed work needs documentation, learnings, follow-ups, or playbook harvest before the loop is done.

3. Select one formal Compound Engineering skill as the inner executor.
   - Fuzzy product or workflow shaping: `compound-engineering:ce-brainstorm`.
   - Multi-step implementation planning: `compound-engineering:ce-plan`.
   - Bounded implementation from a plan or clear prompt: `compound-engineering:ce-work`.
   - Bug investigation or failing validation: `compound-engineering:ce-debug`.
   - Code review or autofix pass: `compound-engineering:ce-code-review`.
   - Browser/user-journey verification: `compound-engineering:ce-test-browser` or `compound-engineering:ce-demo-reel` when visual proof matters.
   - Commit, push, and PR creation: `compound-engineering:ce-commit`, `compound-engineering:ce-commit-push-pr`, or GitHub `yeet` when publishing is requested.
   - Hands-off full software pipeline: `compound-engineering:lfg`, but only when the user explicitly asks for autonomous end-to-end execution and gives a software task.
   - Completed-work learning capture: `compound-engineering:ce-compound`, with `docs/agent-skills/compounder.md` as the repo-local companion.

4. Execute the selected formal skill.
   - Open and follow the formal skill's `SKILL.md`.
   - Preserve this repo's TDD rule: every future implementation slice must name its first failing test before product code is written.
   - Use repo-local playbooks when their trigger applies, especially `planning-slice.md`, `tdd-implementer.md`, `review.md`, `release-promotion.md`, and `compounder.md`.

5. Validate state before moving to another loop.
   - Do not start a new implementation slice when review, CI, merge, release, or smoke validation is the blocker.
   - Treat pushed branches as review-ready, not production-ready.
   - Treat merged code as release-eligible, not automatically live unless deployment automation and smoke evidence prove it.

6. Record the result.
   - For non-trivial work, end with commit status, push status, tests run, review status, deployment status, and uncommitted files.
   - Run the doc freshness protocol from `AGENTS.md`.
   - Update `docs/agent-skills/playbook-usage-log.md` when this playbook materially guided the loop or changed.

## Routing Examples

- "Continue the CE outer loop" on a branch with an open PR and failing CI routes to Review, then likely `ce-debug` or `ce-code-review`, not new implementation.
- "Lead the way" with no active PR and a clear next plan routes through `next-action-router.md`, then likely `ce-work`.
- "Take stack selection through the outer loop" routes to Implementation, likely `ce-plan` if the decision still needs structure or `ce-work` if an active plan already names the next failing test.
- "Ship it" routes to `next-action-router.md` first. If release targets and smoke checks are missing, stop and document the release blocker instead of deploying.

## Standards

- Prefer formal CE skill behavior over local improvisation whenever both apply.
- Keep this playbook about routing and state discipline only.
- If the formal skill and repo-local guidance appear to conflict, preserve repo safety constraints and note the conflict in the handoff.
- Promote this playbook to a formal skill only after repeated stable use across meaningful loops.
