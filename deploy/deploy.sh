#!/bin/bash
set -euo pipefail

echo "Deploying snake"

# nginx

sudo cp /home/brig/dev/snake/deploy/nginx.conf /etc/nginx/conf.d/snake.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for snake"
