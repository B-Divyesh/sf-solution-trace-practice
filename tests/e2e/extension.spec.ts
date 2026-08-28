import { chromium, expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

test('the packaged extension completes a real receipt', async () => {
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
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});
