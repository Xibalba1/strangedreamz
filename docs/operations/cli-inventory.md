---
status: active
owner: engineering
last_reviewed: 2026-05-25
superseded_by:
---

# CLI Inventory

## Purpose

Agents should prefer the repo's available CLIs over manual guesswork when a CLI can inspect, validate, deploy, or report the source of truth more accurately than memory.

This document is the canonical list of project-relevant CLIs. The executable availability check is:

```bash
npm run cli:inventory
```

Use JSON output when another tool or agent needs to consume the result:

```bash
npm run cli:inventory -- --json
```

Use strict mode when missing required tools should fail a local setup check:

```bash
npm run cli:inventory -- --strict
```

## Canonical Inventory

| CLI | Category | Default agent use | Source docs |
| --- | --- | --- | --- |
| `git` | Source control | Inspect branch state, diffs, commits, remotes, and repo history before acting. | `AGENTS.md` |
| `gh` | Source control | Inspect PRs, checks, CI runs, review status, and publish GitHub work when needed. | `docs/agent-skills/review.md` |
| `hcloud` | Infrastructure | Inspect and manage Hetzner Cloud resources for the `strangedreamz` project. | `docs/operations/deployment-runbook.md` |
| `docker` | Runtime | Build and verify production-style images locally before deployment. | `Dockerfile` |
| `docker compose` | Runtime | Run and inspect the production compose stack locally or on the VPS. | `deploy/compose.yaml` |
| `ssh` | Infrastructure | Access the Hetzner VPS using the documented deployment key when release work requires it. | `docs/operations/deployment-runbook.md` |
| `curl` | Network | Probe HTTP endpoints, API responses, and smoke-check details from the shell. | `docs/operations/release-identity-and-smoke-checks.md` |
| `node` | Runtime | Run local scripts and the TypeScript/Vite toolchain using the version from `.nvmrc`. | `.nvmrc` |
| `npm` | Runtime | Run canonical validation, smoke checks, and project scripts. | `package.json` |

## Project Commands

These npm scripts are part of the CLI surface agents should use before inventing ad hoc checks:

| Command | Use |
| --- | --- |
| `npm run lint` | Static linting. |
| `npm run typecheck` | TypeScript validation. |
| `npm run test` | Unit and integration tests covered by Vitest. |
| `npm run test:e2e` | Playwright browser workflow tests. |
| `npm run build` | Typecheck and production client build. |
| `npm run smoke -- --url <url> --expected-sha <sha>` | Release identity and production smoke verification. |
| `npm run cli:inventory` | Report local availability of the canonical CLI inventory. |

## Spawned Agent Context

When dispatching a sub-agent or worker agent for repo work, include the relevant slice of this inventory in the task prompt. For broad implementation, review, release, or operations work, include this default excerpt:

```text
CLI-first rule: use the repo CLI inventory before guessing. Prefer git for repo state, gh for GitHub/CI/PR state, hcloud for Hetzner infrastructure, docker/docker compose for production-style runtime checks, ssh for documented VPS access, curl for endpoint probes, and npm scripts for canonical validation. Run `npm run cli:inventory` if local availability is uncertain, and do not request or expose secrets in chat.
```

For narrow tasks, trim the excerpt to the CLIs the worker is expected to use.

## Updating The Inventory

Update this document and `scripts/cli-inventory.mjs` whenever:

- a new project workflow depends on a CLI;
- a cloud/provider/tooling choice changes;
- a runbook adds a command that agents should prefer;
- a tool is retired, renamed, or replaced;
- authentication or context setup changes in a way future agents must know.

During Compound, check whether completed work changed the CLI surface. If it did, update this inventory in the same slice rather than leaving it as tribal knowledge.

## Safety Rules

- Do not paste tokens, private keys, or provider secrets into chat.
- Prefer CLI auth flows and local credential stores over copying credentials.
- The inventory script must only run safe inspection commands by default.
- Redact secret-looking command output before displaying it.
- Keep destructive commands out of `npm run cli:inventory`; put destructive workflows in explicit runbooks with approval gates.
