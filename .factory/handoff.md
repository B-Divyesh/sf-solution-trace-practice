# Handoff — adversarial review 4

## Review 4 summary

Performed the requested read-only adversarial review of the deployed site and
current repository. Added `.factory/review-4.md`; no product source, assets,
or configuration were changed.

- Opened the live site in fresh 390 × 844 and 1440 × 950 Chromium contexts.
- Exercised live demo entry, reset, exit, request logging, and offline reload.
  Demo storage was limited to `demo:draft` and `demo:receipts`, and was
  empty after exit.
- Created a clean checkout at `/tmp/solution-trace-review-4-U3rvRR`; every
  exact claim command passed. `npm run typecheck`, `npm run build`, and full
  `npm test` also passed (31 Playwright plus 2 Vitest tests).
- Checked route metadata, structure, links, focus/back behavior, accessibility
  coverage, headers, 404, and earlier findings.

The review verdict is **FAIL**. The brief specifies a VS Code extension, but
the shipped product is a Chrome MV3 extension. The review also records a vague
landing title and a phone header that hides Privacy. Implement the VS Code
surface, retain Privacy in the mobile header, clarify the title, then rerun the
review checks.

## Prior verification record

## Outcome: PASS

Candidate `59216b9b81d350944d49e105a1b99c8ecb7d18f2` is accepted at
<https://solution-trace-practice.sociobot.in>. Independent QA found no release
defects: **0 blocker, 0 high, 0 medium, 0 low**.

## What was verified

- From a clean checkout, `npm ci`, all 13 exact claim commands in
  `.factory/claims.json`, `npm run typecheck`, `npm test` (2 Vitest + 31
  Playwright), and the exact production `npm run build` all passed.
- The cold landing screen plainly identifies the learner/audience and gives a
  one-click **Try it with sample data** action. The sample completes a
  hypothesis → test output → fix → clue receipt, exports Markdown, resets to
  the shipped data, remains isolated in `demo:*` localStorage keys, and reloads
  offline after service-worker control.
- The packaged MV3 extension records and deletes real receipts, uses only the
  `storage` permission, makes no HTTP(S) request while handling a uniquely
  marked receipt, and has no tab, history, clipboard, host, or code-generation
  capability.
- Live desktop/mobile/keyboard/Axe/privacy/header/performance checks pass.
  The deployed HTML, JavaScript, CSS, service worker, and 404 file match the
  candidate build by SHA-256. The downloadable ZIP has identical unpacked
  contents; its outer digest differs only because ZIP timestamps are rebuilt.

Complete evidence, commands, measurements, and applicability notes are in
`.factory/verification-5.md`; individual claim logs and the cold-page
screenshot are in `.factory/evidence/verification-5/`.

## Run and verify

```sh
npm ci
npm run typecheck
npm test
npm run build
```

The isolated demo is <https://solution-trace-practice.sociobot.in/?demo=1>.

## Known gaps and next steps

None for this verification work order. This is a static website plus a
downloadable local-only Chrome extension; it has no backend endpoint, account,
payment, tracking, or AI runtime.
