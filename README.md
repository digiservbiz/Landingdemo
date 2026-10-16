# Landingdemo

A static landing page (`site/index.html`) and what you need to host it on a VPS.

## Preview locally

```bash
docker compose up --build    # http://localhost:8080
# or, without Docker:
python3 -m http.server 8080 -d site
```

## Deploy to a VPS (Nginx, no Docker)

1. Point your domain's DNS `A` record at the VPS IP.
2. Copy the setup script to the server and run it once:
   ```bash
   scp deploy/setup-vps.sh root@YOUR_VPS_IP:
   ssh root@YOUR_VPS_IP 'DOMAIN=example.com EMAIL=you@example.com bash setup-vps.sh'
   ```
   This installs Nginx, opens the firewall (SSH, HTTP, HTTPS) and gets an HTTPS
   certificate from Let's Encrypt. Leave `DOMAIN`/`EMAIL` unset to serve on the IP only.
3. Upload the site:
   ```bash
   VPS_HOST=YOUR_VPS_IP VPS_USER=root ./deploy/deploy.sh
   ```

## Deploy with Docker instead

On the VPS, with Docker installed:

```bash
git clone https://github.com/digiservbiz/Landingdemo.git && cd Landingdemo
docker compose up -d --build
```

The container listens on port 8080; put a reverse proxy (Nginx, Caddy) with HTTPS in front of it.

## Automatic deploys from GitHub

`.github/workflows/deploy.yml` copies `site/` to the VPS on every push to `main`.
Run `setup-vps.sh` first, then add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret        | Value                                   |
|---------------|-----------------------------------------|
| `VPS_HOST`    | Server IP or hostname                   |
| `VPS_USER`    | SSH user with write access to `/var/www/landing` |
| `VPS_SSH_KEY` | Private key whose public key is in that user's `~/.ssh/authorized_keys` |
| `VPS_PORT`    | Optional, defaults to 22                |

## Customize

- Copy and pricing live in `site/index.html`.
- The contact form posts to `mailto:hello@example.com`; swap the `action` for a real
  form endpoint (Formspree, an n8n webhook, etc.).
