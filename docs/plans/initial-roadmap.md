---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Initial Implementation Roadmap

## Product Source

- `docs/plans/PRD_V0.md`

## Current Unknowns

- Product implementation stack is not selected.
- Validation commands are not established.
- CI, hosting, storage, AI video provider, and deployment targets are not established.
- Specific database, realtime transport, auth/session mechanism, and moderation provider are not selected.
- First project-specific seed videos are not selected.
- Visual effect presets are not selected.

## Product Decisions Now Captured

`docs/plans/PRD_V0.md` now defines the initial canonical room, session handles, responsive surfaces, MVP display mode, action economy, Murmurs, lightweight lineage, daily availability, MVP automated moderation, minimal admin panel, persistence boundaries, and MVP/V1 scope.

## Requirement For Every Future Slice

Every implementation slice must name its first failing test before product code is written. The test should target user-visible behavior, a domain rule, a data contract, a safety boundary, or an operational check.

## Phase 0: Product And Technical Foundation

### User Outcome

The team can choose and validate the first thin implementation slice without inventing product scope beyond the PRD.

### First Failing Test

Placeholder until the stack is selected: an executable expectation that the app can render the core four-panel video wall shell from deterministic seed data.

### Implementation Slices

- Select the initial application stack and record the decision.
- Establish canonical validation commands.
- Create the first app shell with deterministic seed data.
- Preserve MVP scope around project-specific pre-generated videos before real AI generation.

### Validation

- `<install command>`
- `<lint command>`
- `<unit test command>`
- `<build command>`

### Risks

- Selecting technology before clarifying the first useful slice.
- Overbuilding provider integration before the social loop is testable with seed videos.
- Letting process design continue instead of moving into product substance.

### Docs To Update

- `AGENTS.md` validation commands.
- `docs/plans/initial-roadmap.md`
- A future architecture decision document in `docs/plans/` once the stack is selected.

## Phase 1: First Useful Realtime Illusion

### User Outcome

Users can choose a session handle, see four looping panes, submit eligible themes, boost themes, vote on panes, and see immediate social and organism feedback from deterministic local or fake data.

### First Failing Test

An executable expectation that a user with a session handle can submit an eligible theme during the submission window and another user can boost it, updating visible rank or count.

### Implementation Slices

- Four-pane video grid using project-specific seed videos or deterministic local stand-ins.
- Big-screen control/social panel and small-screen bottom-sheet control surface.
- Session handle creation and uniqueness for the awake day.
- Theme submission and queue display.
- Theme boosting with visible count or rank changes.
- Pane voting with visible infection/genome change.
- Murmurs stream with constrained commentary.
- Activity feed entries for user and system actions.

### Validation

- `<targeted component/domain test command>`
- `<browser or workflow test command>`
- `<build command>`

### Risks

- UI noise from simultaneous panes, overlays, Murmurs, and effects.
- Voting logic that feels realtime but lacks clear state rules.
- Small-screen bottom-sheet interactions becoming cluttered.
- Identity and action limits coupling too tightly to presentation code.
- Tests coupled to presentation details instead of behavior.

### Docs To Update

- Product docs if MVP scope changes.
- `docs/solutions/` if useful patterns emerge for deterministic realtime-like tests.

## Phase 2: Interval Replacement And Prompt Mutation

### User Outcome

The board advances on a cadence: a leading theme locks, combines with the current genome, lineage is captured, and the oldest pane is replaced from a pre-generated pool.

### First Failing Test

An executable expectation that at Lock-In the top-ranked eligible theme is mutated with dominant video traits, lightweight lineage is captured, and at Emergence the oldest active pane is replaced with a deterministic seed video.

### Implementation Slices

- Countdown state and generation status.
- Named cycle phases.
- Submission window and incubating themes.
- Oldest-pane replacement rule.
- Prompt mutation from dominant traits.
- Basic genome calculation from video votes.
- Lightweight lineage.
- Daily sleep/wake state.
- Failure or delay state for replacement, even while generation is fake.

### Validation

- `<time/state machine test command>`
- `<workflow test command>`
- `<build command>`

### Risks

- Time-based logic becoming flaky.
- Mutation rules becoming opaque or untestable.
- Confusing generated, pending, failed, and replacement states.

### Docs To Update

- Architecture docs for state model and generation boundary.
- Operations docs if background jobs or scheduled workers are introduced.

## Phase 3: Real Provider And Operations Readiness

### User Outcome

The product can safely attempt real AI video generation behind an abstraction with moderation, storage, failure recovery, and release controls.

### First Failing Test

An executable expectation that the generation workflow calls a provider interface with a moderated mutated prompt, handles a deterministic provider response, and records a video candidate without requiring a live provider.

### Implementation Slices

- Provider interface and fake provider.
- Prompt moderation boundary.
- Storage/CDN decision and access model.
- Failed generation recovery.
- Admin or operational controls.
- Release identity and smoke checks.

### Validation

- `<provider boundary test command>`
- `<moderation contract test command>`
- `<storage integration test command>`
- `<smoke test command>`

### Risks

- Cost spikes from live generation.
- Provider lock-in.
- Unsafe or low-quality prompt submissions.
- Missing release identity or smoke checks before deployment.

### Docs To Update

- `docs/operations/` release and deployment runbooks.
- Architecture decision docs for provider, storage, moderation, and deployment.
- `AGENTS.md` with real validation and release commands after they exist.

## Agent-Team Suitability

Do not introduce agent teams yet.

Revisit `todos/agent-team-orchestration-playbook.md` only when the work can be split into independently testable slices with explicit contracts, such as provider integration, realtime state, UI effects, and operations work that can be validated separately and integrated deliberately.

## Recommended Next Step

Move from process bootstrap into project substance: choose the first implementation stack and convert Phase 0 into a small plan that names the exact first failing test.
