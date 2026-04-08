#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ -x "./node_modules/.bin/vitest" ]; then
  exec ./node_modules/.bin/vitest run
fi

if command -v vitest >/dev/null 2>&1; then
  exec vitest run
fi

echo "[WARN] vitest is unavailable (dependencies not installed)."
echo "[INFO] Running fallback dependency-free security checks instead."
exec ./scripts/security-smoke-check.sh
