# Adversarial first-read review 6 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** Fresh Chromium contexts at 390 × 844 and 1440 × 950; clean clone at `/tmp/solution-trace-review-6-DNeCSZ/repo`.

## Verdict

**FAIL.** The product is clear on first read, the sample is real and isolated, and every listed claim passes. One route advertised as a not-found page returns HTTP 200 for an unknown URL. This makes a nonexistent page a successful document to crawlers, caches, and link checkers. The acceptance standard is zero findings.

## Cold first read

Before scrolling, this reads as a VS Code extension for beginning developers who use coding assistants. It has the visitor record a hypothesis, test result, fix, and clue before asking for help. The first action is **“Try it with sample data”**; the immediately adjacent explanation is **“A filled cart-loop hypothesis opens. Nothing is saved to your receipts.”**

That answers what it does, for whom, and what to click first on phone and desktop. On the 390 × 844 cold screen, the three factual rows are visible before the illustration: local extension storage, offline after the first visit, and free. There was no console error or horizontal overflow.

## Findings

### F-6-1 — BLOCKING — an arbitrary missing URL is served with HTTP 200, not a real 404

**Location / evidence:** `GET https://solution-trace-practice.sociobot.in/missing-page` returned **`HTTP/2 200`** with the landing shell (3,301 bytes). After JavaScript runs it changes that shell into the designed **“This page does not exist”** screen. The deployed `site/public/staticwebapp.config.json` contains both `navigationFallback: { "rewrite": "/index.html" }` and a 404 override to `/404.html`; the fallback handles this unknown URL before the 404 override can apply.

**Why this fails:** A visitor sees a useful recovery page, but an unknown URL is still a successful resource to crawlers, monitoring, browser caches, and external link checkers. It is not the required real 404 route. The current local test treats `/missing-page` as a normal 200 route, so it preserves the defect rather than detecting it.

**Concrete fix:** Do not use a catch-all navigation fallback for unknown addresses. Serve the generated real route documents (`/demo`, `/privacy`, and `/terms`) directly or with explicit rewrites, then let an unmatched path reach `responseOverrides["404"]` and retain status 404 while serving the styled `/404.html`. Add a deployment-level test that requests a unique unknown path with JavaScript disabled and asserts status 404, the not-found title, one H1, and a return-home link. Retain a separate deep-link reload test for every supported route.

## Demo and sandbox verification — pass

- The first-screen action reaches `/?demo=1` in one click.
- The first demo screen is already the real three-step practice UI, seeded with a realistic cart-loop boundary bug, test command, `RangeError`, proposed fix, and a prior sample receipt.
- The persistent banner reads **“Demo — sample data, nothing is saved to your receipts”** and exposes **Reset demo** and **Start for real**.
- A fresh demo context used only `demo:draft` and `demo:receipts`. Reset restored the shipped cart-loop draft and sample history. The request log contained only `https://solution-trace-practice.sociobot.in`.
- The exact reset/exit claim test confirms that leaving through Home and starting the real VS Code download clear the demo keys. The offline claim test passed from a fresh context after service-worker control.

## Claims and clean-clone verification — pass

From the clean clone, `npm ci` passed. Every exact command listed in `.factory/claims.json` passed independently:

| Claim id | Result |
| --- | --- |
| `sample-opens` | Pass |
| `demo-reset` | Pass |
| `receipt-workflow` | Pass |
| `receipt-delete` | Pass |
| `browser-receipt-workflow` | Pass |
| `hypothesis-first` | Pass |
| `local-only` | Pass |
| `vscode-local-storage` | Pass |
| `offline-reload` | Pass |
| `markdown-export` | Pass |
| `free-download` | Pass |
| `storage-only-permission` | Pass |
| `extension-privacy-boundary` | Pass |
| `vscode-privacy-boundary` | Pass |
| `no-code-generation` | Pass |
| `no-tracking` | Pass |

`npm test` passed (2 Vitest tests and 37 Playwright tests), as did `npm run typecheck` and `npm run build`. The built site JavaScript is 18,807 bytes raw and 6,271 bytes gzip. The review found no unlisted visitor-reliant claim on the landing page or README: sample opening, demo isolation, local storage, offline behavior, free downloads, receipt workflow, hypothesis order, extension privacy boundaries, no code generation, no tracking, and Markdown export each map to a named claim. Operational build instructions and original-art provenance are documentation, not product promises.

## Earlier findings rechecked

Every prior review and polish record was read. These are current live-and-source confirmations, not acceptance of a prior status label.

