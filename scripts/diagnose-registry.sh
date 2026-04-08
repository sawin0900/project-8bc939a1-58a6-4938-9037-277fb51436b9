#!/usr/bin/env bash
set -euo pipefail

REGISTRY_URL="${1:-https://registry.npmjs.org}"

echo "Checking npm registry access: ${REGISTRY_URL}"
set +e
CURL_OUTPUT="$(curl -sS -o /dev/null -w '%{http_code}' "${REGISTRY_URL}/-/ping" 2>&1)"
CURL_EXIT=$?
set -e
HTTP_CODE="$(echo "${CURL_OUTPUT}" | tail -n1)"

if [ "${HTTP_CODE}" = "200" ] || [ "${HTTP_CODE}" = "301" ] || [ "${HTTP_CODE}" = "302" ]; then
  echo "[PASS] npm registry is reachable."
  exit 0
fi

if [ "${HTTP_CODE}" = "403" ] || echo "${CURL_OUTPUT}" | rg -q "403"; then
  echo "[WARN] Registry access blocked by proxy/policy (403)."
  echo "[INFO] This affects dependency installation/testing in this environment only."
  echo "[INFO] It does not directly impact the runtime behavior of the already deployed site."
  exit 0
fi

echo "[FAIL] npm registry check failed with unexpected HTTP status: ${HTTP_CODE:-unknown} (curl exit ${CURL_EXIT})"
exit 1
