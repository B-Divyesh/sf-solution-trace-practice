import 'mocha/mocha';
import * as vscode from 'vscode';

declare const mocha: {
  setup(options: { ui: string; reporter?: string }): void;
  run(callback: (failures: number) => void): void;
};
declare function suite(name: string, callback: () => void): void;
declare function test(name: string, callback: () => Promise<void> | void): void;

type Receipt = {
  id: string;
  hypothesis: string;
  testOutput: string;
  fix: string;
  clue: string;
};

type ExtensionApi = {
  getReceipts(): Receipt[];
  saveReceipt(draft: Omit<Receipt, 'id'>): Promise<Receipt>;
  clearReceipts(): Promise<void>;
  exportReceiptTo(id: string, target: vscode.Uri): Promise<void>;
  storageUri: vscode.Uri;
  openPractice(): Promise<void>;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function run(): Promise<void> {
  mocha.setup({ ui: 'tdd', reporter: 'spec' });

  suite('Show Your Debugging VS Code extension', () => {
    test('opens its view and stores, exports, then clears a receipt', async () => {
      const extension = vscode.extensions.getExtension<ExtensionApi>('param-factory.show-your-debugging');
      assert(extension, 'the extension should load in the clean VS Code profile');
      const api = await extension.activate();
      await api.clearReceipts();
      assert(api.getReceipts().length === 0, 'the clean profile should start with no receipts');

      const commands = await vscode.commands.getCommands(true);
      assert(commands.includes('showYourDebugging.openPractice'), 'start command should be registered');
      assert(commands.includes('showYourDebugging.showReceipts'), 'receipts command should be registered');
      await api.openPractice();

      const receipt = await api.saveReceipt({
        hypothesis: 'The loop reads one item past the end.',
        testOutput: 'RangeError: Item 3 is undefined',
        fix: 'Use i < items.length.',
        clue: 'Inspect loop bounds first.'
      });
      const saved = api.getReceipts();
      assert(saved.length === 1, 'one receipt should be stored');
      assert(saved[0].hypothesis === 'The loop reads one item past the end.', 'hypothesis should persist');
      assert(saved[0].testOutput === 'RangeError: Item 3 is undefined', 'test output should persist');
      assert(saved[0].fix === 'Use i < items.length.', 'fix should persist');
      assert(saved[0].clue === 'Inspect loop bounds first.', 'clue should persist');

      await vscode.workspace.fs.createDirectory(api.storageUri);
      const exportUri = vscode.Uri.joinPath(api.storageUri, 'debugging-receipt-test.md');
      await api.exportReceiptTo(receipt.id, exportUri);
      const markdown = new TextDecoder().decode(await vscode.workspace.fs.readFile(exportUri));
      for (const heading of ['## Hypothesis', '## Test output', '## Fix I chose', '## Clue for next time']) {
        assert(markdown.includes(heading), `export should include ${heading}`);
      }
      await vscode.workspace.fs.delete(exportUri);

      await api.clearReceipts();
      assert(api.getReceipts().length === 0, 'all receipts should be removed');
    });
  });

  return new Promise((resolve, reject) => {
    mocha.run((failures) => failures ? reject(new Error(`${failures} VS Code integration test(s) failed.`)) : resolve());
  });
}