| Earlier id | Current confirmation | Status |
| --- | --- | --- |
| F-1-1 | All three facts end above 641 px in the 844 px phone viewport. | Fixed |
| F-1-2 | The 16-entry manifest has one exact tagged test per claim; all ran independently. | Fixed |
| F-1-3 | Landing section labels are descriptive and the final field is consistently called “clue.” | Fixed |
| F-1-4 | Demo, legal, and not-found documents expose route-specific title, description, canonical, OG, and Twitter values. | Fixed |
| F-1-5 | `/404.html` has the shared skip link, header, full footer, route metadata, and return action. | Fixed; see new HTTP-status defect F-6-1. |
| F-2-1 | The instruction says “Write a testable hypothesis before recording test output,” and the demo withholds test output first. | Fixed |
| F-2-2 | README begins with VS Code and plain local-storage outcomes, not Chrome MV3 jargon. | Fixed |
| F-3-1 | Chrome and VS Code privacy boundaries have distinct packaged-product tests. | Fixed |
| F-4-1 | A downloadable VSIX, Activity Bar view, command, local state, Markdown export, and confirmed deletion work in a clean VS Code profile. | Fixed |
| F-4-2 | Landing title and social title are “Show Your Debugging — Record debugging practice.” | Fixed |
| F-4-3 | The 390 px header keeps a visible, keyboard-reachable Privacy link. | Fixed |
| F-5-1 | Demo controls are inside `main`; fresh Axe scans found no `region`, serious, or critical violation. | Fixed |
| F-5-2 | README splits the test outcomes into short sentences. | Fixed |

## Structure, accessibility, routes, links, and identity

