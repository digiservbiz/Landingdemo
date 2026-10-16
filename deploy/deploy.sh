#!/usr/bin/env bash
# Upload the site to the VPS from your machine:
#   VPS_HOST=203.0.113.10 VPS_USER=root ./deploy/deploy.sh
set -euo pipefail

: "${VPS_HOST:?Set VPS_HOST to the server IP or hostname}"
VPS_USER="${VPS_USER:-root}"
VPS_PORT="${VPS_PORT:-22}"
WEB_ROOT="${WEB_ROOT:-/var/www/landing}"

cd "$(dirname "$0")/.."
rsync -avz --delete -e "ssh -p $VPS_PORT" site/ "$VPS_USER@$VPS_HOST:$WEB_ROOT/"
echo "Deployed to http://$VPS_HOST"
