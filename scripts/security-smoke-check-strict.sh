#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

pass() { echo "[PASS] $1"; }
fail() { echo "[FAIL] $1"; exit 1; }

# Base checks first
./scripts/security-smoke-check.sh

# Strict 1: No wildcard CORS in any edge function
if rg -n "Access-Control-Allow-Origin[\"']?\\s*:\\s*\"\\*\"" supabase/functions >/dev/null; then
  fail "Wildcard CORS detected in supabase/functions"
else
  pass "No wildcard CORS in supabase/functions"
fi

# Strict 2: No raw error string leaks from edge responses
if rg -n "JSON\\.stringify\\(\\{\\s*error:\\s*String\\(" supabase/functions >/dev/null; then
  fail "Raw exception text exposure detected in edge functions"
else
  pass "No raw exception text in edge-function error responses"
fi

# Strict 3: Ban dangerous dynamic-code primitives in app/edge code
if rg -n "\\beval\\(|new Function\\(" src supabase/functions >/dev/null; then
  fail "Dangerous dynamic code primitive detected (eval/new Function)"
else
  pass "No eval/new Function in src and supabase/functions"
fi

# Strict 4: Audit file must exist
if [ -f docs/security-audit-2026-04-08.md ]; then
  pass "Security audit report file exists"
else
  fail "Security audit report file is missing"
fi

echo "Strict security smoke checks completed successfully."
