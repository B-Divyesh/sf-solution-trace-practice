# Adversarial first-read review 1 — FAIL

**Product:** Show Your Debugging  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Reviewed:** 2026-08-29 UTC  
**Viewport:** fresh Chromium contexts at 390 × 844 and 1440 × 950

## Verdict

**FAIL.** The central workflow is real and the prior release blockers are repaired, but there are five remaining findings. A strict pass requires zero findings, including copy, claim-registration, and route-metadata defects.

## Cold first read

Before scrolling, the site says this is a practice tool for beginning developers using coding assistants. It asks them to write through a bug before seeking help. The first action is **“Try it with sample data”**; its adjacent copy says **“A ready bug opens. Nothing is saved to your receipts.”**

That answers what it does, who it is for, and what to click first on both tested viewports. This part passes. The 390px first viewport does **not** show the required privacy, offline, and free facts: the first fact begins at y=839.6px and the viewport ends at y=844px. This is recorded as F-1-1.

## Findings

### F-1-1 — High — required first-screen facts are below the 390px fold

**Location / evidence:** Landing hero at 390 × 844. The CTA occupies y=696–742px; **“Private. Your entries stay in your browser.”** begins at y=839.6px, followed by the offline and free facts below it. The cold screenshot shows only the headline, audience, CTA, and its explanatory line.

**Why this fails:** Privacy, offline availability, and price are mandatory first-screen facts. On the phone viewport named in this review, a visitor must scroll to see all three. The privacy fact is particularly material before trying a tool that asks for debugging output.

**Concrete fix:** Keep the three one-line facts above the fold at 390px. For example, place the artwork after the hero copy on mobile, reduce its vertical allocation, or move the facts immediately below the CTA and before the artwork. Add a Playwright assertion at 390px that all three fact rows have `getBoundingClientRect().bottom <= innerHeight` on initial load.

### F-1-2 — High — several visitor-facing claims have no matching `claims.json` entry or observable claim test

**Location / exact copy:**

- Landing CTA detail: **“A ready bug opens.”**
- README, Chrome Web Store note: **“The factory can publish the same MV3 package later.”**
- README, Product boundaries: **“No code generation, assistant blocking, grading, accounts, or surveillance”** (the existing entries cover code generation, assistant blocking, and no third-party tracking, but do not register or test no grading, accounts, or surveillance).
- README, Product boundaries: **“No source or test capture unless the learner pastes it”** (the existing permission test does not establish this exact behavioral boundary).

**Why this fails:** The claims contract requires every statement a visitor could rely on to have a `claims.json` entry and one tagged observable test, or to be removed. The live page and README make these commitments, but the eight registered claims do not cover them all. A future-publication promise is also not useful first-read product copy.

**Concrete fix:** Either delete the future-publication sentence and unsupported broad boundaries, or add narrowly worded claims plus tests. For example: add a `sample-opens` claim that opens `/demo` from the CTA and asserts the seeded cart-loop hypothesis and test output; replace the broad boundary sentence with separately testable statements; test the extension has no account/auth UI and no grading output, and test that pasted input is the only source/test-content entry path. Do not use “surveillance”; state the observable privacy behavior instead.

### F-1-3 — Medium — copy uses mood/metaphor headings and inconsistent terminology

**Location / exact copy:**

- Landing figure caption: **“Follow the evidence from guess to fix.”**
- Landing kicker: **“The product, not a promise”**
- Landing kicker: **“Three deliberate pauses”**
- Landing kicker: **“A notebook, not a judge”**
- README / footer: **“Practice a hypothesis, test, fix, and lesson.”** while the product UI calls the same reusable final field **“Clue for next time.”**
- README: **“The factory owns infrastructure and DNS.”**

**Why this fails:** The first four are slogans or mood labels, not section names. They do not tell a screen-reader user what the following section contains. “Lesson” and “clue” name the same receipt field differently, which weakens a new visitor’s mental model. The infrastructure sentence is internal jargon with no user decision attached.

