---
status: draft-active
owner: product
last_reviewed: 2026-05-23
superseded_by:
---

# PRD: Strange Dreamz: Living Video Panel

## Product Identity

Strange Dreamz is a building-scale chaotic social game where people collectively grow a cursed-and-beautiful AI video organism over the course of a day.

The experience combines a social game, an art installation, a weird toy, a crowd ritual, and a living group artifact. The game is competitive enough to create drama, but cooperative enough that the room feels like it made something together.

Product thesis:

> AI video generation is too slow for second-by-second content changes, but it is well suited to ritualized interval-based emergence. Strange Dreamz should make the wait feel alive through realtime social pressure, visible crowd behavior, prompt mutation, commentary, presentation-layer infection, and cycle-based video replacement.

The desired post-session memory is:

> Our group collectively made something cursed and beautiful.

## Audience And Context

The initial audience is people in the same building who know each other mostly as acquaintances. They are AI-forward, open-minded, and willing to participate in strange social software.

The first product context is one canonical shared room. The system should be designed so multiple rooms can exist later, but MVP should not require multiple rooms.

The visible brand is Strange Dreamz. Future versions may support community or room display names, but the initial product should not depend on that.

## Experience Principles

- The room is one shared organism with many responsive surfaces.
- Video replacement is the slow consequence of a fast social game, not the primary interaction itself.
- Users should always see immediate effects from actions through rankings, pane influence, genome movement, social callouts, overlays, and activity.
- The living wall should not become permanently covered in UI. Overlays should behave like weather: frequent enough to feel social, transient enough that the videos remain legible.
- Identity should matter socially without becoming professional or LinkedIn-adjacent.
- The product should lean into weirdness, fun, and PG-13 expressive freedom.
- The room should feel daily and perishable, not archival.
- Strange Dreamz is ephemeral as a product experience, but not fragile operationally.

## Room Model

MVP has one canonical room.

All interactive clients observe and affect the same canonical room state:

- active panes
- current cycle phase
- eligible themes
- incubating themes
- boosts
- pane votes
- genome
- murmurs
- activity feed
- lightweight lineage
- admin-controlled availability and safety state

The system should remain extensible for future multiple-room support.

## Responsive Surfaces

Strange Dreamz has two responsive surface classes plus a read-only display mode.

### Big Screen Mode

Big screen mode applies to TVs, monitors, projected displays, laptops, and tablets with enough space.

It should show:

- the four-panel living video wall
- a persistent control and social panel
- countdown and cycle phase
- theme queue
- active panes and pane influence
- human-readable genome
- activity feed
- Murmurs stream
- lightweight lineage and emergence events

Big screen mode is interactive when the device has input. A laptop should support direct submit, boost, pane vote, and murmur actions.

### Small Screen Mode

Small screen mode applies to phones.

It has two z-axis layers:

1. Living Wall Layer
   - Four videos are stacked vertically in a single column.
   - The user remains visually near the organism.

2. Control Surface Layer
   - A bottom sheet defaults to a peeking tab.
   - The sheet can be swiped up for interaction.
   - When expanded, it may occlude the living wall.
   - The sheet should use tabs to reduce touch complexity.

Small screen tabs should include at least:

- Act
- Queue
- Panes
- Feed or Murmurs

The collapsed peeking tab should show the information most likely to pull the user back into action:

```txt
FINAL SURGE | 00:27 | 3 boosts left
```

### Display Mode

Display mode is an MVP requirement.

Display mode is a dedicated unattended URL for read-only big screens. It should:

- show the living wall
- show non-video action as spectacle
- display ephemeral overlays for murmurs, boosts, votes, lead changes, phase changes, and emergence events
- show a QR or join link when configured
- disable submissions, votes, murmurs, and other interaction
- be muted by default

Display mode should not be the only way to use a big screen. Normal big screen clients remain interactive.

## Daily Availability

The room is awake from 10am to 11pm local time by default.

From 11pm to 10am, the room is unavailable. Overnight mode should show only:

- countdown to waking
- cryptic phrases that fade in and out

