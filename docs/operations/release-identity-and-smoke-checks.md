---
status: active
owner: operations
last_reviewed: 2026-05-25
superseded_by:
---

# Release Identity And Smoke Checks

## Release Identity

The app exposes release identity at:

```text
/healthz
```

The expected response includes:

```json
{
  "ok": true,
  "service": "strangedreamz",
  "release": {
    "sha": "<git-sha>"
  }
}
```

The deployed `release.sha` must match the default-branch commit being released.

## Smoke Command

From a local checkout:

```bash
npm run smoke -- --url http://<server-ip> --expected-sha <git-sha>
```

Current production URL before domain setup:

```bash
npm run smoke -- --url http://87.99.136.176 --expected-sha <git-sha>
```

The smoke command verifies:

- `/healthz` responds successfully.
- `/healthz` reports `ok: true`.
- `/healthz` reports `service: "strangedreamz"`.
- `/healthz` reports the expected release SHA.
- `/` responds successfully and includes the app shell.

## Healthy Signals

- `npm run smoke` exits 0.
- `docker compose -f deploy/compose.yaml ps` shows the app and Caddy containers running.
- `docker compose -f deploy/compose.yaml logs --tail=100` shows no crash loop.

## Failure Signals

- Smoke cannot connect to the server.
- `/healthz` does not match the expected release SHA.
- `/` does not render the app shell.
- The app or Caddy container restarts repeatedly.

## Validation Window

Check immediately after deploy and again after 10 minutes.
