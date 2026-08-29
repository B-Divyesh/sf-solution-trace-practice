# Handoff: Show Your Debugging — PASS, independently verified

## Independent verification 3

**PASS** for candidate `d47968f3f53d6d18cd3aaeca08196ddf62140d5d` at
<https://solution-trace-practice.sociobot.in> (2026-08-29 UTC).

Fresh verification after `npm ci` ran all eight exact claim selectors in
`.factory/claims.json`, `npm run typecheck`, `npm test` (2 unit + 21
Playwright tests), `npm run build`, ZIP integrity, and production-only QA.
All passed. The live HTML, service worker, assets, images, metadata, JS, and
CSS match the candidate byte-for-byte; the public ZIP differs only in
container timestamps and its unpacked contents match exactly.

The independently tested production demo completed the hypothesis → test →
fix → clue receipt flow, required-field failure and reset recovery, Markdown
export, separate `demo:` storage, service-worker offline reload, privacy
request log, desktop/mobile presentation, keyboard navigation, focus states,
reduced motion, and axe serious/critical scans. At 390px no route had
overflow, target below 44px, or target overlap. No console/page errors,
third-party requests, or release defects were found.

See [.factory/verification-3.md](verification-3.md) for exact commands,
hashes, headers, scope, and the non-applicable backend/sign-in checks.

## Known gaps / next steps

- The ZIP remains an unsigned developer-loadable Chrome-family package; store
  signing and publication are factory distribution work.
- Firefox packaging and educator batch export are outside this v1 scope.
- Learners paste test output manually; editor and terminal integrations remain
  intentionally outside the local-first v1 scope.

## Release decision

**PASS.** Every release-blocking finding in independent report commit
`becd0f9bdf42aa72fa24165f1388cfe0639682e2` for candidate
`abda23e410fbe6b92a060592e6814ca8597f94ac` is repaired, tested, pushed, and
deployed. The repair code commits are `393a85c` and `2b9f553`.

Production is live at <https://solution-trace-practice.sociobot.in>. The
original artifact class remains a WXT + TypeScript Chrome MV3 extension with a
static site deployed from `dist/site/`.

## What changed

- Header, inline-action, legal, footer, skip, and standalone 404 links now have
  real rendered hit areas of at least 44 by 44 CSS pixels. No overlay or
  pseudo-element expands the clickable area.
- The mobile regression enumerates every rendered link, button, input,
  textarea, select, and button role on `/`, `/demo`, `/privacy`, `/terms`, and
  `/404.html`. It fails on any dimension below 44px or any target overlap.
- The accessibility route matrix now includes both the standalone `404.html`
  and the SPA unknown-route screen. This caught and fixed the faint decorative
  404 stamp's contrast while preserving the inked-evidence visual system.
- The brief, demo behavior, claims, extension permissions, local storage,
  offline strategy, package path, and previously passing behavior are
  unchanged.

## Clean local verification

Run from a clean checkout:

```sh
npm ci
npm run typecheck
npm test
npm audit --omit=dev --audit-level=high
npm run build
```

Final results on 2026-08-29 UTC:

- `npm ci` passed with the pinned Playwright 1.58.2 toolchain.
- There is no lint script; `npm run typecheck` passed with no diagnostics.
- `npm test` passed 2 Vitest tests and 21 Chromium Playwright tests.
- The browser suite loads the unpacked MV3 extension and completes a real
  receipt. It also covers desktop, 390 by 844 mobile, keyboard route focus,
  all public routes and both 404 paths, serious/critical axe findings, demo
  isolation, privacy requests, Markdown export, and offline reload.
- Each of the eight commands in `.factory/claims.json` passed exactly as
  written: `hypothesis-first`, `local-only`, `offline-reload`,
  `markdown-export`, `free-download`, `storage-only-permission`,
  `no-code-generation`, and `no-tracking`.
- `npm audit --omit=dev --audit-level=high` reported zero production
  vulnerabilities.
- `npm run build` produced `dist/site`, `dist/extension`, and
  `dist/site/downloads/show-your-debugging-chrome.zip`. `unzip -t` reported no
  errors; the manifest still requests only `storage` and no host permissions.
- `/opt/fleet/lib/verify-url.sh` passed for the local production landing and
  demo with correct titles, `lang=en`, one H1, one main landmark, alt text, and
  no console errors.
- Local mobile Lighthouse scored Performance 100, Accessibility 100, Best
  Practices 100, and SEO 100. LCP was 1.8s, CLS 0.002, and total blocking time
  0ms.
- Initial JS is 17,442 bytes raw / 6.03KB gzip; CSS is 12,280 bytes raw /
  3.56KB gzip; the 640px hero WebP is 27,036 bytes.

## Exact mobile regression evidence

Fresh 390 by 844 Chromium checks found no undersized or overlapping rendered
targets:

| Route | Smallest width | Smallest height | Overlaps |
| --- | ---: | ---: | ---: |
| `/` | 44px | 44px | 0 |
| `/demo` | 44px | 44px | 0 |
| `/privacy` | 44px | 44px | 0 |
| `/terms` | 44px | 44px | 0 |
| `/404.html` | 46.28px | 44px | 0 |

The designed 3px focus outline remains visible. First Tab focuses the skip
link, and keyboard activation of Demo moves focus to the new H1. Reduced-motion
behavior remains enabled by the existing media query.

## Production deployment and identity

The final `dist/site/` was deployed through SWA CLI 2.0.10 to Azure Static Web
App `sf-solution-trace-practice` in resource group `sociobot`. Azure reports
the custom domain `solution-trace-practice.sociobot.in` as `Ready`, and DNS
resolves through the expected `ambitious-field-019fe4d10.7.azurestaticapps.net`
host.

- Final live assets are `index-C3xqwyvt.js` and `index-BNlQuYhg.css`.
- Live and local JS SHA-256:
  `94f99e560e93eed0e272b882d094dfeae53abb7ce26d0ec8d4e5c0d747d68b3d`.
- Live and local CSS SHA-256:
  `ef7dde6bbfd6a7832d51c483a864b52edea46dd01662bd1c68cf69e7a934e1a5`.
- Live and local ZIP SHA-256:
  `bcb10e6634226563ffd3d1726bc6ca255d48bce1b20511a01a038b37ce995adf`.
- The live ZIP returns 200, `application/zip`, 41,466 bytes, a `PK` signature,
  and passes `unzip -t`.
- Hashed assets return `Cache-Control: public, max-age=31536000, immutable`;
  `sw.js` returns `Cache-Control: no-cache`.
- Live responses include the matching CSP with `frame-ancestors 'none'`, HSTS,
  `X-Content-Type-Options`, `Referrer-Policy`, and restrictive
  `Permissions-Policy` headers.

Final live Chromium verification found no console errors and no
serious/critical axe findings on `/`, `/demo`, `/privacy`, `/terms`, or
`/404.html`. All runtime requests stayed on the product origin. A fresh service
worker controlled `/demo`, cached current JS and CSS in
`show-your-debugging-v2`, and reloaded the complete demo plus offline status
with networking disabled.

This product has no backend, account, payment, rate allowance, model request,
or sign-in flow. API 429, Entra tenant, and live model identity checks are not
applicable.

## Known gaps

- The ZIP is an unsigned Chrome-family package. Store signing and publication
  remain factory distribution work.
- Firefox packaging and educator batch export are not included.
- Learners paste test output manually; editor and terminal integrations remain
  outside the local-first v1 scope.
