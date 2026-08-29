# Adversarial first-read review 4 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** fresh Chromium at 390 × 844 and 1440 × 950; clean checkout at `/tmp/solution-trace-review-4-U3rvRR`.

## Verdict

**FAIL.** The page is clear, the one-click demo is real and isolated, and every registered claim passes. The shipped product is a Chrome extension while the researched smallest useful product is a VS Code extension. That is a blocking mismatch; two smaller defects also remain. A pass requires zero findings.

## Cold first read

Before scrolling, this is a debugging-practice tool for beginning developers who use coding assistants. It asks the person to write a hypothesis, test output, fix, and clue before asking for help. The first action is **“Try it with sample data”**; adjacent text says **“A filled cart-loop hypothesis opens. Nothing is saved to your receipts.”**

That answers what it does, for whom, and what to click first at both widths. At 390 × 844 all three factual lines are above the fold. There was no horizontal overflow or console error.

## Findings

### F-4-1 — BLOCKING — the shipped Chrome extension is not the VS Code extension the brief specifies

**Location / evidence:** `.factory/brief.json` specifies **“VS Code extension that asks for a one-line hypothesis before reveal, captures test output and the learner's chosen fix, then produces a local debugging receipt for review.”** The live page and README instead say **“Show Your Debugging is a free Chrome extension for beginning developers.”** Installation says **“Open `chrome://extensions` and enable Developer mode.”** `wxt.config.ts` produces a Chrome MV3 manifest; there is no VS Code manifest or `.vsix`.

**Why this fails:** The learner debugs in VS Code but must leave that editor for a browser toolbar popup. There is no VS Code command, view, or install path. The requested editor surface is the researched smallest useful product, not an optional integration.

**Concrete fix:** Ship a VS Code extension with a command/view and local receipt storage, package it as a `.vsix`, and exercise it in a clean VS Code profile. Update landing, README, demo, claims, and end-to-end tests. Retain the Chrome popup only as a clearly separate supported product.

### F-4-2 — Medium — the landing title does not say what the product does

**Location / exact quote:** Landing `<title>` and social title: **“Show Your Debugging — Practice before asking”**.

**Why this fails:** “Practice before asking” omits the object of both verbs. A tab, history entry, or shared card does not tell a reader this is debugging-receipt practice. Route titles must be “Product — what it does” in plain words, not a context-dependent slogan.

**Concrete fix:** Use **“Show Your Debugging — Record debugging practice”** for the landing title, Open Graph, and Twitter title. Update the route-metadata test to prove the value before JavaScript runs.

### F-4-3 — Low — phone navigation removes the Privacy route with no compact alternative

**Location / evidence:** At 390 px, the rendered header exposes only **Demo** and **Get extension**. `site/src/style.css` hides every non-download link except `/?demo=1` below 560px: `a:not(.nav-download):not([href="/?demo=1"]) { display: none; }`.

**Why this fails:** A newcomer is asked to enter debugging information and sees a privacy statement, but has no direct header path to the policy on the required phone viewport. Desktop has the link; the mobile header is not the same usable skeleton.

**Concrete fix:** Keep a 44 px **Privacy** link in the phone header, or add an accessible compact menu containing Privacy and How it works. Test a keyboard-reachable Privacy route at 390 px.

## Demo and sandbox verification — pass

- One landing click opened `/?demo=1`; the first screen already had the filled cart-loop hypothesis and realistic sample history.
- The persistent banner said **“Demo — sample data, nothing is saved to your receipts”** and supplied **Reset demo** and **Start for real**.
- Completing the sample produced a receipt with hypothesis, `RangeError`, fix, and clue. Reset restored the shipped cart-loop sample. Leaving via the wordmark cleared `demo:draft` and `demo:receipts`.
- A request log for landing, full demo, export, reset, and exit was entirely same-origin. A fresh live service worker controlled the demo after reload; offline reload retained its heading, banner, and offline notice.

## Claims verification — pass

From the clean checkout, every exact command in `.factory/claims.json` was run as `npm test -- --grep @claim:<id>`. All passed. `npm run typecheck`, `npm run build`, and full `npm test` also passed (2 Vitest and 31 Playwright tests).

| Claim id | Result |
| --- | --- |
| `sample-opens` | Pass |
| `demo-reset` | Pass |
| `receipt-workflow` | Pass |
| `receipt-delete` | Pass |
| `hypothesis-first` | Pass |
| `local-only` | Pass |
| `offline-reload` | Pass |
| `markdown-export` | Pass |
| `free-download` | Pass |
| `storage-only-permission` | Pass |
| `extension-privacy-boundary` | Pass |
| `no-code-generation` | Pass |
| `no-tracking` | Pass |

The landing and README claim-like statements map to those entries; no unlisted claim was found. F-4-1 is a product-scope failure, not a claim-registration failure.

## Earlier findings rechecked

Every earlier review, polish record, verification, and handoff was read. Each former finding was checked again against live behavior and current code.

| Earlier finding | Current confirmation | Status |
| --- | --- | --- |
| F-1-1 | All three plain facts fit the initial 390 px viewport. | Fixed |
| F-1-2 | Listed sample/reset/extension claims exist; all exact commands pass. | Fixed |
| F-1-3 | Descriptive headings remain; the final field is consistently **clue**. | Fixed |
| F-1-4 | Demo, legal, and missing routes update title, description, canonical, OG, and Twitter data. | Fixed |
| F-1-5 | `/404.html` has the shared skip link, desktop header, full footer, icons, metadata, and return action. | Fixed |
| F-2-1 | The old answer-reveal wording is gone; instructions name recording test output. | Fixed |
| F-2-2 | README leads with browser-storage privacy language, not MV3 jargon. | Fixed |
| F-3-1 | `extension-privacy-boundary` has a packaged-extension permission/request test. | Fixed |
| Earlier download/offline/claim/cache/touch defects | ZIP is live, offline reload works, commands pass, immutable policy is configured, and targets meet 44 px. | Fixed |

