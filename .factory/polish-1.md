# Polish round 1 evidence

**Base review:** `1048a7c3c7399a63c3201dd3074cc9fbdb33349e`  
**Repair commits:** `c725409`, `e43f775`  
**Live URL:** <https://solution-trace-practice.sociobot.in>  
**Result:** PASS — every current and earlier finding is resolved.

## Review 1 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the copy, action, and three facts ahead of the artwork at phone widths; tightened only the mobile rhythm. | Playwright `the three product facts are visible in the first 390px screen`; live bottoms were 570px, 594.59px, and 619.19px in an 844px viewport; [live mobile capture](evidence/live/mobile-first-screen.png). |
| F-1-2 | Registered and tested the one-click sample (`sample-opens`), demo reset/exit (`demo-reset`), packaged receipt workflow, and delete-all behavior. Removed the future publication sentence, broad unsupported boundaries, and internal infrastructure copy. `.factory/claims.json` now has 12 claims with exactly one tag each. | All 12 exact claim commands passed from clean clone `/tmp/solution-trace-polish-Vq8Pvj`; `@claim:sample-opens`, `@claim:demo-reset`, `@claim:receipt-workflow`, and `@claim:receipt-delete`; live `/?demo=1` opened the seeded cart-loop sample and used only `demo:draft` and `demo:receipts`. |
| F-1-3 | Replaced the four mood/metaphor labels with descriptive section names. Standardized the visitor term to “clue” in the landing page, footer, README, extension metadata, privacy copy, and Markdown export. Removed the infrastructure sentence. | `.factory/copy-audit.md`; unit test `exports all four parts and the evidence warning`; live landing contains none of the four reported phrases; [live first screen](evidence/live/mobile-first-screen.png). |
| F-1-4 | `setMeta` now updates title, description, canonical, Open Graph title/description/URL/image, and Twitter title/description/image. The build also emits route-specific `/demo`, `/privacy`, and `/terms` HTML metadata before JavaScript. | Playwright route matrix `/<route> has clean structure, console, and accessibility`; `built route documents expose correct metadata before JavaScript runs`; cold live matrix passed for `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`. |
| F-1-5 | Rebuilt `404.html` with the shared skip link, wordmark, four-link header navigation, full footer, version, attribution, favicon, touch icon, theme color, and complete route metadata. Kept the risograph 404 stamp and direct return action. | Playwright `the standalone 404 uses the shared site skeleton`; route axe scan; [local 404 capture](evidence/polish-1-404.png); [live 404 capture](evidence/live/404.png); live `/404.html` and `/missing-page` checks passed. |

## Earlier verification findings rechecked

| Finding | Change/status | Evidence |
| --- | --- | --- |
| VER-1-download | Packaged MV3 ZIP remains in the static release and all download actions use it. | `release output keeps the extension package and immutable asset policy`; `unzip -t` passed; live ZIP returned 200, `PK`, 41,457 bytes. |
| VER-1-offline | The tolerant service-worker install remains intact and does not depend on the ZIP. The exact query demo reloads offline. | `@claim:offline-reload`; `service worker does not make the extension download a precache requirement`; fresh live offline reload showed the demo heading and offline status. |
| VER-1-claim-commands | The test runner forwards `--grep`; every current command is independently executable. | All 12 `.factory/claims.json` commands passed from the clean clone. |
| VER-1-cache | Content-hashed assets retain one-year immutable caching. | Static config assertion; live JS response was `public, max-age=31536000, immutable`. |
| VER-2-touch-targets | Header, inline, form, banner, and footer controls remain at least 44 × 44 CSS pixels. | `every rendered 390px touch target is at least 44 by 44 CSS pixels`; cold live checks across six routes found zero undersized targets or horizontal overflow. |

## Additional required acceptance work

- The primary and header Demo links now use the exact isolated `/?demo=1` entry. The clean `/demo` route is its canonical URL. The visible banner includes Reset demo and Start for real. Reset restores the shipped sample; leaving through Home clears demo keys. Evidence: `@claim:sample-opens`, `@claim:demo-reset`, [live demo capture](evidence/live/mobile-demo.png).
- SPA navigation uses `pushState`; Back restores the landing route and moves focus to its H1. The live keyboard check passed from Demo and back.
- Privacy and Terms are real URLs with direct links, unique titles, canonical/Open Graph/Twitter metadata, one H1, one main landmark, and zero serious or critical axe findings.
- The catalog line is verb-first and 76 characters: `Practice a hypothesis, test, fix, and clue before asking a coding assistant.`

## Final verification

- Clean clone: `npm ci`, all 12 exact claim commands, `npm run typecheck`, `npm test` (2 unit + 27 Playwright), and production dependency audit all passed.
- Local Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.8s, CLS 0.002, TBT 0ms.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5s, CLS 0.002, TBT 0ms. Raw reports are in `evidence/` and `evidence/live/`.
- Live route matrix: zero console errors, zero serious/critical axe findings, zero horizontal overflow, and zero undersized touch targets.
- Deployment fidelity: live index, 404, JS, and CSS SHA-256 hashes exactly matched `dist/site` after deployment.

No findings remain.
