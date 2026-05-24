---
title: "feat: Phase 0 stack selection and deterministic shell proof"
type: feat
status: active
date: 2026-05-24
origin: docs/plans/initial-roadmap.md
related:
  - docs/plans/PRD_V0.md
  - docs/plans/ARCHITECTURE.md
  - docs/plans/technical-designs/operations-release-and-validation.md
---

# Phase 0 Stack Selection And Deterministic Shell Proof Plan

## Problem Frame

Strange Dreamz has product requirements, an initial roadmap, and stack-neutral architecture docs, but no selected application stack, canonical validation commands, CI shape, or executable product shell. The next useful slice is to turn Phase 0 into a bounded stack-selection proof that can reject weak stack choices before later social, cycle, moderation, and provider work depend on them.

This plan does not choose the stack. It defines how to choose it, what operating envelope the choice must satisfy, what validation commands become canonical, and the first failing test for the deterministic four-panel shell.

## Requirements

- Define an MVP operating envelope before product code depends on a stack choice.
- Select an initial stack through a documented decision frame, including candidates, rejection criteria, proof evidence, and falsification triggers.
- Establish canonical local validation commands for install, lint, typecheck where applicable, unit or domain tests, browser or workflow tests, and build.
- Record canonical validation commands in `AGENTS.md` once they have run successfully.
- Prove the stack with the smallest deterministic vertical slice: one canonical room snapshot rendered by an interactive client and a read-only display client.
- Name the first failing executable test before product code is written.
- Use deterministic seed data and local fake-provider defaults; live AI, moderation, storage, CDN, and video provider calls remain out of scope.
- Preserve the PRD boundary of one canonical room for MVP while keeping future multiple-room support an architecture extension point.

## Scope Boundaries

In scope:

- Stack decision record for the initial application stack.
- MVP operating envelope with concrete expected and stress targets.
- Canonical validation command list.
- Project scaffold only after the stack decision is recorded.
- First failing test for a deterministic four-panel shell.
- Minimal deterministic shell implementation needed to make that test pass in a later work slice.
- Documentation updates needed to keep `AGENTS.md`, `docs/plans/ARCHITECTURE.md`, and operations planning aligned with the selected stack.

Out of scope:

- Real AI video generation or external provider integration.
- Production deployment or hosting selection beyond stack-decision evidence.
- Multiple rooms, normal user accounts, admin panel, social actions, voting, boosts, murmurs, cycle advancement, and moderation behavior.
- Persistent archive, share pages, public history, or product metrics beyond noting later validation needs.
- Creating seed media beyond deterministic developer fixtures or metadata required for the shell proof.

## Context And Existing Patterns

- `AGENTS.md` says the product has no implementation stack, validation commands, CI, deployment target, or release runbook yet.
- `docs/plans/ARCHITECTURE.md` requires the first stack decision to include an operating envelope, realtime/shared-state proof, deterministic time testing capability, fake-provider safety, and canonical validation commands.
- `docs/plans/technical-designs/operations-release-and-validation.md` requires stack selection to prove deterministic four-panel rendering, one authoritative room snapshot across interactive and display clients, at least one shared-state propagation path before later social actions, browser workflow testing, and local fake-provider defaults.
- `docs/plans/technical-designs/responsive-clients-and-presentation.md` defines the first client surfaces: interactive big screen, interactive small screen, and read-only display mode.
- `docs/plans/technical-designs/room-state-and-cycle-engine.md` keeps canonical room state and explicit time testability central, but cycle behavior is not part of this shell proof.
- `docs/agent-skills/planning-slice.md` requires the first failing test to be named before implementation details become product code.

## Key Technical Decisions

### Decision record before scaffold

The stack choice should be written down before introducing app generator output. The decision record should name the selected stack, alternatives considered, required capabilities, rejected options, proof results, and conditions that would reopen the decision.

Rationale: generated project structure can make an unreviewed stack choice look inevitable. Phase 0 should keep the decision inspectable.

### Operating envelope as a gate

Stack selection is incomplete until it names concrete targets for expected clients, stress clients, display clients, event update rate, acceptable update latency, reconnect behavior, and the first features allowed to degrade under load.

Rationale: the product's hard problem is one shared live room, not static rendering. The chosen stack should be sized for the MVP experience before implementation work builds on it.

### Deterministic shell before social behavior

The first shell should render the four-panel wall from deterministic seed state in both interactive and display projections. It should not implement real social actions, provider calls, or cycle logic.

Rationale: this proves the client and state shape without expanding product behavior beyond the PRD and architecture docs.

### Fake-provider safety by default

The scaffold should make live provider calls impossible by default. Any provider-like boundary used for fixtures should return deterministic local data unless later slices explicitly configure live credentials and secrets rules.