**Concrete fix:** Use direct section names and one field name everywhere. Suggested replacements: **“Example debugging receipt”** for the preview section/caption; **“Three practice steps”** for the how-it-works kicker; delete the notebook kicker because the H2 already says **“What it does not do”**; use **“clue”** in the README/footer (or rename the UI field to “lesson” everywhere); delete the infrastructure sentence.

### F-1-4 — Medium — route Open Graph/Twitter metadata remains the landing metadata after navigation

**Location / evidence:** On live `/demo`, `/privacy`, `/terms`, and `/missing-page`, `document.title`, description, and canonical change correctly, but `meta[property="og:title"]` remains **“Show Your Debugging — Practice before asking”** and `og:description` remains the landing description. `site/src/main.ts:setMeta` updates only title, description, and canonical.

**Why this fails:** A route has its own content and title but exposes the landing page’s social metadata. This is inaccurate when a demo, privacy page, terms, or not-found page is shared or inspected by a crawler that evaluates the SPA.

**Concrete fix:** Extend `setMeta` to update Open Graph and Twitter title/description/image metadata for every route, and add a route-matrix test for those values. Prefer route-specific static HTML/prerendered metadata if social crawlers must work without JavaScript.

### F-1-5 — Medium — standalone 404 does not use the required shared skeleton or route metadata

**Location / evidence:** Live `/404.html` has only the wordmark in `<header>` and only **“Privacy · Terms”** in `<footer>`. It omits the shared Demo / How it works / Privacy navigation, footer one-liner, factory attribution, version/build id, skip link, theme color, Apple touch icon, and all Open Graph/Twitter metadata. See `site/public/404.html`.

**Why this fails:** The standalone designed 404 is a public route, but it looks and behaves as a reduced separate site rather than the same product skeleton. The route also fails the required metadata set.

**Concrete fix:** Render the same header, skip link, footer, favicon/touch/theme, and metadata set as the SPA routes in `404.html`, while retaining the designed not-found content and return action. Add `/404.html` to the header/footer/metadata route matrix.

## Demo and sandbox check — pass

- The landing CTA reaches `/demo` in one click.
- The initial demo already shows a realistic seeded cart loop boundary bug: hypothesis, test command, `RangeError`, suggested repair, and a prior sample receipt.
- The persistent banner reads **“Demo — sample data, nothing is saved to your receipts”** and provides **Reset demo** and **Start for real**.
- Completing the seeded flow saves only `demo:draft` and `demo:receipts`; Reset restores one seeded historical receipt and the original hypothesis. The page does not access extension storage.
- A live request log for landing plus the complete demo flow contained only `solution-trace-practice.sociobot.in` requests. A fresh live service worker controlled `/demo`; offline reload rendered the demo heading and offline status.

## Claims check — pass for registered claims

From a fresh clone at `/tmp/solution-trace-review-vZxCPF` after `npm ci`, each exact command in `.factory/claims.json` passed in isolation:

| Claim id | Result |
| --- | --- |
| `hypothesis-first` | Pass |
| `local-only` | Pass |
| `offline-reload` | Pass |
| `markdown-export` | Pass |
| `free-download` | Pass |
| `storage-only-permission` | Pass |
| `no-code-generation` | Pass |
| `no-tracking` | Pass |

`npm run typecheck`, `npm run build`, and the full `npm test` suite also passed in that clone. One initial Markdown-export invocation collided with an overlapping local test server during this review and returned `ERR_CONNECTION_REFUSED`; its isolated rerun and the final full suite passed. It is not a product failure.

## Earlier findings rechecked

No earlier `review-*.md` or `polish-*.md` exists. The prior verification and handoff records contain the following former findings; each was checked again rather than accepted from its status label.

