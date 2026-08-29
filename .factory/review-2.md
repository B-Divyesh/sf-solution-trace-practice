# Adversarial first-read review 2 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** fresh Chromium contexts at 390 × 844 and 1440 × 950; a clean local clone at `/tmp/solution-trace-review-2-7W6uI8`.

## Verdict

**FAIL.** The product is clear, tryable, locally isolated, and technically sound. Two copy findings remain. The acceptance standard requires zero findings, so this is not a pass.

## Cold first read

Before scrolling on both viewports, this reads as a debugging-practice extension for beginning developers who use coding assistants. It asks the visitor to work through a bug before asking for help. The first action is **“Try it with sample data”**; the adjacent text says **“A filled cart-loop hypothesis opens.”**

The first screen answers what it does, who it is for, and what to click first. At 390 × 844, the three factual lines end at 619.19 px, inside the first viewport. There was no horizontal overflow or console error. This part passes.

## Findings

### F-2-1 — Medium — the instructions promise an answer-reveal step that the product does not have

**Location / exact quote:** Landing page, **How the practice works** → **Name one cause**: **“Write a testable hypothesis before you reveal another answer.”**

**Why this fails:** “another answer” has no antecedent and no corresponding control or result in the extension or demo. A first-time visitor cannot tell what is revealed, and the statement is an unlisted functional promise: `claims.json` tests the hypothesis before *test output or a fix*, not before an answer reveal. This contradicts the product boundary that it does not generate answers.

**Concrete fix:** Replace it with **“Write a testable hypothesis before recording test output.”** This is direct, names the next visible step, and is already covered by `hypothesis-first`.

### F-2-2 — Low — the README opens with Chrome implementation jargon instead of the privacy result

**Location / exact quotes:** README introduction: **“Show Your Debugging is a free Chrome MV3 extension for beginning developers.”** and **“Receipts stay in `chrome.storage.local`. The extension requests no tab, file, clipboard, or host access.”**

**Why this fails:** `MV3`, `chrome.storage.local`, and “host access” are implementation terms that a beginning developer does not need to decide whether their debugging notes stay private. The second sentence also makes the privacy benefit less clear than the landing page.

**Concrete fix:** Replace the opening with **“Show Your Debugging is a free Chrome extension for beginning developers.”** Replace the storage/permission lines with **“Receipts stay in this browser. The extension cannot read your tabs, editor files, or clipboard.”** Put the MV3 and `chrome.storage.local` details in the installation or technical-build section if needed.

## Demo and sandbox verification — pass

- One landing click opened `/?demo=1` with the cart loop sample, a filled hypothesis, realistic `RangeError` output, a proposed boundary fix, and a completed prior receipt in sample history.
- The persistent banner read **“Demo — sample data, nothing is saved to your receipts”** and exposed **Reset demo** and **Start for real**.
- A completed sample flow stored only `demo:draft` and `demo:receipts`. Reset restored **“The loop reads one item past the end of the cart.”** Leaving through the wordmark cleared both keys. Clicking **Start for real** also cleared both keys before downloading the ZIP.
- A full live demo request log contained only `https://solution-trace-practice.sociobot.in`; no receipt content was sent to another origin. The fresh service worker controlled the demo and the registered offline-reload claim test passed.

## Claims verification — pass

From the clean clone, each exact command declared in `.factory/claims.json` was run independently as `npm test -- --grep @claim:<id>`. All passed. `npm run typecheck`, the full `npm test` suite (2 Vitest and 27 Playwright tests), and `npm run build` also passed.

| Claim id | Result |
| --- | --- |
| sample-opens | Pass |
| demo-reset | Pass |
| receipt-workflow | Pass |
| receipt-delete | Pass |
| hypothesis-first | Pass |
| local-only | Pass |
| offline-reload | Pass |
| markdown-export | Pass |
| free-download | Pass |
| storage-only-permission | Pass |
| no-code-generation | Pass |
| no-tracking | Pass |

All other landing claim-like statements map to a listed claim except the unsupported answer-reveal wording in F-2-1. The README's functional boundaries map to the listed storage, local-only, tracking, offline, export, and no-code-generation claims; F-2-2 is a plain-language issue, not an unlisted outcome claim.

