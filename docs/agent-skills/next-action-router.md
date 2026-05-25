---
status: active
owner: engineering
last_reviewed: 2026-05-25
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
- Are there open PRs for the current branch or latest completed work?
- Which project CLIs are relevant to the next loop, according to `docs/operations/cli-inventory.md`?
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
```

Use the hosting and deployment tools that match the repo.

## State Vocabulary

- `local`: changes exist only in the working tree or local commits.
- `pushed`: commits exist on a remote branch, but are not necessarily reviewed, merged, or deployed.
- `review-ready`: a PR exists or should exist, with CI and review still to resolve.
- `merged`: work is on the default branch, but is not necessarily deployed.
- `deployed`: the target environment serves the intended release identity and smoke checks pass.

## Classification Rules

Choose `Implementation` when:

- The working tree state is understood.
- No current PR, CI, merge, or release work blocks the user's goal.
- Production is current enough for the repo's release policy.
- The next valuable action is to plan, test, build, validate, commit, push, review, and compound a new slice.

Choose `Review` when:

- There is a pushed branch for latest completed work.
- There is an open PR.
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
- A draft PR is not production-ready.
- A merged commit is release-eligible, not automatically deployed unless auto-deploy is configured and documented.
- Production is current only when release identity and smoke checks prove it.
