import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';

const routes = [
  { route: '/', title: 'Show Your Debugging — Record debugging practice', description: 'Record a hypothesis, test result, fix, and clue before asking a coding assistant for the answer.', canonical: '/' },
  { route: '/?demo=1', title: 'Demo — Show Your Debugging', description: 'Try a sample debugging receipt stored only in a separate browser demo space.', canonical: '/demo' },
  { route: '/demo', title: 'Demo — Show Your Debugging', description: 'Try a sample debugging receipt stored only in a separate browser demo space.', canonical: '/demo' },
  { route: '/privacy', title: 'Privacy — Show Your Debugging', description: 'How Show Your Debugging stores receipts locally and keeps them under your control.', canonical: '/privacy' },
  { route: '/terms', title: 'Terms — Show Your Debugging', description: 'Terms for using Show Your Debugging as a free debugging practice tool.', canonical: '/terms' },
  { route: '/404.html', title: 'Page not found — Show Your Debugging', description: 'This page does not exist. Return to Show Your Debugging.', canonical: '/404' },
  { route: '/missing-page', title: 'Page not found — Show Your Debugging', description: 'This page does not exist. Return to Show Your Debugging.', canonical: '/404' }
] as const;

for (const { route, title, description, canonical } of routes) {
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
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://solution-trace-practice.sociobot.in${canonical}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://solution-trace-practice.sociobot.in${canonical}`);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/assets\/social-card\.webp$/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /\/assets\/social-card\.webp$/);
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
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
});

test('the landing and demo fit a 390px phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/?demo=1']) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('the three product facts are visible in the first 390px screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const geometry = await page.locator('.plain-facts li').evaluateAll((facts) => facts.map((fact) => ({
    text: fact.textContent?.trim(),
    top: fact.getBoundingClientRect().top,
    bottom: fact.getBoundingClientRect().bottom
  })));
  expect(geometry).toHaveLength(3);
  for (const fact of geometry) {
    expect(fact.top, `${fact.text} starts above the viewport`).toBeGreaterThanOrEqual(0);
    expect(fact.bottom, `${fact.text} falls below the first screen`).toBeLessThanOrEqual(844);
  }
});

test('the practice steps describe the next product action without promising an answer reveal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Write a testable hypothesis before recording test output.')).toBeVisible();
  await expect(page.getByText('Write a testable hypothesis before you reveal another answer.')).toHaveCount(0);
  const extensionPage = await readFile('extension/entrypoints/popup/index.html', 'utf8');
  expect(extensionPage).toContain('Record a debugging receipt before asking for help');
  expect(extensionPage).not.toMatch(/reveal (?:another |the )?answer/i);
});

test('the README leads with plain privacy outcomes', async () => {
  const readme = await readFile('README.md', 'utf8');
  expect(readme).toContain('Show Your Debugging is a free VS Code extension for beginning developers.');
  expect(readme).toContain("Receipts use VS Code's local extension storage. The extension does not read workspace files, open editors, or clipboard contents.");
  expect(readme).not.toContain('Chrome MV3 extension');
  expect(readme).not.toContain('chrome.storage.local');
  expect(readme).not.toContain('host access');
});

test('the first screen and static document name debugging practice and VS Code', async ({ page }) => {
  const source = await readFile('site/index.html', 'utf8');
  expect(source).toContain('<title>Show Your Debugging — Record debugging practice</title>');
  expect(source).toContain('<meta property="og:title" content="Show Your Debugging — Record debugging practice"');
  expect(source).toContain('<meta name="twitter:title" content="Show Your Debugging — Record debugging practice"');
  await page.goto('/');
  await expect(page.getByText('For beginning developers in VS Code who want to test their own ideas before asking a coding assistant.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download for VS Code' })).toHaveAttribute('href', '/downloads/show-your-debugging-vscode.vsix');
});

test('Privacy remains directly reachable in the 390px header', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const privacy = page.locator('.site-header').getByRole('link', { name: 'Privacy' });
  await expect(privacy).toBeVisible();
  await expect(privacy).toHaveCSS('display', 'flex');
  await privacy.focus();
  await expect(privacy).toBeFocused();
});

