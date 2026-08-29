# Show Your Debugging

Practice a hypothesis, test, fix, and clue before asking a coding assistant for the answer.

Show Your Debugging is a free VS Code extension for beginning developers. It asks for one testable hypothesis, captures test output you paste, records your chosen fix, and saves a reviewable debugging receipt.

Receipts use VS Code's local extension storage. The extension does not read workspace files, open editors, or clipboard contents. A receipt records process. It does not prove competence.

Live site: <https://solution-trace-practice.sociobot.in>

One-click sandbox: <https://solution-trace-practice.sociobot.in/?demo=1>

## Use the VS Code extension

1. Download the VSIX from the live site.
2. In VS Code, open **Extensions**, choose the **…** menu, then choose **Install from VSIX…**.
3. Open **Show Your Debugging: Start a Receipt** from the Command Palette.
4. Write your hypothesis before recording test output.

The Activity Bar checkmark opens the same receipt view. The extension is currently available as a VSIX for manual installation.

## Use the separate Chrome version

Download the Chrome zip from the live site and unzip it. Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the unzipped folder.

The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup.

## Run locally

Node 20 or newer is required.

```sh
npm install
npm run dev       # Chrome extension development
npm run dev:site  # landing site at http://localhost:5173
npm run build:vscode
```

The VS Code source is in `vscode-extension/`. To load the Chrome development extension, select `.output/chrome-mv3` after WXT starts.

## Test

```sh
npm test
```

The command runs unit tests and makes a clean production build. It tests each listed claim in Chromium.

It scans screens with Axe and checks the 390 px layout. It completes a receipt in a clean VS Code profile. It checks the Chrome package.

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
- `dist/site/downloads/show-your-debugging-vscode.vsix`
- `dist/site/downloads/show-your-debugging-chrome.zip`
- `dist/vscode-extension/` for VS Code extension development
- `dist/extension/` for Chrome unpacked installation

Deploy `dist/site/` as the static root. The included `staticwebapp.config.json` supplies route fallback, the styled 404 page, CSP, and security headers.

## Product boundaries

- No code generation or answers
- VS Code receipts use local extension storage
- No workspace-file, open-editor, or clipboard reads
- The Chrome version requests browser storage only
- No analytics or third-party runtime scripts
- Offline demo after the first visit
- Markdown export for completed receipts

The product brief is in [.factory/brief.json](.factory/brief.json). Visual tokens and generated-art provenance are in [.factory/design.md](.factory/design.md). Demo isolation is in [.factory/demo.md](.factory/demo.md).

## License

MIT. See [LICENSE](LICENSE).
