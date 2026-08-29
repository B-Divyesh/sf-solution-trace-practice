# Independent verification 8 — PASS

**Candidate:** `204990a747118b607e84427ca165d8035e984e9c`

**Live URL:** <https://solution-trace-practice.sociobot.in>

**Verified:** 2026-08-29 UTC from the clean candidate checkout

## Decision

**PASS — release accepted.** Fresh local and live evidence confirms the product
does the researched job end to end: a beginning developer records a testable
hypothesis, test output, chosen fix, and reusable clue before asking an
assistant for an answer. The previously reported deployment-only failure was
not reproduced. The live site and both downloadable extensions match the
candidate.

## Mandatory first-read gate — PASS

I opened the live root in a new browser context with no stored state. The first
screen answers all three required questions in plain words:

- **What it does:** “Practice the bug before asking for help.”
- **Who it is for:** beginning developers in VS Code who want to test their own
  ideas before asking a coding assistant.
- **What to click first:** **Try it with sample data**. The adjacent text says
  that a filled cart-loop hypothesis opens and does not enter real receipts.

The action and all three facts are visible in the first 390 × 844 screen. One
click opened `/?demo=1`, a persistent “Demo — sample data, nothing is saved to
your receipts” banner, a filled cart-loop hypothesis, and realistic sample
history.

Evidence: [desktop first read](evidence/verification-8/live-first-read-desktop.png),
[mobile first read](evidence/verification-8/live-landing-mobile.png), and
[mobile demo](evidence/verification-8/live-demo-mobile.png).

## Mandatory claims gate — PASS

`.factory/claims.json` exists and contains 16 claims. The first command on the
uninstalled clone could not start because `vitest` was not installed. After the
required `npm ci` lockfile install, I invoked every manifest command separately.
All 16 actual claim tests passed:

| Claim | Result |
| --- | --- |
| `sample-opens` | Pass |
| `demo-reset` | Pass |
| `receipt-workflow` | Pass |
| `receipt-delete` | Pass |
| `browser-receipt-workflow` | Pass |
| `hypothesis-first` | Pass |
| `local-only` | Pass |
| `vscode-local-storage` | Pass |
| `offline-reload` | Pass |
| `markdown-export` | Pass |
| `free-download` | Pass |
| `storage-only-permission` | Pass |
| `extension-privacy-boundary` | Pass |
| `vscode-privacy-boundary` | Pass |
| `no-code-generation` | Pass |
| `no-tracking` | Pass |

The pre-install error was a missing local executable, not a failed product
assertion. No claim test failed after dependencies were installed. Landing,
demo, legal, README, and extension copy were cross-checked against the claims
registry; no unlisted user-reliance claim was found.

## Clean local gates — PASS

- `npm ci`: passed without changing the lockfile.
- `npm run typecheck`: passed.
- Lint: no lint script exists in `package.json`.
- `npm test`: passed — 2 Vitest tests and 37 Playwright tests.
- `npm run build`: passed and produced `dist/site`, `dist/extension`,
  `dist/vscode-extension`, the Chrome ZIP, and the VSIX.
- `unzip -t` passed for both downloadable archives.
- `npm audit --omit=dev --audit-level=high`: 0 production vulnerabilities.

The full suite loads the real Chrome MV3 extension and VS Code extension in
clean profiles. It saves all four receipt fields, checks local state, exports
Markdown, and deletes the saved receipts.

## Independent end-to-end QA — PASS

On the live demo I used Unicode and HTML-like text plus a 12,000-character test
output. The receipt rendered all values as text, did not execute the embedded
`script` string, saved only under the demo namespace, and exported a 12,414-byte
Markdown file containing all four required sections.

Empty hypothesis, test output, fix, and clue submissions each stayed on the
correct step, focused the invalid field, exposed the browser validation message
“Please fill out this field,” and recovered after valid input. Reset restored
the shipped cart-loop sample and exactly `demo:draft` and `demo:receipts`.
**Start for real** downloaded the VSIX and cleared both demo keys.

The whole flow issued only same-origin GET requests. It issued no POST, sent no
receipt value in a URL, and produced no console error, page error, or failed
resource. The completed flow also had zero Axe violations.

Keyboard-only checks passed: the first Tab focused the skip link with a designed
3 px violet outline; Enter on Demo changed the route and moved focus to the new
`h1`; Ctrl+Enter advanced the active form; no trap was encountered.