At sleep time:

- the room stops immediately, even mid-cycle
- the abrupt stop is intentional and should create scarcity
- handles expire
- sessions expire
- action counters expire
- active themes and boosts expire
- current cycle state expires
- murmurs expire
- the final four active videos remain for the next wake

At wake time:

- the room resumes with the previous day's final four active videos
- no special awakening phase is required for MVP

Future backlog:

- special awakening phase
- daily residue mechanics
- richer day-start ceremony

## Core Loop

1. User chooses a session handle.
2. User submits a theme during the submission window.
3. Other users boost eligible themes.
4. Users vote on active panes.
5. Pane votes affect visible infection and genome state immediately.
6. Murmurs and activity make social behavior visible.
7. The cycle enters Final Surge.
8. A winning theme locks in.
9. Lightweight lineage is captured.
10. The locked theme combines with the current genome.
11. A replacement video emerges from the pipeline.
12. The oldest pane is replaced.
13. The new pane receives a daily name/persona and begins accruing influence.

## Cycle Phases

MVP should use a 5-minute cycle by default. The default can be configured by admin.

Recommended phase model:

```txt
00:00-01:00  Submission Window
01:00-03:45  Boost Frenzy
03:45-04:30  Final Surge
04:30        Lock-In
04:30-05:00  Emergence Theater
05:00        Emergence
```

### Submission Window

- Users may submit one current-cycle theme.
- Incubating themes from the prior cycle become eligible.
- Users may begin boosting eligible themes.

### Boost Frenzy

- New submissions go to Incubating for the next cycle.
- Users boost eligible themes.
- Users vote on panes.
- Murmurs and overlays continue.

### Final Surge

- Boost math does not change in MVP.
- The UI becomes more intense.
- Lead changes, near-ties, and remaining power receive prominent callouts.

### Lock-In

- The current winning theme locks.
- A cycle winner should exist every cycle when eligible themes exist.
- The winner receives immediate social credit even if the video emerges later.
- Lightweight lineage is captured.

### Emergence Theater

- The locked theme and genome preview are dramatized.
- The oldest pane is marked for replacement.
- If the replacement clip is ready, it emerges at the scheduled emergence point.

### Emergence

- MVP uses a pre-generated video from a project-specific pool.
- V1 uses a real video generation pipeline.
- The oldest pane is replaced in MVP.

## Action Economy

Action limits reset every cycle.

MVP defaults:

- 1 current-cycle submission during Submission Window
- 10 theme boosts per cycle
- max 5 boosts per theme
- users cannot boost their own submissions
- 6 pane votes per cycle
- max 3 pane votes per pane
- murmur posting uses cooldowns, not a per-cycle pool

Commentary cooldown:

- users may post one murmur every 30 seconds
- echoes/reactions are lighter weight but still anti-spam throttled

The product does not attempt to solve one-human-one-identity abuse in MVP. Limits are bound to the browser session and handle pair.

## User Identity And Handles

Normal users do not create accounts in MVP.

User flow:

1. User opens the room.
2. If no active session exists, the user chooses a handle.
3. The system checks handle uniqueness and basic moderation.
4. The handle is bound to the browser session.
5. The handle cannot be changed mid-session.
6. The handle expires at sleep time.

Rules:

- handles are unique within the canonical room and awake day
- rejected handles are visible only to the user choosing them
- session handles are social identity, not durable accounts
- action limits are tied to the session and handle pair

Admin users are separate from normal session-handle users.

## Submissions And Theme Queue

Users submit natural-language video themes.

MVP should keep theme submission lightweight. Later versions may add optional chips or structured helpers, but free text remains central.

Theme lifecycle:

- current-cycle submission is available only during Submission Window
- submissions after the window go to Incubating for the next cycle
- incubating themes receive exactly one carryover opportunity
- if a theme becomes eligible and loses, it disappears
- losing themes do not persist beyond their eligible cycle

The UI should show:

- original submitted theme
- submitter handle
- boost count
- rank
- momentum
- infected/mutated preview
- whether a late submission is incubating for the next cycle