Rationale: MVP validation must remain cheap, repeatable, and safe.

### Canonical validation only after commands pass

Validation commands should be recorded in `AGENTS.md` only after the selected stack can run them successfully in the repo.

Rationale: stale or aspirational validation commands are worse than placeholders because future agents will trust them.

## Open Questions

- Which stack candidates should be compared? This is planning-owned work for the stack decision unit.
- What exact test file paths and command names apply? These depend on the selected stack and must be recorded in the decision record before product code begins.
- Should the Phase 0 proof include a non-product diagnostic state propagation event, or only snapshot parity? The architecture asks for at least one shared-state propagation path, but any propagation proof must avoid inventing user-facing social behavior.

Resolved by U1:

- The numeric MVP operating envelope is recorded in `docs/plans/ARCHITECTURE.md` and `docs/plans/initial-stack-decision.md`.

## Implementation Units

### U1. Define the MVP operating envelope

Goal: turn the stack-neutral architecture envelope into concrete numbers that candidate stacks can be evaluated against.

Expected documentation changes:

- Update `docs/plans/ARCHITECTURE.md` to replace the placeholder operating-envelope guidance with concrete Phase 0 targets.
- Create or update the stack decision record named in U2 with the same targets.

Operating-envelope fields:

- Expected concurrent interactive clients.
- Stress-case concurrent interactive clients.
- Expected and stress-case unattended display clients.
- Event update rate during normal loop and Final Surge-style bursts.
- Acceptable user-visible update latency for room snapshot changes.
- Reconnect expectations after refresh or temporary network loss.
- Graceful degradation order under load.

Test scenarios:

- Documentation review: the operating envelope names expected and stress targets, not only qualitative language.
- Documentation review: degradation preserves the video wall and safety controls before lowering non-critical spectacle.

### U2. Select and record the initial stack

Goal: evaluate candidate stacks against the operating envelope and choose the initial stack with explicit falsification criteria.

Expected documentation changes:

- Create `docs/plans/initial-stack-decision.md`.
- Update `docs/plans/ARCHITECTURE.md` if the selected stack changes subsystem boundaries, infrastructure assumptions, or validation expectations.
- Update `docs/plans/technical-designs/operations-release-and-validation.md` if the selected stack changes the validation or CI strategy described there.

Decision record contents:

- Selected stack and package manager.
- Candidate alternatives considered.
- Required capabilities: authoritative shared room state, realtime fanout or equivalent shared-state update path, deterministic time testing, browser workflow testing, secure session-backed mutations, admin auth path for future slices, media asset serving, operational logging, and deployable smoke-check support.
- Rejection criteria for candidates.
- Proof evidence gathered during Phase 0.
- Falsification triggers that would reopen the decision before later implementation slices depend on it.

Test scenarios:

- Documentation review: the selected stack is justified against the operating envelope.
- Documentation review: at least two serious alternatives are considered or explicitly ruled out with reasons.
- Documentation review: the record names conditions that would cause the project to revisit the stack.

### U3. Establish canonical validation commands

Goal: make validation executable and durable before later feature work starts.

Expected file changes:

- Update `AGENTS.md` with canonical validation commands after they pass.
- Add stack-specific package, config, and CI files as needed by the selected stack.
- Add initial CI workflow only if the selected stack and repository host make the workflow shape clear.

Validation command categories:

- Install dependencies.
- Lint.
- Typecheck, when the stack supports it.
- Unit or domain tests.
- Browser, integration, or workflow tests for the shell.
- Build.

Test scenarios:

- Command validation: each canonical command listed in `AGENTS.md` runs locally from a clean checkout state after dependencies are installed.
- CI validation: if CI is added, it runs the same canonical command set or documents any intentional differences.
- Failure clarity: a missing dependency, invalid fixture, or broken build fails loudly instead of producing a blank shell.

### U4. Write the first failing deterministic shell test

Goal: create the first executable expectation before product shell code is written.

First failing test:

> Given deterministic seed room state with four pane descriptors, the app renders the core four-panel video wall shell from that seed data and exposes the same canonical room snapshot to an interactive client and a read-only display client without calling any live provider.

Expected file changes:

- Add the stack-specific test file path chosen in U2.
- Add deterministic seed fixture files in the selected stack's fixture location.
- Add a minimal fake-provider or fixture boundary only if the selected stack needs one to prevent accidental live calls.

Path decision:

- Because this plan exists before stack selection, the exact test path is deferred to U2.
- Before U4 begins, `docs/plans/initial-stack-decision.md` must name the concrete test path, command, and fixture path.

Test scenarios:

