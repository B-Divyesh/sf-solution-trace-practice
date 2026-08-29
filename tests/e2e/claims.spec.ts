import { expect, test } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';

async function finishSample(page: import('@playwright/test').Page): Promise<void> {
  await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
  await page.getByRole('button', { name: 'Record this test' }).click();
  await page.getByRole('button', { name: 'Save sample receipt' }).click();
}

const demoUrl = '/?demo=1';

test('@claim:sample-opens opens a filled cart-loop practice in one click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByText('Demo — sample data, nothing is saved to your receipts')).toBeVisible();
  await expect(page.getByLabel('My hypothesis')).toHaveValue('The loop reads one item past the end of the cart.');
  await expect(page.getByText('The profile request runs before the session finishes loading.')).toBeVisible();
});

test('@claim:demo-reset restores the shipped sample and clears edits', async ({ page }) => {
  await page.goto(demoUrl);
  await page.getByLabel('My hypothesis').fill('A changed demo hypothesis.');
  await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
  await page.getByLabel('Test output').fill('A changed test result.');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByLabel('My hypothesis')).toHaveValue('The loop reads one item past the end of the cart.');
  const data = await page.evaluate(() => ({
    draft: JSON.parse(localStorage.getItem('demo:draft') ?? '{}'),
    keys: Object.keys(localStorage)
  }));
  expect(data.draft.testOutput).toContain('RangeError: Item 3 is undefined');
  expect(data.keys.sort()).toEqual(['demo:draft', 'demo:receipts']);
  await page.locator('.site-header .wordmark').click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);

  await page.goto(demoUrl);
  await page.getByLabel('My hypothesis').fill('Discard this second demo edit.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Start for real' }).click();
  await downloadPromise;
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});

test('@claim:hypothesis-first requires the guess before showing the test', async ({ page }) => {
  await page.goto(demoUrl);
  await expect(page.getByLabel('My hypothesis')).toBeVisible();
  await expect(page.getByLabel('Test output')).toHaveCount(0);
  await expect(page.getByLabel('Fix I chose')).toHaveCount(0);
  await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
  await expect(page.getByLabel('Test output')).toBeVisible();
});

test('@claim:local-only keeps demo entries in a separate browser namespace', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto(demoUrl);
  await finishSample(page);
  await expect(page.getByText('Sample receipt saved inside the demo.')).toBeVisible();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.length).toBeGreaterThan(0);
  expect(keys.every((key) => key.startsWith('demo:'))).toBe(true);
  expect(requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});

test('@claim:offline-reload reloads the demo without a network', async ({ page, context }) => {
  await page.goto(demoUrl);
  await page.evaluate(() => navigator.serviceWorker.ready);
  if (!await page.evaluate(() => Boolean(navigator.serviceWorker.controller))) await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  const cachedPaths = await page.evaluate(async () => {
    const keys = await caches.keys();
    const requests = await Promise.all(keys.map(async (key) => (await caches.open(key)).keys()));
    return requests.flat().map((request) => new URL(request.url).pathname);
  });
  expect(cachedPaths.some((path) => path.endsWith('.js'))).toBe(true);
  expect(cachedPaths.some((path) => path.endsWith('.css'))).toBe(true);
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Make a debugging receipt from this bug');
  await expect(page.getByText('Offline — the demo and saved extension receipts still work.')).toBeVisible();
  await context.setOffline(false);
});

test('the website demo downloads all receipt sections as Markdown', async ({ page }) => {
  await page.goto(demoUrl);
  await finishSample(page);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export Markdown' }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let markdown = '';
  for await (const chunk of stream) markdown += chunk.toString();
  expect(download.suggestedFilename()).toMatch(/^debugging-receipt-.*\.md$/);
  expect(markdown).toContain('## Hypothesis');
  expect(markdown).toContain('## Test output');
  expect(markdown).toContain('## Fix I chose');
  expect(markdown).toContain('## Clue for next time');
});

test('@claim:free-download serves the packaged extension without a gate', async ({ request }) => {
  for (const path of ['/downloads/show-your-debugging-vscode.vsix', '/downloads/show-your-debugging-chrome.zip']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const body = await response.body();
    expect(body.subarray(0, 2).toString(), path).toBe('PK');
    expect(body.byteLength, path).toBeGreaterThan(5_000);
  }
});

test('@claim:storage-only-permission ships no tab, file, or blocking access', async () => {
  const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as { permissions?: string[]; host_permissions?: string[]; content_scripts?: unknown[] };
  expect(manifest.permissions).toEqual(['storage']);
  expect(manifest.host_permissions ?? []).toEqual([]);
  expect(manifest.content_scripts ?? []).toEqual([]);
});

test('@claim:no-code-generation has no model host or endpoint', async () => {
  const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as { host_permissions?: string[] };
  const chunkNames = await readdir('dist/extension/chunks');
  const popupChunk = chunkNames.find((file) => file.startsWith('popup-'))!;
  const popupBundle = await readFile(`dist/extension/chunks/${popupChunk}`, 'utf8');
  const vscodeBundle = await readFile('dist/vscode-extension/dist/extension.js', 'utf8');
  expect(manifest.host_permissions ?? []).toEqual([]);
  expect(popupBundle).not.toMatch(/api\.sociobot|openai|gpt-5/i);
  expect(vscodeBundle).not.toMatch(/api\.sociobot|openai|gpt-5|responses\.create/i);
});

test('@claim:vscode-privacy-boundary the VS Code bundle has no workspace, editor, clipboard-read, process, or network access', async () => {
  const manifest = JSON.parse(await readFile('vscode-extension/package.json', 'utf8')) as {
    contributes?: { commands?: Array<{ command: string }>; views?: Record<string, Array<{ id: string }>> };
  };
  const bundle = await readFile('dist/vscode-extension/dist/extension.js', 'utf8');
  expect(manifest.contributes?.commands?.map(({ command }) => command)).toEqual([
    'showYourDebugging.openPractice',
    'showYourDebugging.showReceipts'
  ]);
  expect(manifest.contributes?.views?.showYourDebugging?.[0]?.id).toBe('showYourDebugging.practiceView');
  expect(bundle).not.toMatch(/workspace\.fs\.readFile|openTextDocument|activeTextEditor|visibleTextEditors|env\.clipboard\.readText|child_process|node:(?:http|https|net)|\bfetch\s*\(/i);
  expect(bundle).toContain('globalState');
});

test('@claim:no-tracking loads no third-party runtime request or script', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.goto(demoUrl);
  const scriptSources = await page.locator('script[src]').evaluateAll((scripts) => scripts.map((script) => (script as HTMLScriptElement).src));
  expect([...requests, ...scriptSources].every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
  const extensionFiles = [
    'dist/vscode-extension/dist/extension.js',
    'dist/vscode-extension/dist/web-extension.js'
  ];
  const extensionBundles = (await Promise.all(extensionFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  expect(extensionBundles).not.toMatch(/google-analytics|googletagmanager|segment\.com|mixpanel|posthog|sentry|\bfetch\s*\(|node:(?:http|https|net)/i);
});