Users cannot boost their own submissions.

## Pane Votes And Genome

Users vote on currently active panes.

Pane votes should immediately affect:

- pane influence meters
- visual infection effects
- genome weights
- social callouts
- activity feed
- lightweight lineage candidates

MVP pane votes do not affect pane survival. The oldest pane is always replaced.

By the close of V1, pane votes should help deliver survival, protection, or related mechanics so beloved panes can matter beyond genome influence.

The genome is human-readable. It may include:

- dominant subject
- visual style
- color palette
- camera motion
- mood
- texture
- recurring objects
- audio vibe metadata

MVP pane traits are manually assigned metadata on seed videos.

## Pane Identity

Each pane has equal mechanical status.

Panes have stable positions but may receive lightweight daily names/personas for social flavor.

Examples:

```txt
The Glass Mouth
The Soft Engine
The Wrong Garden
The Choir Leak
```

Pane names are cosmetic in MVP. They should appear in callouts, murmurs, lineage, and pane info.

## Prompt Mutation

At lock-in, the winning theme combines with the current genome.

Mutation should be medium-aggressive:

- preserve the core noun or scene of the original theme
- strongly alter style, mood, palette, texture, motion, and motifs
- keep the original submitted text visible alongside the infected preview

Example:

```txt
Original:
a subway for lost planets

Infected preview:
a subway for lost planets, filmed like analog cathedral footage, acid green platform lights, chrome feathers drifting through slow underwater motion
```

Prompt metadata may include visual mood, motion, texture, and audio vibe even before sound ships.

## Murmurs

Commentary is an MVP feature and should be called Murmurs.

Murmurs are constrained social commentary, not a full chat room.

Rules:

- murmurs can target the room, a theme, a pane, or the current cycle
- murmurs can use constrained phrase templates
- murmurs can also use free text up to 60 characters
- templates may include short user-written slots
- murmurs are fully attributed
- murmurs can receive echoes/reactions
- murmurs are not threaded
- murmurs are mostly ephemeral
- notable murmurs may enter lightweight lineage

Examples:

```txt
@maya: Pane 2 reeks of cathedral math
@eli: I bless "moon cafeteria" with velvet static
@noor: wrong in a promising direction
```

Murmurs should appear in:

- a dedicated Murmurs stream
- ephemeral overlays on the living wall when appropriate

System activity remains distinct from Murmurs.

## Activity Feed

The activity feed is for system and action events, such as:

```txt
@maya submitted "a subway for lost planets"
@eli boosted "moon cafeteria"
@noor fed The Soft Engine
"Neon swamp cathedral" overtook first place
Generation locked
New organism emerging
The organism reassembled itself
```

Murmurs and activity may both appear as overlays in display mode, but they should be visually distinct.

## Lineage And Credit

Lightweight lineage is an MVP feature.

Lineage should appear:

- when a video emerges
- on the video or pane info panel
- in the activity feed

MVP lineage is a compact sentence that can include:

- original prompt submitter as headline credit
- top boosters, summarized after a cutoff
- dominant pane or genome influence
- top pane voter only when there is a clear standout
- one notable murmur when relevant

Example:

```txt
Born from @maya's "a subway for lost planets," boosted by @eli, @noor, @jay, and 6 others, shaped by Pane 3 and haunted by "cathedral math."
```

If pane influence is collective, lineage should say so:

```txt
Shaped by Pane 3 and its followers.
```

If one user clearly drives a pane's influence, lineage may name them:

```txt
Shaped by The Soft Engine, carried by @eli's obsession with it.
```

V1 should expand lineage into richer generated-video provenance.

## Video Content Model

MVP seed videos should be made specifically for Strange Dreamz. Generic stock/test clips will undercut the product.

Video requirements:

- 5-8 second loopable clips
- good-enough loops are acceptable in MVP
- silent in MVP
- sound-capable in V1
- project-specific tone
- manually assigned traits for MVP

V1 may revisit loop quality requirements once real providers are integrated.

