# Copy audit

Audited 2026-08-29 after polish round 1. Counts treat hyphenated terms as one word. No line exceeds 22 words or uses a banned marketing word.

## Landing page

| Copy | Words | Result |
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
| A filled cart-loop hypothesis opens. | 5 | Pass; `sample-opens` claim |
| Nothing is saved to your receipts. | 7 | Pass; `local-only` claim |
| Private. Your entries stay in your browser. | 7 | Pass; `local-only` claim |
| Offline. It works after your first visit. | 7 | Pass; `offline-reload` claim |
| Free. The extension costs nothing. | 5 | Pass; `free-download` claim |
| Example debugging receipt | 3 | Pass |
| See one complete debugging receipt | 5 | Pass |
| The receipt keeps your reasoning next to the test that changed it. | 12 | Pass |
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
| Write a testable hypothesis before you reveal another answer. | 9 | Pass |
| Run one check | 3 | Pass |
| Paste only the output that helped you judge the hypothesis. | 10 | Pass |
| Record your repair | 3 | Pass |
| Save the fix and one clue you can use on the next bug. | 13 | Pass |
| What it does not do | 5 | Pass |
| It does not generate code or answers. | 7 | Pass; `no-code-generation` claim |
| It does not read your open files. | 7 | Pass; `storage-only-permission` claim |
| It does not block your coding assistant. | 7 | Pass; `storage-only-permission` claim |
| A receipt records process. | 4 | Pass |
| It does not prove competence. | 5 | Pass |
| Download the extension | 3 | Pass |
| Practice a hypothesis, test, fix, and clue. | 7 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Version 1.0.0 · build 2026.08 | 5 | Pass |
| Original generated collage. | 3 | Pass |

The first screen reads in one breath: practice the bug before asking, then open the filled sample. The three factual lines are visible at 390 × 844 without scrolling.

## README and route review

- Removed the unsupported future Chrome Web Store statement and internal infrastructure sentence.
- Replaced the broad grading, account, surveillance, and implicit-capture boundary list with the narrower tested claims.
- Replaced every visitor-facing use of “lesson” with “clue,” including metadata and Markdown export.
- Replaced mood and metaphor headings with descriptive section names on landing, receipt, legal, and 404 screens.

## Terminology table

| Concept | One visitor-facing term |
| --- | --- |
| Completed practice artifact | receipt |
| Proposed bug cause | hypothesis |
| Command result or failure text | test output |
| Learner-selected repair | fix |
| Reusable memory prompt | clue |
| Isolated sample environment | demo |
| Browser add-on | extension |
