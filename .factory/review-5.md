# Adversarial first-read review 5 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** fresh Chromium contexts at 390 × 844 and 1440 × 950; clean clone at `/tmp/solution-trace-review-5-vdym9D/clone`.

## Verdict

**FAIL.** The product is clear on first read, its sample is usable in one click, the real VS Code extension is present, all 16 registered claims pass, and the route and link checks pass. One previously disclosed accessibility defect remains on the live demo, and one README sentence breaks the copy cap. The required standard is zero findings, so it is blocking.

## Cold first read

Before scrolling, this appears to be a VS Code extension for beginning developers who use coding assistants. It makes them record a hypothesis, a test result, a fix, and a clue before asking for help. The first action is **“Try it with sample data”**; it says a filled cart-loop hypothesis will open.

That answers what it does, who it is for, and what to click first at both widths. On the fresh 390 px visit, the factual lines for local extension storage, offline use, and free download all appeared before the illustration. The page had no horizontal overflow or console error.

## Findings

### F-5-1 — BLOCKING — the live demo banner is outside a landmark

**Location / exact evidence:** Live `/?demo=1`, the banner text **“Demo — sample data, nothing is saved to your receipts”** and its **“Start for real”** link are rendered in `#demo-banner`, a sibling of `<main>`. A fresh Axe scan reports the moderate `region` violation **“All page content should be contained by landmarks”** for `.demo-banner-inner > strong` and `#start-real`. The source is [site/index.html](../site/index.html), where `<div id="demo-banner"></div>` sits between the header and `<main>`.

**Why this fails:** A screen-reader visitor reaches material demo state and its exit action without landmark context. This is also the unresolved gap explicitly recorded in the previous handoff, so it cannot be treated as fixed.

**Concrete fix:** Render the persistent banner inside `<main>` before the demo shell, or give the banner an appropriate labelled landmark such as `<aside aria-label="Demo controls">`. Add an Axe assertion that the live demo has zero `region` violations, not only zero serious or critical violations.

### F-5-2 — Minor — README combines four test outcomes in one overlong sentence

**Location / exact quote:** README, **Test** section: **“It also scans screens with axe, checks the 390 px layout, completes a receipt in a clean VS Code profile, and checks the Chrome package.”** (24 words).

**Why this fails:** The sentence exceeds the 22-word hard cap and combines four different verification results. A newcomer trying to understand what `npm test` protects must unpack a dense list instead of seeing the concrete checks.

**Concrete fix:** Replace it with: **“It scans screens with Axe and checks the 390 px layout. It completes a receipt in a clean VS Code profile. It checks the Chrome package.”**

## Demo and sandbox verification — pass

- One click from the landing action opened `/?demo=1` with **“Make a debugging receipt from this bug”**, the seeded cart-loop hypothesis, and realistic sample history.
- The persistent banner contained **“Demo — sample data, nothing is saved to your receipts”**, **Reset demo**, and **Start for real**.
- Editing the hypothesis then selecting Reset restored **“The loop reads one item past the end of the cart.”** The only demo keys were `demo:draft` and `demo:receipts`.
- Selecting Start for real cleared both keys before the VSIX download. The demo did not read or write real extension storage.
- The fresh landing-plus-demo request log contained only `https://solution-trace-practice.sociobot.in`. No third-party request or console error occurred.
- The independently run `@claim:offline-reload` check passed from the clean clone.

## Claims verification — pass

Each exact command in `.factory/claims.json` passed independently from the clean clone. No test was skipped.

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

The landing and README capability/privacy statements map to these registered claims. The statements about a receipt recording process rather than proving competence are scope limits, not measurable product promises. No unlisted functional or privacy claim was found.

## History recheck

Every earlier `review-*.md`, `polish-*.md`, and the prior handoff was read. These checks were repeated against the current live deployment and source; the prior status labels were not accepted as evidence.

| Earlier finding | Current live/code confirmation | Status |
| --- | --- | --- |
| F-1-1 | At 390 px the three factual lines are visible before the hero art. | Fixed |
| F-1-2 | All 16 listed claims have one exact tagged test; each passed independently. | Fixed |
| F-1-3 | Headings are descriptive and the final receipt field is consistently called a clue. | Fixed |
| F-1-4 | Demo, legal, and not-found routes expose route-specific title, description, canonical, Open Graph, and Twitter values. | Fixed |
| F-1-5 | `/404.html` has the shared skip link, header, footer, metadata, and return action. | Fixed |
| F-2-1 | The instruction says **“Write a testable hypothesis before recording test output.”** The demo withholds the test field until the hypothesis is locked. | Fixed |
| F-2-2 | README leads with the VS Code product and clear local-storage outcome, rather than Chrome MV3 implementation jargon. | Fixed |
| F-3-1 | Chrome and VS Code privacy boundaries are separately listed and tested in `extension-privacy-boundary` and `vscode-privacy-boundary`. | Fixed |
| F-4-1 | A packaged VSIX, VS Code Activity Bar view, commands, local storage, Markdown export, and deletion workflow are present and covered by clean-profile tests. | Fixed |
| F-4-2 | The live title is **“Show Your Debugging — Record debugging practice.”** | Fixed |
| F-4-3 | The 390 px header visibly provides Privacy, Demo, and Get VS Code. | Fixed |
| Earlier download, offline, claim-command, cache, and 44 px touch-target findings | Public packages return 200; offline/reload and all claim commands pass; static headers and mobile controls are present in the current build. | Fixed |
| Handoff 6 `region` known gap | Fresh live Axe on `/?demo=1` still reports the same moderate violation. | **Unfixed: F-5-1** |

## Structure, routing, accessibility, and links

