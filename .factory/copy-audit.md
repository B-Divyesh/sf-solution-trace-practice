# Copy audit

Audited 2026-08-29 after polish round 4. Counts treat hyphenated terms and `VS Code` as written words. No sentence exceeds 22 words or uses a banned marketing word.

## Landing page

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
| Try it with sample data | 5 | Pass |
| A filled cart-loop hypothesis opens. | 5 | Pass; `sample-opens` |
| Nothing is saved to your receipts. | 7 | Pass; `local-only` in demo context |
| Private. Receipts use VS Code's local extension storage. | 8 | Pass; `vscode-local-storage` |
| Offline. It works after your first visit. | 7 | Pass; `offline-reload` |
| Free. The VS Code extension costs nothing. | 7 | Pass; `free-download` |
| Example debugging receipt | 3 | Pass |
| See one complete debugging receipt | 5 | Pass |
| The receipt keeps your reasoning next to the test that changed it. | 12 | Pass; `receipt-workflow` |
| Open the sample practice | 4 | Pass |
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
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Download for VS Code | 4 | Pass; `free-download` |
| Separate browser version | 3 | Pass |
| Use the Chrome toolbar version | 5 | Pass |
| The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup. | 15 | Pass; `browser-receipt-workflow` |
| Download for Chrome | 3 | Pass; `free-download` |
| Practice a hypothesis, test, fix, and clue. | 7 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Version 1.0.0 · build 2026.08 | 5 | Pass |
| Original generated collage. | 3 | Pass; asset provenance |
| A paper hypothesis, terminal, test strip, and code fix joined by a coral thread. | 15 | Pass; image alternative |

The first screen reads in one breath: record debugging practice in VS Code, then open the filled sample. All three factual lines fit at 390 × 844 without scrolling.

## Other visitor-facing copy

- The README begins with the VS Code job and local-storage result. Installation uses the exact VS Code labels **Extensions**, **Install from VSIX…**, and **Command Palette**.
- The Chrome version is always called a separate browser version. Its installation steps remain under their own heading.
- Privacy separates VS Code local state, Chrome permissions, demo keys, and network behavior.
- The demo, Chrome popup, and VS Code view use the same four field names: **hypothesis**, **test output**, **fix**, and **clue**.
- Route titles name their content. The landing title is **Show Your Debugging — Record debugging practice**.
- No visitor-facing copy uses “lesson,” “answer reveal,” Chrome MV3 jargon, internal infrastructure language, or the earlier mood headings.

## Terminology table

| Concept | One visitor-facing term |
| --- | --- |
| Completed practice artifact | receipt |
| Proposed bug cause | hypothesis |
| Command result or failure text | test output |
| Learner-selected repair | fix |
| Reusable memory prompt | clue |
| Isolated sample environment | demo |
| Editor add-on | VS Code extension |
| Optional toolbar add-on | Chrome extension |
