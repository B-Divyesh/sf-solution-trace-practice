# Handoff: polish round 2 — Show Your Debugging

## Outcome

Released repair commit `737eb11235142c71ca628a21697fffc41ab47731` is deployed to <https://solution-trace-practice.sociobot.in>. The two adversarial-review findings are fixed: the landing instructions now describe recording test output rather than revealing an answer, and the README leads with plain privacy results instead of Chrome implementation jargon. The catalog description is verb-first and 88 characters.

The original artifact remains a Chrome MV3 extension with a static landing site and downloadable packaged ZIP. The warm-paper, coral-thread risograph identity and original generated collage were retained.

## Verification evidence

- Fresh clone `/tmp/solution-trace-practice-polish-2-lL2HND` at the repair commit: `npm ci`, `npm run typecheck`, each of the 12 exact commands in `.factory/claims.json`, `npm test`, `npm run build`, and `npm audit --omit=dev --audit-level=high` passed. The full suite reports 2 Vitest and 29 Playwright tests.
- The complete browser suite verifies the isolated `?demo=1` path, banner, reset, local-only keys, offline reload, Markdown export, MV3 receipt workflow/delete confirmation, permissions, no model endpoint, no third-party requests, routing/metadata/404, keyboard focus, 390px layout, touch targets, and axe scans.
- Deployed through the configured static work order to Azure Static Web Apps deployment `72a50108-4ea4-4307-a958-7839a8e8ed93`.
- Cold live verification passed across `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404.html`, and `/missing-page`: expected titles and social metadata, one H1/main, `lang=en`, no console errors, no 390px overflow, and no axe serious/critical violations. Live first-screen fact bottoms were 570, 594.59, and 619.19px in an 844px viewport.
- `/opt/fleet/lib/verify-url.sh` passed; evidence is in [.factory/evidence/polish-2](evidence/polish-2), including [verification JSON](evidence/polish-2/verify.json), [desktop screenshot](evidence/polish-2/screenshot-desktop.png), [mobile screenshot](evidence/polish-2/screenshot-mobile.png), and the [cold mobile landing](evidence/polish-2/live-landing-mobile.png).
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.5 s, CLS 0.002, and TBT 0 ms. The current report is [lighthouse-live.json](evidence/polish-2/lighthouse-live.json).

The complete finding-to-change-to-evidence map is in [polish-2.md](polish-2.md).

## Run and deploy

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Deploy `dist/site/` as the static root. The packaged extension is `dist/site/downloads/show-your-debugging-chrome.zip`. The supported sample entry point is `/?demo=1`; `Reset demo` restores its shipped sample, and leaving demo mode clears `demo:draft` and `demo:receipts`.

## Known gaps

None.
