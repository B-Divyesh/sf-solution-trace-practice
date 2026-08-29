import { downloadReceipt, formatReceiptDate, makeReceipt, type Draft, type Receipt } from '../../src/receipt';
import './style.css';

const main = document.querySelector<HTMLElement>('#main')!;
const banner = document.querySelector<HTMLElement>('#demo-banner')!;
const announcer = document.querySelector<HTMLElement>('.route-announcer')!;
const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!;
const networkStatus = document.querySelector<HTMLElement>('#network-status')!;
const origin = 'https://solution-trace-practice.sociobot.in';

const DEMO_RECEIPTS_KEY = 'demo:receipts';
const DEMO_DRAFT_KEY = 'demo:draft';

const sampleDraft: Draft = {
  hypothesis: 'The loop reads one item past the end of the cart.',
  testOutput: 'npm test -- cart-total\n\nFAIL cart-total.test.ts\nRangeError: Item 3 is undefined\n  at totalCart (cart.ts:14)',
  fix: 'Change the loop check from i <= items.length to i < items.length.',
  lesson: 'When the last item is undefined, inspect the loop boundary first.'
};

const earlierSample: Receipt = {
  id: 'demo-earlier-receipt',
  createdAt: '2026-08-21T14:30:00.000Z',
  hypothesis: 'The profile request runs before the session finishes loading.',
  testOutput: 'FAIL profile.test.ts\nExpected 200, received 401',
  fix: 'Wait for the session state before requesting the profile.',
  lesson: 'A first-load-only 401 can point to request order.'
};

let demoStep: 'hypothesis' | 'test' | 'fix' | 'receipt' = 'hypothesis';
let demoDraft = { ...sampleDraft };
let demoReceipts: Receipt[] = [];
let activeReceipt: Receipt | null = null;

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
}

function setMeta(title: string, description: string, path: string): void {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = description;
  canonical.href = `${origin}${path}`;
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')!.content = description;
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')!.content = `${origin}${path}`;
  document.querySelector<HTMLMetaElement>('meta[property="og:image"]')!.content = `${origin}/assets/social-card.webp`;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')!.content = description;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')!.content = `${origin}/assets/social-card.webp`;
}

function landingMarkup(): string {
  return `
    <section class="hero section-shell">
      <div class="hero-copy">
        <p class="kicker">A debugging receipt for learners</p>
        <h1 tabindex="-1">Practice the bug before asking for help</h1>
        <p class="hero-lead">For beginning developers in VS Code who want to test their own ideas before asking a coding assistant.</p>
        <div class="hero-action">
          <a class="button primary" href="/?demo=1" data-route>Try it with sample data</a>
          <span>A filled cart-loop hypothesis opens. Nothing is saved to your receipts.</span>
        </div>
        <ul class="plain-facts" aria-label="Product facts">
          <li><strong>Private.</strong> Receipts use VS Code's local extension storage.</li>
          <li><strong>Offline.</strong> It works after your first visit.</li>
          <li><strong>Free.</strong> The VS Code extension costs nothing.</li>
        </ul>
      </div>
      <figure class="hero-art">
        <img src="/assets/debug-trail-hero.webp" srcset="/assets/debug-trail-hero-640.webp 640w, /assets/debug-trail-hero.webp 1200w" sizes="(max-width: 850px) 92vw, 52vw" width="1200" height="800" alt="A paper hypothesis, terminal, test strip, and code fix joined by a coral thread." fetchpriority="high" decoding="async" />
        <figcaption>Example debugging receipt</figcaption>
      </figure>
    </section>

    <section class="receipt-preview section-shell" aria-labelledby="preview-title">
      <div class="section-intro">
        <p class="kicker">Example debugging receipt</p>
        <h2 id="preview-title">See one complete debugging receipt</h2>
        <p>The receipt keeps your reasoning next to the test that changed it.</p>
        <a class="text-link" href="/?demo=1" data-route>Open the sample practice <span aria-hidden="true">→</span></a>
      </div>
      <article class="sample-receipt" aria-label="Example debugging receipt">
        <div class="receipt-stamp">Receipt 014</div>
        <section><h3>Hypothesis</h3><p>The loop reads one item past the end.</p></section>
        <section><h3>Test output</h3><pre>RangeError: Item 3 is undefined</pre></section>
        <section><h3>Fix I chose</h3><p>Stop the loop before the list length.</p></section>
        <section><h3>Clue for next time</h3><p>Inspect loop bounds when the final item is undefined.</p></section>
      </article>
    </section>

    <section class="how-section" id="how-it-works" aria-labelledby="how-title">
      <div class="section-shell">
        <p class="kicker">Three practice steps</p>
        <h2 id="how-title">How the practice works</h2>
        <ol class="step-list">
          <li><span>1</span><div><h3>Name one cause</h3><p>Write a testable hypothesis before recording test output.</p></div></li>
          <li><span>2</span><div><h3>Run one check</h3><p>Paste only the output that helped you judge the hypothesis.</p></div></li>
          <li><span>3</span><div><h3>Record your repair</h3><p>Save the fix and one clue you can use on the next bug.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="limits-section section-shell" aria-labelledby="limits-title">
      <div>
        <h2 id="limits-title">What it does not do</h2>
      </div>
      <ul class="limits-list">
        <li>It does not generate code or answers.</li>
        <li>It does not read workspace files, open editors, or clipboard contents.</li>
        <li>A receipt records process. It does not prove competence.</li>
      </ul>
      <a class="button secondary" href="/downloads/show-your-debugging-vscode.vsix" download>Download for VS Code</a>
    </section>

    <section class="browser-version section-shell" aria-labelledby="browser-version-title">
      <div>
        <p class="kicker">Separate browser version</p>
        <h2 id="browser-version-title">Use the Chrome toolbar version</h2>
      </div>
      <p>The Chrome extension records the same hypothesis, test output, fix, and clue in a browser popup.</p>
      <a class="text-link" href="/downloads/show-your-debugging-chrome.zip" download>Download for Chrome <span aria-hidden="true">→</span></a>
    </section>`;
}

