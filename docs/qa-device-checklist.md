# QA checklist: devices, pages, and priorities

## Goal
Run a fast but reliable manual QA pass for the marketing website with focus on conversion-critical flows (navigation, contact CTA, and lead form), responsive behavior, and content consistency.

## Device matrix
Use these viewport presets:

- Mobile small: `320x568`
- Mobile standard: `390x844`
- Mobile large: `430x932`
- Android standard: `360x800`
- Tablet portrait: `768x1024`
- Tablet landscape: `1024x768`
- Laptop: `1366x768`
- Desktop: `1920x1080`

## Priority model
- **P0**: blocks lead generation, navigation, or core page rendering
- **P1**: high UX friction, visual breakage, incorrect content
- **P2**: minor visual/content polish issues

## 1-day execution plan (8 hours)

### 09:00-09:30 — Setup
- Open bug board/spreadsheet
- Add all device presets
- Prepare test account if needed
- Start with smoke pass on `/` and `/contacts`

### 09:30-10:30 — P0 pass: header, navigation, CTA
Validate on `390x844`, `768x1024`, `1366x768`:
- header does not overlap content
- desktop nav appears on `lg+`, mobile nav below `lg`
- mobile menu opens/closes without clipping
- call/telegram/lead buttons are clickable

### 10:30-12:00 — P0 pass: contact form
Validate on `390x844` and `1366x768`:
- required field validation for name/phone
- email validation behavior
- anti-spam behavior (honeypot + too-fast submit)
- image upload: type and size validation
- geolocation flows: allow/deny/timeout
- success and error toasts

### 12:00-12:30 — Triage
- mark bugs as P0/P1/P2
- assign owner and ETA

### 12:30-13:30 — Responsive pass: key pages
Validate:
- `/` hero and card sections
- `/projects` card grid behavior
- `/contacts` two-column layout and map placeholder

### 13:30-14:15 — Content consistency pass
- phone, email, telegram consistency across header/footer/contacts
- CTA wording consistency

### 14:15-15:00 — News/cards/media pass
- list grid and fallback image state
- text clamping and date display
- image loading and layout stability

### 15:00-16:00 — Build/test + report
- run test and build checks
- collect failures and attach logs
- finalize QA report

## Global smoke checklist (all viewports)
- [ ] no horizontal scroll on page load
- [ ] first viewport content visible and readable
- [ ] fixed header does not hide section headings
- [ ] all primary CTA buttons clickable
- [ ] footer links and contacts clickable
- [ ] route transitions work and scroll resets to top

## Page test cases

## Home (`/`)
- [ ] hero text and 3 CTA buttons are readable on 320px
- [ ] section cards stack correctly on mobile
- [ ] no text overflow in long headings

## Contacts (`/contacts`)
- [ ] form fields accessible and properly spaced
- [ ] upload and geolocation controls remain usable on mobile
- [ ] contact cards align without clipping
- [ ] map placeholder block does not break layout

## Projects (`/projects`)
- [ ] card grid: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] no card height collapse or text overlap

## News (`/news` + latest news block)
- [ ] card image/fallback renders consistently
- [ ] titles and descriptions clamp correctly
- [ ] dates are formatted and readable

## Defect report template
Use this template for each bug:

- **ID**:
- **Priority**: P0 / P1 / P2
- **Page**:
- **Viewport / device**:
- **Steps to reproduce**:
- **Expected result**:
- **Actual result**:
- **Artifacts**: screenshot/video/log
- **Owner**:
- **ETA**:

## Quick wins after first pass
- Unify phone number across all prominent CTA locations.
- Replace contacts map placeholder with real embedded map.
- Reduce mobile menu cognitive load by grouping links.
- Introduce sticky mobile emergency CTA.
