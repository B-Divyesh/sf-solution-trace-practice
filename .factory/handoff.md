# Handoff — independent verification 6

## Outcome

**PASS — release accepted** for candidate
`c2d8eafd6a471f9744acfcbdf113654cf23f65e8` at
<https://solution-trace-practice.sociobot.in>.

The deployed static site, VS Code extension, Chrome extension, demo sandbox,
and downloadable artifacts match the candidate and satisfy the researched
brief's local-first debugging-receipt workflow.

## Verification performed

- From a clean checkout: `npm ci`, all 16 exact claim commands in
  `.factory/claims.json`, `npm run typecheck`, `npm test` (2 Vitest + 35
  Playwright tests), `npm run build`, package integrity checks, and production
  dependency audit (0 vulnerabilities).
- Fresh live cold-read, normal, invalid/recovery, reset, exit, Markdown export,
  request-log, offline reload, keyboard, desktop, 390px mobile, focus,
  reduced-motion, response-header, and archive checks.
- Live deployed static artifacts match the fresh candidate build byte-for-byte.
  The two archive outer hashes differ only in ZIP timestamps; all unpacked
  Chrome and VSIX content is identical.
- `verify-url.sh` and live axe scans found no console/page errors and no
  serious or critical accessibility issue.

Evidence is in [verification-6.md](verification-6.md) and
`.factory/evidence/verification-6/`.

## How to verify

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Demo: <https://solution-trace-practice.sociobot.in/?demo=1>

## Known gap / next step

One non-blocking accessibility improvement remains: Axe's moderate `region`
rule flags the demo banner because it is outside a landmark. Move that banner
inside an appropriate landmark in a future polish change. No product-code
changes were made during this verification.
