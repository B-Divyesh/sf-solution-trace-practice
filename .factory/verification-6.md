# Independent verification 6 — PASS

**Candidate:** `c2d8eafd6a471f9744acfcbdf113654cf23f65e8`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Verified:** 2026-08-29 UTC from a clean checkout

## Decision

**PASS — release accepted.** Fresh local and production evidence confirms that
the deployed browser-extension product is this candidate and delivers the
brief's job: beginning VS Code users record a hypothesis, useful test output,
chosen fix, and clue before asking an assistant for an answer. The prior
deployment-only failure is not reproduced.

## Mandatory claims gate — PASS

After `npm ci`, I invoked every exact command listed in
`.factory/claims.json` from the clean candidate checkout. Each builds the
production output and exercises its declared demo, extension, or package path.
The final filtered Playwright run reported `passed`; the full suite's claim
coverage check also verified that every listed claim has exactly one observable
tagged test.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `sample-opens` | `npm test -- --grep @claim:sample-opens` | Pass |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | Pass |
| `receipt-workflow` | `npm test -- --grep @claim:receipt-workflow` | Pass |
| `receipt-delete` | `npm test -- --grep @claim:receipt-delete` | Pass |
| `browser-receipt-workflow` | `npm test -- --grep @claim:browser-receipt-workflow` | Pass |
| `hypothesis-first` | `npm test -- --grep @claim:hypothesis-first` | Pass |
| `local-only` | `npm test -- --grep @claim:local-only` | Pass |
| `vscode-local-storage` | `npm test -- --grep @claim:vscode-local-storage` | Pass |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | Pass |
| `markdown-export` | `npm test -- --grep @claim:markdown-export` | Pass |
| `free-download` | `npm test -- --grep @claim:free-download` | Pass |
| `storage-only-permission` | `npm test -- --grep @claim:storage-only-permission` | Pass |
| `extension-privacy-boundary` | `npm test -- --grep @claim:extension-privacy-boundary` | Pass |
| `vscode-privacy-boundary` | `npm test -- --grep @claim:vscode-privacy-boundary` | Pass |
| `no-code-generation` | `npm test -- --grep @claim:no-code-generation` | Pass |
| `no-tracking` | `npm test -- --grep @claim:no-tracking` | Pass |

## Cold first-read — PASS

In a fresh desktop browser context, the live first screen says **“Practice the
bug before asking for help.”** It says it is for **beginning developers in VS
Code** who want to test their ideas before asking a coding assistant. The
first primary action is the one-click **“Try it with sample data”**, with the
adjacent explanation that it opens a filled cart-loop hypothesis and does not
save to real receipts. Clicking it opened the isolated sample practice. The
same screen gives the three plain facts: private local storage, offline after
the first visit, and free. It therefore answers what it does, for whom, and
what to click first in plain words.

## Local build and package checks — PASS

- `npm ci` passed.
- `npm run typecheck` passed. No lint script is defined.
- `npm test` passed: 2 Vitest tests and 35 Playwright tests, including a clean
  VS Code profile and an unpacked Chrome MV3 extension workflow.
- Exact production `npm run build` passed and produced `dist/site`,
  `dist/extension`, `dist/vscode-extension`, the VSIX, and the Chrome ZIP.
- `unzip -t` passed for both packages. The built Chrome manifest requests only
  `storage`, with no host permissions or content scripts.
- `npm audit --omit=dev --audit-level=high` reported 0 production
  vulnerabilities. `npm ci` reported 14 advisories in the development tree.
- Initial JavaScript is 18,764 bytes raw / 6,326 bytes gzip; CSS is 12,686 /
  3,650 bytes; the 640px WebP is 27,036 bytes. All are below the product
  budgets.

## Independent live product QA — PASS

- I completed a normal live demo receipt with a distinct hypothesis, multiline
  test output, chosen repair, and clue. The saved receipt displayed all four
  parts and its Markdown export contained `Hypothesis`, `Test output`, `Fix I
  chose`, and `Clue for next time`.
- Invalid empty hypothesis and empty test-output submissions remained on their
  current step with the native message “Please fill out this field.” Entering
  valid values recovered normally. Reset restored the shipped cart-loop
  sample; leaving through the wordmark cleared localStorage.
- Demo storage contained only `demo:draft` and `demo:receipts`. The full live
  flow recorded no third-party request and no console or page error.
- A fresh service-worker-controlled live demo reloaded while offline with the
  demo heading and offline notice. Cache `show-your-debugging-v2` contained
  JS and CSS; it deliberately did not precache either downloadable package.
- The live VSIX and Chrome ZIP both returned HTTP 200 and valid ZIP signatures.
  The full local suite exercised the real VS Code and Chromium extension
  receipt, export, and deletion flows in clean profiles.

## Accessibility, mobile, privacy, headers, and fidelity — PASS

- `/opt/fleet/lib/verify-url.sh` passed on the cold live landing: HTTP 200,
  title, `lang=en`, one `h1`, one `main`, image alt text, labeled controls,
  and zero browser errors. Its screenshots and JSON are retained in
  `.factory/evidence/verification-6/`.
- Fresh Axe scans of `/`, `/?demo=1`, `/privacy`, `/terms`, `/404.html`, and
  `/missing-page` found **zero serious or critical** violations. Every route
  had one `h1`, one `main`, the expected route title, and no console/page
  error.
- At 390 x 844 CSS pixels, the live demo had 0px horizontal overflow and no
  rendered interactive target below 44 x 44px. First Tab focused the skip
  link with a visible `rgb(89, 67, 169) solid 3px` outline. Under reduced
  motion, receipt animation and transition duration computed to `0.00001s`.
- Request logging for cold landing and the completed demo recorded only
  `https://solution-trace-practice.sociobot.in`. No analytics, third-party
  runtime script, or receipt-content request was observed.
- Live HTML has a same-origin CSP with `frame-ancestors 'none'`, HSTS,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy:
  strict-origin-when-cross-origin`, and restrictive Permissions-Policy.
  Hashed JS/CSS are `max-age=31536000, immutable`; `sw.js` is `no-cache`; the
  packages are `max-age=3600, must-revalidate`.
- SHA-256 comparison matched every user-served candidate artifact: HTML,
  routes, JS, CSS, source map, service worker, images, favicon, robots,
  sitemap, and 404 document. `staticwebapp.config.json` is a deployment
  control file and is correctly not publicly served. The live outer ZIP
  digests differ because archive metadata timestamps differ, but `diff -qr`
  found no differing file after unpacking either the Chrome ZIP or VSIX.

## Non-applicable checks

This is a static local-first extension with no server-side application API,
account, payment, model request, or sign-in. There is no documented rate
allowance to exercise with 429/`Retry-After`, no persistence/concurrency
endpoint, and no Entra authority. It has offline service-worker behavior but
is not an installable PWA (no web manifest), so PWA-update behavior is not
applicable.

## Defects by severity

- **Blocker: 0; High: 0; Medium: 0.**
- **Low: 1.** Axe reports a moderate `region` best-practice violation only on
  the demo banner: its status text and **Start for real** link sit outside a
  landmark. This does not create a serious/critical axe finding or block the
  acceptance criteria; place that banner inside a landmark in a later polish
  change.
