# Adversarial first-read review 7 — PASS

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** fresh Chromium contexts at 390 × 844 and 1440 × 950; clean clone at `/tmp/solution-trace-review-7-dlZTax/repo`.

## Verdict

**PASS.** There are zero blocking, high, medium, low, or minor findings. The first screen is clear, the one-click demo is isolated, every registered claim passed from a clean clone, and all earlier findings are fixed in current code and on the live site.

## Cold first read

Before scrolling, this reads as a VS Code extension that asks beginning developers to record their debugging work before asking a coding assistant for help. The first action is **Try it with sample data**.

- **What it does:** “Practice the bug before asking for help.” It produces a debugging receipt from a hypothesis, test output, fix, and clue.
- **Who it is for:** “For beginning developers in VS Code who want to test their own ideas before asking a coding assistant.”
- **What to click first:** **Try it with sample data**. The adjacent result says, “A filled cart-loop hypothesis opens. Nothing is saved to your receipts.”

The first-screen gate passes. At 390 px, the private, offline, and free facts end at 591.59 px, 616.19 px, and 640.78 px, within the 844 px viewport. There was no horizontal overflow or application console error. The warm paper, coral thread, offset ink, and debugging-workbench art are product-specific rather than a generic SaaS template.

## Demo and sandbox

The landing action reached `/?demo=1` in one click. Its first screen already contained an editable cart-loop hypothesis and realistic sample history. The complete workflow contains a supplied `RangeError`, boundary fix, clue, saved receipt, and Markdown export.

The persistent banner reads **“Demo — sample data, nothing is saved to your receipts”** and exposes **Reset demo** and **Start for real**. Reset restored the shipped data. Demo storage contained only `demo:draft` and `demo:receipts`; leaving with the header wordmark cleared both. A fresh live request log for landing and demo used only `https://solution-trace-practice.sociobot.in`.

After service-worker control, an offline reload showed the demo heading and “Offline — the demo and saved extension receipts still work.” No demo entry touched real extension data.

## Claims

After `npm ci` in the clean clone, every exact manifest command passed independently. The final Playwright result was `passed` with no failed test.

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

Landing, README, demo, and legal capability/privacy statements map to these claims. “A receipt records process” and “It does not prove competence” are honest scope limits, not untestable capability promises. No unlisted claim was found.

## Copy audit

Counts use visible words after Markdown/HTML markup is removed; `VS Code` is two words and hyphenated terms are one. All headings name their section; all buttons name a result; **receipt**, **hypothesis**, **test output**, **fix**, **clue**, and **demo** are consistent. No item exceeds 22 words, uses a banned marketing adjective, or needs a rewrite.

### Landing-page sentences

| Copy | Words | Result |
| --- | ---: | --- |
| For beginning developers in VS Code who want to test their own ideas before asking a coding assistant. | 18 | Pass |
| A filled cart-loop hypothesis opens. | 5 | `sample-opens` |
| Nothing is saved to your receipts. | 7 | `local-only` |
| Private. | 1 | Plain fact label |
| Receipts use VS Code's local extension storage. | 7 | `vscode-local-storage` |
| Offline. | 1 | Plain fact label |
| It works after your first visit. | 6 | `offline-reload` |
| Free. | 1 | Plain fact label |
| The VS Code extension costs nothing. | 6 | `free-download` |
| The receipt keeps your reasoning next to the test that changed it. | 12 | `receipt-workflow` |
| The loop reads one item past the end. | 8 | Sample data |
| RangeError: Item 3 is undefined. | 5 | Sample data |
| Stop the loop before the list length. | 7 | Sample data |
| Inspect loop bounds when the final item is undefined. | 9 | Sample data |
| Write a testable hypothesis before recording test output. | 8 | `hypothesis-first` |
| Paste only the output that helped you judge the hypothesis. | 10 | Direct instruction |
| Save the fix and one clue you can use on the next bug. | 13 | `receipt-workflow` |
| It does not generate code or answers. | 7 | `no-code-generation` |
| It does not read workspace files, open editors, or clipboard contents. | 11 | `vscode-privacy-boundary` |
| A receipt records process. | 4 | Scope limit |
| It does not prove competence. | 5 | Scope limit |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 15 | `browser-receipt-workflow` |
| Practice a hypothesis, test, fix, and clue. | 7 | Footer one-liner |
| Built by Param Factory. | 4 | Attribution |
| Original generated collage. | 3 | Provenance |
| A paper hypothesis, terminal, test strip, and code fix joined by a coral thread. | 15 | Image alternative |

Direct labels also pass: **A debugging receipt for learners**, **Practice the bug before asking for help**, **Example debugging receipt**, **Three practice steps**, **How the practice works**, **What it does not do**, **Separate browser version**, **Use the Chrome toolbar version**, **Try it with sample data**, **Open the sample practice**, **Download for VS Code**, **Download for Chrome**, **Demo**, **Privacy**, and **Get VS Code**.

### README sentences

