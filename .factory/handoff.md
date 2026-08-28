# Handoff: Show Your Debugging

## What shipped

- A Chrome MV3 extension built with WXT and TypeScript.
- A required three-step practice: hypothesis → test output → chosen fix and clue.
- Browser-local draft and receipt storage, receipt history, deletion confirmation, keyboard advancement, and Markdown export.
- A static landing site with `/demo`, `/privacy`, `/terms`, and a designed `404.html`.
- A one-click demo seeded with a cart boundary bug and a prior receipt.
- Demo storage isolated under `demo:draft` and `demo:receipts`.
- A versioned service worker that supports an offline reload after the first visit.
- A downloadable Chrome zip at `dist/site/downloads/show-your-debugging-chrome.zip`.
- A risograph collage system, responsive generated hero, product icons, social card, reduced-motion treatment, and mobile layout.
- Claim inventory, copy audit, demo contract, metadata, sitemap, robots file, CSP, and security headers.

The generated hero followed the prompt in `.factory/design.md`. It was made through the Factory Azure image deployment on 2026-08-28, visually reviewed, and exported as 27 KB and 129 KB WebP variants. Source and sidecars are in `assets/src/`.

## Build and run

```sh
npm install
npm run dev
npm run dev:site
npm test
npm run build
```

The exact production command is `npm run build`. It creates `dist/site/index.html`, the extension download zip, and the unpacked extension in `dist/extension/`.

Deploy `dist/site/` as the static root. Infrastructure, DNS, and store signing were not changed.

## Verification

- `npm run typecheck`: passed.
- `npm test`: passed on 2026-08-28.
- Vitest: 2 unit tests passed.
- Playwright: 16 tests passed in Chromium 1.58.2.
- Every entry in `.factory/claims.json` has one tagged sandbox test.
- The packaged MV3 extension was loaded in Chromium and completed a real receipt.
- Axe scans found no serious or critical issues on the site routes or extension receipt screen.
- The 390 × 844 checks found no horizontal overflow on landing or demo.
- `/opt/fleet/lib/verify-url.sh` passed for `/` and `/demo`: one H1, `lang`, main landmark, complete alt text, and no console errors.
- `npm audit --omit=dev`: zero production vulnerabilities.

### Lighthouse mobile

Measured locally against the production build with Lighthouse 13.0.1:

| Category or metric | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1.8 s |
| CLS | 0.007 |
| Total blocking time | 0 ms |
| FCP | 0.9 s |

INP was not measured because the Lighthouse pass had no user interaction. The automated practice flow exercises interactive controls separately.

### Asset budgets

- Initial site JavaScript: 17.44 KB raw, 6.04 KB gzip.
- Initial site CSS: 11.83 KB raw, 3.53 KB gzip.
- Mobile hero: 27.04 KB WebP.
- Large hero: 128.89 KB WebP.
- Packaged extension: about 42 KB zip.
- Unpacked extension: about 50 KB.

## Privacy and product boundaries

The extension requests only the `storage` permission. It has no host permissions, accounts, analytics, model calls, third-party runtime scripts, or remote receipt store. The website demo never reads extension storage.

The receipt is described as evidence of process, not proof of competence. The product does not generate code, grade learners, inspect editor files, or disable coding assistants.

## Known gaps and next steps

- The zip is an unsigned Chrome-family package. Store signing and publication remain factory deployment work.
- Learners paste test output manually. Editor and terminal integrations are intentionally outside v1 privacy scope.
- Firefox packaging and educator batch export are not included.
- The four-week learning outcome in the research brief needs a real pilot; the product makes no outcome claim today.
