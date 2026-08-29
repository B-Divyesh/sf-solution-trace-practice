# Adversarial first-read review 3 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Method:** fresh Chromium contexts at 390 × 844 and 1440 × 950; clean clone at `/tmp/solution-trace-review-3-4yLxfe`.

## Verdict

**FAIL.** The real workflow, sample demo, routes, and registered claims passed. One privacy claim is published without a matching `claims.json` entry and tagged observable test. The acceptance rule is zero findings.

## Cold first read

Before scrolling, this is a browser extension for beginning developers using coding assistants. It makes the person record a hypothesis, test output, fix, and clue before asking for help. The first action is **“Try it with sample data”**; its adjacent text says **“A filled cart-loop hypothesis opens. Nothing is saved to your receipts.”**

The first screen answers what it does, for whom, and what to click first at both widths. At 390 × 844, the three factual lines end at 570.00px, 594.59px, and 619.19px: all are above the fold. No horizontal overflow or console errors occurred.

## Findings

### F-3-1 — High — clipboard, history, and extension-network privacy promises are unlisted and untested

**Location / exact quotes:**

- README introduction: **“The extension cannot read your tabs, editor files, or clipboard.”**
- Privacy → What the extension can access: **“It cannot read open tabs, editor files, clipboard contents, or browsing history.”**
- Privacy → Network use: **“The extension sends no receipt content over the network.”**

**Why this fails:** `storage-only-permission` is listed as **“The extension does not read open files or tabs, and it does not block coding assistants.”** Its test checks only the MV3 manifest's requested permissions, host permissions, and content scripts. `local-only` records web-demo requests and demo localStorage; `no-tracking` records landing/demo requests. No claim entry or tagged test names clipboard access, browser-history access, or receipt-content network use by the packaged extension. These are concrete privacy commitments that a user can rely on.

**Concrete fix:** Add a single narrowly worded `extension-privacy-boundary` claim, for example **“The extension has no tab, history, clipboard, or host permission and sends no receipt content over the network.”** Tag an extension-profile test that asserts the manifest has only `storage`, no host permissions/content scripts, records extension worker/page requests during a completed receipt flow, and asserts no external receipt request. Alternatively, remove the three unregistered clauses and retain only the tested storage/tab/file wording. Do not mark the finding fixed until the new exact claim command passes from a clean clone.

## Demo and sandbox verification — pass

- The landing CTA reached `/?demo=1` in one click. The initial screen already contained a realistic filled cart-loop hypothesis and a completed profile-request receipt in sample history.
- The persistent banner read **“Demo — sample data, nothing is saved to your receipts”** and offered **Reset demo** and **Start for real**.
- Completing the sample produced a receipt containing its hypothesis, `RangeError`, chosen boundary fix, and clue. The only keys were `demo:draft` and `demo:receipts`.
- Reset restored **“The loop reads one item past the end of the cart.”** Leaving through the wordmark removed both keys.
- A fresh live service worker controlled the demo. With the browser offline, reload rendered **“Make a debugging receipt from this bug”** and the offline status line.
- Landing plus the completed demo emitted no third-party requests and no console errors.

## Claims verification — pass for all registered claims

From the clean clone, each command below was run independently exactly as recorded. All passed. `npm run typecheck`, full `npm test` (2 Vitest + 29 Playwright), `npm run build`, and `npm audit --omit=dev --audit-level=high` also passed locally; the build produced `dist/`.

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

F-3-1 is an **unlisted claim** finding, not a failing registered command.

## Earlier findings rechecked

Every earlier review, polish, verification, and handoff document was read. The following checks were repeated on live pages and the current code; no prior finding is only accepted from its prior status label.

