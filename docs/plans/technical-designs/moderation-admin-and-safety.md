---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Technical Design: Moderation, Admin, And Safety

## Purpose

Define the safety boundaries for visible user content, generation eligibility, admin authentication, live controls, and panic recovery.

## Product Requirements Covered

- PG-13 expressive freedom with automated moderation for handles, themes, and murmurs.
- Visible surface moderation is distinct from generation safety moderation.
- Rejected content is visible only to the originating user.
- Prompts may be socially acceptable but not eligible for generation.
- MVP requires authenticated admin users with secure password-based sign-in.
- Admin controls include hours, cycle length, limits, effects, seed pool, banned terms, sleep phrases, display join settings, manual emergence, cycle skip, and panic controls.
- Panic controls include pausing submissions, murmurs, handles, muting overlays, freezing the cycle, and forcing unavailable mode.
- Admin changes affect the live room immediately and visibly.

## Safety Boundaries

| Boundary | Purpose | MVP Behavior |
| --- | --- | --- |
| Handle moderation | Prevent unsafe public identity labels | Reject before handle becomes active |
| Theme moderation | Prevent unsafe visible prompts | Reject or mark not visible to others |
| Murmur moderation | Prevent unsafe social commentary | Reject before public display |
| Generation safety | Prevent unsafe provider prompts | Mark prompt not eligible for generation |
| Admin auth | Protect live controls | Password-based admin sign-in, no public registration |
| Panic controls | Stop bad live behavior quickly | Immediate room-wide effects with user-visible states |

## Moderation Operating Contract

Visible content should not become public until it passes visible surface moderation. Generation prompts should not be sent to a provider until they pass generation safety moderation.

Before implementation selects a moderation provider or local model, the moderation plan must define:

- target latency for handles, themes, and murmurs so successful actions still feel immediate;
- pending UI behavior visible only to the originating user while moderation is unresolved;
- timeout behavior for each content type;
- provider outage behavior, including which actions fail closed;
- whether any local banned-term check runs before a remote provider;
- tests proving rejected content remains private and successful content does not feel silently stalled.

Default safety posture until a provider-specific decision replaces it:

| Content | Public display on moderation timeout/outage | User-facing behavior |
| --- | --- | --- |
| Handle | Fail closed | Show private pending or rejected state; do not reserve publicly. |
| Theme | Fail closed for public queue | Show private pending or rejected state; do not enter public ranking. |
| Murmur | Fail closed | Show private pending or rejected state; do not enter stream or overlays. |
| Generation prompt | Fail closed for provider call | Keep visible theme state if surface moderation passed; mark not eligible for generation. |

## Admin Surface Contract

Admin controls mutate operational room configuration, not normal user identity.

Controls should be grouped by operational intent:

- Availability: awake hours, cryptic sleep phrases, forced unavailable.
- Cycle: length, freeze, skip.
- Actions: action limits, pause handles, submissions, murmurs.
- Presentation: effect intensity, mute overlays, display QR/link.
- Assets: seed video pool.
- Safety: banned words or moderation terms.
- Emergence: manual emergence.

Admin audit logging is required before the admin panel ships. Security-relevant mutations should record admin identity, timestamp, action, target, and before/after values where safe, with access and retention aligned to the operational log policy.

## Panic-Control Client States

Clients should render admin and panic controls consistently:

| Control | Normal user state | Display mode state |
| --- | --- | --- |
| Pause handles | Handle creation disabled with visible explanation | Join prompt may remain, but handle creation is shown as paused. |
| Pause submissions | Submit controls disabled with visible explanation | Submission bursts stop; overlays may show pause event. |
| Pause murmurs | Murmur controls disabled with visible explanation | Murmur overlays stop; activity may show pause event. |
| Mute overlays | Core wall remains; non-critical overlays stop | Spectacle reduces to video wall, countdown, and critical events. |
| Freeze cycle | Countdown and phase show frozen state | Frozen state is visible without inviting interaction. |
| Force unavailable | Room immediately enters unavailable mode | Display shows unavailable mode and wake/override state. |
| Manual emergence | New pane appears only if ready clip/candidate exists | Emergence event appears as spectacle. |
| Cycle skip | Current phase changes through an explicit admin event | Skip appears as system event, not normal organic emergence. |

## First Failing Tests For Future Slices

- Handle rejection: given a handle fails moderation, the originating user sees rejection and the handle is not reserved.
- Prompt generation eligibility: given a theme passes visible moderation but fails generation safety, it can remain visible while showing "Not eligible for generation."
- Murmur rejection: given a murmur fails moderation, it does not appear in the Murmurs stream or overlays.
- Moderation timeout: given moderation times out for a handle, theme, or murmur, the content does not become public and the originator sees a private pending or rejected state.
- Admin auth: given an unauthenticated user attempts an admin mutation, the action is rejected.
- CSRF safety: given an admin mutation lacks valid CSRF protection, the mutation is rejected.
- Admin audit: given an authenticated admin changes safety, availability, cycle, or emergence settings, a security-relevant audit entry is recorded with safe fields.
- Panic pause: given admin pauses submissions, users see a paused state and cannot submit.
- Forced unavailable: given admin forces unavailable mode, all clients enter unavailable mode immediately.

## Validation Expectations

- Contract tests should cover the two moderation gates separately.
- Authorization tests should distinguish normal session handles from admin users.
- Admin workflow tests should prove live room state changes propagate to interactive and display surfaces.
- Safety tests should prove rejected content is private to the originator.
- Panic-state tests should prove interactive and display clients represent each panic control coherently.

## Open Decisions

- Moderation provider or local moderation model.
- Admin account bootstrap process.
- Password hashing and session implementation details.
- CSRF mechanism.
- Audit log retention, redaction, and safe before/after field policy.
- Whether banned terms supplement or configure the moderation provider.

## Sources

- `docs/plans/PRD_V0.md`
- `docs/plans/initial-roadmap.md`
- `docs/plans/ARCHITECTURE.md`
