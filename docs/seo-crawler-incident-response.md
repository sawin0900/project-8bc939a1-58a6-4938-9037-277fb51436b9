# SEO incident response: "Server connection failed"

Date of template update: **2026-04-23**.

## Goal
Restore stable availability for Yandex and Google crawlers and prevent index loss.

## Fast checklist

1. **Connectivity**
   - DNS resolves to production IP.
   - HTTPS opens and returns a valid certificate.
   - `curl -I https://<domain>/` returns `200`.

2. **HTTP status integrity**
   - Existing pages return `200`.
   - Non-existing page returns `404`.
   - No `500/502/503/504` for key entry pages.

3. **Server load**
   - Check CPU / RAM / process limits.
   - Verify web server and app services are running.

4. **Logs**
   - Inspect Nginx/Apache `error.log` and `access.log`.
   - Identify spikes of 5xx, upstream timeouts, restarts, OOM.

5. **Firewall / WAF / anti-bot**
   - Ensure Googlebot/YandexBot are not blocked.
   - Check fail2ban, mod_security, Cloudflare firewall rules.

6. **robots.txt**
   - Ensure there is no global crawl block:
     ```txt
     User-agent: *
     Disallow:
     ```

## Commands (Linux)

```bash
# HTTP checks
curl -I https://<domain>/
curl -I https://<domain>/non-existent-page

# DNS checks
nslookup <domain>
dig +short <domain>

# SSL checks
echo | openssl s_client -servername <domain> -connect <domain>:443 2>/dev/null | openssl x509 -noout -dates

# Health check endpoint (if configured)
curl -I https://<domain>/healthz

# Nginx logs
sudo tail -n 200 /var/log/nginx/error.log
sudo tail -n 200 /var/log/nginx/access.log

# Resources
free -h
uptime
ps aux --sort=-%cpu | head
ps aux --sort=-%mem | head
```

## Automation

Use the included script:

```bash
./scripts/check-site-availability.sh <domain>
```

The script verifies:
- homepage `200`;
- random missing page `404`;
- no `5xx` on key URLs;
- robots.txt availability;
- SSL certificate expiry date.

## Infrastructure recommendations

- Keep HTTPS mandatory and redirect all HTTP traffic to HTTPS.
- Use a canonical host redirect (e.g., `www` -> apex domain).
- Keep `/healthz` endpoint for uptime checks.
- Monitor 5xx ratio and SSL expiration via external alerting.