## Structure, routes, accessibility, and links

Confirmed: `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and a missing route each expose one `<main>`, one `<h1>`, `lang="en"`, route-specific description/canonical/OG/Twitter data, and no console error. Browser Back focuses the landing heading after Demo. All discovered same-origin links and the Param Factory link returned 200; mail links are explicit. The warm paper, coral thread, violet ink, and generated debugging-workbench collage are product-specific rather than a generic SaaS template. F-4-2 and F-4-3 remain.

## Missed leverage

The brief does not call for answer-generating AI; that would undermine independent diagnosis. Markdown export is present. The missing leverage is the VS Code surface itself (F-4-1), where the learner would make the receipt while debugging.

## Copy audit

Counts treat hyphenated and code-like terms as one word. No landing or README sentence exceeds 22 words or uses a banned marketing adjective. Headings and controls are direct labels or result-naming verbs. The metadata slogan is recorded separately as F-4-2.

### Landing page sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| Practice the bug before asking for help. | 7 | Pass |
| For beginning developers using coding assistants who want to keep their own debugging habits. | 14 | Pass |
| A filled cart-loop hypothesis opens. | 5 | `sample-opens` |
| Nothing is saved to your receipts. | 7 | `local-only` in demo context |
| Private. Your entries stay in your browser. | 7 | `local-only` |
| Offline. It works after your first visit. | 7 | `offline-reload` |
| Free. The extension costs nothing. | 5 | `free-download` |
| See one complete debugging receipt. | 5 | Pass |
| The receipt keeps your reasoning next to the test that changed it. | 12 | `receipt-workflow` |
| The loop reads one item past the end. | 8 | Sample data |
| RangeError: Item 3 is undefined. | 5 | Sample data |
| Stop the loop before the list length. | 7 | Sample data |
| Inspect loop bounds when the final item is undefined. | 9 | Sample data |
| Write a testable hypothesis before recording test output. | 8 | `hypothesis-first` |
| Paste only the output that helped you judge the hypothesis. | 10 | Pass |
| Save the fix and one clue you can use on the next bug. | 13 | `receipt-workflow` |
| It does not generate code or answers. | 7 | `no-code-generation` |
| It does not read your open files. | 7 | `storage-only-permission` |
| It does not block your coding assistant. | 7 | `storage-only-permission` |
| A receipt records process. | 4 | Honest scope statement |
| It does not prove competence. | 5 | Honest scope statement |
| Practice a hypothesis, test, fix, and clue. | 7 | Pass |
| Built by Param Factory. | 4 | Attribution |
| Original generated collage. | 3 | Asset provenance |

Non-sentence landing labels were also clear: **A debugging receipt for learners**, **Example debugging receipt**, **Three practice steps**, **How the practice works**, **What it does not do**, **Try it with sample data**, **Open the sample practice**, **Download the extension**, and **Get extension**.

### README sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Pass |
| Show Your Debugging is a free Chrome extension for beginning developers. | 11 | F-4-1 scope evidence |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | `receipt-workflow` |
| Receipts stay in this browser. | 5 | `local-only` |
| The extension cannot read your tabs, editor files, or clipboard. | 10 | `extension-privacy-boundary` |
| A receipt records process. | 4 | Honest scope statement |
| It does not prove competence. | 5 | Honest scope statement |
| Download the zip from the live site and unzip it. | 10 | Installation instruction |
| Open `chrome://extensions` and enable Developer mode. | 6 | F-4-1 scope evidence |
| Choose **Load unpacked** and select the unzipped folder. | 8 | Installation instruction |
| Pin the extension, open it, and write your hypothesis before running the next check. | 14 | Installation instruction |
| The extension is currently available as a zip for manual installation. | 10 | Availability statement |
| Node 20 or newer is required. | 6 | Development prerequisite |
| The command runs unit tests and makes a clean production build. | 11 | Test instruction |
| It tests each listed claim in Chromium. | 7 | Test instruction |
| It also scans screens with axe, checks the 390 px layout, and completes a receipt in the packaged extension. | 19 | Test instruction |
| Run one claim with its command from `.factory/claims.json`. | 8 | Test instruction |
| The exact production command is: | 5 | Build instruction |
| Deploy `dist/site/` as the static root. | 6 | Deployment instruction |
| The included `staticwebapp.config.json` supplies route fallback, the styled 404 page, CSP, and security headers. | 14 | Deployment instruction |
| Browser storage is the extension's only permission. | 7 | `storage-only-permission` |
| No access to open tabs or editor files. | 7 | `storage-only-permission` |
| No analytics or third-party runtime scripts. | 6 | `no-tracking` |
| Offline demo after the first visit. | 6 | `offline-reload` |
| Markdown export for completed receipts. | 5 | `markdown-export` |
| The product brief is in `.factory/brief.json`. | 8 | Documentation pointer |
| Visual tokens and generated-art provenance are in `.factory/design.md`. | 10 | Documentation pointer |
| Demo isolation is in `.factory/demo.md`. | 7 | Documentation pointer |
| MIT. | 1 | License statement |

README headings, code blocks, file paths, list fragments, and links are instructions or labels rather than sentences; none uses a metaphor, vague mood heading, or non-result button label.

## What would make this perfect

Deliver the practice as the VS Code extension described in the brief, retain a direct Privacy route in the 390 px header, and make the landing metadata name debugging practice. Then rerun the clean-checkout claim commands, a VS Code profile end-to-end test, and the mobile header/metadata route matrix.