## Earlier findings rechecked

Every prior review/polish finding was checked on the live product and against the current code. None is merely accepted from its prior status label.

| Earlier id | Live/code confirmation | Status |
| --- | --- | --- |
| F-1-1 | At 390 px, Private, Offline, and Free end at 570.00, 594.59, and 619.19 px. | Fixed |
| F-1-2 | The current 12-entry claims file contains the sample, reset, receipt, and deletion claims; all exact tagged commands passed. | Fixed |
| F-1-3 | The old mood headings are absent; landing, README, and receipt UI consistently use **clue**. | Fixed |
| F-1-4 | Live `/demo`, `/privacy`, `/terms`, and the not-found SPA state update title, description, canonical, Open Graph, and Twitter values. | Fixed |
| F-1-5 | Live `/404.html` has the skip link, four-link header, full footer, metadata, icons, and the designed 404 return action. | Fixed |
| VER-1-download | `/downloads/show-your-debugging-chrome.zip` returned 200 and a valid `PK` ZIP. | Fixed |
| VER-1-offline | The service-worker claim reloaded the demo while offline. | Fixed |
| VER-1-claim-commands | The current exact claim commands all ran from the clean clone. | Fixed |
| VER-1-cache | The live hashed JS/CSS asset policy is immutable in `staticwebapp.config.json`; live assets load correctly. | Fixed |
| VER-2-touch-targets | The 390 px route matrix has no rendered target under 44 × 44 px or overlap. | Fixed |

## Structure, accessibility, routing, and links — pass

- Live `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page` each had one `main`, one `h1`, `lang="en"`, the expected route title, canonical, and no console errors.
- Live Axe scans found no serious or critical violations on that route matrix.
- Keyboard activation of Demo focused **“Make a debugging receipt from this bug”**. Browser Back returned focus to **“Practice the bug before asking for help.”**
- All discovered internal landing assets and links returned 200; external and `mailto:` links are explicit. `robots.txt`, `sitemap.xml`, SVG favicon, Apple touch icon, social card, CSP, and the designed 404 are present.
- The warm-paper, coral-thread, offset-ink system and generated debugging-workbench image are distinct from a generic SaaS template and agree with `.factory/design.md`.

## Missed leverage

No additional AI feature is required. The brief is expressly about preserving independent diagnosis, and the product already includes the obvious supporting export: a completed receipt exports as Markdown. Adding answer-generating AI would weaken the stated job.

## Copy audit