- `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page` each returned 200 with one `<h1>`, one `<main>`, `lang="en"`, a route title, description, canonical URL, Open Graph title, favicon, and Apple touch icon.
- Navigation to Demo moved focus to its H1. Browser Back restored the landing route and focused its H1.
- Every discovered internal link, VSIX, Chrome ZIP, and `https://sociobot.in/` link returned 200. The two email links are explicit `mailto:` links.
- `robots.txt` and `sitemap.xml` are live; the sitemap lists `/`, `/demo`, `/privacy`, and `/terms`. The 404 is designed and provides a return path.
- The warm-paper, coral-thread, offset-ink collage matches the documented visual thesis and is not a generic SaaS card/gradient layout.
- No serious or critical Axe issue was found. F-5-1 remains because the moderate demo `region` issue is still a real accessibility defect and the required verdict permits no remaining finding.

## Missed leverage

No AI feature is missing. The brief's job is independent debugging practice, and answer-generating AI would weaken that constraint. The obvious non-AI handoff feature, Markdown receipt export, is present and tested. No provider key or decorative AI feature was found.

## Copy audit

Counts treat hyphenated terms, URLs, and code identifiers as one word. Headings and controls were also checked: they are descriptive; **Try it with sample data**, **Open the sample practice**, **Download for VS Code**, **Download for Chrome**, and **Reset demo** name their outcomes. F-5-2 is the only sentence above 22 words. No banned marketing adjective, mood heading, or inconsistent receipt term was found.

### Landing page sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| For beginning developers in VS Code who want to test their own ideas before asking a coding assistant. | 18 | Pass |
| A filled cart-loop hypothesis opens. | 5 | `sample-opens` |
| Nothing is saved to your receipts. | 7 | `local-only` in demo context |
| Private. | 1 | Label |
| Receipts use VS Code's local extension storage. | 7 | `vscode-local-storage` |
| Offline. | 1 | Label |
| It works after your first visit. | 6 | `offline-reload` |
| Free. | 1 | Label |
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
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 16 | `browser-receipt-workflow` |
| Practice a hypothesis, test, fix, and clue. | 7 | Footer one-liner |
| Built by Param Factory. | 4 | Attribution |
| Original generated collage. | 3 | Asset provenance |

### README sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Product summary |
| Show Your Debugging is a free VS Code extension for beginning developers. | 12 | `free-download` |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | `receipt-workflow` |
| Receipts use VS Code's local extension storage. | 7 | `vscode-local-storage` |
| The extension does not read workspace files, open editors, or clipboard contents. | 12 | `vscode-privacy-boundary` |
| A receipt records process. | 4 | Scope limit |
| It does not prove competence. | 5 | Scope limit |
| Live site: `https://solution-trace-practice.sociobot.in` | 2 | Link |
| One-click sandbox: `https://solution-trace-practice.sociobot.in/?demo=1` | 2 | Link |
| Download the VSIX from the live site. | 7 | Installation instruction |
| In VS Code, open Extensions, choose the … menu, then choose Install from VSIX…. | 15 | Installation instruction |
| Open Show Your Debugging: Start a Receipt from the Command Palette. | 10 | Installation instruction |
| Write your hypothesis before recording test output. | 7 | `hypothesis-first` |
| The Activity Bar checkmark opens the same receipt view. | 9 | `receipt-workflow` |
| The extension is currently available as a VSIX for manual installation. | 11 | Download/install fact |
| Download the Chrome zip from the live site and unzip it. | 10 | Installation instruction |
| Open `chrome://extensions`, enable Developer mode, choose Load unpacked, and select the unzipped folder. | 11 | Installation instruction |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 16 | `browser-receipt-workflow` |
| Node 20 or newer is required. | 5 | Run requirement |
| The VS Code source is in `vscode-extension/`. | 6 | Repository instruction |
| To load the Chrome development extension, select `.output/chrome-mv3` after WXT starts. | 11 | Repository instruction |
| The command runs unit tests and makes a clean production build. | 11 | Test-command description |
| It tests each listed claim in Chromium. | 7 | Test-command description |
| It also scans screens with axe, checks the 390 px layout, completes a receipt in a clean VS Code profile, and checks the Chrome package. | 24 | **F-5-2: split into three sentences** |
| Run one claim with its command from `.factory/claims.json`. | 10 | Test instruction |
| For example: | 2 | Introduction |
| The exact production command is: | 6 | Build instruction |
| It creates: | 2 | Introduction |
| Deploy `dist/site/` as the static root. | 6 | Deploy instruction |
| The included `staticwebapp.config.json` supplies route fallback, the styled 404 page, CSP, and security headers. | 12 | Deploy instruction |
| No code generation or answers. | 5 | `no-code-generation` |
| VS Code receipts use local extension storage. | 7 | `vscode-local-storage` |
| No workspace-file, open-editor, or clipboard reads. | 5 | `vscode-privacy-boundary` |
| The Chrome version requests browser storage only. | 7 | `storage-only-permission` |
| No analytics or third-party runtime scripts. | 6 | `no-tracking` |
| Offline demo after the first visit. | 6 | `offline-reload` |
| Markdown export for completed receipts. | 5 | `markdown-export` |
| The product brief is in `.factory/brief.json`. | 6 | Repository link |
| Visual tokens and generated-art provenance are in `.factory/design.md`. | 8 | Repository link |
| Demo isolation is in `.factory/demo.md`. | 6 | Repository link |
| MIT. | 1 | License label |
| See LICENSE. | 2 | License link |

## What would make this perfect

Place the demo controls in a labelled landmark, split the README test sentence, and make the Axe `region` rule part of the live demo acceptance test. Then rerun the same clean-clone claim matrix and live mobile/desktop route checks.
