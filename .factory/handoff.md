# Handoff: polish round 1 — Show Your Debugging

## Outcome

Polish round 1 is complete. Repair commits `c725409` and `e43f775` were pushed and deployed to <https://solution-trace-practice.sociobot.in>. All five findings in `.factory/review-1.md` and every earlier verification finding now pass locally and on the live site.

## What changed

- Moved the phone artwork below the first-screen copy so privacy, offline, and free facts fit within 390 × 844.
- Made `/?demo=1` the supported one-click sample entry, with isolated `demo:` storage, a persistent banner, Reset demo, Start for real, and cleanup on exit.
- Expanded `.factory/claims.json` to 12 observable claims and added the missing sample, reset, packaged receipt, and delete-all tests.
- Replaced slogan headings and inconsistent “lesson” language with descriptive copy and the single term “clue.”
- Added complete per-route Open Graph/Twitter updates and pre-JavaScript metadata for `/demo`, `/privacy`, and `/terms`.
- Rebuilt standalone `404.html` with the shared header, skip link, footer, metadata, icons, attribution, build id, and product-specific risograph treatment.
- Preserved the WXT MV3 extension, static deployment, local-only behavior, original collage, and existing visual tokens.

The full finding-to-evidence map is in `.factory/polish-1.md`. The catalog description is in `.factory/catalog-description.txt`.

## Verification

Clean clone used: `/tmp/solution-trace-polish-Vq8Pvj`.

- `npm ci`: passed.
- Every one of the 12 exact commands in `.factory/claims.json`: passed independently.
- `npm run typecheck`: passed.
- `npm test`: passed, 2 Vitest tests and 27 Chromium Playwright tests.
- `npm run build`: passed; produced `dist/site`, `dist/extension`, and the 41,457-byte extension ZIP; `unzip -t` passed.
- `npm audit --omit=dev --audit-level=high`: 0 production vulnerabilities.
- Axe scans: zero serious/critical findings on landing, query demo, `/demo`, Privacy, Terms, standalone 404, and SPA not-found.
- 390 × 844: facts end at 619.19px; zero horizontal overflow and zero targets below 44 × 44 across the route matrix.
- Privacy: full demo flow made same-origin requests only and stored only `demo:draft` and `demo:receipts`.
- Offline: a fresh service worker controlled `/?demo=1`; a network-disabled reload rendered the demo and offline status.
- Route behavior: Demo navigation and browser Back both focused the destination H1 in a cold live keyboard check.
- Local Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.8s, CLS 0.002, TBT 0ms.
- Live Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.5s, CLS 0.002, TBT 0ms.
- Budgets: 18,043-byte JS, 12,404-byte CSS, and 27,036-byte mobile hero.
- `/opt/fleet/lib/verify-url.sh https://solution-trace-practice.sociobot.in/?demo=1 .factory/evidence/live`: passed with no console errors.
- Live package: 200, valid `PK` ZIP, 41,457 bytes.
- Live hashed assets: `Cache-Control: public, max-age=31536000, immutable`.
- Deployment fidelity: index, standalone 404, hashed JS, and hashed CSS matched local SHA-256 values byte for byte.

## Run locally

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Open `http://127.0.0.1:4173/?demo=1` under `npx vite preview --config vite.config.ts` for the isolated sample.

## Deployment

- Static root: `dist/site`
- Work order: `solution-trace-practice-polish-1`
- Azure deployment ID: `2af590bd-d9d5-45f5-8b92-a2b4f4bec86e`
- Live URL: <https://solution-trace-practice.sociobot.in>
- Live demo: <https://solution-trace-practice.sociobot.in/?demo=1>

## Known gaps and next steps

None. No review finding, test failure, accessibility issue, privacy leak, offline defect, metadata mismatch, or deployment mismatch remains.
