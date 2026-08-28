# Independent verification — FAIL

**Candidate:** `6385120886c9d9404cd05edbfbc53bd3ae651ca4`
**Live URL:** https://solution-trace-practice.sociobot.in
**Verified:** 2026-08-28 UTC, from a clean checkout after `npm ci`

## Decision

**FAIL — do not release.** The production deployment is missing the extension
ZIP that the product advertises, which also prevents its service worker from
installing and makes the live offline claim false. In addition, every claim
test command recorded in `.factory/claims.json` fails as written.

## Release-blocking findings

### Critical — production extension download is missing

`GET https://solution-trace-practice.sociobot.in/downloads/show-your-debugging-chrome.zip`
returned **404**, `text/html`, 985 bytes. The landing page's **Get extension**,
**Download the extension**, and demo **Start for real** links all target this
URL. Therefore a visitor cannot obtain the browser extension, the central
product promised by the brief.

The candidate itself built a valid 41,466-byte ZIP at
`dist/site/downloads/show-your-debugging-chrome.zip` (`unzip -t` passed;
SHA-256 `682a26040d909ee6212814214405477d77adfbb02f96aa71b6c6b0345018aece`).
The deployed `index.html`, JS, CSS, service worker, and hero asset have the
same SHA-256 as the candidate; the missing ZIP is a deployment-artifact
failure, not a different site build.

### Critical — live offline demo does not work

In a fresh live Chromium context, the service worker has no active
registration. Chrome DevTools reported:

```
ServiceWorker failed to install: ServiceWorker failed to handle event
(event.waitUntil Promise rejected)
Uncaught (in promise) TypeError: Failed to execute 'addAll' on 'Cache': Request failed
```

`sw.js` discovers every HTML `src`/`href` while precaching, so it includes the
missing download URL above. After 2.5 seconds, `navigator.serviceWorker.controller`
was false; setting the browser offline and reloading `/demo` failed with
`net::ERR_INTERNET_DISCONNECTED`. This contradicts the visible claim “It works
after your first visit” and `@claim:offline-reload` in production.

### High — required claim commands are not executable as recorded

After `npm ci`, every exact `test` command in `.factory/claims.json` exits 1.
For all eight IDs (`hypothesis-first`, `local-only`, `offline-reload`,
`markdown-export`, `free-download`, `storage-only-permission`,
`no-code-generation`, and `no-tracking`), npm invokes Playwright as, for
example, `playwright test @claim:offline-reload`, and Playwright returns:

```
Error: No tests found.
Make sure that arguments are regular expressions matching test files.
```

`npm test -- --grep …` does not forward `--grep` through the chained `test`
script as claimed. A failing required claim command is release-blocking under
the claims contract. The underlying tagged tests do pass when the complete
suite is run, but that does not make the documented claim commands valid.

### Medium — hashed production assets are not immutable-cached

The deployed `/assets/index-CcOTNU6z.js` and `/assets/index-DGfxziKf.css` both
return `Cache-Control: public, must-revalidate, max-age=30`. This does not meet
the required long-lived immutable caching policy for hashed static assets.

## First-read test

**Pass.** A cold desktop visit plainly says this is for beginning developers
using coding assistants, asks them to practice a bug before asking for help,
and presents **Try it with sample data** on the first screen. One click opens a
realistic cart-loop boundary-bug practice flow. The first screen also states
private, offline, and free facts in plain words.

## What passed locally

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 0 production dependency vulnerabilities with `npm audit --omit=dev` |
| `npm test` | Passed: 2 Vitest tests and 16 Playwright tests; `test-results/.last-run.json` says `passed` |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; produced `dist/site`, packaged ZIP, and unpacked MV3 extension |
| Built ZIP | Valid (`unzip -t`); manifest requests only `storage` and no host permissions |
| Extension end to end | Passed in the suite: Chromium loaded the unpacked MV3, completed and saved a receipt |
| Local tagged claim implementations | Passed as part of the 16-test suite, including offline reload, Markdown export, local-only storage, and request interception |

Production budget output was 17.44 KB raw / 6.04 KB gzip initial JS and
11.83 KB raw / 3.53 KB gzip CSS; the 640px hero is 27.0 KB WebP. These are
within the stated size budgets.

## Live interaction, accessibility, privacy, and policy evidence

- Desktop demo: entered a new hypothesis, test output, fix, and clue; saved a
  receipt; downloaded `debugging-receipt-2026-08-28.md`; reset/started another
  sample; empty required hypothesis gave the native “Please fill out this
  field.” error and a corrected value recovered to the test step.
- Demo isolation: only `demo:draft` and `demo:receipts` appeared in
  localStorage. No third-party requests occurred during the flow.
- Keyboard: first Tab focused the skip link; Enter moved focus to `main`.
  Site route changes and local suite keyboard checks passed. Visible
  `:focus-visible` styling is a 3px violet outline.
- 390×844 live landing and demo had zero horizontal overflow. Reduced-motion
  demo receipt animation computed to `1e-05s`.
- Axe Playwright scans of `/`, `/demo`, `/privacy`, and `/terms` had no serious
  or critical violations. No page errors or console errors occurred during the
  normal live flow. `verify-url.sh` also passed for `/` and `/demo` when given
  its required evidence directory.
- Cold-page runtime requests were all same-origin (HTML, JS, CSS, hero, and
  favicon). The extension has only `storage`, no host permission, model
  endpoint, analytics, or sign-in. There are no product server/API endpoints,
  so API rate-limit and sign-in checks are not applicable.
- Live responses provide CSP, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
  Permissions-Policy. The missing ZIP is the exception to the expected link
  and downloadable-artifact behavior.

## Required remediation and re-verification

1. Deploy `dist/site/downloads/show-your-debugging-chrome.zip` at the exact
   public URL, then verify a 200 response, `PK` ZIP signature, and the three
   user-facing download links.
2. Re-test service-worker installation and an offline `/demo` reload in a
   fresh context after the ZIP is available. Consider making precache failure
   tolerant so one optional asset cannot disable the whole offline shell.
3. Make each `claims.json` command work exactly as listed (or update each
   command and prove it in a clean checkout), then rerun every claim command.
4. Configure immutable long-lived cache headers for content-hashed assets.
