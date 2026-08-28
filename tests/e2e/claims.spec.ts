import { expect, test } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';

async function finishSample(page: import('@playwright/test').Page): Promise<void> {
  await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
  await page.getByRole('button', { name: 'Record this test' }).click();
  await page.getByRole('button', { name: 'Save sample receipt' }).click();
}

test('@claim:hypothesis-first requires the guess before showing the test', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByLabel('My hypothesis')).toBeVisible();
  await expect(page.getByLabel('Test output')).toHaveCount(0);
  await expect(page.getByLabel('Fix I chose')).toHaveCount(0);
  await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
  await expect(page.getByLabel('Test output')).toBeVisible();
});

test('@claim:local-only keeps demo entries in a separate browser namespace', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo');
  await finishSample(page);
  await expect(page.getByText('Sample receipt saved inside the demo.')).toBeVisible();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.length).toBeGreaterThan(0);
  expect(keys.every((key) => key.startsWith('demo:'))).toBe(true);
  expect(requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});

test('@claim:offline-reload reloads the demo without a network', async ({ page, context }) => {
  await page.goto('/demo');
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

test('@claim:markdown-export downloads all receipt sections', async ({ page }) => {
  await page.goto('/demo');
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
  expect(markdown).toContain('## What I learned');
});

test('@claim:free-download serves the packaged extension without a gate', async ({ request }) => {
  const response = await request.get('/downloads/show-your-debugging-chrome.zip');
  expect(response.status()).toBe(200);
  const body = await response.body();
  expect(body.subarray(0, 2).toString()).toBe('PK');
  expect(body.byteLength).toBeGreaterThan(5_000);
});

test('@claim:storage-only-permission ships no tab or file permissions', async () => {
  const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as { permissions?: string[]; host_permissions?: string[] };
  expect(manifest.permissions).toEqual(['storage']);
  expect(manifest.host_permissions ?? []).toEqual([]);
});

test('@claim:no-code-generation has no model host or endpoint', async () => {
  const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as { host_permissions?: string[] };
  const chunkNames = await readdir('dist/extension/chunks');
  const popupChunk = chunkNames.find((file) => file.startsWith('popup-'))!;
  const popupBundle = await readFile(`dist/extension/chunks/${popupChunk}`, 'utf8');
  expect(manifest.host_permissions ?? []).toEqual([]);
  expect(popupBundle).not.toMatch(/api\.sociobot|openai|gpt-5/i);
});

test('@claim:no-tracking loads no third-party runtime request or script', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.goto('/demo');
  const scriptSources = await page.locator('script[src]').evaluateAll((scripts) => scripts.map((script) => (script as HTMLScriptElement).src));
  expect([...requests, ...scriptSources].every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});
