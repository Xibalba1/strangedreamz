---
title: "Hetzner Release Setup Plan"
type: implementation-plan
status: active
date: 2026-05-25
owner: engineering
origin: user request to unblock release deployment on Hetzner
related:
  - AGENTS.md
  - docs/plans/technical-designs/operations-release-and-validation.md
---

# Hetzner Release Setup Plan

## Behavior

Merged default-branch code can be deployed to the first production-like Hetzner VPS, expose a release identity through `/healthz`, and be smoke-checked without relying on live video providers.

## Smallest Slice

- Provision one Hetzner Cloud server for `strangedreamz`.
- Use `ccx13` in `ash` with Ubuntu 24.04 x86 and a project-specific SSH key.
- Configure firewall rules for SSH, HTTP, and HTTPS.
- Add a production server path that serves the built Vite client and reports release identity.
- Add a smoke command that verifies health and release identity against a URL.
- Document deployment, smoke, and rollback runbooks under `docs/operations/`.

## Non-Goals

- Multi-node scaling.
- Redis adapter setup.
- Database provisioning.
- Object storage or CDN setup.
- Real video provider configuration.
- Domain cutover unless a domain is explicitly provided later.

## First Failing Test

`src/server/app.test.ts` should first fail because the server does not yet expose a testable app factory or release identity contract.

The test should prove that `/healthz` returns:

- `ok: true`
- `service: "strangedreamz"`
- the configured application status
- `release.sha` from the supplied release identity

## Implementation Notes

- Refactor `src/server/index.ts` so the Fastify app can be created without immediately listening.
- Keep local validation on Node.js 22.22.3 from `.nvmrc`.
- Use `@fastify/static` to serve `dist/` after `npm run build`.
- Add `scripts/smoke.mjs` for release identity smoke checks.
- Add GitHub Actions CI for canonical validation commands.
- Use hcloud resources:
  - server name: `strangedreamz-prod-ash-1`
  - server type: `ccx13`
  - image: `ubuntu-24.04`
  - location: `ash`
  - SSH key: `strangedreamz-hetzner`
  - firewall: `strangedreamz-prod`

## Risks

- Hetzner resources are billable once created.
- SSH must remain key-only.
- Docker/system service setup should be reproducible from the runbook.
- Release identity must not be aspirational; smoke should compare expected and observed SHA.
- Without CI configured, future release confidence would still depend on local validation.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npm run smoke -- --url http://<server-ip> --expected-sha <sha>`

## Doc Freshness

- Update `AGENTS.md` release/deployment status after runbooks exist.
- Update `docs/plans/technical-designs/operations-release-and-validation.md` with the selected target.
- Update `docs/agent-skills/playbook-usage-log.md` during Compound.
