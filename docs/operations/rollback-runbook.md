---
status: active
owner: operations
last_reviewed: 2026-05-25
superseded_by:
---

# Rollback Runbook

## Scope

This runbook covers the first Hetzner VPS deployment before databases, queues, object storage, or live providers exist.

## Rollback To Previous Commit

On the server:

```bash
cd /opt/strangedreamz
git fetch origin
git checkout main
git reset --hard <previous-good-sha>
export RELEASE_SHA="$(git rev-parse HEAD)"
docker compose -f deploy/compose.yaml up -d --build
```

Then run the smoke command with the rollback SHA:

```bash
npm run smoke -- --url http://87.99.136.176 --expected-sha <previous-good-sha>
```

## Stop The Service

If rollback cannot restore a healthy state:

```bash
cd /opt/strangedreamz
docker compose -f deploy/compose.yaml down
```

## Current Data Considerations

There is no database, queue, object storage, or generated video persistence in the first deployment slice. No data migration reversal is expected.

Revisit this runbook before adding persistence, provider credentials, or generated media storage.
