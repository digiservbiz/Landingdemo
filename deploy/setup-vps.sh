#!/usr/bin/env bash
# One-time setup on a fresh Ubuntu/Debian VPS. Run as root:
#   sudo DOMAIN=example.com EMAIL=you@example.com bash setup-vps.sh
# Installs Nginx, opens the firewall, serves /var/www/landing and,
# when DOMAIN and EMAIL are set, gets a Let's Encrypt certificate.
set -euo pipefail

DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"
WEB_ROOT=/var/www/landing

apt-get update
apt-get install -y nginx ufw rsync certbot python3-certbot-nginx

ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

mkdir -p "$WEB_ROOT"
[ -f "$WEB_ROOT/index.html" ] || echo '<h1>Deploy pending</h1>' > "$WEB_ROOT/index.html"

cat > /etc/nginx/sites-available/landing <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN:-_};
    root $WEB_ROOT;
    index index.html;

    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/landing /etc/nginx/sites-enabled/landing
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

if [ -n "$DOMAIN" ] && [ -n "$EMAIL" ]; then
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect
fi

echo "VPS ready. Web root: $WEB_ROOT"
