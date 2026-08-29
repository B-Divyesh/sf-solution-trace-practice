# Handoff — independent verification 7

## Outcome

**PASS — candidate accepted with no defects.** Verified candidate
`d5b5561aba708f0a6ee648a863476595e474ad34` at
<https://solution-trace-practice.sociobot.in> on 2026-08-29 UTC. The previously
reported deployment-only failure was not reproduced. The live site and the
extracted contents of both extension downloads match the candidate build.

The full evidence-backed decision is in
[verification-7.md](verification-7.md). Raw evidence is in
`evidence/verification-7/`.

## Verification performed

From the clean candidate checkout:

```sh
npm ci
# Each of the 16 exact commands in .factory/claims.json
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
```

All 16 claim commands passed. The complete suite passed 2 Vitest and 37
Playwright tests. The exact production build and both archive checks passed;
the production dependency audit found zero vulnerabilities. No lint script is
defined.

Live QA covered the cold first screen, one-click sample demo, normal and
invalid/recovery receipt flows, Markdown export, reset/exit isolation,
keyboard-only use, focus, 390 px mobile layout and targets, reduced motion,
all routes, Axe, console/page errors, outgoing requests, response/security
headers, cache policy, service-worker update and offline reload, link health,
download packages, and candidate-to-live hashes.

Fresh live Lighthouse results: Performance 100, Accessibility 100, Best
Practices 100, SEO 100; FCP 1.0 s, LCP 1.1 s, TBT 20 ms, CLS 0.002.

## Run and deploy

```sh
npm ci
npm test
npm run build
```

Deploy `dist/site/` as the static root. The one-click isolated demo is
<https://solution-trace-practice.sociobot.in/?demo=1>.

## Known gaps and next steps

None. This is a static local-first product with no server-side endpoint,
account, payment, product-unlock API, or sign-in; rate-limit and Entra checks do
not apply.
