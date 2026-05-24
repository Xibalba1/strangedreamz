---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Technical Design: Responsive Clients And Presentation

## Purpose

Define how the shared room state appears across interactive big screens, interactive small screens, and read-only display mode while preserving video legibility and immediate social feedback.

## Product Requirements Covered

- Big screen mode with four-panel wall, persistent control/social panel, countdown, queue, pane influence, genome, activity, Murmurs, lineage, and emergence events.
- Small screen mode with vertical video stack and peeking bottom sheet with tabs.
- Display mode as a dedicated unattended read-only URL.
- Ephemeral overlays for murmurs, boosts, votes, lead changes, phase changes, and emergence events.
- Modular presentation effects with tunable intensity.
- Stable physical pane layout: 2x2 grid on big screens, vertical stack on small screens.
- Display mode muted by default; MVP can be muted-only.

## Surface Responsibilities

| Surface | Primary Responsibility | Interaction |
| --- | --- | --- |
| Big screen interactive | Shared spectacle plus full controls | Submit, boost, pane vote, murmur |
| Small screen interactive | Stay near organism while using compact controls | Bottom-sheet tabs for actions |
| Display mode | Unattended spectacle and join prompt | Read-only; rejects mutations |

## Information Architecture

Big-screen interactive mode should keep the four-pane wall primary. The persistent control/social panel should prioritize:

1. Cycle phase, countdown, and current action availability.
2. Leading eligible theme, queue rank, and user's remaining action power.
3. Pane influence and human-readable genome.
4. Murmurs and activity feed, with system events visually distinct from user commentary.
5. Lineage and emergence context when a pane is locked, emerging, or newly replaced.

Secondary details may collapse or reduce density during Final Surge and Emergence Theater so the living wall remains legible. Display mode may elevate spectacle and join prompts because it does not carry interactive controls.

## Small-Screen State Matrix

| State | Expected behavior |
| --- | --- |
| Peeking | Bottom sheet exposes phase, countdown, and most relevant remaining action power. |
| Expanded | Tabs provide Act, Queue, Panes, and Feed or Murmurs without leaving the wall context. |
| Tab selected | Each tab preserves its own scroll/focus position while room state continues updating. |
| Drag dismissed | Sheet returns to peeking state without losing pending safe input. |
| No handle | Act controls prompt handle creation before mutating room state. |
| Paused or unavailable | Relevant controls are disabled with visible reason. |
| Rejected action | Rejection is visible to the originating user without creating public feed or overlay events. |
| Empty content | Queue, Murmurs, and activity show compact empty states rather than disappearing. |

## Presentation State Contract

Presentation should subscribe to domain events and room snapshots, then render transient effects without owning product rules.

Event classes that can drive presentation:

- Phase changes.
- Theme submissions, boosts, and lead changes.
- Pane votes and influence movement.
- Murmurs and echoes.
- Lock-in and emergence events.
- Admin pauses and forced unavailable state.
- Recovery events.

## Overlay Rules

- Overlays behave like weather: frequent and transient, not permanent UI cover.
- Leading themes appear persistently in the control panel, but only appear over the wall for meaningful moments.
- Handles appear frequently in panels and as event bursts on the wall.
- Display mode can show more spectacle than interactive modes because it has no control workload.
- UI should say when an action is paused or rejected instead of failing silently.

## Accessibility Contract

- Interactive controls should be keyboard reachable on big screens and focusable within the small-screen sheet.
- Bottom-sheet expansion, tab changes, and modal-like states should manage focus predictably.
- Activity, Murmurs, phase changes, and rejection states should have live-region or equivalent non-visual announcement behavior where the chosen frontend stack supports it.
- Icon-only controls need accessible names.
- Touch controls should meet minimum practical touch target sizing.
- Display mode should remain understandable without sound and without relying solely on color.

## First Failing Tests For Future Slices

- Big screen rendering: given deterministic seed room state and a wide viewport, the surface shows a 2x2 wall plus persistent control/social panel.
- Big screen hierarchy: given a wide viewport during Final Surge, countdown/action availability and leading theme remain more prominent than secondary feed details.
- Small screen rendering: given deterministic seed room state and a phone viewport, the surface shows a vertical video stack and a peeking bottom sheet.
- Bottom-sheet states: given no handle, paused actions, rejected input, and empty Queue/Murmurs content, the small-screen sheet renders the expected state without losing wall context.
- Display mode: given the display URL, interactive actions are unavailable or rejected and live events still appear as spectacle.
- Overlay legibility: given multiple event types in one cycle, overlays expire and do not permanently obscure the video panes.
- Accessibility: given keyboard or screen-reader style navigation, core controls and live status changes are reachable and understandable.
- Admin pause visibility: given submissions are paused, the submit control communicates the pause state and prevents submission.

## Validation Expectations

- Component or browser tests should verify viewport-specific layouts from the same room state.
- Interaction tests should prove display mode cannot mutate state.
- Visual regression or screenshot checks should cover overlay density once a frontend stack exists.
- Accessibility checks should verify controls remain reachable on small screens and display mode is understandable without sound.

## Open Decisions

- Frontend framework and component architecture.
- Realtime subscription mechanism.
- Effect preset names, intensity scale, and default MVP preset.
- First seed video assets and pane trait metadata.
- QR or join-link generation mechanism for display mode.

## Sources

- `docs/plans/PRD_V0.md`
- `docs/plans/initial-roadmap.md`
- `docs/plans/ARCHITECTURE.md`
