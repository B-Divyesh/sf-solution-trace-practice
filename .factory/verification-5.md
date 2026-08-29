# Independent verification 5 — PASS

**Candidate:** `59216b9b81d350944d49e105a1b99c8ecb7d18f2`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Verified:** 2026-08-29 UTC from a clean checkout

## Decision

**PASS — release accepted.** The deployed static site and its downloadable
Chrome MV3 extension satisfy the researched brief: a beginning developer can
record a hypothesis, a useful test result, a chosen repair, and a clue without
giving the product access to editor files, tabs, clipboard, or a network
endpoint for their receipt.

The reported deployment-only concern is not reproduced. The live HTML,
JavaScript, CSS, service worker, and 404 document SHA-256 hashes exactly match
the candidate build. The live extension ZIP has different ZIP-entry timestamps
(08:50 UTC live versus 09:09 UTC when rebuilt locally), so its outer digest is
different; all 11 unpacked files have identical names, sizes, CRCs, and
content SHA-256 values. This is packaging metadata, not a product difference.

## Required claim gate — PASS

Before inspecting the live site, I ran `npm ci` and then every command in
`.factory/claims.json`, exactly as declared. All 13 passed from the clean
checkout. Per-claim command output is retained in
`.factory/evidence/verification-5/claim-*.log`.

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
| extension-privacy-boundary | `npm test -- --grep @claim:extension-privacy-boundary` | Pass |
| no-code-generation | `npm test -- --grep @claim:no-code-generation` | Pass |
| no-tracking | `npm test -- --grep @claim:no-tracking` | Pass |

## Cold first-read — PASS

In a new cookie-free desktop browser context, the first screen says,
“Practice the bug before asking for help.” It says this is for beginning
developers using coding assistants who want to retain their own debugging
habits. The first primary action is **Try it with sample data**, immediately
explained as opening a filled cart-loop hypothesis without saving to real
receipts. In plain words: it is a private practice tool for learners to make a
debugging receipt before asking for help; click the sample action first. The
one-click demo requirement passes. Screenshot:
`.factory/evidence/verification-5/live-cold-desktop.png`.

## Local checks — PASS

- `npm ci` passed.
- `npm run typecheck` passed. No lint script is defined in `package.json`.
- `npm test` passed: 2 Vitest tests and 31 Playwright tests.
- The exact production `npm run build` passed and produced `dist/site`,
  `dist/extension`, and `dist/site/downloads/show-your-debugging-chrome.zip`.
- `npm audit --omit=dev --audit-level=high` found 0 production dependency
  vulnerabilities. `npm ci` reports 11 development dependency advisories;
  none ship in the static site or extension.
- Initial JavaScript is 18,039 bytes raw / 6.10 KB gzip and CSS is 12,404
  bytes raw / 3.59 KB gzip, well within the 200 KB JS and 50 KB CSS budgets.
  The responsive 640px hero is 27,036 bytes.

## Independent functional checks — PASS

- Live normal flow: fresh `/?demo=1` starts with test output hidden; a normal
  cart-boundary hypothesis unlocks test output, test output unlocks fix/clue,
  saving renders all four receipt sections, and exported Markdown contains
  each section. Reset restores the shipped sample.
- Invalid/recovery flow: blank website hypothesis and blank test output each
  remain on their current step with the native required-field message “Please
  fill out this field.” In the extension, blank hypothesis/test fields behave
  the same; the hypothesis input stops at its documented 180-character
  boundary. The packaged-extension workflow and named delete-all confirmation
  both pass.
- Live service-worker update succeeds with an activated controller. After one
  controlled reload, disabling the browser network still reloads the demo,
  shows its heading and demo banner, and shows the offline notice. This is a
  static site with an offline demo rather than an installable web manifest
  PWA; the applicable service-worker/offline behavior was verified.
- The product has no server-side application endpoint, account, payment,
  sign-in, or model call. Concurrency/persistence-boundary, documented 429
  allowance, and Entra tenant checks are therefore not applicable.

## Accessibility, privacy, performance, and deployment — PASS

- Live AxeBuilder scans of `/`, `/?demo=1`, `/privacy`, `/terms`, and
  `/missing-page` have zero serious or critical findings. Every route has
  `lang="en"`, exactly one `main` and one `h1`, correct route title, and no
  console or page error.
- At 390 × 844 CSS pixels the demo has 0px horizontal overflow and no rendered
  interactive target smaller than 44px. Keyboard Tab reaches the skip link;
  its measured focus indicator is a solid 3px violet outline. Reduced-motion
  CSS is present.
- Browser request logging for landing, demo completion, Markdown export, and
  reset records only `https://solution-trace-practice.sociobot.in`. Demo
  storage contains only `demo:draft` and `demo:receipts`; no third-party,
  analytics, or receipt-content request was observed. The packaged extension
  claim test separately records zero HTTP(S) requests while saving uniquely
  marked private values.
- Live headers on HTML, assets, service worker, and ZIP include the restrictive
  same-origin CSP with `frame-ancestors 'none'`, `X-Content-Type-Options:
  nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive
  Permissions-Policy. Hashed assets are `public, max-age=31536000, immutable`,
  `sw.js` is `no-cache`, and the downloadable ZIP is
  `public, max-age=3600, must-revalidate`.
- Mobile Lighthouse for the live demo: Performance 100, Accessibility 100,
  Best Practices 100, SEO 100; LCP 909ms, CLS 0.0017, TBT 76.5ms, and total
  transfer 12,200 bytes in that audited session.
- The unpacked MV3 manifest requests only `storage`; it has no host,
  tab/history, clipboard, optional, or content-script permissions. The bundle
  contains no model gateway or endpoint.

## Defects by severity

None found: **0 blocker, 0 high, 0 medium, 0 low**.