function renderLanding(): void {
  banner.replaceChildren();
  banner.className = '';
  setMeta('Show Your Debugging — Record debugging practice', 'Record a hypothesis, test result, fix, and clue before asking a coding assistant for the answer.', '/');
  main.className = '';
  main.innerHTML = landingMarkup();
}

function readDemoData(): void {
  try {
    const storedReceipts = localStorage.getItem(DEMO_RECEIPTS_KEY);
    const storedDraft = localStorage.getItem(DEMO_DRAFT_KEY);
    demoReceipts = storedReceipts ? JSON.parse(storedReceipts) as Receipt[] : [earlierSample];
    demoDraft = storedDraft ? JSON.parse(storedDraft) as Draft : { ...sampleDraft };
    if (!storedReceipts) localStorage.setItem(DEMO_RECEIPTS_KEY, JSON.stringify(demoReceipts));
    if (!storedDraft) localStorage.setItem(DEMO_DRAFT_KEY, JSON.stringify(demoDraft));
  } catch {
    demoReceipts = [earlierSample];
    demoDraft = { ...sampleDraft };
  }
}

function saveDemoData(): boolean {
  try {
    localStorage.setItem(DEMO_RECEIPTS_KEY, JSON.stringify(demoReceipts));
    localStorage.setItem(DEMO_DRAFT_KEY, JSON.stringify(demoDraft));
    return true;
  } catch {
    showDemoStatus('Sample data could not be saved. Reset the demo and try again.', true);
    return false;
  }
}

function showDemoStatus(message: string, error = false): void {
  const node = document.querySelector<HTMLElement>('#demo-status');
  if (!node) return;
  node.textContent = message;
  node.classList.toggle('error', error);
}

function demoBannerMarkup(): string {
  return `<div class="demo-banner-inner"><strong>Demo — sample data, nothing is saved to your receipts</strong><div><button id="reset-demo" type="button">Reset demo</button><a href="/downloads/show-your-debugging-vscode.vsix" download id="start-real">Start for real</a></div></div>`;
}

function clearDemoData(): void {
  localStorage.removeItem(DEMO_RECEIPTS_KEY);
  localStorage.removeItem(DEMO_DRAFT_KEY);
}

