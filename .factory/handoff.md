# Handoff: adversarial review 2 — Show Your Debugging

## Outcome

This review is complete and recorded in `.factory/review-2.md`. No product code was modified. The live product and clean local clone passed the functional, demo-isolation, claim, accessibility, routing, and build checks. The review verdict is **FAIL** because two plain-language copy findings remain: an unsupported answer-reveal instruction on the landing page and opaque Chrome implementation jargon in the README.

## Review evidence

- Fresh live mobile (390 × 844) and desktop (1440 × 950) visits made the purpose, audience, and first action clear. The three factual lines fit within the mobile first screen.
- The one-click demo used only `demo:draft` and `demo:receipts`; Reset restored the shipped cart-loop sample; leaving or choosing Start for real cleared both keys.
- Live request logs during the complete demo contained only the product origin. Live route and Axe checks had no console errors or serious/critical violations.
- All 12 exact claim commands passed independently in `/tmp/solution-trace-review-2-7W6uI8`; `npm run typecheck`, `npm test` (2 Vitest + 27 Playwright), and `npm run build` passed there too.
- All review-1 and earlier verification findings were confirmed fixed on the current live site and in code.

The full finding-to-evidence map is in `.factory/polish-1.md`. The catalog description is in `.factory/catalog-description.txt`.

## Required follow-up

1. Replace the landing sentence **“Write a testable hypothesis before you reveal another answer.”** with **“Write a testable hypothesis before recording test output.”**
2. Replace the README's opening Chrome implementation jargon with the plain-language replacements specified in F-2-2.
3. Rerun the copy audit, every claim command, and `npm test`; then perform another cold live first-read review.

## Run locally

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Open `http://127.0.0.1:4173/?demo=1` under `npx vite preview --config vite.config.ts` for the isolated sample.

## Known gaps and next steps

See F-2-1 and F-2-2 in `.factory/review-2.md`. No functional, privacy, routing, accessibility, offline, or claim-test defect was found in this round.
