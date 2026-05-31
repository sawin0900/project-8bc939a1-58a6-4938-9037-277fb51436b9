#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <domain>"
  echo "Example: $0 centr-prityazheniya.ru"
  exit 1
fi

domain="$1"
base_url="https://${domain}"

check_code() {
  local url="$1"
  local expected="$2"
  local code

  code="$(curl -sS -L -o /dev/null -w '%{http_code}' "$url")"
  if [[ "$code" == "$expected" ]]; then
    echo "[OK] $url -> $code"
  else
    echo "[FAIL] $url -> $code (expected: $expected)"
    return 1
  fi
}

echo "== Basic connectivity =="
curl -sS -I "${base_url}" | head -n 1

echo "== Status checks =="
missing_suffix="$(date +%s)"
check_code "${base_url}/" "200"
check_code "${base_url}/services" "200"
check_code "${base_url}/services/dismantling-cutting" "200"
check_code "${base_url}/articles/chto-delat-esli-zatonulo-sudno" "200"
check_code "${base_url}/this-page-must-not-exist-${missing_suffix}" "404"
check_code "${base_url}/articles/this-article-must-not-exist-${missing_suffix}" "404"
check_code "${base_url}/news/this-news-must-not-exist-${missing_suffix}" "404"

echo "== Redirect checks =="
www_code="$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' "https://www.${domain}/")"
echo "[INFO] https://www.${domain}/ -> ${www_code}"
slash_code="$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' "${base_url}/services/")"
echo "[INFO] ${base_url}/services/ -> ${slash_code}"

echo "== 5xx quick scan =="
for path in / /news /services /contacts; do
  code="$(curl -sS -L -o /dev/null -w '%{http_code}' "${base_url}${path}")"
  if [[ "$code" =~ ^5 ]]; then
    echo "[FAIL] ${base_url}${path} -> $code"
    exit 1
  fi
  echo "[OK] ${base_url}${path} -> $code"
done

echo "== robots.txt =="
curl -sS "${base_url}/robots.txt" | sed -n '1,20p'

echo "== SSL validity =="
cert_end_date="$(echo | openssl s_client -servername "$domain" -connect "${domain}:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2-)"
echo "Certificate valid until: ${cert_end_date}"

echo "All critical checks completed."
