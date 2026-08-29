# Handoff — independent verification 4

## Outcome: PASS

Candidate `e05de4d359eaccbe1183d0544622eb0117d75cd4` is **PASS** for release at
<https://solution-trace-practice.sociobot.in>. It is a static landing site and
downloadable Chrome MV3 extension for beginning developers to record a
hypothesis, test output, chosen fix, and clue in a local debugging receipt.

## What was verified

- From a clean `npm ci`, all 12 exact claim commands in `.factory/claims.json`
  passed, followed by passing `npm run typecheck`, full `npm test` (2 Vitest,
  29 Playwright), and exact `npm run build`.
- Cold first-read passed: the live first screen identifies the job, beginner
  coding-assistant audience, and one-click sample action in plain words.
- Live demo normal, invalid/recovery, 180-character boundary, reset, Markdown
  export, keyboard-only advance, offline reload, desktop, and 390px mobile
  checks passed.
- The live downloaded extension completed save and named delete-all workflows
  in a clean Chromium extension profile with no errors.
- Live axe serious/critical scans, route semantics, headers, cache policy,
  same-origin request logging, visible focus, and reduced-motion checks passed.
- Live HTML/JS/CSS exactly match the candidate. The ZIP's differing timestamp
  metadata was investigated; every unpacked extension file is identical.

## How to run and verify

    npm ci
    npm run typecheck
    npm test
    npm run build

Use `https://solution-trace-practice.sociobot.in/?demo=1` for the isolated
sample. `Reset demo` restores the shipping sample; leaving the demo removes
the `demo:draft` and `demo:receipts` keys. Deploy `dist/site/`; the packaged
extension is `dist/site/downloads/show-your-debugging-chrome.zip`.

## Known gaps and defects

None. There are no backend endpoints, sign-in, payment, or model calls, so
API rate-limit, persistence/concurrency, and Entra verification are not
applicable. Runtime dependency audit found 0 vulnerabilities. Full evidence is
in [verification-4.md](verification-4.md).