- Interactive projection: a browser or component test renders four pane slots from deterministic seed data.
- Display projection: the display route or mode renders the same four pane identifiers from the same canonical room snapshot.
- Read-only display: display mode does not expose interactive controls.
- Provider safety: the test proves no live provider credential or network provider call is required.
- Fixture failure: missing or malformed seed data fails with a clear test error rather than an empty wall.

### U5. Implement the deterministic four-panel shell proof

Goal: make the U4 failing test pass with the thinnest product shell that proves stack suitability.

Expected file changes:

- Add stack-specific application entry points selected by U2.
- Add the minimal canonical room snapshot model or fixture loader.
- Add an interactive big-screen route or mode.
- Add a read-only display route or mode.
- Add static media placeholders or local seed asset references needed for deterministic rendering.

Implementation boundaries:

- The room snapshot may be fixture-backed for Phase 0.
- No user handles, submissions, boosts, votes, murmurs, admin controls, cycle advancement, or provider calls should be implemented.
- Styling should only establish the recognizable four-panel shell and display-vs-interactive distinction needed by the test.

Test scenarios:

- Shell parity: interactive and display projections render the same four pane IDs from one canonical snapshot.
- Layout smoke: a wide viewport shows a four-panel wall rather than a blank or single-panel page.
- Display boundary: display mode is visibly read-only.
- Build safety: the app builds with deterministic fixtures and fake-provider defaults.

### U6. Refresh planning and operations docs

Goal: keep durable docs aligned after Phase 0 makes concrete stack decisions.

Expected documentation changes:

- Update `AGENTS.md` with final validation commands.
- Update `docs/plans/ARCHITECTURE.md` for selected stack, operating envelope, and any changed boundaries.
- Update `docs/plans/technical-designs/operations-release-and-validation.md` with final validation and CI expectations.
- Create `docs/operations/` runbook stubs only if deployment, smoke checks, release identity, or rollback expectations become concrete during Phase 0.
- Update `docs/agent-skills/playbook-usage-log.md` if repo-local playbooks materially guided the work.

Test scenarios:

- Documentation review: no active doc still says validation commands are unknown after U3 completes.
- Documentation review: deployment docs are not created as production-ready unless target, mechanism, identity, smoke, and rollback are actually defined.
- Documentation review: architecture remains aligned with `docs/plans/PRD_V0.md` and does not introduce unapproved product behavior.

## Sequencing

1. U1: define numeric operating envelope.
2. U2: select stack and record the decision.
3. U3: establish validation commands and update `AGENTS.md` after commands pass.
4. U4: write the first failing deterministic shell test.
5. U5: implement the thinnest shell proof until validation is green.
6. U6: refresh durable docs and record any playbook usage.

Do not start U4 or U5 before U2 has named concrete stack-specific test and fixture paths.

## Verification Plan

Phase 0 is complete when:

- `docs/plans/initial-stack-decision.md` exists and records the selected stack, candidates, operating envelope, proof evidence, and falsification triggers.
- `AGENTS.md` lists canonical validation commands that have passed locally.
- The first deterministic shell test was committed before or alongside the shell implementation.
- The deterministic shell renders four panes from seed state in interactive and display projections.
- Display mode is read-only for the shell proof.
- Validation commands pass.
- Active architecture and operations-design docs no longer describe stack selection and validation commands as completely unknown.

## Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Stack debate expands beyond Phase 0 | Use the operating envelope and shell proof as the decision gate. |
| Shell proof accidentally grows into social gameplay | Keep handles, submissions, boosts, votes, murmurs, cycle advancement, admin, and provider work out of U5. |
| Test becomes coupled to visual decoration | Assert pane identity, route/mode parity, display read-only boundary, and deterministic fixture use before detailed styling. |
| Validation commands become aspirational | Record them in `AGENTS.md` only after they run successfully. |
| Realtime proof invents product behavior | If state propagation is needed, use a non-product diagnostic update or fixture reload proof and document it as stack evidence only. |
| Provider calls leak into MVP validation | Default to local fixtures and fake-provider boundaries with tests that require no live credentials. |

## Doc Freshness

After this plan is executed, check and update:

- `AGENTS.md` for canonical validation commands.
- `docs/plans/ARCHITECTURE.md` for stack, operating envelope, and validation changes.
- `docs/plans/technical-designs/operations-release-and-validation.md` for validation and CI expectations.
- `docs/plans/initial-roadmap.md` if Phase 0 status changes or the next slice changes.
- `docs/operations/` only when deployment, smoke, release identity, and rollback expectations become concrete.

No PRD change is expected unless the stack decision introduces product behavior, roles, scope, or non-goals not already present in `docs/plans/PRD_V0.md`.