## Sound

MVP can be muted-only.

V1 must support sound.

Interactive clients should use the same sound rules across big and small screens:

- sound is user-enabled, never forced
- only one pane is audible per client at a time
- the audible pane is the user's focused pane
- users can switch audio focus by selecting a pane
- display mode is muted by default unless explicitly configured otherwise

## Generation Pipeline

MVP uses fake generation by selecting from a pool of pre-generated Strange Dreamz clips.

V1 adds real AI video generation.

The product must be tethered to provider latency constraints. Do not assume video generation starts at countdown zero and finishes on demand.

The system has two separate moments:

1. Selection Lock
   - the winning prompt and genome outcome freeze
   - immediate social credit is awarded
   - the prompt enters the generation pipeline

2. Emergence
   - a ready clip replaces a pane
   - the clip may correspond to a prompt locked in an earlier cycle

The currently emerging video may have been locked in a previous cycle. The current cycle's social activity still affects the organism immediately through presentation effects, rankings, trait battles, genome movement, and future emergence lineage.

Provider guidance for V1:

- target 5-8 second loopable clips at 720p first
- longer clips are for special events or providers proven to meet cadence
- keep at least one ready backup clip
- run provider burn-in before selection
- measure p50, p90, p95, failures, moderation blocks, cost, and usable-loop rate

Delay and failure states:

- Rendering: locked theme is in generation
- Late: expected emergence time passed, but generation may still complete
- Backup Emergence: terminal failure or timeout threshold reached; backup clip used
- Recovered Emergence: delayed clip finishes and may enter a later slot
- Failed / Absorbed: unusable result is discarded

Generation problems should be visible, diegetic, and honest. The UI may dramatize delays and failures, but it must not pretend a user-selected theme emerged if a backup was used.

## Moderation And Safety

The product should preserve immediacy while enforcing PG-13 community bounds.

Allowed:

- weirdness
- profanity
- horror without gore
- political content
- public figures
- coworkers or named real people, subject to disallowed categories below

Disallowed:

- explicit sexual content
- graphic violence or gore
- hate or harassment
- slurs
- real-person sexualization
- illegal instruction content

MVP moderation:

- automated moderation only is acceptable
- handles, themes, and murmurs are moderated
- content should appear quickly enough to feel immediate
- rejected content is visibly rejected to the originating user
- no suggested rewrite is required
- no system mutation of rejected content is required

The PRD distinguishes:

- visible surface moderation: can this text appear to other users?
- generation safety moderation: can this prompt be sent to a video provider?

A prompt may be acceptable socially but not eligible for generation. In that case, the user should see a clear state such as:

```txt
Not eligible for generation
```

## Admin Surface

MVP requires an authenticated admin user and a minimal live admin panel.

Admin auth should use secure password-based sign-in for one or a few admins:

- server-managed admin account
- secure password hashing
- secure session cookies
- CSRF protection for mutating admin actions
- no public self-registration

MVP admin controls should include:

- awake/unavailable hours
- cycle length
- action limits
- effect intensity preset
- seed video pool
- banned words or moderation terms
- cryptic sleep phrases
- display mode QR/link settings
- manual emergence
- skip to next cycle
- panic controls

MVP panic controls should include at least:

- pause new submissions
- pause murmurs
- pause handles
- mute overlays
- freeze current cycle
- force unavailable mode

Admin controls should affect the live room immediately and should be visible to users when relevant. If submissions or murmurs are paused, the UI should say so instead of failing silently.

## Visual And Presentation Effects

Infection/presentation effects should be modular and tunable by intensity.

The product should support experimentation with:

- color bleed
- animated borders
- tendrils
- particles
- captions
- trait labels
- glitch overlays
- aura
- scanlines
- drifting typography
- specimen labels

MVP should keep the physical pane layout stable:

- 2x2 grid on big screens
- single vertical stack on small screens

Influence should feel alive through overlays, borders, labels, scale within the pane, and z-axis effects instead of resizing panes.

The leading theme should appear:

- persistently in the panel
- over the wall only for meaningful moments, such as lead changes, Final Surge, Lock-In, and Emergence

Handles should appear:

- frequently in panel surfaces
- as event-based bursts on the living wall
- more often in display mode, where spectacle is the point

## Persistence And Retention

The product should not provide a user-facing archive in MVP or V1.

The system should persist only what is needed to operate the live room, recover from short failures, enforce current-session limits, moderate currently visible content, and manage the active video pool or generation pipeline.

Persist during the awake day:

- current four active videos
- current cycle state
- active themes
- boosts
- pane votes
- handles
- action counters

Persist across sleep:

- final four active videos
- configured seed/generated video pool as needed for operation

Mostly ephemeral:

- murmurs
- activity feed
- session handles after sleep
- action counters after sleep
- themes and boosts after sleep

If cycle state cannot be recovered, restart the cycle cleanly and show a visible event:

```txt
The organism reassembled itself.
```

Operational logs may exist for debugging and safety, but they are not product history.

## MVP Scope

MVP proves the social organism with fake generation.

MVP includes:

- one canonical room
- responsive big-screen layout
- responsive small-screen layered layout
- read-only display mode URL
- four-pane video wall
- project-specific pre-generated seed videos
- session handles
- current-cycle submission window
- incubating submissions for next cycle
- boosts with per-cycle limits
- pane votes with per-cycle limits
- 5-minute cycle with named micro-phases
- lock-in winner every cycle when eligible themes exist
- emergence from pre-generated pool
- oldest-pane replacement
- manually assigned pane traits
- human-readable genome
- infected/mutated prompt preview
- activity feed
- Murmurs stream
- constrained murmurs plus 60-character free text
- murmur echoes/reactions
- ephemeral overlays
- lightweight lineage
- automated moderation for handles, prompts, and murmurs
- minimal live admin panel
- admin panic controls
- overnight unavailable state with wake countdown and cryptic phrases
- operational persistence for live room recovery

MVP does not include:

- real AI video generation
- sound
- corruption/sabotage
- admin moderation review workflow beyond automated moderation and panic controls
- durable normal user accounts
- multiple rooms
- public archive
- share pages
- rich historical lineage
- full provider queue operations

## V1 Scope

V1 adds real generation, richer social mechanics, and production readiness.

V1 should include:

- real AI video generation
- provider abstraction layer
- generation safety moderation
- lock/emergence pipeline with delayed and backup states
- CDN-backed video storage
- failed generation recovery
- admin controls for generation queue
- sound support
- one-pane-at-a-time audio focus on interactive clients
- expanded lineage
- corruption/sabotage mechanics
- pane survival/protection or equivalent mechanics
- scarce special moves, if validated
- better infection visuals
- prompt/genome preview improvements
- persistent operational session/day state as needed
- multiple-room extensibility, not necessarily multiple-room launch

## Post-V1 Backlog

Capture but do not build for MVP or V1 unless reprioritized:

- shareable video pages for virality
- public generated-video pages with prompt, lineage, contributors, and room context
- daily archive or recap
- special awakening phase
- richer day-start ceremony
- factions or teams
- full user accounts
- shareable room links beyond the canonical room
- creator profiles
- advanced anti-sybil controls
- special AI remix events
- long-form video

## Non-Goals

For MVP and V1 unless explicitly reprioritized:

- no continuous AI editing of currently playing videos
- no fully realtime video generation
- no complex creator profile system
- no long-form videos
- no perfect visual continuity between panes
- no user-facing archive
- no full chat room
- no multiple-room launch requirement
- no explicit winner screen
- no scoreboard that flattens the game into productivity metrics

## Success Metrics

Early product metrics:

- unique session handles per awake day
- active users per cycle
- cycles with 3 or more active users
- votes per active user
- boosts per active user
- pane votes per active user
- submissions per active user
- murmurs per active user
- echo/reaction rate on murmurs
- average session length
- percentage of users who stay through at least one generation cycle
- Final Surge participation
- votes or boosts in final 30 seconds before Lock-In
- number of prompt lead changes per cycle
- repeat visits across awake days
- display-mode join conversions, when QR/link is shown
- cost per engaged minute once real generation launches

