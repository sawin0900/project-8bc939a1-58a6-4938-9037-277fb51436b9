#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

pass() { echo "[PASS] $1"; }
fail() { echo "[FAIL] $1"; exit 1; }

# 1) Contact form anti-spam checks
rg -n "website" src/components/ContactForm.tsx >/dev/null \
  && pass "Honeypot field exists in contact form" \
  || fail "Honeypot field missing in contact form"

rg -n "secondsSinceFormOpen" src/components/ContactForm.tsx >/dev/null \
  && pass "Time-based spam check exists in contact form" \
  || fail "Time-based spam check missing in contact form"

# 2) Edge function CORS should not be wildcard
if rg -n 'Access-Control-Allow-Origin["'"'"']?\s*:\s*"\*"' supabase/functions/send-telegram-notification/index.ts >/dev/null; then
  fail "Wildcard CORS found in send-telegram-notification"
else
  pass "No wildcard CORS in send-telegram-notification"
fi

# 3) photoUrl validation should be tied to SUPABASE_URL, not generic https
if rg -n "photoUrl\.startsWith\('https://" supabase/functions/send-telegram-notification/index.ts >/dev/null; then
  fail "Permissive photoUrl https validation detected"
else
  pass "photoUrl validation is not generic https"
fi

# 4) Track-visit should not return raw error details
rg -n "Internal server error" supabase/functions/track-visit/index.ts >/dev/null \
  && pass "track-visit returns generic 500 error" \
  || fail "track-visit generic 500 error message missing"

if rg -n "String\(err\)" supabase/functions/track-visit/index.ts >/dev/null; then
  fail "Raw error string exposure detected in track-visit"
else
  pass "No raw error leakage in track-visit response"
fi

# 5) Basic key exposure check in frontend source
if rg -n "SUPABASE_SERVICE_ROLE_KEY|TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID" src >/dev/null; then
  fail "Potential secret usage found in frontend src/"
else
  pass "No obvious secret identifiers found in frontend src/"
fi

echo "Security smoke checks completed successfully."
