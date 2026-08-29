# Handoff — perfection loop round 4

## Outcome

The cumulative repair is complete and deployed at <https://solution-trace-practice.sociobot.in>. All findings in reviews 1–4 are resolved, including the blocking artifact mismatch. The primary deliverable is now a real packaged VS Code extension; the existing Chrome version remains a clearly labeled separate download.

Deployment ID: `36e4e16b-30a3-46dc-9cef-7765c3e7b6e2`

Product repair commit: `3fceeab6ec21a34c9637d258821c2fc1d40c827f`

Local evidence commit: `e25fdd4997928406089a86b05b26f0913211160c`

## What changed

- Added a VS Code Activity Bar extension with a progressive hypothesis → test output → fix → clue flow, local `globalState` receipts, confirmed deletion, Markdown export, keyboard focus, and reduced-motion support.
- Added repeatable VSIX packaging and a clean-profile VS Code web integration test. The main build emits the VSIX, the separate Chrome ZIP, both extension build directories, and `dist/site`.
- Rewrote the first screen and metadata to state the debugging-practice job and VS Code audience directly. The primary site actions now download the VSIX.
- Kept the one-click `?demo=1` path fully isolated with seeded sample data, a persistent banner, Reset demo, Start for real, demo-only storage keys, and offline behavior.
- Expanded `.factory/claims.json` to 16 claims with exactly one observable tagged test each, including VS Code storage/privacy and both real extension workflows.
- Retained and rechecked route-specific titles/metadata, History API focus, designed 404, legal links, mobile facts, mobile Privacy navigation, 44 px targets, and the original risograph debugging-receipt identity.
- Updated README, privacy/terms copy, demo documentation, design record, copy audit, and the verb-first catalog description.

The complete finding → change → evidence map is in [.factory/polish-4.md](polish-4.md).

## How it was verified

A clean checkout at `/tmp/solution-trace-polish-4-clean-3z5l3V` used repair commit `3fceeab6ec21a34c9637d258821c2fc1d40c827f`:

```sh
npm ci
# all 16 exact test commands from .factory/claims.json, one at a time
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
```

Results:

- All 16 claim commands passed.
- Full suite passed: 2 Vitest and 35 Playwright tests, including the installed-VSIX flow in a fresh VS Code profile.
- Typecheck, production build, and both archive integrity checks passed.
- Production dependency audit: 0 vulnerabilities.
- Initial JS: 18,764 bytes raw / 6,326 bytes gzip. CSS: 12,686 / 3,650 bytes.
- Local Lighthouse: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.8 s, CLS 0.002, TBT 10 ms.
- Live Lighthouse: 100/100/100/100; LCP 1.6 s, CLS 0.002, TBT 30 ms.

After deployment, fresh desktop and 390 × 844 Chromium contexts rechecked `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`. Every route had the correct title and social metadata, one H1/main, legal links, no overflow, zero console errors, and zero serious/critical Axe violations. Keyboard route and Back focus passed. Both downloads returned 200 with valid ZIP signatures. The demo reset its seed, used only `demo:*` storage, cleared on exit, made same-origin requests only, and reloaded offline.

Evidence:

- [.factory/evidence/polish-4/clean-clone-verification.txt](evidence/polish-4/clean-clone-verification.txt)
- [.factory/evidence/polish-4/live-check.json](evidence/polish-4/live-check.json)
- [.factory/evidence/polish-4/lighthouse-live.json](evidence/polish-4/lighthouse-live.json)
- [.factory/evidence/polish-4/live-first-screen.png](evidence/polish-4/live-first-screen.png)
- [.factory/evidence/polish-4/live-demo.png](evidence/polish-4/live-demo.png)
- [.factory/evidence/polish-4/live-privacy.png](evidence/polish-4/live-privacy.png)
- [.factory/evidence/polish-4/live-404.png](evidence/polish-4/live-404.png)

## Run locally

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run dev:site
```

Build outputs:

- `dist/site`
- `dist/site/downloads/show-your-debugging-vscode.vsix`
- `dist/site/downloads/show-your-debugging-chrome.zip`
- `dist/vscode-extension`
- `dist/extension`

## Known gaps and next steps

None. This static, local-first product has no account, backend, payment, analytics, tracking, or runtime AI dependency.