test('every rendered 390px touch target is at least 44 by 44 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ['/', '/?demo=1', '/privacy', '/terms', '/404.html']) {
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

test('the standalone 404 uses the shared site skeleton', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main');
  await expect(page.locator('header nav').getByRole('link')).toHaveCount(4);
  await expect(page.locator('footer').getByText('Practice a hypothesis, test, fix, and clue.')).toBeVisible();
  await expect(page.locator('footer').getByText('Version 1.0.0 · build 2026.08')).toBeVisible();
  await expect(page.locator('footer').getByRole('link', { name: /Built by Param Factory/ })).toBeVisible();
});

test('built route documents expose correct metadata before JavaScript runs', async () => {
  const documents = [
    ['dist/site/demo/index.html', 'Demo — Show Your Debugging', 'https://solution-trace-practice.sociobot.in/demo'],
    ['dist/site/privacy/index.html', 'Privacy — Show Your Debugging', 'https://solution-trace-practice.sociobot.in/privacy'],
    ['dist/site/terms/index.html', 'Terms — Show Your Debugging', 'https://solution-trace-practice.sociobot.in/terms']
  ] as const;
  for (const [file, title, canonical] of documents) {
    const html = await readFile(file, 'utf8');
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(`<link rel="canonical" href="${canonical}"`);
    expect(html).toContain(`<meta property="og:title" content="${title}"`);
    expect(html).toContain(`<meta property="og:url" content="${canonical}"`);
    expect(html).toContain(`<meta name="twitter:title" content="${title}"`);
  }
});

test('every internal link across product and legal routes resolves', async ({ page, request }) => {
  for (const route of ['/', '/?demo=1', '/privacy', '/terms', '/404.html']) {
    await page.goto(route);
    const hrefs = await page.locator('a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
    for (const href of new Set(hrefs)) {
      const url = new URL(href);
      if (url.origin !== 'http://127.0.0.1:4173' || url.protocol === 'mailto:') continue;
      const response = await request.get(`${url.pathname}${url.search}`);
      expect(response.status(), `${route} link ${url.pathname} should resolve`).toBe(200);
    }
  }
});

test('every listed claim has exactly one tagged observable test', async () => {
  const claims = JSON.parse(await readFile('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
  const testFiles = (await readdir('tests/e2e')).filter((file) => file.endsWith('.spec.ts'));
  const source = (await Promise.all(testFiles.map((file) => readFile(`tests/e2e/${file}`, 'utf8')))).join('\n');
  for (const claim of claims) {
    expect(claim.test).toBe(`npm test -- --grep @claim:${claim.id}`);
    expect(source.match(new RegExp(`@claim:${claim.id}(?![a-z0-9-])`, 'g')) ?? [], claim.id).toHaveLength(1);
  }
});

test('release output keeps the extension package and immutable asset policy', async ({ request }) => {
  for (const path of ['/downloads/show-your-debugging-vscode.vsix', '/downloads/show-your-debugging-chrome.zip']) {
    const packageResponse = await request.get(path);
    expect(packageResponse.status(), path).toBe(200);
    expect((await packageResponse.body()).subarray(0, 2).toString(), path).toBe('PK');
  }

  const config = JSON.parse(await readFile('site/public/staticwebapp.config.json', 'utf8')) as {
    routes: Array<{ route: string; headers?: Record<string, string> }>;
    responseOverrides?: Record<string, { rewrite?: string }>;
  };
  const assets = config.routes.find((route) => route.route === '/assets/*');
  expect(assets?.headers?.['Cache-Control']).toBe('public, max-age=31536000, immutable');
  expect(config.responseOverrides?.['404']?.rewrite).toBe('/404.html');
});

test('service worker does not make the extension download a precache requirement', async () => {
  const worker = await readFile('site/public/sw.js', 'utf8');
  expect(worker).toContain('Promise.allSettled');
  expect(worker).toContain("path.startsWith('/assets/')");
  expect(worker).not.toContain('/downloads/');
  expect(worker).not.toContain('cache.addAll');
});
