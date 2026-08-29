# Show Your Debugging

Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer.

Show Your Debugging is a free Chrome MV3 extension for beginning developers. It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt.

Receipts stay in `chrome.storage.local`. The extension requests no tab, file, clipboard, or host access. A receipt records process. It does not prove competence.

Live site: <https://solution-trace-practice.sociobot.in>

One-click sandbox: <https://solution-trace-practice.sociobot.in/?demo=1>

## Use the extension

1. Download the zip from the live site and unzip it.
2. Open `chrome://extensions` and enable Developer mode.
3. Choose **Load unpacked** and select the unzipped folder.
4. Pin the extension, open it, and write your hypothesis before running the next check.

The extension is currently available as a zip for manual installation.

## Run locally

Node 20 or newer is required.

```sh
npm install
npm run dev       # WXT extension development
npm run dev:site  # landing site at http://localhost:5173
```

To load the development extension, open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select `.output/chrome-mv3` after WXT starts.

## Test

```sh
npm test
```

The command runs unit tests and makes a clean production build. It tests each listed claim in Chromium.

It also scans screens with axe, checks the 390 px layout, and completes a receipt in the packaged extension.

Run one claim with its command from [.factory/claims.json](.factory/claims.json). For example:

```sh
npm test -- --grep @claim:offline-reload
```

## Build and deploy

The exact production command is:

```sh
npm run build
```

It creates:

- `dist/site/index.html` and the static deploy tree
- `dist/site/downloads/show-your-debugging-chrome.zip`
- `dist/extension/` for local unpacked installation

Deploy `dist/site/` as the static root. The included `staticwebapp.config.json` supplies route fallback, the styled 404 page, CSP, and security headers.

## Product boundaries

- No code generation or answers
- Browser storage is the extension's only permission
- No access to open tabs or editor files
- No analytics or third-party runtime scripts
- Offline demo after the first visit
- Markdown export for completed receipts

The product brief is in [.factory/brief.json](.factory/brief.json). Visual tokens and generated-art provenance are in [.factory/design.md](.factory/design.md). Demo isolation is in [.factory/demo.md](.factory/demo.md).

## License

MIT. See [LICENSE](LICENSE).