function demoShellMarkup(): string {
  return `<section class="demo-shell section-shell">
    <div class="demo-heading">
      <p class="kicker">Private practice sandbox</p>
      <h1 tabindex="-1">Make a debugging receipt from this bug</h1>
      <p>Use the filled sample or replace it with your own words.</p>
    </div>
    <div class="demo-layout">
      <section class="workbench" aria-labelledby="practice-step-title">
        <ol class="demo-progress" aria-label="Practice progress">
          <li data-demo-progress="hypothesis"><span>1</span> Guess</li>
          <li data-demo-progress="test"><span>2</span> Test</li>
          <li data-demo-progress="fix"><span>3</span> Fix</li>
        </ol>
        <div id="demo-workspace"></div>
        <p id="demo-status" role="status"></p>
      </section>
      <aside class="demo-aside" aria-labelledby="saved-sample-title">
        <p class="kicker">Sample history</p>
        <h2 id="saved-sample-title">Receipts in this demo</h2>
        <div id="demo-receipt-list"></div>
        <p class="aside-note">The demo uses keys that start with <code>demo:</code>. The extension never reads them.</p>
      </aside>
    </div>
  </section>`;
}

function bindDemoBanner(): void {
  document.querySelector<HTMLButtonElement>('#reset-demo')!.addEventListener('click', () => {
    clearDemoData();
    demoStep = 'hypothesis';
    activeReceipt = null;
    readDemoData();
    renderDemoStep();
    renderDemoReceiptList();
    showDemoStatus('Demo reset to the original sample.');
  });
  document.querySelector<HTMLAnchorElement>('#start-real')!.addEventListener('click', () => {
    clearDemoData();
  });
}

function updateDemoProgress(): void {
  const order = ['hypothesis', 'test', 'fix'];
  const current = demoStep === 'receipt' ? 3 : order.indexOf(demoStep);
  document.querySelectorAll<HTMLElement>('[data-demo-progress]').forEach((item, index) => {
    item.classList.toggle('current', index === current);
    item.classList.toggle('done', index < current);
  });
}

