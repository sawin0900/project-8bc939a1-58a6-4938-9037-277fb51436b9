# Security audit report (2026-04-08)

## Scope checked
- Frontend contact form (`src/components/ContactForm.tsx`)
- Edge function for notifications (`supabase/functions/send-telegram-notification/index.ts`)
- Edge function for analytics tracking (`supabase/functions/track-visit/index.ts`)

## Key risks found before fix
1. **Spam/bot risk on contact form**: no honeypot field and no submit timing check.
2. **Notification endpoint CORS too broad**: accepted any origin (`*`).
3. **Photo URL validation too permissive**: previously allowed any `https://` URL (SSRF/abuse vector).
4. **Error disclosure risk**: tracking endpoint returned internal exception details to client.

## Mitigations applied
1. Added hidden honeypot field and anti-fast-submit check in contact form.
2. Added CORS allowlist for production + localhost dev.
3. Restricted `photoUrl` to `SUPABASE_URL` only.
4. Added UUID format validation for `submissionId` before database query.
5. Replaced client-visible raw server error with generic internal error message.

## Remaining recommendations
- Add CAPTCHA/Turnstile for stronger bot protection.
- Move submission write flow to a server-side edge function (avoid direct public insert).
- Add WAF/rate limiting at CDN edge by IP + UA reputation.
- Add centralized security logging and alerting for unusual submission spikes.
