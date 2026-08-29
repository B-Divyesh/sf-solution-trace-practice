# Handoff — polish round 6

## Outcome

**PASS.** The real missing-route defect is repaired. Unknown URLs now return HTTP 404 with the product's designed not-found document, while `/demo`, `/privacy`, and `/terms` remain directly reloadable. All earlier review findings remain verified.

- Repair commit: `b1aefb4643a361b2614674dfd2765101d92367a5`
- Deployment: `50b3b1d4-cd18-4ca9-9e70-591bde3ed121`
- Live site: <https://solution-trace-practice.sociobot.in>
- Demo: <https://solution-trace-practice.sociobot.in/?demo=1>

## What changed

- Removed the Static Web Apps catch-all navigation fallback. The generated route documents serve the supported deep links; the existing 404 override now returns the styled `404.html` at status 404.
- Added a production-shaped static route server to browser tests. Its JavaScript-disabled regression test asserts an unknown address returns 404, the not-found title, one H1/main, and a return-home link.
- Updated the deployment wording and the verb-first, 88-character catalog description.
- Retained every prior demo, claim, privacy, mobile, routing, metadata, legal-link, accessibility, extension, and visual-identity repair. The complete per-finding map is in [polish-6.md](polish-6.md).

## Exact verification evidence

Fresh clone: `/tmp/solution-trace-polish-6-clean-tBmyOq/repo` at repair commit `b1aefb4`.

```sh
npm ci
# all 16 exact .factory/claims.json commands, independently
npm run typecheck
npm test
npm run build
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
npm audit --omit=dev --audit-level=high
```

All 16 claim commands passed. The full suite passed 2 Vitest and 37 Playwright tests. It includes clean VS Code and Chrome extension workflows, package/privacy scans, mobile targets, all-route Axe checks, same-origin request recording, service-worker offline reload, and the new real-404 regression. Typecheck, build, both ZIP integrity checks, and the production audit (0 vulnerabilities) passed.

Cold post-deploy checks passed:

- `verify-url.sh` root and demo reports: [landing](evidence/polish-6/live-root/verify.json) and [demo](evidence/polish-6/live-demo/verify.json).
- `/missing-route-live-polish-6-proof` returned 404 and the static not-found title, H1, main, and return link before JavaScript: [headers](evidence/polish-6/live-routes/unknown-headers.txt), [capture](evidence/polish-6/live-routes/unknown.png).
- `/demo`, `/privacy`, `/terms`, and `/404.html` each returned their expected document and passed cold Axe checks. Route captures are in [live-routes](evidence/polish-6/live-routes/).
- A live demo completed, stored only `demo:draft` and `demo:receipts`, reset to the cart-loop seed, cleared both keys on exit, contacted only the product origin, and reloaded offline under service-worker control. See [the completed-demo mobile capture](evidence/polish-6/live-routes/demo-complete-mobile.png).
- Live Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP 0.9 s, LCP 0.9 s, TBT 10 ms, CLS 0.002. See [lighthouse-live.json](evidence/polish-6/lighthouse-live.json).

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh solution-trace-practice dist/site
```

## Known gaps

None.
