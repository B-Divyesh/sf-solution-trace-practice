# Independent verification 4 — PASS

**Candidate:** `e05de4d359eaccbe1183d0544622eb0117d75cd4`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Verified:** 2026-08-29 UTC from a clean checkout

## Decision

**PASS — release accepted.** Fresh local and live evidence shows that the
deployed static site and its downloadable Chrome MV3 extension deliver the
brief's learner-owned debugging-receipt workflow. The earlier deployment-only
concern is not present: all served site files match this candidate and the
downloaded extension has identical unpacked contents.

## Required claim gate — PASS

Before broader product inspection, I ran `npm ci` and every command declared
in `.factory/claims.json`, exactly as written. All twelve passed against the
built demo/extension entry points:

| Claim | Exact command | Result |
| --- | --- | --- |
| sample-opens | `npm test -- --grep @claim:sample-opens` | Pass |
| demo-reset | `npm test -- --grep @claim:demo-reset` | Pass |
| receipt-workflow | `npm test -- --grep @claim:receipt-workflow` | Pass |
| receipt-delete | `npm test -- --grep @claim:receipt-delete` | Pass |
| hypothesis-first | `npm test -- --grep @claim:hypothesis-first` | Pass |
| local-only | `npm test -- --grep @claim:local-only` | Pass |
| offline-reload | `npm test -- --grep @claim:offline-reload` | Pass |
| markdown-export | `npm test -- --grep @claim:markdown-export` | Pass |
| free-download | `npm test -- --grep @claim:free-download` | Pass |
| storage-only-permission | `npm test -- --grep @claim:storage-only-permission` | Pass |
| no-code-generation | `npm test -- --grep @claim:no-code-generation` | Pass |
| no-tracking | `npm test -- --grep @claim:no-tracking` | Pass |

## Cold first-read — PASS

On a fresh live visit, the first screen plainly says: “Practice the bug before
asking for help.” It identifies its audience as beginning developers using
coding assistants, and the first visible action is the one-click **Try it with
sample data**. The adjacent explanation says that a filled cart-loop hypothesis
opens and nothing is saved to the visitor's receipts. Clicking it opens the
filled isolated practice. The first screen also states the private, offline,
and free facts. It therefore answers what it does, for whom, and what to do
first in plain words.

## Local checks — PASS

- `npm ci` passed from the clean checkout.
- `npm run typecheck` passed. No lint script is defined in `package.json`.
- `npm test` passed: 2 Vitest tests and 29 Playwright tests.
- Exact production `npm run build` passed and produced `dist/site`,
  `dist/extension`, and `dist/site/downloads/show-your-debugging-chrome.zip`.
- `npm audit --omit=dev` found 0 runtime vulnerabilities. The installer
  reported development-only audit advisories; they do not ship in this static
  product.
- Initial site JavaScript is 18,039 bytes raw / 6.10 KB gzip and CSS is
  12,404 bytes raw / 3.59 KB gzip, below the 200 KB / 50 KB budgets. The 640px
  hero image is 27,036 bytes.

## Independent live functional QA — PASS

- A cold desktop landing had the expected title, heading, sample action, and
  no console or page errors. A visual check confirms the product-specific
  risograph evidence-trail design is clear at desktop size.
- In a fresh live demo I exercised invalid empty hypothesis and test output:
  each remained on its current step with the browser's required-field message
  “Please fill out this field.” A 180-character hypothesis advanced correctly.
  I then saved a distinct hypothesis, test output, fix, and clue; the receipt
  rendered, Markdown downloaded as `debugging-receipt-2026-08-29.md`, and
  Reset demo restored the shipped cart-loop hypothesis.
- Keyboard-only `Ctrl+Enter` advanced hypothesis → test → fix → receipt.
- A fresh profile loaded the live downloaded ZIP, completed the extension's
  receipt workflow, observed `Receipts 1`, accepted the delete-all
  confirmation, and observed `Receipts 0`; no extension console/page errors
  occurred.
- The live service worker controlled the demo. With networking disabled, the
  demo reloaded with heading “Make a debugging receipt from this bug” and its
  offline notice. This product is not a PWA (no web manifest); its shipped
  offline feature was nonetheless directly verified.

## Accessibility, privacy, and deployment — PASS

- Live AxeBuilder scans of `/`, `/?demo=1`, `/privacy`, `/terms`, and
  `/missing-page` returned no serious or critical violations. Each had exactly
  one `h1` and `main`, `lang=en`, the expected route title, and no console or
  page errors.
- At 390 × 844 the demo had zero horizontal overflow. Visual inspection showed
  a usable stacked form and clear demo banner. The focused skip link has a
  visible solid 3px violet outline. Under reduced motion, transitions reduce
  to 0.00001 seconds and no animation remains active.
- Request logging for landing and a complete demo flow recorded only same-origin
  static requests: HTML, JavaScript, CSS, and the site hero. No analytics,
  third-party script, or receipt-content request occurred.
- Live headers include HSTS, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, restrictive
  Permissions-Policy, and same-origin CSP with `frame-ancestors 'none'`.
  JS/CSS are `public, max-age=31536000, immutable`; `sw.js` is `no-cache`; the
  ZIP is `public, max-age=3600, must-revalidate`.
- Live HTML, JavaScript, and CSS SHA-256 values exactly matched the candidate
  build. The downloaded ZIP outer hash differed only because ZIP timestamps
  differed (07:27 live vs 08:00 local); `diff -rq` after unpacking found no
  differing extension file. `unzip -t` passed for the live download.
- The manifest requests only `storage`, with no host permissions or content
  scripts. The bundle contains no Sociobot/model endpoint. The product has no
  backend API, sign-in, payment, or model endpoint, so 429 allowance,
  persistence/concurrency, and Entra checks are not applicable.

## Defects by severity

None found: **0 blocker, 0 high, 0 medium, 0 low**.