At 390 px, every supported route had zero horizontal overflow, no off-screen
control, and no rendered target below 44 × 44 CSS pixels. The 720 px reflow
proxy for 200% desktop zoom was also clean. Under `prefers-reduced-motion:
reduce`, scroll behavior was `auto`, and animation and transition durations
were reduced to `0.00001s`.

Evidence: [completed workflow](evidence/verification-8/live-workflow-complete.png).

## Accessibility, routes, and metadata — PASS

The factory `verify-url.sh` passed on `/` and `/?demo=1`: HTTP 200, descriptive
title, `lang=en`, one `h1`, one `main`, complete image alternatives, labeled
buttons, and no browser errors. Its captures and JSON are in
[verification-8 evidence](evidence/verification-8/).

Fresh Axe scans of `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`,
and an unknown route found zero violations, including zero serious or critical
findings. Supported routes had the correct route title, one `h1`, one `main`,
and no application console/page errors. The unknown URL correctly returned 404
and the styled not-found document before JavaScript; Chromium logged only the
expected failed-document status for that deliberate 404. All real internal
links returned 200. The two `mailto:` links were excluded from HTTP crawling.

The repository includes its product-specific design thesis and asset
provenance, MIT license, README run/test/deploy instructions, privacy and terms
routes, canonical and social metadata, sitemap, robots file, and accessible
404.

## Privacy, security, and server scope — PASS

The live landing and complete receipt flow requested only product-origin HTML,
JavaScript, CSS, and images. There was no analytics, third-party script, model
call, or receipt-content request. The Chrome manifest requests only `storage`
and has no host, tab, history, clipboard, file, or content-script permission.
The VS Code bundle has no workspace-file, editor, clipboard-read, process-spawn,
or network-read path.

Live responses include:

- CSP with `frame-ancestors 'none'` delivered as a response header;
- HSTS with `includeSubDomains; preload`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- a restrictive camera, microphone, geolocation, and payment policy.

This is a static product with no sign-in, payment, product-unlock call, model
call, or server-side product endpoint. API allowance/429/`Retry-After`, backend
concurrency and persistence, health identity, and Entra authority checks are
not applicable.

## Offline, caching, and performance — PASS

The live service worker was active and controlled the page. Calling its update
path completed with an activated worker and no waiting worker. Cache
`show-your-debugging-v2` contained the shell, supported route documents,
JavaScript, CSS, and images. A controlled demo then reloaded offline with its
heading and offline notice intact.

Caching is appropriate: hashed assets use one-year immutable caching, `sw.js`
uses `no-cache`, HTML uses a 30-second revalidation window, and downloads use a
one-hour revalidation window.

Initial bundles are 18,807 bytes JavaScript (6.27 KB gzip), 12,686 bytes CSS
(3.64 KB gzip), no web font, a 27,036-byte mobile hero, and a 128,890-byte
desktop hero. All are under the contract budgets.

Fresh mobile Lighthouse results:

| Route | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 | 100 | 0.9 s | 1.6 s | 100 ms | 0.002 |
| `/?demo=1` | 100 | 100 | 100 | 100 | 1.0 s | 1.0 s | 80 ms | 0.002 |

Raw reports: [landing](evidence/verification-8/lighthouse-live-root.json) and
[demo](evidence/verification-8/lighthouse-live.json).

## Deployment identity — PASS

Every served HTML document, styled 404 response, JavaScript bundle, source map,
stylesheet, service worker, image, icon, `robots.txt`, and sitemap matched the
fresh candidate build byte for byte by SHA-256. Examples include root HTML
`05beb487…afd9b`, JavaScript `da1df285…b5c6`, and service worker
`c3650529…6f26e`. The live and local Chrome ZIP were both 41,460 bytes; the
live and local VSIX were both 14,416 bytes. Recursive comparisons after
extraction found no differing package file.

## Defects by severity

- **Blocker:** 0
- **High:** 0
- **Medium:** 0
- **Low:** 1 — the clean install reports 14 advisories in development-only
  build/test dependencies (1 low, 3 moderate, 6 high, 4 critical). None is in
  the shipped dependency tree; the production audit is clean. Updating Vite,
  Vitest, WXT, and their transitive tools is recommended as maintenance.

## Evidence index

Screenshots, factory URL-verifier captures, and raw Lighthouse JSON are in
[`.factory/evidence/verification-8`](evidence/verification-8/).
