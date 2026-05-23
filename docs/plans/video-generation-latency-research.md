---
status: active
owner: engineering
last_reviewed: 2026-05-23
superseded_by:
---

# Video Generation Latency Research

## Product Context

Source: `docs/plans/PRD_V0.md`

The PRD now uses a 5-minute MVP cycle by default, keeps fake generation for MVP, and requires V1 to respect provider latency through a lock/emergence pipeline. Current provider APIs are best treated as short-clip generators, with loopable 4-15 second outputs depending on provider and model.

## Findings

The 5-minute replacement cadence is viable only if the app decouples user voting from video rendering and maintains a ready or nearly-ready buffer. Starting a single generation at countdown zero is too risky.

Google Veo 3.1 through the Gemini API is the clearest fit for a 3-5 minute cadence from published docs. Google lists request latency from 11 seconds to 6 minutes during peak hours, supports 4/6/8 second outputs for Veo 3.1 variants, and requires 8 seconds for 1080p/4k or reference-image workflows.

Runway should be treated as variable. Runway's own Seedance 2.0 help page says generation typically takes 2-10 minutes once started. Runway API docs expose several video models, and its usage tier docs emphasize concurrency and queueing behavior. This can work operationally with enough concurrency, but a single serial job can miss a 3-5 minute target.

Kling via fal is attractive for clip duration flexibility and cost transparency. fal's Kling 3 docs list 3-15 second outputs and position Standard as faster than Pro, but the public docs do not provide a firm latency SLA. Treat it as a candidate requiring direct measurement.

Luma Ray 2 supports loopable video generation and documents 5 second examples, multiple resolutions, async completion state, and a `loop` option. Public docs reviewed here did not provide a dependable latency range, so Luma also needs direct measurement.

## Cadence Math

For one room:

- 5 minute cadence: 12 replacement clips per hour.
- 3 minute cadence: 20 replacement clips per hour.
- If latency is 10 minutes, serial generation produces only 6 clips per hour, so it cannot support either cadence.
- Minimum active concurrency is `ceil(latency / cadence)`.
- At 10 minute latency, 5 minute cadence needs at least 2 concurrent jobs before retries or moderation failures.
- At 10 minute latency, 3 minute cadence needs at least 4 concurrent jobs before retries or moderation failures.

Practical target: p95 video-ready time should be under 2 minutes for a 3 minute cadence, or under 3 minutes for a 5 minute cadence. If p95 is closer to 6-10 minutes, use a slower visible cadence, generate ahead, or keep a pool of pre-generated candidates.

## Recommendation

For MVP, keep the PRD approach of fake generation from a pre-generated pool.

For V1 provider research, constrain generated outputs to 5-8 second loopable clips at 720p first. Use longer 10-15 second clips only for special events or providers proven to meet cadence.

For product UX, split the countdown into two clocks:

- Selection lock: when the winning prompt/genome is frozen and sent to generation.
- Emergence: when a ready generated clip replaces the oldest pane.

Start generation before the visible replacement deadline, keep at least one ready backup clip, and display delayed generations as diegetic system states rather than broken timers.

Before selecting a provider, run a burn-in with at least 50 generations per candidate, using the expected prompt shape and output settings. Track p50, p90, p95, failures, moderation blocks, cost, and whether the clip is actually usable as a loop.

## Provider Notes

| Provider candidate | Published clip support | Published latency signal | Fit for 3-5 minute cadence |
| --- | --- | --- | --- |
| Google Veo 3.1 | 4/6/8 seconds; 8 seconds for higher resolution/reference workflows | 11 seconds to 6 minutes during peak hours | Promising, but needs buffering and p95 measurement |
| Runway | Gen-4.5 supports 2-10 seconds; Gen-4 Turbo supports flexible 2-10 seconds; Seedance supports up to 15 seconds in Runway UI | Seedance help says 2-10 minutes once started; API docs emphasize concurrency and queueing | Possible with concurrency; risky as sole serial provider |
| Kling via fal | Kling 3 supports 3-15 seconds | No firm public latency SLA found in reviewed docs | Good candidate; must measure directly |
| Luma Ray 2 | Docs show 5 second Ray 2 output and loop option | No firm public latency SLA found in reviewed docs | Good loop candidate; must measure directly |

## Sources

- PRD: `docs/plans/PRD_V0.md`
- Google AI for Developers, Veo 3.1 Gemini API: https://ai.google.dev/gemini-api/docs/video
- Google Cloud, Veo provisioned throughput: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/veo-models
- Runway API models: https://docs.dev.runwayml.com/guides/models/
- Runway API usage tiers and concurrency: https://docs.dev.runwayml.com/usage/tiers/
- Runway API changelog: https://docs.dev.runwayml.com/api-details/api_changelog/
- Runway Seedance 2.0 help: https://help.runwayml.com/hc/en-us/articles/50488490233363-Creating-with-Seedance-2-0
- fal Kling 3 overview: https://fal.ai/kling-3
- fal Kling Video V3 API reference: https://fal.ai/docs/model-api-reference/video-generation-api/kling-video-v3-standard
- Luma Ray 2 video generation docs: https://docs.lumalabs.ai/docs/video-generation
