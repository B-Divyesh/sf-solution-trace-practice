# Polish round 5 evidence

Candidate repaired: `c2d8eafd6a471f9744acfcbdf113654cf23f65e8`  
Review base: `86f2d48d521d52a5234fc4a836791f4611b1e295`  
Product repair commit: `a13f014f0039eebab0bd99595331d2fff7a0c061`  
Deployment: `2c3abf9f-7c71-481f-895d-f9f92b2a3fa1`  
Live URL: <https://solution-trace-practice.sociobot.in>

**Result: PASS — every finding from reviews 1–5 and prior verification records is resolved.**

## Finding map

| Finding | Change retained or made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the three privacy, offline, and free facts above the artwork at phone width. | `the three product facts are visible in the first 390px screen`; fresh live bottoms: 591.59, 616.19, and 640.78 px in an 844 px viewport; [live landing mobile](evidence/polish-5/live-landing/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/>. |
| F-1-2 | Retained the isolated one-click sample, reset/exit behavior, real VS Code and Chrome workflows, and a 16-entry claim manifest with one tag per claim. | `every listed claim has exactly one tagged observable test`; all 16 exact manifest commands passed independently in clean clone `/tmp/solution-trace-polish-5-clean-3ftHCV/repo`; [live demo mobile](evidence/polish-5/live-demo/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/?demo=1>. |
| F-1-3 | Retained direct section names and the single final-field term “clue.” | `.factory/copy-audit.md`; `the practice steps describe the next product action without promising an answer reveal`; [live landing mobile](evidence/polish-5/live-landing/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/>. |
| F-1-4 | Retained per-route title, description, canonical, Open Graph, and Twitter values in prerendered documents and History API navigation. | `built route documents expose correct metadata before JavaScript runs`; cold live matrix passed for `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`; <https://solution-trace-practice.sociobot.in/demo>. |
| F-1-5 | Retained the standalone product-style 404 with the shared skip link, header, footer, legal links, icons, metadata, and return action. | `the standalone 404 uses the shared site skeleton`; cold live route matrix passed at <https://solution-trace-practice.sociobot.in/404.html>. |
| F-2-1 | Retained the truthful next-step sentence: “Write a testable hypothesis before recording test output.” | `the practice steps describe the next product action without promising an answer reveal`; `@claim:hypothesis-first`; [live landing mobile](evidence/polish-5/live-landing/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/>. |
| F-2-2 | Retained a plain-language README opening that names VS Code and local storage before technical details. | `the README leads with plain privacy outcomes`; `.factory/copy-audit.md`; <https://solution-trace-practice.sociobot.in/privacy>. |
| F-3-1 | Retained separately tested Chrome and VS Code privacy boundaries: no private-data permissions or receipt-network path. | `@claim:extension-privacy-boundary`, `@claim:vscode-privacy-boundary`, and `@claim:storage-only-permission`; live request log had only the product origin; <https://solution-trace-practice.sociobot.in/privacy>. |
| F-4-1 | Retained the shipped VS Code Activity Bar extension, commands, local state, Markdown export, confirmed deletion, VSIX packaging, and clearly separate Chrome version. | `@claim:receipt-workflow`, `@claim:receipt-delete`, `@claim:vscode-local-storage`, and `@claim:markdown-export`; live VSIX returned 200 and `PK`; <https://solution-trace-practice.sociobot.in/downloads/show-your-debugging-vscode.vsix>. |
| F-4-2 | Retained the concrete landing and social title “Show Your Debugging — Record debugging practice.” | `the first screen and static document name debugging practice and VS Code`; cold live title and OG title match at <https://solution-trace-practice.sociobot.in/>. |
| F-4-3 | Retained the direct 44 px Privacy link alongside Demo and Get VS Code in the 390 px header. | `Privacy remains directly reachable in the 390px header` and `every rendered 390px touch target is at least 44 by 44 CSS pixels`; [live landing mobile](evidence/polish-5/live-landing/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/>. |
| F-5-1 | Moved `#demo-banner` inside `main`, ahead of route content, so its state and actions belong to the primary landmark without changing the product’s sticky ink-banner treatment. | New `demo controls are in main and have no Axe region violation`; cold live Axe had zero `region`, serious, and critical violations; [live demo mobile](evidence/polish-5/live-demo/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/?demo=1>. |
| F-5-2 | Split the README’s four-outcome test sentence into three focused sentences, all at or below 10 words. | New `the README test description uses one short verification result per sentence`; `.factory/copy-audit.md`; repository documentation finding, so no page screenshot applies. |
| VER-1-download | Retained public deployment of both free extension packages. | `@claim:free-download`; live VSIX is 14,416 bytes and Chrome ZIP is 41,460 bytes, both 200 with `PK`; <https://solution-trace-practice.sociobot.in/downloads/show-your-debugging-vscode.vsix> and <https://solution-trace-practice.sociobot.in/downloads/show-your-debugging-chrome.zip>. |
| VER-1-offline | Retained tolerant service-worker caching that excludes downloads from the required shell and reloads the demo offline. | `@claim:offline-reload` plus cold live offline reload; [live demo desktop](evidence/polish-5/live-demo/screenshot-desktop.png), <https://solution-trace-practice.sociobot.in/?demo=1>. |
| VER-1-claim-commands | Retained argument forwarding and exact per-claim commands. | All 16 commands in `.factory/claims.json` passed separately from the clean clone; `every listed claim has exactly one tagged observable test`. |
| VER-1-cache | Retained immutable one-year caching for hashed assets and narrow policies for the worker and packages. | `release output keeps the extension package and immutable asset policy`; live JS/CSS returned `public, max-age=31536000, immutable`; <https://solution-trace-practice.sociobot.in/>. |
| VER-2-touch-targets | Retained 44 px targets without overlap or phone overflow. | `every rendered 390px touch target is at least 44 by 44 CSS pixels`; cold live matrix reported 0 px overflow; [live landing mobile](evidence/polish-5/live-landing/screenshot-mobile.png), <https://solution-trace-practice.sociobot.in/>. |

## Clean-clone claims and quality gates

From `/tmp/solution-trace-polish-5-clean-3ftHCV/repo` at `a13f014f0039eebab0bd99595331d2fff7a0c061`:

- `npm ci` passed.
- Each exact `npm test -- --grep @claim:<id>` command in `.factory/claims.json` passed independently: `sample-opens`, `demo-reset`, `receipt-workflow`, `receipt-delete`, `browser-receipt-workflow`, `hypothesis-first`, `local-only`, `vscode-local-storage`, `offline-reload`, `markdown-export`, `free-download`, `storage-only-permission`, `extension-privacy-boundary`, `vscode-privacy-boundary`, `no-code-generation`, and `no-tracking`.
- `npm run typecheck` passed.
- `npm test` passed: 2 Vitest tests and 37 Playwright tests, including the real VS Code profile, Chrome package, accessibility scans, mobile geometry, privacy, and offline paths.
- `npm run build` passed. `unzip -t` passed for both packages. `npm audit --omit=dev --audit-level=high` found 0 production vulnerabilities.
- Static budgets from the clean build: JS 18,807 bytes raw / 6,271 gzip; CSS 12,686 / 3,637 gzip.

## Deployment and cold live recheck

- The work-order static deployment completed as `2c3abf9f-7c71-481f-895d-f9f92b2a3fa1`.
- `/opt/fleet/lib/verify-url.sh` passed cold on `/` and `/?demo=1`: 200, title, `lang=en`, one main/H1, complete image alt text, labelled controls, and no browser errors. Its screenshots and JSON are in `evidence/polish-5/live-landing/` and `evidence/polish-5/live-demo/`.
- Fresh live Playwright/Axe checks passed on `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`: route-correct metadata, zero console errors, zero serious/critical Axe issues, zero demo `region` issues, one H1/main, and no 390 px overflow.
- The live demo reset restored the cart-loop sample; it used only `demo:draft` and `demo:receipts`; exiting cleared those keys; cold request logging saw only `https://solution-trace-practice.sociobot.in`; and a service-worker-controlled reload passed offline.
- Live deployment fidelity matched local `dist/site` byte-for-byte for index, 404, worker, packages, and hashed JS/CSS. Live policies include immutable hashed assets, `no-cache` worker, package revalidation, same-origin CSP, `nosniff`, and strict referrer policy.
- Live mobile Lighthouse on `/?demo=1`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.2 s, CLS 0, TBT 0 ms. Report: `evidence/polish-5/lighthouse-live.json`.

No finding, minor item, TODO, or known product gap remains.
