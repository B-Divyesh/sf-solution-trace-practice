# Handoff — polish round 5

## Outcome

**PASS — no findings remain.** Product repair commit: `a13f014f0039eebab0bd99595331d2fff7a0c061`. It moves the persistent demo controls inside `main`, adds a zero-`region` Axe regression, and rewrites the overlong README test description. Static deployment `2c3abf9f-7c71-481f-895d-f9f92b2a3fa1` is live at <https://solution-trace-practice.sociobot.in>.

The complete cumulative finding map is [polish-5.md](polish-5.md). Live screenshots and URL-verifier reports are in `evidence/polish-5/`.

## Exact verification

From clean clone `/tmp/solution-trace-polish-5-clean-3ftHCV/repo` at the repair commit:

```sh
npm ci
npm test -- --grep @claim:sample-opens
npm test -- --grep @claim:demo-reset
npm test -- --grep @claim:receipt-workflow
npm test -- --grep @claim:receipt-delete
npm test -- --grep @claim:browser-receipt-workflow
npm test -- --grep @claim:hypothesis-first
npm test -- --grep @claim:local-only
npm test -- --grep @claim:vscode-local-storage
npm test -- --grep @claim:offline-reload
npm test -- --grep @claim:markdown-export
npm test -- --grep @claim:free-download
npm test -- --grep @claim:storage-only-permission
npm test -- --grep @claim:extension-privacy-boundary
npm test -- --grep @claim:vscode-privacy-boundary
npm test -- --grep @claim:no-code-generation
npm test -- --grep @claim:no-tracking
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
```

All passed: 2 Vitest tests, 37 Playwright tests, all 16 independent claim commands, both package-integrity checks, and 0 production dependency vulnerabilities.

After deployment, `/opt/fleet/lib/verify-url.sh` passed cold for `/` and `/?demo=1`. Fresh live checks covered all routes, titles/metadata, focus and Back behavior, 390 px facts/navigation/targets, demo reset/exit storage isolation, request privacy, offline reload, package signatures, headers, cache policy, and deployment hashes. The demo Axe scan has zero `region`, serious, and critical violations. Lighthouse on the live demo scored 100 for Performance, Accessibility, Best Practices, and SEO (FCP/LCP 1.2 s, CLS 0, TBT 0 ms).

## Run and deploy

```sh
npm ci
npm test
npm run build:site
```

Deploy `dist/site/` as the static root. The one-click isolated demo is <https://solution-trace-practice.sociobot.in/?demo=1>.

## Known gaps and next steps

None. The repository keeps the VS Code extension as the primary product and the Chrome popup as a separate supported version.
