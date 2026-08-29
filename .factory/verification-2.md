# Independent verification 2 — FAIL

**Candidate:** `abda23e410fbe6b92a060592e6814ca8597f94ac`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Verified:** 2026-08-29 UTC from a clean checkout after `npm ci`

## Decision

**FAIL — do not release yet.** The previous deployment-only blockers are
resolved, but the 390px mobile site violates the product contract's required
minimum 44 by 44 CSS-pixel touch target size. This is a release-blocking
accessibility and mobile quality gate.

## Release-blocking finding

### High — visible mobile links do not meet the 44px touch-target minimum

At a 390 by 844 viewport, Playwright measured the following visible,
interactive links below the required 44px height:

| Location | Measured size |
| --- | ---: |
| Header wordmark | 130 x 32px |
| Header `Demo` link | 40 x 22px |
| `Get extension` link | 117 x 40px |
| `Open the live practice` link | 187 x 25px |
| Footer wordmark | 148 x 17px |
| Footer Privacy, Terms, and factory links | 342 x 25px |

The mobile landing has no horizontal overflow and its primary sample-data CTA
is large enough, but these smaller visible targets fail the explicit
accessibility/design requirement: "Touch targets >= 44 px." This must be
fixed and reverified before release.

## What is now fixed since verification 1

The live deployment is materially repaired rather than still suffering the
previous deployment-only failure:

- All eight exact commands listed in `.factory/claims.json` pass from the
  clean checkout.
- `GET /downloads/show-your-debugging-chrome.zip` returns 200,
  `application/zip`, 41,466 bytes, and a `PK` ZIP signature.
- The live service worker installs, controls `/demo`, caches the shell and
  assets, and an offline reload renders the demo with its offline message.
- Hashed JS returns `Cache-Control: public, max-age=31536000, immutable`;
  `sw.js` returns `Cache-Control: no-cache`.

Deployment fidelity was checked from fresh evidence. The live JS, CSS, and
service-worker SHA-256 digests exactly match the local candidate build. The
live and local extension ZIP containers differ only in ZIP timestamps; after
unpacking, every file hash and `manifest.json` is identical.

## Mandatory claim tests — PASS

Each command was run exactly as recorded, via the production demo entry point
created by the test harness:

| Claim | Exact command | Result |
| --- | --- | --- |
| hypothesis-first | `npm test -- --grep @claim:hypothesis-first` | Pass |
| local-only | `npm test -- --grep @claim:local-only` | Pass |
| offline-reload | `npm test -- --grep @claim:offline-reload` | Pass |
| markdown-export | `npm test -- --grep @claim:markdown-export` | Pass |
| free-download | `npm test -- --grep @claim:free-download` | Pass |
| storage-only-permission | `npm test -- --grep @claim:storage-only-permission` | Pass |
| no-code-generation | `npm test -- --grep @claim:no-code-generation` | Pass |
| no-tracking | `npm test -- --grep @claim:no-tracking` | Pass |

## First-read test — PASS

A cold live visit plainly says the product helps **beginning developers using
coding assistants** keep their debugging habits by practicing a bug before
asking for help. The first action is the visible one-click **Try it with sample
data** link, whose adjacent explanation says that a ready bug opens. It opens
a realistic cart-loop boundary-bug practice flow. The first screen also states
the private, offline, and free facts in plain words.

## Local build and functional evidence

- `npm ci` passed. `npm audit --omit=dev --audit-level=high` found 0
  vulnerabilities. There is no lint script in `package.json`.
- `npm run typecheck` passed.
- `npm test` passed: 2 Vitest tests and 18 Chromium Playwright tests, including
  loading the unpacked MV3 extension and completing a real receipt.
- Exact production `npm run build` passed and produced `dist/site`,
  `dist/extension`, and the packaged ZIP. `unzip -t` reported no ZIP errors.
- The built MV3 manifest requests only `storage`; it has no host permissions.
  No bundle model endpoint/gateway was present.
- In the live demo, an empty required hypothesis produced the native "Please
  fill out this field" validation and did not reveal the test field. A normal
  hypothesis, multiline test output, fix, and clue saved successfully;
  Markdown download included Hypothesis, Test output, Fix I chose, and What I
  learned. Reset restored the seeded sample.
- Demo storage after a completed flow contained only `demo:draft` and
  `demo:receipts`.

## Live quality, privacy, and platform evidence

- Axe scans on `/`, `/demo`, `/privacy`, and `/terms` found no serious or
  critical violations. Each had one `main`, one `h1`, `lang=en`, and the
  expected route title. No page or console errors occurred.
- Keyboard-only navigation first focused the skip link. Activating the Demo
  link changed route and focused the demo `h1`. The designed 3px violet focus
  outline is present. Reduced-motion mode changes scrolling to `auto` and
  reduces animation/transition duration to 0.01ms.
- Cold-page and complete-demo Playwright request logs contained only
  `solution-trace-practice.sociobot.in` requests (HTML, same-origin JS/CSS,
  hero, and routes). No third-party script or tracking request occurred.
- Fresh live service-worker evidence: cache `show-your-debugging-v2` contained
  `/demo`, `/`, `/privacy`, `/terms`, JS, CSS, favicon, touch icon, and hero
  assets. With the browser offline, `/demo` reloaded with heading "Make a
  debugging receipt from this bug" and the offline status message.
- Live headers include CSP with `frame-ancestors 'none'`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy:
  strict-origin-when-cross-origin`, restrictive Permissions-Policy, and HSTS.
  No product server/API endpoint, account, rate allowance, or sign-in flow
  exists, so API 429 and Entra tenant checks are not applicable.
- Budget evidence: initial JS 17.44 KB raw / 6.04 KB gzip, CSS 11.83 KB raw /
  3.53 KB gzip, and 640px hero WebP 27,036 bytes. These are within the stated
  static-product budgets.

## Required remediation

Increase the hit area of every visible header, inline-action, and footer link
to at least 44 by 44 CSS pixels at 390px (without making adjacent targets
overlap), then rerun mobile geometry, keyboard, axe, the eight claim commands,
and the live deployment-fidelity checks.