The live `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, and `/404.html` routes each have one H1, one main landmark, a route-correct title/description/canonical/OG/Twitter set, header, footer, skip link, no console errors, and no Axe violations. Keyboard navigation to Demo and browser Back move focus to the new H1. All internal links and the external factory link returned 200; mail links are explicit. `robots.txt`, `sitemap.xml`, favicon, apple-touch icon, theme color, same-origin CSP, and the distinct risograph evidence-trail visual system are present. The only route failure is F-6-1.

## Missed leverage

No additional AI feature is expected. The brief’s value is a local-first constraint that preserves independent diagnosis, and the product already includes the implied useful export: a Markdown debugging receipt. Generating answers would conflict with the documented boundary rather than improve the job.

## Copy audit

Counts treat `VS Code`, hyphenated terms, code-like labels, headings, controls, and fragments as visitor-facing copy. All are at or below 22 words. No banned marketing word, unexplained jargon, inconsistent core term, non-result button, mood heading, or unlisted claim was found.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Show Your Debugging | 3 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Get VS Code | 3 | Pass |
| A debugging receipt for learners | 5 | Pass |
| Practice the bug before asking for help | 7 | Pass |
| For beginning developers in VS Code who want to test their own ideas before asking a coding assistant. | 18 | Pass |
| Try it with sample data | 5 | Pass; result-naming verb |
| A filled cart-loop hypothesis opens. | 5 | Pass; `sample-opens` |
| Nothing is saved to your receipts. | 7 | Pass; `local-only` |
| Private. Receipts use VS Code's local extension storage. | 8 | Pass; `vscode-local-storage` |
| Offline. It works after your first visit. | 7 | Pass; `offline-reload` |
| Free. The VS Code extension costs nothing. | 7 | Pass; `free-download` |
| Example debugging receipt | 3 | Pass |
| See one complete debugging receipt | 5 | Pass |
| The receipt keeps your reasoning next to the test that changed it. | 12 | Pass; `receipt-workflow` |
| Open the sample practice | 4 | Pass; result-naming verb |
| Receipt 014 | 2 | Pass |
| Hypothesis | 1 | Pass |
| The loop reads one item past the end. | 8 | Pass; sample data |
| Test output | 2 | Pass |
| RangeError: Item 3 is undefined | 5 | Pass; sample data |
| Fix I chose | 3 | Pass |
| Stop the loop before the list length. | 7 | Pass; sample data |
| Clue for next time | 4 | Pass |
| Inspect loop bounds when the final item is undefined. | 9 | Pass; sample data |
| Three practice steps | 3 | Pass |
| How the practice works | 4 | Pass |
| Name one cause | 3 | Pass |
| Write a testable hypothesis before recording test output. | 8 | Pass; `hypothesis-first` |
| Run one check | 3 | Pass |
| Paste only the output that helped you judge the hypothesis. | 10 | Pass |
| Record your repair | 3 | Pass |
| Save the fix and one clue you can use on the next bug. | 13 | Pass; `receipt-workflow` |
| What it does not do | 5 | Pass |
| It does not generate code or answers. | 7 | Pass; `no-code-generation` |
| It does not read workspace files, open editors, or clipboard contents. | 11 | Pass; `vscode-privacy-boundary` |
| A receipt records process. | 4 | Pass; boundary |
| It does not prove competence. | 5 | Pass; boundary |
| Download for VS Code | 4 | Pass; result-naming verb |
| Separate browser version | 3 | Pass |
| Use the Chrome toolbar version | 5 | Pass |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 15 | Pass; `browser-receipt-workflow` |
| Download for Chrome | 3 | Pass; result-naming verb |
| Practice a hypothesis, test, fix, and clue. | 7 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Version 1.0.0 · build 2026.08 | 5 | Pass |
| Original generated collage. | 3 | Pass; provenance |
| A paper hypothesis, terminal, test strip, and code fix joined by a coral thread. | 15 | Pass; image alternative |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Show Your Debugging | 3 | Pass |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Pass |
| Show Your Debugging is a free VS Code extension for beginning developers. | 12 | Pass; `free-download` |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | Pass; `receipt-workflow` |
| Receipts use VS Code's local extension storage. | 7 | Pass; `vscode-local-storage` |
| The extension does not read workspace files, open editors, or clipboard contents. | 11 | Pass; `vscode-privacy-boundary` |
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Live site | 2 | Pass |
| One-click sandbox | 2 | Pass |
| Use the VS Code extension | 5 | Pass |
| Download the VSIX from the live site. | 7 | Pass; `free-download` |
| In VS Code, open Extensions, choose the … menu, then choose Install from VSIX…. | 14 | Pass |
| Open Show Your Debugging: Start a Receipt from the Command Palette. | 11 | Pass; `receipt-workflow` |
| Write your hypothesis before recording test output. | 7 | Pass; `hypothesis-first` |
| The Activity Bar checkmark opens the same receipt view. | 9 | Pass; `receipt-workflow` |
| The extension is currently available as a VSIX for manual installation. | 10 | Pass; `free-download` |
| Use the separate Chrome version | 5 | Pass |
| Download the Chrome zip from the live site and unzip it. | 11 | Pass; `free-download` |
| Open chrome://extensions, enable Developer mode, choose Load unpacked, and select the unzipped folder. | 12 | Pass |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 15 | Pass; `browser-receipt-workflow` |
| Run locally | 2 | Pass |
| Node 20 or newer is required. | 6 | Pass |
| The VS Code source is in vscode-extension/. | 7 | Pass |
| To load the Chrome development extension, select .output/chrome-mv3 after WXT starts. | 11 | Pass; technical setup |
| Test | 1 | Pass |
| The command runs unit tests and makes a clean production build. | 11 | Pass; technical setup |
| It tests each listed claim in Chromium. | 7 | Pass; technical setup |
| It scans screens with Axe and checks the 390 px layout. | 10 | Pass |
| It completes a receipt in a clean VS Code profile. | 10 | Pass |
| It checks the Chrome package. | 5 | Pass |
| Run one claim with its command from .factory/claims.json. | 9 | Pass |
| For example: | 2 | Pass |
| Build and deploy | 3 | Pass |
| The exact production command is: | 5 | Pass |
| It creates: | 2 | Pass |
| dist/site/index.html and the static deploy tree | 6 | Pass |
| dist/site/downloads/show-your-debugging-vscode.vsix | 1 | Pass |
| dist/site/downloads/show-your-debugging-chrome.zip | 1 | Pass |
| dist/vscode-extension/ for VS Code extension development | 5 | Pass |
| dist/extension/ for Chrome unpacked installation | 5 | Pass |
| Deploy dist/site/ as the static root. | 6 | Pass |
| The included staticwebapp.config.json supplies route fallback, the styled 404 page, CSP, and security headers. | 12 | F-6-1: the deployed fallback prevents a real missing-path 404; rewrite as “The configuration serves supported routes, a styled 404 response, CSP, and security headers.” after the status test passes. |
| Product boundaries | 2 | Pass |
| No code generation or answers | 5 | Pass; `no-code-generation` |
| VS Code receipts use local extension storage | 7 | Pass; `vscode-local-storage` |
| No workspace-file, open-editor, or clipboard reads | 6 | Pass; `vscode-privacy-boundary` |
| The Chrome version requests browser storage only | 7 | Pass; `storage-only-permission` |
| No analytics or third-party runtime scripts | 6 | Pass; `no-tracking` |
| Offline demo after the first visit | 6 | Pass; `offline-reload` |
| Markdown export for completed receipts | 5 | Pass; `markdown-export` |
| The product brief is in .factory/brief.json. | 7 | Pass |
| Visual tokens and generated-art provenance are in .factory/design.md. | 8 | Pass |
| Demo isolation is in .factory/demo.md. | 6 | Pass |
| License | 1 | Pass |
| MIT. See LICENSE. | 3 | Pass |

## What would make this perfect

Serve an actual HTTP 404 for a cold arbitrary missing address while preserving direct reloads for `/demo`, `/privacy`, and `/terms`. Add the status-level deployment test, then rerun the full claim matrix, live route matrix, and cold phone first-screen check. No other change is currently required.
