---
title: "Initial Stack Decision"
type: decision
status: active
date: 2026-05-24
origin: docs/plans/2026-05-24-001-feat-stack-selection-plan.md
related:
  - docs/plans/ARCHITECTURE.md
  - docs/plans/technical-designs/operations-release-and-validation.md
  - docs/plans/PRD_V0.md
---

# Initial Stack Decision

## Status

Active. This decision records the initial stack before scaffold work so implementation can begin from an explicit, falsifiable baseline.

## Decision

Use a TypeScript-first single-repo web stack for Phase 0 and MVP:

- Runtime: Node.js 20+.
- Package manager: npm.
- Client: Vite React with TypeScript and client-side React Router routes.
- Server: Fastify for HTTP routes and health checks, with Socket.IO attached to the underlying Node HTTP server for realtime traffic.
- Realtime transport: Socket.IO rooms for the canonical room snapshot and later room mutations.
- Phase 0 state: deterministic in-repo fixture module; no database required for the shell proof.
- Test stack: Vitest for domain/unit tests and Playwright for browser workflow tests.
- Provider boundary: local fake-provider and fixture defaults only; no live AI, moderation, storage, or CDN calls in Phase 0.

The selected stack must satisfy the Phase 0 MVP operating envelope, support deterministic shell tests, and establish canonical validation commands before product code depends on it.

## MVP Operating Envelope

These targets are stack-selection gates for one canonical room in a shared-building context, not a public-scale launch promise.

| Field | Expected MVP Target | Stress Gate For Stack Selection |
| --- | --- | --- |
| Interactive clients | 40 concurrent browser sessions acting in one room | 150 concurrent browser sessions in one room |
| Unattended display clients | 2 display-mode clients | 8 display-mode clients |
| Sustained room mutations | 2 accepted user or admin mutations per second for a full 5-minute cycle | 8 accepted mutations per second for a 60-second burst |
| Final Surge burst | 5 accepted mutations per second during the final 30 seconds before Lock-In | 15 accepted mutations per second for 30 seconds |
| Snapshot fanout latency | p95 under 500 ms from accepted mutation to visible update on connected clients | p95 under 1500 ms during burst load |
| Countdown/phase drift | Visible phase and countdown stay within 1 second of authoritative room time | Drift recovers to under 1 second within 5 seconds after burst load |
| Reconnect | Refresh or temporary network loss restores the current snapshot within 3 seconds without duplicating actions | Restores within 10 seconds without duplicated actions or stale action eligibility |

Graceful degradation order:

1. Reduce transient overlay density and animation intensity.
2. Batch non-critical activity-feed and Murmur presentation updates.
3. Lower decorative presentation effects and non-essential metrics refresh.
4. Preserve four-pane video visibility, authoritative room state, action-limit enforcement, moderation outcomes, admin controls, and visible safety states.

The first behavior allowed to degrade under load is non-critical spectacle: overlay frequency, animation intensity, and feed presentation density.

## Required Capabilities

- Authoritative shared room state.
- Realtime fanout or an equivalent shared-state update path.
- Deterministic time or scheduler testing for cycle behavior.
- Browser workflow testing for interactive and display projections.
- Secure session-backed mutations for future social actions.
- Admin authentication path for future safety controls.
- Media asset serving for deterministic seed fixtures and later seed videos.
- Operational logging and deployable smoke-check support.
- Local fake-provider defaults that cannot call live providers by accident.

## Candidate Alternatives

| Candidate | Decision | Rationale |
| --- | --- | --- |
| Vite React + TypeScript + Node + Socket.IO | Selected | Best fit for a highly custom four-panel visual surface, direct WebSocket control, local Node availability, and deterministic browser testing without picking a deployment platform yet. |
| Next.js App Router + Supabase Realtime/Postgres | Rejected for Phase 0 | Strong ecosystem, but this product's core realtime room would either require a custom server path or outsource the central state/fanout proof to Supabase before deployment and data boundaries are chosen. |
| Rails 8 + Hotwire/Turbo Streams/Action Cable | Rejected for Phase 0 | Integrated realtime and productive CRUD/admin path, but the local Ruby/Rails toolchain is stale, and the rich video-wall client would likely need a heavier custom JavaScript layer anyway. |
| Phoenix LiveView + Channels/PubSub | Rejected for Phase 0 | Excellent realtime model, but Elixir/Phoenix is not present in the local toolchain and would add ecosystem cost before the project needs Phoenix's concurrency strengths. |

## Decision Evidence

- Local toolchain check found Node.js 20.15.0 and npm 10.7.0 available.
- Local `pnpm --version` failed through Corepack signature verification after network access; npm is the lower-risk package manager for the first scaffold.
- Local Ruby is 2.6.10 with Bundler 1.17.2, and `rails --version` reports Rails is not currently installed.
- Elixir/Phoenix tooling was not present in the local command search.
- Official Vite docs support a React TypeScript template and modern-browser development assumptions.
- Official Socket.IO docs describe room broadcasts, Redis/sharded adapters for later multi-node fanout, and connection-state recovery considerations. The Phase 0 proof can stay single-node while preserving a Redis adapter upgrade path.
- Official Playwright and Vitest docs match the repo's need for browser workflow tests plus fast deterministic domain tests.

## Phase 0 Paths And Commands To Prove Next

U3 should scaffold the stack and make these command names real before recording them in `AGENTS.md`:

- Install: `npm install`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Unit/domain tests: `npm run test`
- Browser workflow tests: `npm run test:e2e`
- Build: `npm run build`

U4 should write the first failing deterministic shell test before product implementation:

- Test path: `tests/e2e/deterministic-shell.spec.ts`
- Fixture path: `src/fixtures/deterministic-room-snapshot.ts`
- Expected command: `npm run test:e2e -- tests/e2e/deterministic-shell.spec.ts`

The test should prove that the interactive route and display route render the same four pane identifiers from one deterministic room snapshot, display mode exposes no interactive controls, and no live provider credential or network provider call is required.

## Rejection Criteria

Reject or revisit a candidate if it cannot satisfy the operating envelope, deterministic time tests, browser workflow tests, secure session-backed mutations, or fake-provider safety without disproportionate custom infrastructure.

## Proof Evidence

Pending scaffold proof. The selected stack is not considered proven until U3-U5 establish passing validation commands and the deterministic shell.

## Falsification Triggers

Reopen this decision before later slices depend on it if:

- the deterministic shell cannot expose one canonical room snapshot to interactive and display clients;
- shared-state propagation cannot meet the expected latency target under local proof conditions;
- deterministic time tests require brittle wall-clock sleeps;
- validation commands cannot be made canonical and repeatable from a clean checkout;
- fake-provider defaults cannot reliably prevent accidental live provider calls.

## Research References

- Vite guide: https://vite.dev/guide/
- React TypeScript guide: https://react.dev/learn/typescript
- Socket.IO Redis adapter and scaling path: https://socket.io/docs/v4/redis-adapter/
- Socket.IO connection state recovery: https://socket.io/docs/v4/connection-state-recovery/
- Playwright docs: https://playwright.dev/docs/intro
- Vitest guide: https://vitest.dev/guide/
- Next.js custom server guide: https://nextjs.org/docs/pages/guides/custom-server
- Supabase Realtime database changes: https://supabase.com/docs/guides/realtime/subscribing-to-database-changes
- Rails Action Cable guide: https://guides.rubyonrails.org/action_cable_overview.html
- Phoenix LiveView docs: https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html
