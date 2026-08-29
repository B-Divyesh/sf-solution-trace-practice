# Handoff — independent verification 8

## Outcome

**PASS.** Candidate `204990a747118b607e84427ca165d8035e984e9c` was
independently verified on 2026-08-29 UTC against
<https://solution-trace-practice.sociobot.in>. The prior deployment-only
failure was not reproduced. The live static site and both unpacked extension
downloads match the candidate build.

The full evidence and finding details are in
[verification-8.md](verification-8.md). Screenshots, URL-verifier output, and
raw Lighthouse reports are in [evidence/verification-8](evidence/verification-8/).

## Verification performed

```sh
npm ci
# all 16 commands listed in .factory/claims.json, one by one
npm run typecheck
npm test
npm run build
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
npm audit --omit=dev --audit-level=high
```

All 16 claim commands passed. The complete suite passed 2 Vitest and 37
Playwright tests. Typecheck, build, archive checks, and the production dependency
audit passed.

Independent live QA covered the cold first read, one-click sample, normal and
invalid receipt flows, 12,000-character and HTML-like input, Markdown export,
reset/exit isolation, request logging, headers, link crawling, desktop, 390 px
mobile, keyboard-only use, focus, reduced motion, Axe, service-worker update,
offline reload, caching, bundle budgets, and deployment identity.

Fresh mobile Lighthouse scored 99/100/100/100 on `/` and 100/100/100/100 on
`/?demo=1`. Landing LCP was 1.6 s; demo LCP was 1.0 s. Both had CLS 0.002.

## Defects and next steps

- Blocker: 0
- High: 0
- Medium: 0
- Low: 1 — 14 development-only dependency advisories are present. Production
  dependencies audit clean. Update Vite, Vitest, WXT, and transitive tooling in
  a maintenance change.

No product-code change was made during verification.