| Earlier id | Current confirmation | Status |
| --- | --- | --- |
| F-1-1 | The three factual lines are all inside the 390px first viewport (bottoms: 570.00, 594.59, 619.19px). | Fixed |
| F-1-2 | The current 12 registered commands all pass independently from a clean clone; the sample/reset/extension claims are present. | Fixed, except the new distinct F-3-1 privacy wording gap. |
| F-1-3 | Descriptive headings remain; the visitor-facing receipt term is consistently **clue**. | Fixed |
| F-1-4 | Live demo, legal, and not-found routes expose their own title, description, canonical, Open Graph, and Twitter values. | Fixed |
| F-1-5 | Live `/404.html` has the shared skip link, four-link header, full footer, icons, metadata, and return action. | Fixed |
| F-2-1 | The instruction now reads **“Write a testable hypothesis before recording test output.”** and the demo enforces that order. | Fixed |
| F-2-2 | README now says **“free Chrome extension”** and gives the browser-storage privacy outcome before technical setup. | Fixed |
| VER-1-download | The public extension ZIP returns 200. | Fixed |
| VER-1-offline | A service-worker-controlled live demo reloaded while offline. | Fixed |
| VER-1-claim-commands | All 12 exact `npm test -- --grep @claim:<id>` commands passed in the clean clone. | Fixed |
| VER-1-cache | Current static configuration gives hashed assets an immutable one-year policy. | Fixed |
| VER-2-touch-targets | The mobile route matrix has no rendered target below 44 × 44px and no overlap. | Fixed |

## Structure, routing, accessibility, and identity — pass

- `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page` each returned 200, one `main`, one `h1`, `lang="en"`, a route-specific title/description/canonical/OG title, favicon, and Apple touch icon. No console error occurred.
- The header and footer are consistent across that matrix. The header has the wordmark, Demo, How it works, Privacy, and download links; the footer includes Privacy, Terms, attribution, and build identifier.
- All discovered links (including the ZIP, external factory link, and mail links) resolved or were explicit `mailto:` links. Back navigation restores the landing route, and route navigation moves focus to the destination heading.
- The risograph-paper, coral-thread, offset-ink composition is specific to debugging evidence and differs from a generic SaaS card/gradient template. It agrees with `.factory/design.md` and uses the documented original generated collage.
- The brief's central job is independent diagnosis. Adding answer-generating AI would weaken it; Markdown receipt export already supplies the clearly useful handoff feature. There is no decorative AI feature or embedded provider key.

## Copy audit

Counts treat hyphenated words and code-like identifiers as one word. Headings, actions, and short labels are included because their clarity and context are separately required. No item exceeds 22 words, uses a banned marketing adjective, depends on a mood/metaphor heading, or uses a non-result-naming action. The only copy-related flag is the unlisted privacy promise in F-3-1.

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
| Nothing is saved to your receipts. | 7 | Pass; `local-only` |
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
| Write a testable hypothesis before recording test output. | 8 | Pass; `hypothesis-first` |
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
| A paper hypothesis, terminal, test strip, and code fix joined by a coral thread. (image alt) | 15 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Show Your Debugging | 3 | Pass |
| Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer. | 15 | Pass |
| Show Your Debugging is a free Chrome extension for beginning developers. | 11 | Pass; `free-download` |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | Pass; `receipt-workflow` |
| Receipts stay in this browser. | 5 | Pass; `local-only` |
| The extension cannot read your tabs, editor files, or clipboard. | 10 | **F-3-1** |
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Live site | 2 | Pass |
| One-click sandbox | 2 | Pass |
| Use the extension | 3 | Pass |
| Download the zip from the live site and unzip it. | 10 | Pass |
| Open `chrome://extensions` and enable Developer mode. | 5 | Pass; install instruction |
| Choose Load unpacked and select the unzipped folder. | 8 | Pass; install instruction |
| Pin the extension, open it, and write your hypothesis before running the next check. | 14 | Pass |
| The extension is currently available as a zip for manual installation. | 10 | Pass |
| Run locally | 2 | Pass |
| Node 20 or newer is required. | 6 | Pass; development prerequisite |
| To load the development extension, open `chrome://extensions`, enable Developer mode, choose Load unpacked, and select `.output/chrome-mv3` after WXT starts. | 19 | Pass; development instruction |
| Test | 1 | Pass |
| The command runs unit tests and makes a clean production build. | 11 | Pass; checked locally |
| It tests each listed claim in Chromium. | 7 | Pass; checked locally |
| It also scans screens with axe, checks the 390 px layout, and completes a receipt in the packaged extension. | 17 | Pass; checked locally |
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

Register and independently test the extension privacy boundary or remove the extra clipboard/history/network promises. Then rerun the exact new claim command from a clean clone, the full test suite, and the live extension request check. With that evidence, this review has no remaining finding.
