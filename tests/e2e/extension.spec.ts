import { chromium, expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

test('@claim:receipt-workflow @claim:receipt-delete the packaged extension completes and deletes a real receipt', async () => {
  const extensionPath = resolve('dist/extension');
  const userDataDir = await mkdtemp(resolve(tmpdir(), 'show-debugging-test-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });

  try {
    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent('serviceworker');
    const extensionId = new URL(worker.url()).host;
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
    await expect(page.getByRole('button', { name: 'Receipts 0' })).toHaveCSS('color', 'rgb(255, 247, 232)');
    await expect(page.getByRole('button', { name: 'Receipts 0' })).toHaveCSS('background-color', 'rgb(36, 21, 47)');
    await page.getByLabel('My hypothesis').fill('The loop reads one item too far.');
    await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
    await page.getByLabel('Test output').fill('RangeError: item 3 is undefined');
    await page.getByRole('button', { name: 'Record this test' }).click();
    await page.getByLabel('Fix I chose').fill('Use i < items.length.');
    await page.getByLabel('Clue for next time').fill('Inspect loop bounds first.');
    await page.getByRole('button', { name: 'Save my receipt' }).click();
    await expect(page.getByText('Receipt saved in this browser.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hypothesis', level: 2 })).toBeVisible();
    await expect(page.getByText('The loop reads one item too far.')).toBeVisible();
    const results = await new AxeBuilder({ page: page as never }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious).toEqual([]);
    await page.getByRole('button', { name: 'Receipts 1' }).click();
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Delete all receipts' }).click();
    await expect(page.getByText('No receipts yet. Start with one bug and one testable cause.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Receipts 0' })).toBeVisible();
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});

test('@claim:extension-privacy-boundary the packaged extension has no private-data access or network path', async () => {
  const extensionPath = resolve('dist/extension');
  const userDataDir = await mkdtemp(resolve(tmpdir(), 'show-debugging-privacy-test-'));
  const requests: Array<{ url: string; method: string; postData: string | null }> = [];
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });
  context.on('request', (request) => requests.push({
    url: request.url(),
    method: request.method(),
    postData: request.postData()
  }));

  try {
    const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as {
      permissions?: string[];
      optional_permissions?: string[];
      host_permissions?: string[];
      optional_host_permissions?: string[];
      content_scripts?: unknown[];
    };
    expect(manifest.permissions).toEqual(['storage']);
    expect(manifest.optional_permissions ?? []).toEqual([]);
    expect(manifest.host_permissions ?? []).toEqual([]);
    expect(manifest.optional_host_permissions ?? []).toEqual([]);
    expect(manifest.content_scripts ?? []).toEqual([]);

    const bundleFiles = (await readdir('dist/extension', { recursive: true }))
      .filter((file) => /\.(?:html|js)$/i.test(file));
    const bundle = (await Promise.all(bundleFiles.map((file) => readFile(resolve('dist/extension', file), 'utf8')))).join('\n');
    expect(bundle).not.toMatch(/chrome\.(?:tabs|history)|navigator\.clipboard|clipboardRead|<all_urls>/i);

    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent('serviceworker');
    const extensionId = new URL(worker.url()).host;
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const privateValues = [
      'PRIVATE-HYPOTHESIS-7d3f',
      'PRIVATE-TEST-OUTPUT-8c4a',
      'PRIVATE-FIX-9b5e',
      'PRIVATE-CLUE-1a6d'
    ];
    await page.getByLabel('My hypothesis').fill(privateValues[0]);
    await page.getByRole('button', { name: 'Lock in my hypothesis' }).click();
    await page.getByLabel('Test output').fill(privateValues[1]);
    await page.getByRole('button', { name: 'Record this test' }).click();
    await page.getByLabel('Fix I chose').fill(privateValues[2]);
    await page.getByLabel('Clue for next time').fill(privateValues[3]);
    await page.getByRole('button', { name: 'Save my receipt' }).click();
    await expect(page.getByText('Receipt saved in this browser.')).toBeVisible();

    const stored = await page.evaluate(async () => chrome.storage.local.get('receipts')) as { receipts?: Array<{ hypothesis: string }> };
    expect(stored.receipts?.[0]?.hypothesis).toBe(privateValues[0]);

    expect(requests.some(({ url }) => url.startsWith(`chrome-extension://${extensionId}/`))).toBe(true);
    const networkRequests = requests.filter(({ url }) => /^https?:/i.test(url));
    expect(networkRequests).toEqual([]);
    const requestEvidence = requests.map(({ url, method, postData }) => `${method} ${url} ${postData ?? ''}`).join('\n');
    for (const privateValue of privateValues) expect(requestEvidence).not.toContain(privateValue);
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});
