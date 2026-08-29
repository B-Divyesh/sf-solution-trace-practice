# Handoff — adversarial review 5

## Outcome

**FAIL — two findings remain.** No product code was modified.
The committed review is [review-5.md](review-5.md).

## What was verified

- Fresh live mobile (390 × 844) and desktop cold reads; first-screen copy,
  demo/reset/exit isolation, request logging, routes, metadata, focus/back,
  links, 404, and visual identity.
- A fresh live Axe scan found the moderate `region` violation on `/?demo=1`:
  the demo banner is outside any landmark.
- From a clean clone: `npm ci`, all 16 exact `.factory/claims.json` commands,
  `npm run typecheck`, `npm test` (2 unit + 35 Playwright tests), and
  `npm run build` passed.

## How to verify

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Demo: <https://solution-trace-practice.sociobot.in/?demo=1>

## Remaining work

Move `#demo-banner` inside `<main>` or make it a labelled landmark, then add
an Axe assertion for zero `region` violations on the demo. Split the 24-word
README test sentence into short sentences. Rerun the review 5 checks after
deployment.