| Earlier finding | Live and code confirmation | Status |
| --- | --- | --- |
| Public extension ZIP was 404 | `GET /downloads/show-your-debugging-chrome.zip` returns 200, `application/zip`, 41,466 bytes, `PK`; all internal download links resolve; build copies the ZIP into `dist/site/downloads/`. | Fixed |
| Offline demo could not install its service worker | Fresh live `/demo` registered and controlled `/sw.js`; offline reload showed the demo and offline message. `site/public/sw.js` does not precache downloads and uses tolerant caching. | Fixed |
| Exact claim commands found no tests | Each of the eight exact `npm test -- --grep @claim:<id>` commands passed from the fresh clone. | Fixed |
| Hashed asset caching was not immutable | Live hashed JS/CSS return `Cache-Control: public, max-age=31536000, immutable`; `staticwebapp.config.json` contains the matching `/assets/*` route. | Fixed |
| 390px touch targets were under 44px | Fresh 390px geometry across `/`, `/demo`, `/privacy`, `/terms`, and `/404.html` found no rendered target below 44px and no overflow. | Fixed |

## Structure, accessibility, routing, and links

Confirmed: each SPA route has one H1 and main landmark; desktop and 390px pages have no console errors or horizontal overflow; keyboard Demo navigation and browser Back move focus to the correct H1; all landing links returned 200 or are an explicit external link; the visual system is product-specific risograph collage rather than a generic SaaS template. The live site has the expected CSP, canonical URL, favicon, and same-origin assets. The remaining route defects are F-1-4 and F-1-5.

## Missed leverage

No additional AI feature is required. The brief deliberately asks for a local-first practice constraint that does not generate answers, and the product already supplies the obvious useful export: completed receipts export to Markdown. An AI assistant would undermine the stated job-to-be-done unless it is a clearly optional reflection feature with a non-AI path; it should not be added merely to satisfy a checklist.

## Copy audit

Counts treat hyphenated terms and code-like identifiers as one word. Headings, links, buttons, and bullet fragments are included because they carry product meaning. No item exceeds 22 words. `F-1-2` and `F-1-3` identify the rows that still fail the claim/plain-words rules.

### Landing page

| Copy | Words | Audit |
| --- | ---: | --- |
| Show Your Debugging | 3 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Get extension | 2 | Pass |
| A debugging receipt for learners | 5 | Pass |
| Practice the bug before asking for help | 7 | Pass |
| For beginning developers using coding assistants who want to keep their own debugging habits. | 14 | Pass |
| Try it with sample data | 5 | Pass |
| A ready bug opens. | 4 | F-1-2: unlisted functional claim |
| Nothing is saved to your receipts. | 7 | Covered by `local-only` in context |
| Private. | 1 | Pass |
| Your entries stay in your browser. | 6 | Covered by `local-only` |
| Offline. | 1 | Pass |
| It works after your first visit. | 6 | Covered by `offline-reload` |
| Free. | 1 | Pass |
| The extension costs nothing. | 4 | Covered by `free-download` |
| Follow the evidence from guess to fix. | 7 | F-1-3: slogan/metaphor |
| The product, not a promise | 5 | F-1-3: non-descriptive heading |
| One short record of the work you did | 8 | F-1-3: heading should name the receipt section |
| The receipt keeps your reasoning next to the test that changed it. | 12 | Pass |
| Open the live practice | 4 | Pass |
| Receipt 014 | 2 | Pass |
| Hypothesis | 1 | Pass |
| The loop reads one item past the end. | 8 | Pass |
| Test output | 2 | Pass |
| RangeError: Item 3 is undefined | 5 | Pass |
| Fix I chose | 3 | Pass |
| Stop the loop before the list length. | 7 | Pass |
| Clue for next time | 4 | Pass |
| Inspect loop bounds when the final item is undefined. | 9 | Pass |
| Three deliberate pauses | 3 | F-1-3: mood heading |
| How the practice works | 4 | Pass |
| Name one cause | 3 | Pass |
| Write a testable hypothesis before you reveal another answer. | 9 | Pass |
| Run one check | 3 | Pass |
| Paste only the output that helped you judge the hypothesis. | 10 | Pass |
| Record your repair | 3 | Pass |
| Save the fix and one clue you can use on the next bug. | 13 | Pass |
| A notebook, not a judge | 5 | F-1-3: metaphor heading |
| What it does not do | 5 | Pass |
| It does not generate code or answers. | 7 | Covered by `no-code-generation` |
| It does not read your open files. | 7 | Covered by `storage-only-permission` |
| It does not block your coding assistant. | 7 | Covered by `storage-only-permission` |
| A receipt records process. | 4 | Pass: honest boundary |
| It does not prove competence. | 5 | Pass: honest boundary |
| Download the extension | 3 | Pass |
| Practice a hypothesis, test, fix, and lesson. | 7 | F-1-3: `lesson` conflicts with UI `clue` |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Version 1.0.0 · build 2026.08 | 5 | Pass |
| Original generated collage. | 3 | Pass |