Counts treat hyphenated terms and code-like identifiers as one word. Headings, actions, and fragments are included because they carry meaning to a first-time visitor. No audited item exceeds 22 words or uses a banned marketing adjective. F-2-1 and F-2-2 identify the remaining flags.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Show Your Debugging | 3 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Get extension | 2 | Pass |
| A debugging receipt for learners | 5 | Pass |
| Practice the bug before asking for help | 7 | Pass |
| For beginning developers using coding assistants who want to keep their own debugging habits. | 14 | Pass |
| Try it with sample data | 5 | Pass |
| A filled cart-loop hypothesis opens. | 5 | Pass; `sample-opens` |
| Nothing is saved to your receipts. | 7 | Pass in demo context; `local-only` |
| Private. | 1 | Pass |
| Your entries stay in your browser. | 6 | Pass; `local-only` |
| Offline. | 1 | Pass |
| It works after your first visit. | 6 | Pass; `offline-reload` |
| Free. | 1 | Pass |
| The extension costs nothing. | 4 | Pass; `free-download` |
| Example debugging receipt | 3 | Pass |
| See one complete debugging receipt | 5 | Pass |
| The receipt keeps your reasoning next to the test that changed it. | 12 | Pass; `receipt-workflow` |
| Open the sample practice | 4 | Pass |
| Receipt 014 | 2 | Pass |
| Hypothesis | 1 | Pass |
| The loop reads one item past the end. | 8 | Pass |
| Test output | 2 | Pass |
| RangeError: Item 3 is undefined | 5 | Pass |
| Fix I chose | 3 | Pass |
| Stop the loop before the list length. | 7 | Pass |
| Clue for next time | 4 | Pass |
| Inspect loop bounds when the final item is undefined. | 9 | Pass |
| Three practice steps | 3 | Pass |
| How the practice works | 4 | Pass |
| Name one cause | 3 | Pass |
| Write a testable hypothesis before you reveal another answer. | 9 | **F-2-1**; rewrite to “Write a testable hypothesis before recording test output.” |
| Run one check | 3 | Pass |
| Paste only the output that helped you judge the hypothesis. | 10 | Pass |
| Record your repair | 3 | Pass |
| Save the fix and one clue you can use on the next bug. | 13 | Pass |
| What it does not do | 5 | Pass |
| It does not generate code or answers. | 7 | Pass; `no-code-generation` |
| It does not read your open files. | 7 | Pass; `storage-only-permission` |
| It does not block your coding assistant. | 7 | Pass; `storage-only-permission` |
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Download the extension | 3 | Pass |
| Practice a hypothesis, test, fix, and clue. | 7 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| external site | 2 | Pass |
| Version 1.0.0 · build 2026.08 | 5 | Pass |
| Original generated collage. | 3 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Show Your Debugging | 3 | Pass |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Pass |
| Show Your Debugging is a free Chrome MV3 extension for beginning developers. | 12 | **F-2-2**; rewrite to “Show Your Debugging is a free Chrome extension for beginning developers.” |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | Pass; `receipt-workflow` |
| Receipts stay in `chrome.storage.local`. | 4 | **F-2-2**; rewrite to “Receipts stay in this browser.” |
| The extension requests no tab, file, clipboard, or host access. | 9 | **F-2-2**; rewrite to “The extension cannot read your tabs, editor files, or clipboard.” |
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Live site | 2 | Pass |
| One-click sandbox | 2 | Pass |
| Use the extension | 3 | Pass |
| Download the zip from the live site and unzip it. | 10 | Pass |
| Open `chrome://extensions` and enable Developer mode. | 5 | Pass; required installation step |
| Choose Load unpacked and select the unzipped folder. | 8 | Pass |
| Pin the extension, open it, and write your hypothesis before running the next check. | 14 | Pass |
| The extension is currently available as a zip for manual installation. | 10 | Pass |
| Run locally | 2 | Pass |
| Node 20 or newer is required. | 6 | Pass; development prerequisite |
| To load the development extension, open `chrome://extensions`, enable Developer mode, choose Load unpacked, and select `.output/chrome-mv3` after WXT starts. | 19 | Pass; developer instruction |
| Test | 1 | Pass |
| The command runs unit tests and makes a clean production build. | 11 | Pass |
| It tests each listed claim in Chromium. | 7 | Pass |
| It also scans screens with axe, checks the 390 px layout, and completes a receipt in the packaged extension. | 17 | Pass |
| Run one claim with its command from `.factory/claims.json`. | 8 | Pass |
| For example: | 2 | Pass |
| Build and deploy | 3 | Pass |
| The exact production command is: | 5 | Pass |
| It creates: | 2 | Pass |
| Deploy `dist/site/` as the static root. | 6 | Pass; deployment instruction |
| The included `staticwebapp.config.json` supplies route fallback, the styled 404 page, CSP, and security headers. | 10 | Pass; deployment instruction |
| Product boundaries | 2 | Pass |
| No code generation or answers | 5 | Pass; `no-code-generation` |
| Browser storage is the extension's only permission | 7 | Pass; `storage-only-permission` |
| No access to open tabs or editor files | 7 | Pass; `storage-only-permission` |
| No analytics or third-party runtime scripts | 6 | Pass; `no-tracking` |
| Offline demo after the first visit | 6 | Pass; `offline-reload` |
| Markdown export for completed receipts | 5 | Pass; `markdown-export` |
| The product brief is in `.factory/brief.json`. | 5 | Pass |
| Visual tokens and generated-art provenance are in `.factory/design.md`. | 8 | Pass |
| Demo isolation is in `.factory/demo.md`. | 5 | Pass |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

## What would make this perfect

Remove the nonexistent answer-reveal wording and make the README's privacy result plain before its Chrome implementation details. Then rerun the copy audit and the full claim suite. With those two changes and their verification, no finding remains from this review.
