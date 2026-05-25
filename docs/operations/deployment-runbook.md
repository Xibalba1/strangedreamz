---
status: active
owner: operations
last_reviewed: 2026-05-25
superseded_by:
---

# Deployment Runbook

## Target

- Provider: Hetzner Cloud
- Project: `strangedreamz`
- Environment: production
- Server: `strangedreamz-prod-ash-1`
- Server ID: `132924344`
- Location: `ash`
- Server type: `ccx13`
- Image: Ubuntu 24.04 x86
- Runtime: Docker Compose
- Public IPv4: `87.99.136.176`
- Public IPv6 network: `2a01:4ff:f4:f835::/64`
- Public URL: `http://87.99.136.176` until a domain is configured

## Source

Deploy reviewed code from `main`.

Feature-branch, hotfix, rollback, and production variable changes require explicit approval at action time.

## Required Local Tools

- `hcloud`
- `ssh`
- `git`

## Server Access

SSH key:

- Hetzner key name: `strangedreamz-hetzner`
- Local private key: `~/.ssh/strangedreamz_hetzner`

SSH command shape:

```bash
ssh -i ~/.ssh/strangedreamz_hetzner root@87.99.136.176
```

Firewall:

- Hetzner firewall: `strangedreamz-prod`
- Firewall ID: `11025193`
- SSH source: `162.206.172.65/32`
- Public inbound: TCP 80 and 443 from `0.0.0.0/0` and `::/0`

Host bootstrap verified:

- Docker version 29.5.2
- Docker Compose version v5.1.4

## Provisioning Reference

Create the first server with:

```bash
hcloud server create \
  --name strangedreamz-prod-ash-1 \
  --type ccx13 \
  --image ubuntu-24.04 \
  --location ash \
  --ssh-key strangedreamz-hetzner \
  --firewall strangedreamz-prod \
  --label app=strangedreamz \
  --label environment=production \
  --label role=web
```

## First-Time Server Bootstrap

This has already been run on `strangedreamz-prod-ash-1`. Re-run only when rebuilding or replacing the server.

Install Docker Engine and the Compose plugin, then clone the repo:

```bash
apt-get update
apt-get install -y ca-certificates curl git
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
git clone https://github.com/Xibalba1/strangedreamz.git /opt/strangedreamz
```

## Deploy

```bash
cd /opt/strangedreamz
git fetch origin
git checkout main
git reset --hard origin/main
export RELEASE_SHA="$(git rev-parse HEAD)"
printf "RELEASE_SHA=%s\n" "$RELEASE_SHA" > deploy/.env
docker compose -f deploy/compose.yaml up -d --build
```

## Post-Deploy

Run the smoke runbook in `docs/operations/release-identity-and-smoke-checks.md`.
