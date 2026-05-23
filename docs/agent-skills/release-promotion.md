---
status: active
owner: operations
last_reviewed: 2026-05-22
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
- Pushed branches and draft PRs are review-ready, not production-ready.
- Merged commits are release-eligible, not automatically live unless auto-deploy is configured, verified, and documented.
- Feature-branch, hotfix, rollback, and production variable changes require explicit approval at action time.
- Production is current only when the live environment reports the intended release identity and smoke checks pass.

## Sources Of Truth

- Code readiness: default branch commit and CI.
- Review readiness: PR state, unresolved review threads, and CI.
- Deployment target: recorded runbook, cloud project, service, environment, and URL.
- Live release: deployment platform metadata plus live health or release endpoint.
- Runtime safety: smoke tests, logs, migrations, and changed-surface checks.

## Workflow

1. Run the next-action router first.
2. Confirm target environment.
3. Confirm release source commit from the default branch unless an exception is explicitly approved.
4. Confirm review and CI status for the release source.
5. Read the release runbook in `docs/operations/`.
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
