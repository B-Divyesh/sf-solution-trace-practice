# Demo sandbox

## Entry point

- URL: `https://solution-trace-practice.sociobot.in/?demo=1`
- Local URL after `npm run build`: `http://127.0.0.1:4173/?demo=1`
- The supported catalog and verifier entry is `/?demo=1`. `/demo` remains a compatible direct link.

## Sample data

The active sample is a cart loop that reads one item past the array. It includes a test command, a `RangeError`, a boundary fix, and a review clue. A completed profile-request receipt appears in sample history.

The first demo screen opens with the hypothesis filled in. A visitor can complete the full guess → test → fix flow, save a receipt, review it, and export Markdown.

## Isolation

The demo stores data only in these localStorage keys:

- `demo:draft`
- `demo:receipts`

The VS Code extension uses VS Code's local extension state. The separate Chrome version uses `chrome.storage.local`. Neither extension reads website localStorage, and demo code never reads or writes extension data.

## Reset and exit

`Reset demo` removes both demo keys and restores the shipped sample. `Start for real` removes both keys before downloading the VS Code VSIX. No account or network write is involved.

## Offline check

Visit `/?demo=1` once and wait for the service worker to install. The route, built script, stylesheet, and sample assets then reload without a network. This is covered by `@claim:offline-reload`.
