# Polish round 6 evidence

**Reviewed candidate:** `d5b5561aba708f0a6ee648a863476595e474ad34`

**Review base:** `4d48bc297a59cce281ada430577b0deef27695f6`

**Repair commit:** `b1aefb4643a361b2614674dfd2765101d92367a5`

**Deployment:** `50b3b1d4-cd18-4ca9-9e70-591bde3ed121`
**Live URL:** <https://solution-trace-practice.sociobot.in>

## Finding map

| Finding | Change made or retained | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the plain privacy, offline, and free facts above the illustration on a 390 px first screen. | Playwright `the three product facts are visible in the first 390px screen`; live bottoms 591.59, 616.19, and 640.78 px; [cold mobile capture](evidence/polish-6/live-routes/landing-mobile.png), <https://solution-trace-practice.sociobot.in/>. |
| F-1-2 | Kept the isolated one-click `?demo=1` sample, reset/exit behavior, both real extension workflows, and the 16-claim manifest with one exact tag per claim. | All 16 exact commands in `claims.json` passed independently from `/tmp/solution-trace-polish-6-clean-tBmyOq/repo`; `every listed claim has exactly one tagged observable test`; [live completed demo](evidence/polish-6/live-routes/demo-complete-mobile.png), <https://solution-trace-practice.sociobot.in/?demo=1>. |
| F-1-3 | Kept direct section names and the sole final-field term **clue**; refreshed the copy audit. | [copy audit](copy-audit.md); `the practice steps describe the next product action without promising an answer reveal`; [live landing](evidence/polish-6/live-root/screenshot-mobile.png). |
| F-1-4 | Kept route-specific title, description, canonical, Open Graph, and Twitter metadata in generated documents and History API navigation. | `built route documents expose correct metadata before JavaScript runs`; cold live checks for `/demo`, `/privacy`, and `/terms`; [route captures](evidence/polish-6/live-routes/), <https://solution-trace-practice.sociobot.in/privacy>. |
| F-1-5 | Kept the shared, product-styled standalone 404 skeleton and made unmatched URLs return that document with real 404 status. | `the standalone 404 uses the shared site skeleton`; [unknown-route 404 headers](evidence/polish-6/live-routes/unknown-headers.txt); [cold 404 capture](evidence/polish-6/live-routes/unknown.png), <https://solution-trace-practice.sociobot.in/missing-route-live-polish-6-proof>. |
| F-2-1 | Kept the truthful next step: “Write a testable hypothesis before recording test output.” | `@claim:hypothesis-first`; `the practice steps describe the next product action without promising an answer reveal`; <https://solution-trace-practice.sociobot.in/?demo=1>. |
| F-2-2 | Kept the README opening in VS Code/local-storage terms, with Chrome implementation details out of the visitor-facing introduction. | `the README leads with plain privacy outcomes`; [copy audit](copy-audit.md); <https://solution-trace-practice.sociobot.in/privacy>. |
| F-3-1 | Kept separately tested Chrome and VS Code privacy boundaries, including storage-only permissions and no receipt network path. | `@claim:extension-privacy-boundary`, `@claim:vscode-privacy-boundary`, and `@claim:storage-only-permission`; live demo request log was same-origin only; <https://solution-trace-practice.sociobot.in/privacy>. |
| F-4-1 | Kept the specified VS Code Activity Bar extension, local state, Markdown export, confirmed deletion, VSIX package, and separately described Chrome version. | `@claim:receipt-workflow`, `@claim:receipt-delete`, `@claim:vscode-local-storage`, and `@claim:markdown-export`; live VSIX returned 200 and `PK`; <https://solution-trace-practice.sociobot.in/downloads/show-your-debugging-vscode.vsix>. |
| F-4-2 | Kept the concrete product-and-job title across page, Open Graph, and Twitter metadata. | `the first screen and static document name debugging practice and VS Code`; cold [landing verification](evidence/polish-6/live-root/verify.json), <https://solution-trace-practice.sociobot.in/>. |
| F-4-3 | Kept Demo, Privacy, and Get VS Code as direct 44 px mobile header actions. | `Privacy remains directly reachable in the 390px header`; live interaction geometry found no target under 44 px; [landing mobile capture](evidence/polish-6/live-routes/landing-mobile.png). |
| F-5-1 | Kept demo controls inside `<main>` and the demo Axe scan free of `region` findings. | `demo controls are in main and have no Axe region violation`; cold live `?demo=1` Axe scan had zero violations; [demo verification](evidence/polish-6/live-demo/verify.json). |
| F-5-2 | Kept the README test description split into three short sentences. | `the README test description uses one short verification result per sentence`; [copy audit](copy-audit.md). |
| F-6-1 | Removed the catch-all `navigationFallback`; generated `/demo`, `/privacy`, and `/terms` documents now serve supported paths directly, so the Static Web Apps 404 override is reached for arbitrary unknown paths. Added a production-shaped static route server and a JavaScript-disabled HTTP-status regression test. | `the deployed static route contract returns a styled HTTP 404 for an unknown address`; Static Web Apps CLI emulator: `/demo`→200 and unknown→404; live `GET /missing-route-live-polish-6-proof`→404; [headers](evidence/polish-6/live-routes/unknown-headers.txt), [404 screenshot](evidence/polish-6/live-routes/unknown.png). |
| VER-1-download | Kept both public package downloads in the static output. | `@claim:free-download`; live VSIX 200/`PK` (14,416 bytes), Chrome ZIP 200/`PK` (41,460 bytes). |
| VER-1-offline | Kept the service-worker shell cache independent of downloads and verified a controlled live demo reload offline. | `@claim:offline-reload`; live cold context reported an active worker, demo heading, and offline notice after reload. |
| VER-1-claim-commands | Kept forwarding of exact manifest commands. | Every listed `npm test -- --grep @claim:<id>` command passed independently from the clean clone. |
| VER-1-cache | Kept one-year immutable caching for hashed assets and narrow worker/download policies. | `release output keeps the extension package and immutable asset policy`; live CSS header: `Cache-Control: public, max-age=31536000, immutable`. |
| VER-2-touch-targets | Kept 44 px controls without phone overflow or overlap. | `every rendered 390px touch target is at least 44 by 44 CSS pixels`; live mobile check found 0 px overflow and no undersized rendered target. |

## Verification

From a fresh clone at `b1aefb4643a361b2614674dfd2765101d92367a5`:

```sh
npm ci
# every one of the 16 exact commands declared in .factory/claims.json
npm run typecheck
npm test
npm run build
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
npm audit --omit=dev --audit-level=high
```

All commands passed. The full suite ran 2 Vitest tests and 37 Playwright tests, including the real VS Code profile, packaged Chrome extension, mobile geometry, Axe, privacy request recording, and offline reload. The production audit found 0 vulnerabilities.

After deployment, `/opt/fleet/lib/verify-url.sh` passed cold on the landing and `?demo=1`; screenshots and machine reports are in `evidence/polish-6/live-root/` and `evidence/polish-6/live-demo/`. Cold live Axe scans on landing, demo, legal routes, `/404.html`, and an arbitrary missing URL found zero violations. The expected browser network diagnostic for the main document's 404 was excluded from the unknown-route application's console check; the page itself had no script or page error.

Live Lighthouse on `?demo=1`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 0.9 s, TBT 10 ms, CLS 0.002. See [the report](evidence/polish-6/lighthouse-live.json).

The catalog description is now verb-first and 88 characters: `Record each debugging hypothesis, test, fix, and clue before asking a coding assistant.`

No finding, minor item, TODO, or known acceptance gap remains.
