---
title: "Initial Stack Decision"
type: decision
status: pending
date: 2026-05-24
origin: docs/plans/2026-05-24-001-feat-stack-selection-plan.md
related:
  - docs/plans/ARCHITECTURE.md
  - docs/plans/technical-designs/operations-release-and-validation.md
  - docs/plans/PRD_V0.md
---

# Initial Stack Decision

## Status

Pending. This record exists before scaffold work so the eventual stack choice remains explicit and falsifiable.

## Decision

No application stack has been selected yet.

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

To be completed in the stack-selection unit before scaffold work starts.

## Rejection Criteria

Reject or revisit a candidate if it cannot satisfy the operating envelope, deterministic time tests, browser workflow tests, secure session-backed mutations, or fake-provider safety without disproportionate custom infrastructure.

## Proof Evidence

To be completed during the Phase 0 proof.

## Falsification Triggers

Reopen this decision before later slices depend on it if:

- the deterministic shell cannot expose one canonical room snapshot to interactive and display clients;
- shared-state propagation cannot meet the expected latency target under local proof conditions;
- deterministic time tests require brittle wall-clock sleeps;
- validation commands cannot be made canonical and repeatable from a clean checkout;
- fake-provider defaults cannot reliably prevent accidental live provider calls.