function renderDemoStep(): void {
  const workspace = document.querySelector<HTMLElement>('#demo-workspace')!;
  updateDemoProgress();
  if (demoStep === 'hypothesis') {
    workspace.innerHTML = `<p class="step-count">Practice 1 of 3</p><h2 id="practice-step-title">Name one cause you can test</h2>
      <form id="hypothesis-form"><label for="demo-hypothesis">My hypothesis</label><input id="demo-hypothesis" required maxlength="180" value="${escapeHtml(demoDraft.hypothesis)}" aria-describedby="hypothesis-help"><p id="hypothesis-help" class="field-help">One sentence. Name a cause, not only the error.</p><button class="button primary" type="submit">Lock in my hypothesis</button></form>`;
    document.querySelector<HTMLFormElement>('#hypothesis-form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      demoDraft.hypothesis = document.querySelector<HTMLInputElement>('#demo-hypothesis')!.value.trim();
      if (!demoDraft.hypothesis) return;
      if (saveDemoData()) { demoStep = 'test'; renderDemoStep(); }
    });
  } else if (demoStep === 'test') {
    workspace.innerHTML = `<p class="step-count">Practice 2 of 3</p><h2 id="practice-step-title">Run one useful check</h2><blockquote>${escapeHtml(demoDraft.hypothesis)}</blockquote>
      <form id="test-form"><label for="demo-test">Test output</label><textarea id="demo-test" required rows="8">${escapeHtml(demoDraft.testOutput)}</textarea><p class="field-help">This sample stays inside the demo storage.</p><div class="button-row"><button class="button quiet" type="button" id="back-hypothesis">Edit hypothesis</button><button class="button primary" type="submit">Record this test</button></div></form>`;
    document.querySelector<HTMLButtonElement>('#back-hypothesis')!.addEventListener('click', () => { demoStep = 'hypothesis'; renderDemoStep(); });
    document.querySelector<HTMLFormElement>('#test-form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      demoDraft.testOutput = document.querySelector<HTMLTextAreaElement>('#demo-test')!.value.trim();
      if (!demoDraft.testOutput) return;
      if (saveDemoData()) { demoStep = 'fix'; renderDemoStep(); }
    });
  } else if (demoStep === 'fix') {
    workspace.innerHTML = `<p class="step-count">Practice 3 of 3</p><h2 id="practice-step-title">Record your repair and clue</h2>
      <form id="fix-form"><label for="demo-fix">Fix I chose</label><textarea id="demo-fix" required rows="4">${escapeHtml(demoDraft.fix)}</textarea><label for="demo-lesson">Clue for next time</label><input id="demo-lesson" required value="${escapeHtml(demoDraft.lesson)}"><div class="button-row"><button class="button quiet" type="button" id="back-test">Edit test</button><button class="button primary" type="submit">Save sample receipt</button></div></form>`;
    document.querySelector<HTMLButtonElement>('#back-test')!.addEventListener('click', () => { demoStep = 'test'; renderDemoStep(); });
    document.querySelector<HTMLFormElement>('#fix-form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      demoDraft.fix = document.querySelector<HTMLTextAreaElement>('#demo-fix')!.value.trim();
      demoDraft.lesson = document.querySelector<HTMLInputElement>('#demo-lesson')!.value.trim();
      if (!demoDraft.fix || !demoDraft.lesson) return;
      activeReceipt = makeReceipt(demoDraft);
      demoReceipts = [activeReceipt, ...demoReceipts];
      if (saveDemoData()) { demoStep = 'receipt'; renderDemoStep(); renderDemoReceiptList(); showDemoStatus('Sample receipt saved inside the demo.'); }
    });
  } else if (activeReceipt) {
    workspace.innerHTML = `<p class="step-count">Receipt saved</p><h2 id="practice-step-title">Review your debugging receipt</h2>
      <article class="demo-receipt"><section><h3>Hypothesis</h3><p>${escapeHtml(activeReceipt.hypothesis)}</p></section><section><h3>Test output</h3><pre>${escapeHtml(activeReceipt.testOutput)}</pre></section><section><h3>Fix I chose</h3><p>${escapeHtml(activeReceipt.fix)}</p></section><section><h3>Clue for next time</h3><p>${escapeHtml(activeReceipt.lesson)}</p></section></article><p class="evidence-note">This receipt records your process. It does not prove competence.</p><div class="button-row"><button class="button primary" id="export-receipt" type="button">Export Markdown</button><button class="button quiet" id="new-demo" type="button">Start another sample</button></div>`;
    document.querySelector<HTMLButtonElement>('#export-receipt')!.addEventListener('click', () => { downloadReceipt(activeReceipt!); showDemoStatus('Markdown receipt downloaded.'); });
    document.querySelector<HTMLButtonElement>('#new-demo')!.addEventListener('click', () => { demoDraft = { ...sampleDraft }; activeReceipt = null; demoStep = 'hypothesis'; saveDemoData(); renderDemoStep(); });
  }
  updateDemoProgress();
}

function renderDemoReceiptList(): void {
  const list = document.querySelector<HTMLElement>('#demo-receipt-list')!;
  list.replaceChildren();
  for (const receipt of demoReceipts.slice(0, 3)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'saved-receipt-button';
    const title = document.createElement('strong');
    title.textContent = receipt.hypothesis;
    const date = document.createElement('span');
    date.textContent = formatReceiptDate(receipt.createdAt);
    button.append(title, date);
    button.addEventListener('click', () => { activeReceipt = receipt; demoStep = 'receipt'; renderDemoStep(); });
    list.append(button);
  }
}

function renderDemo(): void {
  setMeta('Demo — Show Your Debugging', 'Try a sample debugging receipt stored only in a separate browser demo space.', '/demo');
  main.className = 'demo-page';
  banner.className = 'demo-banner';
  banner.innerHTML = demoBannerMarkup();
  readDemoData();
  main.innerHTML = demoShellMarkup();
  bindDemoBanner();
  renderDemoStep();
  renderDemoReceiptList();
}

