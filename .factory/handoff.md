# Handoff — adversarial review 6

## Outcome

**FAIL.** No product code was changed. The full review is in
[review-6.md](review-6.md). The sole remaining defect is F-6-1: an arbitrary
unknown live URL displays the styled not-found state but returns HTTP 200 because
the navigation fallback handles it before the configured 404 override.

## Verification performed

From fresh clone `/tmp/solution-trace-review-6-DNeCSZ/repo`:

```sh
npm ci
# each of the 16 exact commands in .factory/claims.json
npm test
npm run typecheck
npm run build
```

All 16 claim commands passed independently. The full suite passed 2 Vitest and
37 Playwright tests; typecheck and production build passed. Fresh live QA used
390 × 844 and desktop contexts, verified the one-click demo, demo storage and
request isolation, reset, routes, metadata, links, keyboard/back focus, console,
and Axe.

## Next step

Change deployment routing so an unknown address returns HTTP 404 with the styled
not-found document, while supported direct route reloads continue to work. Add a
live/deployment test for status 404, then rerun the commands above and the live
route matrix.
