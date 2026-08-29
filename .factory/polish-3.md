# Polish round 3 evidence

**Base review:** `939cbc34f9b43029aa6b3b021b7f4017d3e5b535`  
**Repair commits:** `0426b01`, `953e7d3`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Deployment:** Azure Static Web Apps deployment `4cbfa5c5-f7f1-43c2-8ff7-5892141f78ca`  
**Result:** PASS — every current and earlier finding is resolved.

## Review findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the CTA explanation and all three facts before the illustration at phone widths. | Playwright `the three product facts are visible in the first 390px screen`; [live first screen](evidence/polish-3/live-first-screen.png); live `/` bottoms were 570, 594.59, and 619.19px in an 844px viewport. |
| F-1-2 | Retained the sample, reset/exit, receipt, and deletion claims; added a contract test requiring exactly one observable tag for every manifest entry. | `@claim:sample-opens`, `@claim:demo-reset`, `@claim:receipt-workflow`, `@claim:receipt-delete`, and `every listed claim has exactly one tagged observable test`; [live demo](evidence/polish-3/live-demo-mobile.png); live `/?demo=1` used only `demo:draft` and `demo:receipts`. |
| F-1-3 | Retained descriptive section names and “clue” terminology. Removed the last answer-reveal phrase from the extension heading. | `the practice steps describe the next product action without promising an answer reveal`; [copy audit](copy-audit.md); [downloaded extension](evidence/polish-3/live-extension.png); live `/` contains none of the reported mood headings. |
| F-1-4 | Retained route-specific title, description, canonical, Open Graph, and Twitter metadata in the SPA and prerendered route documents. | Route-matrix tests and `built route documents expose correct metadata before JavaScript runs`; [live route report](evidence/polish-3/live-check.json); live `/demo`, `/privacy`, `/terms`, and `/missing-page` returned their own metadata. |
| F-1-5 | Retained the shared skip link, navigation, footer, icons, metadata, build id, and return action on the standalone 404. | `the standalone 404 uses the shared site skeleton`; [live 404](evidence/polish-3/live-404-mobile.png); live `/404.html` passed structure, legal-link, touch-target, console, and axe checks. |
| F-2-1 | The landing instruction remains “Write a testable hypothesis before recording test output.” The extension now says “Record a debugging receipt before asking for help.” | `the practice steps describe the next product action without promising an answer reveal`; [downloaded extension](evidence/polish-3/live-extension.png); live `/` exposes the real next action. |
| F-2-2 | The README still leads with “free Chrome extension,” browser-local receipts, and plain privacy outcomes. | `the README leads with plain privacy outcomes`; [live privacy route](evidence/polish-3/live-privacy-mobile.png); live `/privacy` explains storage before technical boundaries. |
| F-3-1 | Added `extension-privacy-boundary`. Its clean-profile test asserts storage-only permissions, no optional/host/content-script access, no tab/history/clipboard APIs, and no HTTP or receipt-content request during a uniquely marked receipt flow. | `@claim:extension-privacy-boundary`; [downloaded-ZIP request report](evidence/polish-3/live-extension-check.json); live ZIP completed the flow with zero HTTP requests and zero receipt values in requests. |

## Earlier verification findings

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| VER-1-download | The packaged MV3 ZIP remains in the public static tree with no gate. | `@claim:free-download`; [live route report](evidence/polish-3/live-check.json); live ZIP returned 200, `application/zip`, `PK`, and 41,456 bytes. |
| VER-1-offline | The service worker caches the demo shell without depending on the ZIP. | `@claim:offline-reload` and `service worker does not make the extension download a precache requirement`; [live demo](evidence/polish-3/live-demo-mobile.png); a controlled live `/?demo=1` reloaded offline. |
| VER-1-claim-commands | All 13 exact commands are executable independently. | Clean clone `/tmp/solution-trace-polish-3-final-F9wKXx`; all commands in `claims.json` passed before the full suite; [claim manifest](claims.json). |
| VER-1-cache | Hashed assets retain the immutable one-year policy; the service worker and ZIP retain their narrower policies. | `release output keeps the extension package and immutable asset policy`; live JS header `public, max-age=31536000, immutable`; live `sw.js` header `no-cache`. |
| VER-2-touch-targets | Every rendered control remains at least 44 × 44px at 390px without horizontal overflow. | `every rendered 390px touch target is at least 44 by 44 CSS pixels`; [live mobile route report](evidence/polish-3/live-check.json); [live first screen](evidence/polish-3/live-first-screen.png). |

## Additional product audit

Visual review found the extension header’s “Receipts” label had paper-colored text on a paper background. The header button now paints the aubergine surface explicitly, and the packaged-extension test asserts its foreground and background colors. See [the downloaded extension capture](evidence/polish-3/live-extension.png).

The catalog line is verb-first and 76 characters: `Practice a hypothesis, test, fix, and clue before asking a coding assistant.`

## Final verification

- Fresh clone `/tmp/solution-trace-polish-3-final-F9wKXx` at `953e7d3`: `npm ci`, all 13 exact claim commands, `npm run typecheck`, `npm test` (2 Vitest + 31 Playwright), `npm run build`, production dependency audit, and ZIP integrity passed.
- Local factory URL verification passed with one title, `lang=en`, one H1/main, complete alt text, and no console errors. See [report](evidence/polish-3/local-verify/verify.json).
- Live cold matrix passed for `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`: route metadata, one H1/main, legal links, 390px layout, ≥44px targets, zero console errors, and zero serious/critical axe findings. See [report](evidence/polish-3/live-check.json).
- The downloaded live ZIP was byte-identical to `dist/site/downloads/show-your-debugging-chrome.zip` and passed a real extension receipt/privacy flow. See [report](evidence/polish-3/live-extension-check.json).
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8s, LCP 1.5s, CLS 0.002, TBT 0ms. See [report](evidence/polish-3/lighthouse-live.json).
- Deployment fidelity passed byte-for-byte for index, 404, JavaScript, CSS, and the extension ZIP. No placeholders or known acceptance gaps remain.
