# Polish round 4 evidence

Candidate repaired: `59216b9b81d350944d49e105a1b99c8ecb7d18f2`

Review base: `8616a1729d4e8f2890182f4e46b06acef3230cf3`

Product repair commit: `3fceeab6ec21a34c9637d258821c2fc1d40c827f`

Deployment: `36e4e16b-30a3-46dc-9cef-7765c3e7b6e2`

Live URL: <https://solution-trace-practice.sociobot.in>

**Result: PASS — every finding from reviews 1–4 is resolved.**

## Review 4 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | Built and packaged the specified VS Code extension. It contributes an Activity Bar view and two commands, records the four receipt fields, stores receipts in `globalState`, exports real Markdown, and confirms deletion. The website now leads with the VS Code product and its VSIX; the Chrome extension remains clearly separate. | `@claim:receipt-workflow`, `@claim:receipt-delete`, `@claim:vscode-local-storage`, `@claim:markdown-export`, and `@claim:vscode-privacy-boundary`; the test installs the built VSIX into a fresh VS Code web profile, opens the contributed view, saves/exports/clears a receipt, and inspects storage. Clean-clone suite passed. Live VSIX returned 200, 14,416 bytes, and a ZIP signature; [live report](evidence/polish-4/live-check.json). |
| F-4-2 | Replaced the vague metadata line with `Show Your Debugging — Record debugging practice` in the source document, route state, Open Graph, and Twitter metadata. | Playwright `the first screen and static document name debugging practice and VS Code`; route matrix; live `/` title and social title match in the [live report](evidence/polish-4/live-check.json). |
| F-4-3 | Kept Privacy as a direct, labeled header link at 390 px alongside Demo and Get VS Code. All visible header targets are at least 44 px. | Playwright `Privacy remains directly reachable in the 390px header` and `every rendered 390px touch target is at least 44 by 44 CSS pixels`; live sizes were 44 px high with no overflow; [live first screen](evidence/polish-4/live-first-screen.png). |

## Earlier review findings rechecked

| Finding | Change retained or extended | Evidence |
| --- | --- | --- |
| F-1-1 | The audience sentence, sample action, explanation, and all three privacy/offline/free facts remain in the initial phone viewport. Copy now names VS Code directly. | Playwright `the three product facts are visible in the first 390px screen`; live fact bottoms were 591.59, 616.19, and 640.78 px in an 844 px viewport; [live first screen](evidence/polish-4/live-first-screen.png). |
| F-1-2 | Expanded `.factory/claims.json` to 16 observable claims, including the real VS Code workflow, storage, privacy boundary, export, and the distinct Chrome workflow. Every claim has exactly one tagged test. | All 16 exact manifest commands passed separately in clean clone `/tmp/solution-trace-polish-4-clean-3z5l3V`; Playwright `every listed claim has exactly one tagged observable test`; [clean-clone record](evidence/polish-4/clean-clone-verification.txt). |
| F-1-3 | Retained descriptive headings and the single term `clue`; rewrote the first screen and README around the concrete VS Code job without slogans or factory jargon. | [copy audit](copy-audit.md); Playwright `the practice steps describe the next product action without promising an answer reveal` and `the README leads with plain privacy outcomes`; live route copy inspection passed. |
| F-1-4 | Retained per-route title, description, canonical, Open Graph, and Twitter metadata in both prerendered documents and History API navigation. | Playwright route matrix and `built route documents expose correct metadata before JavaScript runs`; cold live checks passed for `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`; [live report](evidence/polish-4/live-check.json). |
| F-1-5 | Retained the designed standalone 404 with skip link, shared header/footer, direct return action, legal links, build id, and complete not-found metadata. | Playwright `the standalone 404 uses the shared site skeleton`; zero serious/critical Axe issues and no console errors at live `/404.html` and `/missing-page`; [live 404](evidence/polish-4/live-404.png). |
| F-2-1 | Kept the truthful instruction `Write a testable hypothesis before recording test output.` The website and both extensions advance to actual test output rather than promising an answer reveal. | Playwright wording regression test and `@claim:hypothesis-first`; live demo withheld the test field until the hypothesis step completed. |
| F-2-2 | README now opens with the free VS Code extension, local storage result, and concrete read boundaries before setup details. Chrome is described later as a separate version. | Playwright `the README leads with plain privacy outcomes`; [README](../README.md); [live privacy page](evidence/polish-4/live-privacy.png). |
| F-3-1 | Retained the packaged Chrome boundary test and added the equivalent VS Code boundary. Chrome remains storage-only with no tab, history, clipboard, host, or receipt-network path. | `@claim:extension-privacy-boundary`, `@claim:storage-only-permission`, and `@claim:vscode-privacy-boundary` passed from the clean clone; live page/demo requests were same-origin only. |

## Required acceptance work

- One-click demo: live `/` opens `/?demo=1` with the sample hypothesis and sample history. The persistent banner offers Reset demo and Start for real. Reset restores the seed; exit removes all demo keys. Only `demo:draft` and `demo:receipts` exist while active. See [live demo](evidence/polish-4/live-demo.png).
- Claims: all 16 exact commands in `.factory/claims.json` passed independently from a clean checkout. The full suite also passed: 2 Vitest and 35 Playwright tests.
- Routing and accessibility: seven routes passed one-H1/main/lang checks, route metadata, legal links, zero serious/critical Axe violations, zero console errors, focus on route/back navigation, 44 px phone targets, and zero horizontal overflow.
- Privacy and offline: the demo contacted only its own origin, leaving demo cleared its storage, the deployed CSP restricts runtime connections to self, and the service-worker-controlled demo reloaded offline.
- Packages: both public downloads returned 200 and valid ZIP signatures. `unzip -t` passed for the VSIX and Chrome ZIP. The service worker does not require either package in its shell cache.
- Performance: initial JavaScript is 18,764 bytes raw / 6,326 bytes gzip; CSS is 12,686 / 3,650 bytes. Live Lighthouse scored performance 100, accessibility 100, best practices 100, and SEO 100; LCP 1.6 s, CLS 0.002, TBT 30 ms. See [live Lighthouse JSON](evidence/polish-4/lighthouse-live.json).
- Catalog: `.factory/catalog-description.txt` is a verb-first 80-byte line: `Record a hypothesis, test, fix, and clue in VS Code before asking an assistant.`

## Verification record

From `/tmp/solution-trace-polish-4-clean-3z5l3V` at `3fceeab6ec21a34c9637d258821c2fc1d40c827f`:

```sh
npm ci
# each of the 16 exact .factory/claims.json test commands, separately
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
unzip -t dist/site/downloads/show-your-debugging-vscode.vsix
unzip -t dist/site/downloads/show-your-debugging-chrome.zip
```

Everything passed. Production dependency audit found zero vulnerabilities. Local and live `verify-url.sh` checks passed. Local and live Lighthouse reports contain no runtime error and score 100 in all four required categories.

No finding, minor item, TODO, or known product gap remains.