| Copy | Words | Result |
| --- | ---: | --- |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Plain product summary |
| Show Your Debugging is a free VS Code extension for beginning developers. | 12 | `free-download` |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | `receipt-workflow` |
| Receipts use VS Code's local extension storage. | 7 | `vscode-local-storage` |
| The extension does not read workspace files, open editors, or clipboard contents. | 11 | `vscode-privacy-boundary` |
| A receipt records process. | 4 | Scope limit |
| It does not prove competence. | 5 | Scope limit |
| Download the VSIX from the live site. | 7 | Installation instruction |
| In VS Code, open Extensions, choose the … menu, then choose Install from VSIX…. | 14 | Installation instruction |
| Open Show Your Debugging: Start a Receipt from the Command Palette. | 11 | Installation instruction |
| Write your hypothesis before recording test output. | 7 | `hypothesis-first` |
| The Activity Bar checkmark opens the same receipt view. | 9 | `receipt-workflow` |
| The extension is currently available as a VSIX for manual installation. | 11 | `free-download` |
| Download the Chrome zip from the live site and unzip it. | 11 | Installation instruction |
| Open chrome://extensions, enable Developer mode, choose Load unpacked, and select the unzipped folder. | 12 | Installation instruction |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 15 | `browser-receipt-workflow` |
| Node 20 or newer is required. | 6 | Local-run requirement |
| The VS Code source is in vscode-extension/. | 7 | Repository instruction |
| To load the Chrome development extension, select .output/chrome-mv3 after WXT starts. | 11 | Repository instruction |
| The command runs unit tests and makes a clean production build. | 11 | Test instruction |
| It tests each listed claim in Chromium. | 7 | Test instruction |
| It scans screens with Axe and checks the 390 px layout. | 10 | Test instruction |
| It completes a receipt in a clean VS Code profile. | 10 | Test instruction |
| It checks the Chrome package. | 5 | Test instruction |
| Run one claim with its command from .factory/claims.json. | 9 | Test instruction |
| The exact production command is: | 5 | Build instruction |
| Deploy dist/site/ as the static root. | 6 | Deploy instruction |
| The included staticwebapp.config.json serves supported routes, a styled 404 response, CSP, and security headers. | 14 | Deploy instruction |
| No code generation or answers. | 5 | `no-code-generation` |
| VS Code receipts use local extension storage. | 7 | `vscode-local-storage` |
| No workspace-file, open-editor, or clipboard reads. | 6 | `vscode-privacy-boundary` |
| The Chrome version requests browser storage only. | 7 | `storage-only-permission` |
| No analytics or third-party runtime scripts. | 6 | `no-tracking` |
| Offline demo after the first visit. | 6 | `offline-reload` |
| Markdown export for completed receipts. | 5 | `markdown-export` |
| The product brief is in .factory/brief.json. | 7 | Documentation pointer |
| Visual tokens and generated-art provenance are in .factory/design.md. | 8 | Documentation pointer |
| Demo isolation is in .factory/demo.md. | 6 | Documentation pointer |
| MIT. See LICENSE. | 3 | License statement |

README headings are direct: **Use the VS Code extension**, **Use the separate Chrome version**, **Run locally**, **Test**, **Build and deploy**, **Product boundaries**, and **License**.

## Earlier findings rechecked

Every earlier `review-*.md`, `polish-*.md`, and handoff was read. These are current live/code confirmations, not acceptance of a prior status label.

| Earlier id | Current confirmation | Status |
| --- | --- | --- |
| F-1-1 | All three hero facts are above the 390 px fold. | Fixed |
| F-1-2 | The 16-entry claims manifest has one exact tagged test per claim; all passed independently. | Fixed |
| F-1-3 | Section labels are direct and the final receipt field is always **clue**. | Fixed |
| F-1-4 | Demo, legal, and 404 documents have route-specific title, description, canonical, OG, and Twitter metadata. | Fixed |
| F-1-5 | `/404.html` has the shared skip link, header, footer, metadata, icons, and return action. | Fixed |
| F-2-1 | The instruction says “before recording test output,” and the demo withholds that field until a hypothesis is locked. | Fixed |
| F-2-2 | README leads with the VS Code job and local-storage result, not Chrome MV3 jargon. | Fixed |
| F-3-1 | Chrome and VS Code privacy boundaries are separately claimed and tested. | Fixed |
| F-4-1 | A built VSIX, Activity Bar view, local state, Markdown export, and confirmed deletion work in clean-profile tests. | Fixed |
| F-4-2 | The live title is “Show Your Debugging — Record debugging practice.” | Fixed |
| F-4-3 | The 390 px header visibly provides Demo, Privacy, and Get VS Code. | Fixed |
| F-5-1 | Demo controls are in `main`; fresh live Axe scans have no landmark violation. | Fixed |
| F-5-2 | README test outcomes are split into three short sentences. | Fixed |
| F-6-1 | `GET /review-7-missing-path` returned HTTP 404 with the styled not-found document before JavaScript. | Fixed |

## Structure, routing, accessibility, and links

Fresh checks covered `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and an arbitrary missing path. Supported routes returned 200 and the missing path returned 404. Each page had `lang="en"`, one H1, one main landmark, a route-correct title, description, canonical, Open Graph/Twitter metadata, favicon, and Apple touch icon. The deliberate missing document produced only its expected network 404 console diagnostic; application routes had no console errors.

Fresh Axe scans found no violations. At 390 px there was no overflow. Keyboard activation of Demo focused “Make a debugging receipt from this bug”; browser Back focused “Practice the bug before asking for help.” The landing link crawl returned 200 for every internal route and both downloads, and the Param Factory external link returned 200.

`robots.txt`, `sitemap.xml`, response-header CSP, a designed real 404, reduced-motion handling, local assets, and the shared header/footer are present. `npm test`, `npm run typecheck`, and `npm run build` passed; the build creates `dist/`. `npm audit --omit=dev --audit-level=high` found zero production vulnerabilities.

## Missed leverage

No AI feature is missing. The brief is specifically about preserving independent diagnosis before asking an assistant for an answer; an answer-generating feature would undermine that job. The implied useful handoff, Markdown receipt export, is present and tested.

## What would make this perfect

Keep the first-screen wording, isolated sample, and claim-to-test discipline intact as the extension evolves. Any future capability should be visible in the sample, isolated from real data, and covered by an observable claim test.