function legalMarkup(kind: 'privacy' | 'terms'): string {
  if (kind === 'privacy') return `<article class="legal section-shell"><p class="kicker">Privacy details</p><h1 tabindex="-1">Your debugging notes stay on your device</h1><p class="legal-lead">Show Your Debugging uses local extension storage. It uses no analytics or third-party runtime scripts.</p><h2>What the VS Code extension stores</h2><p>It stores the hypothesis, test output, fix, clue, and date that you enter in VS Code's local extension state. You can delete all receipts from the view.</p><h2>What the VS Code extension reads</h2><p>It does not read workspace files, open editors, clipboard contents, or browsing history. You choose what to paste.</p><h2>Chrome version access</h2><p>The separate Chrome extension requests browser storage only. It has no tab, history, clipboard, host, or content-script permission.</p><h2>Demo storage</h2><p>The website demo uses separate browser keys that start with <code>demo:</code>. Resetting or leaving the demo clears those keys.</p><h2>Network use</h2><p>Neither extension sends receipt content over the network. The website loads its own static files from this domain.</p><h2>Contact</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a> with privacy questions.</p><p class="updated">Last updated: August 29, 2026.</p></article>`;
  return `<article class="legal section-shell"><p class="kicker">Terms in plain words</p><h1 tabindex="-1">Use the practice for your own debugging</h1><p class="legal-lead">Show Your Debugging is free software for personal, classroom, and workplace practice.</p><h2>Your responsibility</h2><p>Paste only code or output you are allowed to store. Review exported receipts before you share them.</p><h2>Receipts are not grades</h2><p>A receipt shows the steps you recorded. It does not certify skill, authorship, or competence.</p><h2>No warranty</h2><p>The software is provided as-is under the MIT License. Keep another copy of receipts you need to retain.</p><h2>Changes</h2><p>We may update these terms when the product changes. The date below shows the current version.</p><h2>Contact</h2><p>Email <a href="mailto:hello@sociobot.in">hello@sociobot.in</a> with terms questions.</p><p class="updated">Last updated: August 29, 2026.</p></article>`;
}

function renderLegal(kind: 'privacy' | 'terms'): void {
  banner.replaceChildren();
  banner.className = '';
  const privacy = kind === 'privacy';
  setMeta(`${privacy ? 'Privacy' : 'Terms'} — Show Your Debugging`, privacy ? 'How Show Your Debugging stores receipts locally and keeps them under your control.' : 'Terms for using Show Your Debugging as a free debugging practice tool.', `/${kind}`);
  main.className = '';
  main.innerHTML = legalMarkup(kind);
}

function renderNotFound(): void {
  banner.replaceChildren();
  banner.className = '';
  setMeta('Page not found — Show Your Debugging', 'This page does not exist. Return to Show Your Debugging.', '/404');
  main.className = '';
  main.innerHTML = `<section class="not-found section-shell"><div class="error-stamp" aria-hidden="true">404</div><p class="kicker">Page not found</p><h1 tabindex="-1">This page does not exist</h1><p>The address may be wrong or the page may have moved.</p><a class="button primary" href="/" data-route>Return home</a></section>`;
}

function renderRoute(focus = false): void {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const isDemo = path === '/demo' || (path === '/' && new URLSearchParams(window.location.search).get('demo') === '1');
  if (!isDemo) clearDemoData();
  if (isDemo) renderDemo();
  else if (path === '/') renderLanding();
  else if (path === '/privacy') renderLegal('privacy');
  else if (path === '/terms') renderLegal('terms');
  else renderNotFound();
  bindRouteLinks();
  if (focus) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const heading = main.querySelector<HTMLElement>('h1');
    heading?.focus();
    announcer.textContent = heading?.textContent ?? document.title;
  }
}

function bindRouteLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((link) => {
    if (link.dataset.bound) return;
    link.dataset.bound = 'true';
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      history.pushState({}, '', link.href);
      renderRoute(true);
    });
  });
}

window.addEventListener('popstate', () => renderRoute(true));
document.addEventListener('keydown', (event) => {
  const demoQuery = new URLSearchParams(window.location.search).get('demo') === '1';
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && (window.location.pathname === '/demo' || demoQuery)) {
    const form = document.querySelector<HTMLFormElement>('#demo-workspace form');
    if (form) { event.preventDefault(); form.requestSubmit(); }
  }
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
}

function updateNetworkStatus(): void {
  networkStatus.hidden = navigator.onLine;
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

renderRoute();
