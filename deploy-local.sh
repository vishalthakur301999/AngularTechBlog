#!/bin/zsh
set -euo pipefail

project_dir="${0:A:h}"
cd "$project_dir"

docker compose up --detach --build --remove-orphans
docker compose ps

echo
echo "Etch is available at:"
echo "  https://etch.local"
echo "  http://localhost:8080"
