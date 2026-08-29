# Independent verification 7 — PASS

**Candidate:** `d5b5561aba708f0a6ee648a863476595e474ad34`

**Live URL:** <https://solution-trace-practice.sociobot.in>

**Verified:** 2026-08-29 UTC from a clean checkout

## Decision

**PASS — release accepted.** Fresh local and live evidence shows that the
candidate delivers the researched job: a beginning developer records a
testable hypothesis, test output, chosen fix, and reusable clue before asking
an assistant for an answer. The prior deployment-only failure was not
reproduced. The live static application and both downloadable extensions match
the candidate.

## Mandatory first-read gate — PASS

I opened the live root in a new browser context with no stored state. The first
screen says:

- **What it does:** “Practice the bug before asking for help.”
- **Who it is for:** beginning developers in VS Code who want to test their
  ideas before asking a coding assistant.
- **What to click:** **Try it with sample data**, followed by the explanation
  that a filled cart-loop hypothesis opens and does not enter real receipts.

The action was visible without scrolling at desktop and 390 px. One click
opened `/?demo=1`, the persistent demo banner, the filled cart-loop hypothesis,
and realistic sample history. The first 390 × 844 screen also showed the three
plain facts: private local storage, offline after the first visit, and free.

Evidence: `evidence/verification-7/first-read.json`,
`first-read-desktop.png`, and `live-landing-mobile.png`.

## Mandatory claims gate — PASS

`.factory/claims.json` exists and contains 16 claims. After the required locked
install, I invoked every listed command separately from the clean candidate.
Every command passed and exercised its tagged observable test through the
product demo or clean extension profile.

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

The uninstalled clone naturally had no `vitest` executable; `npm ci` installed
the lockfile before the actual clean-install claim runs. This was a missing
local tool prerequisite, not an executed product assertion. The installed
results and one log per exact claim command are retained in
`evidence/verification-7/`.

The landing page, demo, privacy page, README, and extension copy were also
cross-checked against the registry. I found no unlisted user-reliance claim.

## Clean local gates — PASS

- `npm ci`: passed with the lockfile unchanged.
- `npm run typecheck`: passed.
- Lint: no lint script is available in `package.json`.
- `npm test`: passed — 2 Vitest tests and 37 Playwright tests.
- `npm run build`: passed and produced `dist/site`, `dist/extension`,
  `dist/vscode-extension`, the Chrome ZIP, and the VSIX.
- `unzip -t` passed for both downloadable packages.
- `npm audit --omit=dev --audit-level=high`: 0 production vulnerabilities.
  `npm ci` reported 14 development-tree advisories; none is shipped in the
  static runtime.

The full suite loaded the unpacked Chrome MV3 extension and the real VS Code
extension in clean profiles. It saved all four receipt fields, inspected local
state, exported Markdown, and deleted the saved receipts.

## Independent end-to-end QA — PASS

On the live demo I used distinct Unicode and HTML-like text in all four fields.
The receipt displayed the values as text, saved only to the demo namespace, and
exported a Markdown file containing all four sections. Empty hypothesis, test
output, and fix submissions remained on the correct step, focused the invalid
field, announced the browser message “Please fill out this field,” and
recovered when valid input was entered.

Reset restored the shipped cart-loop sample and exactly the two documented
keys, `demo:draft` and `demo:receipts`. Leaving through the wordmark removed
both. The workflow emitted no POST request, third-party request, console error,
page error, or failed resource request.

Keyboard-only checks passed: first Tab exposed and focused the skip link;
Enter activated the demo route and focused its `h1`; Ctrl+Enter advanced the
active form; the remaining controls were reachable without a trap. The focus
indicator is a designed 3 px `#5943a9` outline with a 7.04:1 contrast ratio
against the paper background.

At 390 × 844, the landing and demo had no horizontal overflow, no rendered
target below 44 × 44 CSS pixels, and no overlap. Under
`prefers-reduced-motion: reduce`, animation and transition durations computed
to `0.00001s` and scroll behavior to `auto`. The layouts also reflow at an
effective 200% desktop zoom width without loss of controls or content.

## Accessibility and structure — PASS

The factory URL verifier passed on `/` and `/?demo=1`: HTTP 200, descriptive
title, `lang=en`, one `h1`, one `main`, alt text, labeled buttons, and zero
browser errors.

Fresh Axe scans of `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`,
and `/missing-page` found **zero violations at any impact**, including zero
serious or critical findings. Each rendered route had one `h1`, one `main`,
the expected route title, no horizontal overflow, and no console/page error.
The live link crawl returned 200 for every HTTP link; the two documented
`mailto:` links were exempt.

## Privacy, security, and network behavior — PASS

The complete landing and receipt flow requested only same-origin HTML, JS,
CSS, images, and service-worker resources. It made no third-party request, no
analytics request, and no request containing receipt values. The Chrome
manifest requests only `storage`; it has no host, tab, history, clipboard,
file, or content-script permission. The VS Code bundle has no workspace-file,
editor, clipboard-read, process-spawn, or network-read path.

Live responses include:

- same-origin CSP with `frame-ancestors 'none'`;
- HSTS with `includeSubDomains; preload`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- a restrictive camera, microphone, geolocation, and payment policy.

There is no account, payment flow, model call, product-unlock call, or
server-side product endpoint. API allowance, 429/`Retry-After`, backend
concurrency/persistence, health identity, and Entra authority checks are
therefore not applicable.

## Offline, caching, and performance — PASS

The live service worker was active at `/sw.js`. Calling its update path
completed with the worker still activated and no waiting worker. Cache
`show-your-debugging-v2` held the shell, route documents, JS, CSS, and images;
downloadable extension packages were not a precache dependency. With the
browser offline, the controlled demo reloaded and showed both the demo heading
and offline notice.

Caching is appropriate: hashed assets use one-year immutable caching,
`sw.js` uses `no-cache`, HTML uses a 30-second revalidation window, and
downloads use a one-hour revalidation window.

Initial bundles are 18,807 bytes JS (6.27 KB gzip), 12,686 bytes CSS (3.64 KB
gzip), no web font, and a 27,036-byte mobile hero. All are well under contract
budgets. Fresh mobile Lighthouse on the live demo scored:

| Category/metric | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 1.0 s |
| LCP | 1.1 s |
| TBT | 20 ms |
| CLS | 0.002 |

## Deployment identity — PASS

Every served HTML document, JS bundle, source map, stylesheet, service worker,
image, icon, `robots.txt`, and sitemap matched the candidate build byte for
byte by SHA-256. The Chrome ZIP and VSIX have timestamp-dependent outer archive
digests, but their sizes match and recursive comparison after extraction found
no differing file. The deployment therefore contains the candidate product.

## Defects by severity

- **Blocker: 0**
- **High: 0**
- **Medium: 0**
- **Low: 0**

## Evidence index

Machine-readable results, screenshots, exact claim logs, build/test logs,
headers, route crawl, artifact hashes, package checks, and Lighthouse JSON are
in `.factory/evidence/verification-7/`.
