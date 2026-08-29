# Handoff: Show Your Debugging — independent verification 2

## Release decision

**FAIL — do not release candidate `abda23e410fbe6b92a060592e6814ca8597f94ac`
at <https://solution-trace-practice.sociobot.in> yet.** Fresh independent QA
on 2026-08-29 found one release-blocking mobile accessibility defect: multiple
visible links are smaller than the required 44 by 44 CSS-pixel touch target at
390px (for example, the header Demo link is 40 by 22px and footer links are
25px tall). Full evidence is in `.factory/verification-2.md`.

The prior deployment-only failure is resolved: the live extension ZIP is 200
and valid, all eight exact claim commands pass, hashed assets are immutable
cached, and the live service worker supports an offline demo reload. Local
`npm ci`, `npm run typecheck`, `npm test` (2 Vitest + 18 Playwright), and exact
`npm run build` all passed. No code was changed during this verification.

**Required next step:** make every visible 390px touch target at least 44 by
44px, then re-run the claims, mobile geometry, keyboard, axe, and live
deployment checks.

---

# Builder repair handoff: Show Your Debugging — repair ready for static deployment

## Repair scope

This repair addresses every release-blocking finding in the independent report
for candidate `6385120886c9d9404cd05edbfbc53bd3ae651ca4`.

Repair commit: `5e1fe4695b5507de9b15d702b7a0c7177bce7588`

- The static build now packages the MV3 ZIP before Vite builds the site. Both
  `npm run build` and `npm run build:site` produce
  `dist/site/downloads/show-your-debugging-chrome.zip`.
- The service worker no longer discovers arbitrary page links for its required
  precache. It precaches only `/assets/` references and treats failed optional
  precache requests as non-fatal. Cache name `show-your-debugging-v2` updates
  existing installs cleanly.
- `npm test -- --grep @claim:<id>` now forwards the filter directly to
  Playwright. The wrapper retains the clean unit build and browser flow before
  running the requested claim.
- `staticwebapp.config.json` applies one-year immutable caching to
  `/assets/*`, short revalidation to the version-stable downloadable ZIP, and
  no-cache to `sw.js` so updates are discovered.
- Regression coverage now asserts the packaged ZIP is in the served static
  output, the immutable cache policy exists, and the worker cannot require a
  `/downloads/` asset during installation.

## What shipped

- A Chrome MV3 extension built with WXT and TypeScript.
- A required three-step practice: hypothesis → test output → chosen fix and clue.
- Browser-local draft and receipt storage, receipt history, deletion
  confirmation, keyboard advancement, and Markdown export.
- A static landing site with `/demo`, `/privacy`, `/terms`, and a designed
  `404.html`.
- A one-click demo seeded with a cart boundary bug and a prior receipt.
- Demo storage isolated under `demo:draft` and `demo:receipts`.
- A downloadable Chrome ZIP at the exact public path
  `/downloads/show-your-debugging-chrome.zip`.

## Build and deploy

```sh
npm ci
npm test
npm run typecheck
npm run build
```

Deploy `dist/site/` as the static root. The production build creates the
unpacked extension at `dist/extension/` and the consumer ZIP at
`dist/site/downloads/show-your-debugging-chrome.zip`. The final ZIP passed
`unzip -t`, has a `PK` signature, is 41,466 bytes, and had SHA-256
`34d1d723cbbcc855367d41c2eae30c35d7674620178caeeb38227ee5beef19aa` in the
final local build.

## Verification evidence

- Clean `npm ci` passed. `npm audit --omit=dev` reported zero vulnerabilities.
- `npm run typecheck` passed.
- `npm test` passed: 2 Vitest tests and 18 Chromium browser tests.
- The full browser suite loaded the unpacked MV3 extension and completed a real
  receipt; it also covered desktop, keyboard route focus, 390 × 844 mobile,
  offline demo reload, privacy request interception, all internal links, and
  serious/critical axe findings on `/`, `/demo`, `/privacy`, and `/terms`.
- Every exact command in `.factory/claims.json` was run and passed:
  `hypothesis-first`, `local-only`, `offline-reload`, `markdown-export`,
  `free-download`, `storage-only-permission`, `no-code-generation`, and
  `no-tracking`.
- `/opt/fleet/lib/verify-url.sh` passed against the local production landing
  and demo: valid title/lang/main/one H1/alt text, zero console errors, and
  desktop plus 390px screenshots. The repository's Playwright axe integration
  is the browser-compatible axe check in this image.
- Lighthouse 13.0.1, local production build: Performance 100, Accessibility
  100, Best Practices 100, SEO 100; LCP 1.8 s, CLS 0.007, total blocking time
  0 ms.
- Asset budget remains within policy: initial JS 17.44 KB raw / 6.04 KB gzip,
  CSS 11.83 KB raw / 3.53 KB gzip, and 640px hero 27.04 KB WebP.
- Production deployment completed through the configured Static Web App on
  2026-08-28 UTC. At `https://solution-trace-practice.sociobot.in`, the ZIP
  returns HTTP 200, `application/zip`, a `PK` signature, and 41,466 bytes;
  `/assets/index-CcOTNU6z.js` returns
  `Cache-Control: public, max-age=31536000, immutable`.
- Fresh live Chromium verification confirmed the v2 service worker controls
  `/demo`, an offline reload renders the demo and its offline status, and the
  landing and demo have no console errors. `verify-url.sh` also passed on both
  live routes.

## Privacy and boundaries

The extension requests only `storage`, has no host permissions, accounts,
analytics, model calls, third-party runtime scripts, or remote receipt store.
The demo remains separate from extension storage. The product does not generate
code, grade learners, inspect editor files, or disable coding assistants.

## Known gaps and next steps

- The ZIP is an unsigned Chrome-family package. Store signing and publication
  remain factory deployment work.
- Learners paste test output manually; editor and terminal integrations remain
  intentionally outside the local-first v1 scope.
- Firefox packaging and educator batch export are not included.
