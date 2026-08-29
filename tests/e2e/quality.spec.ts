import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const routes = [
  ['/', 'Show Your Debugging — Practice before asking'],
  ['/demo', 'Demo — Show Your Debugging'],
  ['/privacy', 'Privacy — Show Your Debugging'],
  ['/terms', 'Terms — Show Your Debugging']
] as const;

for (const [route, title] of routes) {
  test(`${route} has clean structure, console, and accessibility`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('img:not([alt])')).toHaveCount(0);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('keyboard navigation changes routes and moves focus to the heading', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Demo', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});

test('the landing and demo fit a 390px phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo']) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('every rendered 390px touch target is at least 44 by 44 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ['/', '/demo', '/privacy', '/terms', '/404.html']) {
    await page.goto(route);
    const geometry = await page.locator('a[href], button, input:not([type="hidden"]), textarea, select, [role="button"]').evaluateAll((targets) => {
      const rendered = targets.flatMap((target) => {
        const element = target as HTMLElement;
        const style = getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        if (style.display === 'none' || style.visibility === 'hidden' || bounds.width === 0 || bounds.height === 0) return [];
        return [{
          name: element.getAttribute('aria-label') || element.textContent?.trim().replace(/\s+/g, ' ') || element.tagName,
          width: Number(bounds.width.toFixed(1)),
          height: Number(bounds.height.toFixed(1)),
          left: bounds.left,
          right: bounds.right,
          top: bounds.top,
          bottom: bounds.bottom
        }];
      });
      const overlaps: string[][] = [];
      for (let first = 0; first < rendered.length; first += 1) {
        for (let second = first + 1; second < rendered.length; second += 1) {
          const a = rendered[first];
          const b = rendered[second];
          const intersects = Math.min(a.right, b.right) > Math.max(a.left, b.left)
            && Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top);
          if (intersects) overlaps.push([a.name, b.name]);
        }
      }
      return {
        undersized: rendered.filter((target) => target.width < 44 || target.height < 44),
        overlaps
      };
    });

    expect(geometry.undersized, `${route} has undersized touch targets`).toEqual([]);
    expect(geometry.overlaps, `${route} has overlapping touch targets`).toEqual([]);
  }
});

test('every internal landing link resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  for (const href of new Set(hrefs)) {
    const url = new URL(href);
    if (url.origin !== 'http://127.0.0.1:4173' || url.protocol === 'mailto:') continue;
    const response = await request.get(url.pathname);
    expect(response.status(), `${url.pathname} should resolve`).toBe(200);
  }
});

test('release output keeps the extension package and immutable asset policy', async ({ request }) => {
  const packageResponse = await request.get('/downloads/show-your-debugging-chrome.zip');
  expect(packageResponse.status()).toBe(200);
  expect((await packageResponse.body()).subarray(0, 2).toString()).toBe('PK');

  const config = JSON.parse(await readFile('site/public/staticwebapp.config.json', 'utf8')) as {
    routes: Array<{ route: string; headers?: Record<string, string> }>;
  };
  const assets = config.routes.find((route) => route.route === '/assets/*');
  expect(assets?.headers?.['Cache-Control']).toBe('public, max-age=31536000, immutable');
});

test('service worker does not make the extension download a precache requirement', async () => {
  const worker = await readFile('site/public/sw.js', 'utf8');
  expect(worker).toContain('Promise.allSettled');
  expect(worker).toContain("path.startsWith('/assets/')");
  expect(worker).not.toContain('/downloads/');
  expect(worker).not.toContain('cache.addAll');
});
