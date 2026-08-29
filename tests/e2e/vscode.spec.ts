import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { expect, test } from '@playwright/test';

const execFileAsync = promisify(execFile);

test('@claim:receipt-workflow @claim:receipt-delete @claim:vscode-local-storage @claim:markdown-export runs the real extension in a clean VS Code profile', async () => {
  test.setTimeout(240_000);
  const { stdout, stderr } = await execFileAsync(process.execPath, ['tests/vscode/run.cjs'], {
    cwd: process.cwd(),
    env: process.env,
    timeout: 220_000,
    maxBuffer: 2_000_000
  });
  expect(`${stdout}\n${stderr}`).toContain('1 passing');
});
