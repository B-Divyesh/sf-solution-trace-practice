# Handoff: review 1 — Show Your Debugging

## Outcome

Completed the requested adversarial first-read review without modifying product code. The result is **FAIL** with five findings in [review-1.md](review-1.md): mobile first-screen facts, unregistered claims, slogan/inconsistent copy, stale route social metadata, and an incomplete standalone 404 skeleton/metadata set.

## What was verified

- Fresh live Chromium visits at 390 × 844 and 1440 × 950.
- One-click live demo flow, sample storage namespace, Reset behavior, request log, and live offline reload.
- Every exact command recorded in `.factory/claims.json`, from a fresh `npm ci` clone; all eight passed in isolation.
- `npm run typecheck`, `npm run build`, and full `npm test` from that clone; passed.
- Links, route titles/descriptions/canonicals, headers, browser Back/focus behavior, 390px geometry, prior verification findings, and the visible copy in landing/README.

## Known gaps / required follow-up

Resolve F-1-1 through F-1-5 in `.factory/review-1.md`, then perform a complete new review rather than a diff-only check. No product source was changed by this review.

## How to verify

```sh
npm ci
npm test -- --grep @claim:hypothesis-first
npm test -- --grep @claim:local-only
npm test -- --grep @claim:offline-reload
npm test -- --grep @claim:markdown-export
npm test -- --grep @claim:free-download
npm test -- --grep @claim:storage-only-permission
npm test -- --grep @claim:no-code-generation
npm test -- --grep @claim:no-tracking
npm run typecheck
npm run build
npm test
```
