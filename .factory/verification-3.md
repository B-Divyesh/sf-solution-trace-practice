# Independent verification 3 — PASS

**Candidate:** `d47968f3f53d6d18cd3aaeca08196ddf62140d5d`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Verified:** 2026-08-29 UTC, from a clean checkout after `npm ci`

## Decision

**PASS — ready to release.** The prior deployment-only and mobile target
findings are resolved in the live site. The live deployed static product is
the candidate, all mandatory claim tests pass, and the extension and demo
complete their actual beginner-debugging workflow locally and in production.

## Mandatory claims — PASS

Before any broader QA, every command declared in `.factory/claims.json` was
run exactly as written from the clean checkout. Each command builds the
production site and exercises its demo entry point.

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

## Cold first-read — PASS

A fresh live visit says that this is for **beginning developers using coding
assistants** who want to keep their debugging habits. It says what it does:
“Practice the bug before asking for help.” The visible first action is the
one-click **Try it with sample data**, directly explained as opening a ready
bug without saving it to receipts. It opens the realistic cart loop-boundary
practice immediately. The first screen also plainly presents the private,
offline, and free facts.

## Local build and artifact checks — PASS

- `npm ci` passed.
- `npm run typecheck` passed. There is no lint script in `package.json`.
- `npm test` passed: 2 Vitest tests and 21 Chromium Playwright tests. This
  includes exercising the unpacked Chrome MV3 extension through a complete
  receipt and the browser demo through all declared claims.
- Exact production `npm run build` passed and produced `dist/site`,
  `dist/extension`, and `dist/site/downloads/show-your-debugging-chrome.zip`.
  `unzip -t` passed.
- `npm audit --omit=dev --audit-level=high` reported 0 vulnerabilities.
- The MV3 manifest requests only `storage`, has no host permissions, and the
  product bundle has no model gateway/endpoint. This matches the brief's
  local-first/no-generation boundary.

## Independent live functional QA — PASS

- In a fresh live `/demo`, I completed a normal flow using a distinct
  hypothesis, multiline test output, chosen fix, and clue. Saving produced a
  receipt; downloaded Markdown contained Hypothesis, Test output, Fix I
  chose, and What I learned.
- Invalid empty test output was blocked by required-field validation, with a
  native validation message; entering valid output then advanced to the Fix
  step, and Reset demo restored the original seeded sample. A 181-character
  hypothesis was safely limited to its documented 180-character field
  boundary. Demo storage contained only `demo:draft` and `demo:receipts`.
- The ready hypothesis is required before the test field is displayed; the
  normal, invalid, recovery, reset, and export paths are covered by both the
  independent check and mandatory claim tests.
- `npm test` additionally performs the public extension's real receipt flow
  in a clean Chromium profile; it saved the supplied hypothesis, output, fix,
  and clue to the extension and checked it with axe.
- The fresh service worker controlled `/demo` (`show-your-debugging-v2`). With
  networking disabled, it reloaded the demo with heading “Make a debugging
  receipt from this bug” and the offline message.

## Accessibility, mobile, privacy, and platform — PASS

- AxeBuilder scans on live `/`, `/demo`, `/privacy`, `/terms`, `/404.html`,
  and the SPA `/missing-page` had no serious or critical findings. Every route
  had one `h1`, one `main`, `lang=en`, an appropriate route title, and no
  page or console errors.
- `/opt/fleet/lib/verify-url.sh` passed on the cold live landing: title,
  `lang`, main, alt text, labels, and console checks all passed.
- Keyboard-only use: the first Tab focuses Skip to main content; Enter on the
  Demo link changes route and focuses the destination `h1`. The visible focus
  treatment is a solid 3px violet outline. Reduced-motion emulation reduces
  transition and animation duration to `0.00001s`.
- At a 390 x 844 viewport, `/`, `/demo`, `/privacy`, `/terms`, and `/404.html`
  had zero horizontal overflow, zero targets under 44 x 44 CSS pixels, and no
  interactive-target overlaps. Desktop and mobile visual inspection were
  clear and legible.
- Cold landing plus completed demo request logging recorded only
  `https://solution-trace-practice.sociobot.in`; no third-party scripts,
  analytics, or receipt-content network request appeared.
- Live response headers include HSTS, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, restrictive
  Permissions-Policy, and a same-origin CSP with `frame-ancestors 'none'`.
  Hashed JS/CSS use `public, max-age=31536000, immutable`; `sw.js` uses
  `no-cache`; the extension download uses `max-age=3600, must-revalidate`.
- Initial JavaScript is 17,442 bytes raw / 6.03 KB gzip; CSS is 12,279 bytes
  raw / 3.56 KB gzip; the 640px hero is 27,036 bytes. All are below the stated
  static-product budgets.

## Deployment fidelity — PASS

The live deployment exactly matches the candidate build.

- Byte-for-byte comparison passed for the live HTML, 404 files, service
  worker, favicon, robots, sitemap, touch icon, both hero images, social card,
  JavaScript, and CSS.
- Live JavaScript SHA-256:
  `94f99e560e93eed0e272b882d094dfeae53abb7ce26d0ec8d4e5c0d747d68b3d`.
- Live CSS SHA-256:
  `ef7dde6bbfd6a7832d51c483a864b52edea46dd01662bd1c68cf69e7a934e1a5`.
- The live extension download returned 200, `application/zip`, 41,466 bytes,
  and `PK`. Its outer ZIP hash differed from the locally rebuilt ZIP because
  ZIP metadata timestamps vary; after unpacking, `diff -qr` found every file
  identical to the candidate extension.

## Non-applicable checks

This static local-first extension has no server-side API, sign-in, payment,
or model request. There is therefore no documented API allowance/429 path and
no Entra tenant or backend persistence/concurrency check to perform.

## Defects

No release-blocking, high, medium, or low defects found.