### README

| Copy | Words | Audit |
| --- | ---: | --- |
| Show Your Debugging | 3 | Pass |
| Practice a hypothesis, test, fix, and lesson before asking a coding assistant for the answer. | 15 | F-1-3: `lesson` conflicts with UI `clue` |
| Show Your Debugging is a free Chrome MV3 extension for beginning developers. | 12 | `MV3` is technical but acceptable in installation documentation |
| It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt. | 21 | Pass |
| Receipts stay in `chrome.storage.local`. | 4 | Covered by `local-only` |
| The extension requests no tab, file, clipboard, or host access. | 9 | Covered by `storage-only-permission` |
| A receipt records process. | 4 | Pass: honest boundary |
| It does not prove competence. | 5 | Pass: honest boundary |
| Live site | 2 | Pass |
| One-click sandbox | 2 | Pass |
| Use the extension | 3 | Pass |
| Download the zip from the live site and unzip it. | 10 | Pass |
| Open `chrome://extensions` and enable Developer mode. | 6 | Pass |
| Choose **Load unpacked** and select the unzipped folder. | 8 | Pass |
| Pin the extension, open it, and write your hypothesis before running the next check. | 14 | Pass |
| Chrome Web Store signing is outside this repository. | 8 | Internal release detail; replace with user-facing availability status |
| The factory can publish the same MV3 package later. | 9 | F-1-2: unsupported future claim |
| Run locally | 2 | Pass |
| Node 20 or newer is required. | 6 | Pass |
| To load the development extension, open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select `.output/chrome-mv3` after WXT starts. | 21 | Pass |
| Test | 1 | Pass |
| The command runs unit tests and makes a clean production build. | 11 | Pass |
| It tests each listed claim in Chromium. | 7 | Pass |
| It also scans screens with axe, checks the 390 px layout, and completes a receipt in the packaged extension. | 19 | Pass |
| Run one claim with its command from `.factory/claims.json`. | 8 | Pass |
| For example: | 2 | Pass |
| Build and deploy | 3 | Pass |
| The exact production command is: | 5 | Pass |
| It creates: | 2 | Pass |
| `dist/site/index.html` and the static deploy tree | 6 | Pass |
| `dist/site/downloads/show-your-debugging-chrome.zip` | 1 | Pass |
| `dist/extension/` for local unpacked installation | 5 | Pass |
| Deploy `dist/site/` as the static root. | 6 | Pass |
| The included `staticwebapp.config.json` supplies SPA fallback, the styled 404 page, CSP, and security headers. | 14 | Pass |
| The factory owns infrastructure and DNS. | 6 | F-1-3: internal jargon; delete |
| Product boundaries | 2 | Pass |
| No code generation, assistant blocking, grading, accounts, or surveillance | 9 | F-1-2: partly unlisted and `surveillance` is vague |
| No analytics or third-party runtime scripts | 6 | Covered by `no-tracking` |
| No source or test capture unless the learner pastes it | 9 | F-1-2: unlisted behavioral claim |
| Offline demo after the first visit | 6 | Covered by `offline-reload` |
| Markdown export for completed receipts | 5 | Covered by `markdown-export` |
| The product brief is in `.factory/brief.json`. | 8 | Pass |
| Visual tokens and generated-art provenance are in `.factory/design.md`. | 10 | Pass |
| Demo isolation is in `.factory/demo.md`. | 7 | Pass |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

## What would make this perfect

Keep all three facts visible before the 390px fold; remove or replace the slogan headings and use one name for the final receipt field; register or remove every user-reliant README/landing claim; and make all routes, including standalone 404, expose route-correct social metadata and the same product skeleton. Then rerun the claim selectors, mobile first-screen geometry, and the metadata/header route matrix.