Qualitative success:

- users understand that small actions affect the organism
- the room feels socially alive even before real generation
- people refer to panes, prompts, and moments by name
- people feel credit, rivalry, and collective authorship
- the result feels weird, fun, PG-13, and cursed-beautiful

## Key Risks

- The game feels slow if the fast loop is not vivid enough.
- The right/control panel gets too noisy.
- Overlays obscure the videos.
- Commentary becomes chat-like or spammy.
- Users submit low-quality prompts.
- Automated moderation blocks too much or too little.
- Provider latency breaks the perceived cadence in V1.
- Costs spike if replacement cadence is too aggressive.
- The infection mechanic feels cosmetic unless reflected in future videos.
- The four videos compete visually in a chaotic way.
- Admin controls are too weak to recover from bad live content.
- Ephemerality may conflict with virality unless share pages are prioritized later.

## Acceptance Criteria

### Room And Session

- Given a new user without a session, when they open the room, they are prompted to choose a handle before acting.
- Given an accepted handle, when another user tries to choose the same handle during the same awake day, the second user is rejected.
- Given sleep time arrives, when the room becomes unavailable, session handles and action counters expire.

### Responsive Surfaces

- Given a big-screen viewport, the room shows a four-pane wall and persistent control/social panel.
- Given a small-screen viewport, the room shows a vertical video stack with a peeking bottom control sheet.
- Given display mode, the room shows spectacle and live events but rejects interactive actions.

### Cycle

- Given the cycle starts, current-cycle submissions are accepted during Submission Window.
- Given Submission Window ends, new submissions enter Incubating for the next cycle.
- Given eligible themes exist at Lock-In, one winning theme is selected.
- Given Emergence occurs in MVP, the oldest pane is replaced by a pre-generated project-specific clip.

### Action Limits

- Given a user has 10 boosts, when they boost a theme, their remaining boosts update.
- Given a user has placed 5 boosts on a theme, when they try to place another boost on that same theme, the action is rejected.
- Given a user submitted a theme, when they try to boost their own submission, the action is rejected.
- Given a user has 6 pane votes, when they vote on a pane, their remaining pane votes update.
- Given a user has placed 3 votes on a pane, when they try to place another vote on that same pane, the action is rejected.

### Murmurs

- Given a user posts a murmur, it appears in the Murmurs stream and may appear as an overlay.
- Given a user posts free text longer than 60 characters, the action is rejected.
- Given a user posts a murmur before cooldown expires, the action is rejected or disabled.
- Given another user echoes a murmur, the echo count updates.

### Genome And Lineage

- Given pane votes occur, the visible genome updates immediately.
- Given a theme locks in, the system shows original text and infected preview.
- Given a video emerges, lightweight lineage appears at emergence, on pane info, and in the activity feed.

### Moderation And Admin

- Given a handle, prompt, or murmur fails automated moderation, the originating user sees a visible rejection.
- Given admin pauses new submissions, users see that submissions are paused and cannot submit.
- Given admin forces unavailable mode, the room becomes unavailable immediately.
- Given admin skips to the next cycle, the live room state updates immediately.

### Daily Rhythm And Recovery

- Given the room reaches sleep time mid-cycle, the room stops immediately.
- Given the next wake time arrives, the room resumes with the previous day's final four videos.
- Given the server restarts during the awake day, the room recovers current videos, cycle state, active themes, boosts, handles, and action counters.
- Given cycle state cannot be recovered, the room restarts the cycle and shows "The organism reassembled itself."

## Open Questions

- Which visual effect presets should ship first?
- What are the first project-specific seed videos?
- What exact moderation provider or model should be used?
- Which technology stack should implement MVP?
- What deployment target should host the canonical room?
- What provider should be selected for V1 video generation after burn-in?
- What is the right timeout threshold before backup emergence?
- How should share pages work after V1 without undermining ephemerality?
