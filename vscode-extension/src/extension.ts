import * as vscode from 'vscode';

type ReceiptDraft = {
  hypothesis: string;
  testOutput: string;
  fix: string;
  clue: string;
};

type Receipt = ReceiptDraft & {
  id: string;
  createdAt: string;
};

const RECEIPTS_KEY = 'showYourDebugging.receipts';

function cleanDraft(value: ReceiptDraft): ReceiptDraft {
  return {
    hypothesis: String(value.hypothesis ?? '').trim().slice(0, 180),
    testOutput: String(value.testOutput ?? '').trim().slice(0, 12_000),
    fix: String(value.fix ?? '').trim().slice(0, 4_000),
    clue: String(value.clue ?? '').trim().slice(0, 220)
  };
}

function receiptMarkdown(receipt: Receipt): string {
  return `# Debugging receipt\n\nCreated ${new Date(receipt.createdAt).toLocaleString()}\n\n## Hypothesis\n\n${receipt.hypothesis}\n\n## Test output\n\n\`\`\`text\n${receipt.testOutput}\n\`\`\`\n\n## Fix I chose\n\n${receipt.fix}\n\n## Clue for next time\n\n${receipt.clue}\n\n---\nThis receipt records a process. It does not prove competence.\n`;
}

class ReceiptStore {
  constructor(private readonly storage: vscode.Memento) {}

  getReceipts(): Receipt[] {
    return this.storage.get<Receipt[]>(RECEIPTS_KEY, []);
  }

  async saveReceipt(value: ReceiptDraft): Promise<Receipt> {
    const draft = cleanDraft(value);
    if (!draft.hypothesis || !draft.testOutput || !draft.fix || !draft.clue) {
      throw new Error('Complete the hypothesis, test output, fix, and clue.');
    }
    const receipt: Receipt = { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    await this.storage.update(RECEIPTS_KEY, [receipt, ...this.getReceipts()]);
    return receipt;
  }

  async clearReceipts(): Promise<void> {
    await this.storage.update(RECEIPTS_KEY, []);
  }

  async exportReceiptTo(id: string, target: vscode.Uri): Promise<void> {
    const receipt = this.getReceipts().find((item) => item.id === id);
    if (!receipt) throw new Error('That receipt is no longer saved.');
    await vscode.workspace.fs.writeFile(target, new TextEncoder().encode(receiptMarkdown(receipt)));
  }
}

class PracticeViewProvider implements vscode.WebviewViewProvider {
  private view: vscode.WebviewView | undefined;

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly store: ReceiptStore
  ) {}

  resolveWebviewView(view: vscode.WebviewView): void {
    this.view = view;
    view.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
    };
    view.webview.html = this.getHtml(view.webview);
    view.webview.onDidReceiveMessage(async (message: { type?: string; receipt?: ReceiptDraft; id?: string }) => {
      try {
        if (message.type === 'ready') await this.sendState();
        if (message.type === 'saveReceipt' && message.receipt) {
          const receipt = await this.store.saveReceipt(message.receipt);
          await this.sendState('Receipt saved in VS Code.', receipt);
        }
        if (message.type === 'deleteAll') {
          const count = this.store.getReceipts().length;
          const choice = await vscode.window.showWarningMessage(
            `Delete all ${count} saved debugging receipts from VS Code?`,
            { modal: true },
            'Delete receipts'
          );
          if (choice === 'Delete receipts') {
            await this.store.clearReceipts();
            await this.sendState('All receipts deleted.');
          }
        }
        if (message.type === 'exportReceipt' && message.id) await this.exportReceipt(message.id);
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'Try again.';
        await view.webview.postMessage({ type: 'error', message: detail });
      }
    });
  }

  async showReceipts(): Promise<void> {
    await this.focus();
    await this.view?.webview.postMessage({ type: 'showReceipts' });
  }

  async focus(): Promise<void> {
    await vscode.commands.executeCommand('workbench.view.extension.showYourDebugging');
    await vscode.commands.executeCommand('showYourDebugging.practiceView.focus');
  }

  private async sendState(message = '', activeReceipt?: Receipt): Promise<void> {
    await this.view?.webview.postMessage({
      type: 'state',
      receipts: this.store.getReceipts(),
      activeReceipt,
      message
    });
  }

  private async exportReceipt(id: string): Promise<void> {
    const receipt = this.store.getReceipts().find((item) => item.id === id);
    if (!receipt) throw new Error('That receipt is no longer saved.');
    const date = receipt.createdAt.slice(0, 10);
    const target = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file(`debugging-receipt-${date}.md`),
      filters: { Markdown: ['md'] },
      saveLabel: 'Export Markdown'
    });
    if (!target) return;
    await this.store.exportReceiptTo(receipt.id, target);
    await this.sendState('Markdown receipt exported.', receipt);
  }

  private getHtml(webview: vscode.Webview): string {
    const nonce = crypto.randomUUID().replaceAll('-', '');
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'style.css'));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'main.js'));
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
    <link rel="stylesheet" href="${styleUri}">
    <title>Practice — Show Your Debugging</title>
  </head>
  <body>
    <a class="skip-link" href="#practice">Skip to practice</a>
    <header><span aria-hidden="true">✓</span> Show Your Debugging</header>
    <main id="practice">
      <p class="eyebrow" id="step-label">Practice 1 of 3</p>
      <h1>Record a debugging receipt before asking for help</h1>
      <p class="lead" id="step-help">Write one specific cause you can test.</p>
      <ol class="progress" aria-label="Practice progress">
        <li class="current" data-progress="hypothesis"><span>1</span> Guess</li>
        <li data-progress="test"><span>2</span> Test</li>
        <li data-progress="fix"><span>3</span> Fix</li>
      </ol>
      <section id="workspace" aria-live="polite"></section>
      <p id="status" class="status" role="status"></p>
    </main>
    <footer><span>Stored in VS Code.</span><a href="https://solution-trace-practice.sociobot.in/privacy">Privacy</a></footer>
    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>`;
  }
}

export function activate(context: vscode.ExtensionContext): {
  getReceipts: () => Receipt[];
  saveReceipt: (draft: ReceiptDraft) => Promise<Receipt>;
  clearReceipts: () => Promise<void>;
  exportReceiptTo: (id: string, target: vscode.Uri) => Promise<void>;
  storageUri: vscode.Uri;
  openPractice: () => Promise<void>;
} {
  const store = new ReceiptStore(context.globalState);
  const provider = new PracticeViewProvider(context.extensionUri, store);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('showYourDebugging.practiceView', provider, {
      webviewOptions: { retainContextWhenHidden: true }
    }),
    vscode.commands.registerCommand('showYourDebugging.openPractice', () => provider.focus()),
    vscode.commands.registerCommand('showYourDebugging.showReceipts', () => provider.showReceipts())
  );
  return {
    getReceipts: () => store.getReceipts(),
    saveReceipt: (draft) => store.saveReceipt(draft),
    clearReceipts: () => store.clearReceipts(),
    exportReceiptTo: (id, target) => store.exportReceiptTo(id, target),
    storageUri: context.globalStorageUri,
    openPractice: () => provider.focus()
  };
}

export function deactivate(): void {}
