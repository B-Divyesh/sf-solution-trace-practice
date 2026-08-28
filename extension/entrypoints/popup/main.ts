import { downloadReceipt, emptyDraft, formatReceiptDate, makeReceipt, type Draft, type Receipt } from '../../../src/receipt';
import './style.css';

type Step = 'hypothesis' | 'test' | 'fix' | 'receipt' | 'history';

const storage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    const result = await chrome.storage.local.get(key);
    return (result[key] as T | undefined) ?? fallback;
  },
  async set(values: Record<string, unknown>): Promise<void> {
    await chrome.storage.local.set(values);
  }
};

const workspace = document.querySelector<HTMLElement>('#workspace')!;
const status = document.querySelector<HTMLElement>('#status')!;
const stepLabel = document.querySelector<HTMLElement>('#step-label')!;
const stepHelp = document.querySelector<HTMLElement>('#step-help')!;
const historyButton = document.querySelector<HTMLButtonElement>('#history-button')!;
const receiptCount = document.querySelector<HTMLElement>('#receipt-count')!;

let step: Step = 'hypothesis';
let draft: Draft = emptyDraft();
let receipts: Receipt[] = [];
let activeReceipt: Receipt | null = null;

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function setStatus(message = '', isError = false): void {
  status.textContent = message;
  status.classList.toggle('is-error', isError);
}

function updateProgress(): void {
  const order: Step[] = ['hypothesis', 'test', 'fix'];
  const current = order.includes(step) ? order.indexOf(step) : 3;
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((item, index) => {
    item.classList.toggle('is-current', index === current);
    item.classList.toggle('is-done', index < current);
  });
}

function setHeading(label: string, help: string): void {
  stepLabel.textContent = label;
  stepHelp.textContent = help;
  updateProgress();
}

async function saveDraft(): Promise<boolean> {
  try {
    await storage.set({ draft });
    return true;
  } catch {
    setStatus('Your draft could not be saved. Keep this window open and try again.', true);
    return false;
  }
}

function addPrimaryButton(text: string): HTMLButtonElement {
  const button = element('button', 'primary-button');
  button.type = 'submit';
  button.textContent = text;
  return button;
}

function renderHypothesis(): void {
  step = 'hypothesis';
  setHeading('Practice 1 of 3', 'Write one specific cause you can test.');
  setStatus();
  workspace.replaceChildren();
  const form = element('form');
  workspace.append(form);
  const group = element('div', 'field');
  const label = element('label');
  label.htmlFor = 'hypothesis';
  label.textContent = 'My hypothesis';
  const input = element('input');
  input.id = 'hypothesis';
  input.required = true;
  input.maxLength = 180;
  input.value = draft.hypothesis;
  input.placeholder = 'Example: The loop reads one item past the list.';
  const hint = element('p', 'field-hint');
  hint.id = 'hypothesis-hint';
  hint.textContent = 'One sentence. Name a cause, not only the error.';
  input.setAttribute('aria-describedby', 'hypothesis-hint');
  group.append(label, input, hint);
  form.append(group, addPrimaryButton('Lock in my hypothesis'));
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    draft.hypothesis = input.value.trim();
    if (!draft.hypothesis) return input.reportValidity();
    if (await saveDraft()) renderTest();
  });
  input.focus();
}

function renderTest(): void {
  step = 'test';
  setHeading('Practice 2 of 3', 'Run one useful check, then paste what happened.');
  setStatus();
  workspace.replaceChildren();
  const pinned = element('blockquote', 'pinned');
  pinned.textContent = draft.hypothesis;
  const form = element('form');
  workspace.append(pinned, form);
  const label = element('label');
  label.htmlFor = 'test-output';
  label.textContent = 'Test output';
  const textarea = element('textarea');
  textarea.id = 'test-output';
  textarea.required = true;
  textarea.rows = 8;
  textarea.value = draft.testOutput;
  textarea.placeholder = 'Paste the command and the useful error lines.';
  const hint = element('p', 'field-hint');
  hint.textContent = 'Paste only what you choose. The extension does not read your editor.';
  const actions = element('div', 'button-row');
  const back = element('button', 'quiet-button');
  back.type = 'button';
  back.textContent = 'Edit hypothesis';
  actions.append(back, addPrimaryButton('Record this test'));
  form.append(label, textarea, hint, actions);
  back.addEventListener('click', renderHypothesis);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    draft.testOutput = textarea.value.trim();
    if (!draft.testOutput) return textarea.reportValidity();
    if (await saveDraft()) renderFix();
  });
  textarea.focus();
}

function renderFix(): void {
  step = 'fix';
  setHeading('Practice 3 of 3', 'Record the repair you chose and the clue to remember.');
  setStatus();
  workspace.replaceChildren();
  const form = element('form');
  workspace.append(form);
  const fixGroup = element('div', 'field');
  const fixLabel = element('label');
  fixLabel.htmlFor = 'fix';
  fixLabel.textContent = 'Fix I chose';
  const fixInput = element('textarea');
  fixInput.id = 'fix';
  fixInput.rows = 4;
  fixInput.required = true;
  fixInput.value = draft.fix;
  fixGroup.append(fixLabel, fixInput);
  const lessonGroup = element('div', 'field');
  const lessonLabel = element('label');
  lessonLabel.htmlFor = 'lesson';
  lessonLabel.textContent = 'Clue for next time';
  const lessonInput = element('input');
  lessonInput.id = 'lesson';
  lessonInput.required = true;
  lessonInput.maxLength = 220;
  lessonInput.value = draft.lesson;
  lessonGroup.append(lessonLabel, lessonInput);
  const actions = element('div', 'button-row');
  const back = element('button', 'quiet-button');
  back.type = 'button';
  back.textContent = 'Edit test';
  actions.append(back, addPrimaryButton('Save my receipt'));
  form.append(fixGroup, lessonGroup, actions);
  back.addEventListener('click', renderTest);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    draft.fix = fixInput.value.trim();
    draft.lesson = lessonInput.value.trim();
    if (!draft.fix || !draft.lesson) return form.reportValidity();
    const receipt = makeReceipt(draft);
    try {
      receipts = [receipt, ...receipts];
      activeReceipt = receipt;
      draft = emptyDraft();
      await storage.set({ receipts, draft });
      receiptCount.textContent = String(receipts.length);
      renderReceipt(receipt);
      setStatus('Receipt saved in this browser.');
    } catch {
      receipts = receipts.filter((item) => item.id !== receipt.id);
      setStatus('Your receipt could not be saved. Keep this window open and try again.', true);
    }
  });
  fixInput.focus();
}

function receiptSection(title: string, content: string, code = false): HTMLElement {
  const section = element('section', 'receipt-part');
  const heading = element('h2');
  heading.textContent = title;
  const body = element(code ? 'pre' : 'p');
  body.textContent = content;
  section.append(heading, body);
  return section;
}

function renderReceipt(receipt: Receipt): void {
  step = 'receipt';
  setHeading('Receipt saved', `Created ${formatReceiptDate(receipt.createdAt)}. Review the path, not only the patch.`);
  workspace.replaceChildren();
  const slip = element('article', 'receipt');
  slip.append(
    receiptSection('Hypothesis', receipt.hypothesis),
    receiptSection('Test output', receipt.testOutput, true),
    receiptSection('Fix I chose', receipt.fix),
    receiptSection('Clue for next time', receipt.lesson)
  );
  const note = element('p', 'evidence-note');
  note.textContent = 'This receipt records your process. It does not prove competence.';
  const actions = element('div', 'button-row');
  const exportButton = element('button', 'primary-button');
  exportButton.type = 'button';
  exportButton.textContent = 'Export Markdown';
  const newButton = element('button', 'quiet-button');
  newButton.type = 'button';
  newButton.textContent = 'Start another bug';
  actions.append(exportButton, newButton);
  workspace.append(slip, note, actions);
  exportButton.addEventListener('click', () => {
    downloadReceipt(receipt);
    setStatus('Markdown receipt downloaded.');
  });
  newButton.addEventListener('click', renderHypothesis);
}

function renderHistory(): void {
  step = 'history';
  setHeading('Saved receipts', receipts.length ? 'Open a receipt to review or export it.' : 'Your completed practice receipts will appear here.');
  setStatus();
  workspace.replaceChildren();
  if (!receipts.length) {
    const empty = element('div', 'empty-state');
    const message = element('p');
    message.textContent = 'No receipts yet. Start with one bug and one testable cause.';
    const button = element('button', 'primary-button');
    button.type = 'button';
    button.textContent = 'Start a debugging receipt';
    button.addEventListener('click', renderHypothesis);
    empty.append(message, button);
    workspace.append(empty);
    return;
  }
  const list = element('ul', 'receipt-list');
  for (const receipt of receipts) {
    const item = element('li');
    const button = element('button', 'receipt-link');
    button.type = 'button';
    const title = element('strong');
    title.textContent = receipt.hypothesis;
    const date = element('span');
    date.textContent = formatReceiptDate(receipt.createdAt);
    button.append(title, date);
    button.addEventListener('click', () => {
      activeReceipt = receipt;
      renderReceipt(receipt);
    });
    item.append(button);
    list.append(item);
  }
  const actions = element('div', 'button-row');
  const start = element('button', 'primary-button');
  start.type = 'button';
  start.textContent = 'Start another bug';
  const clear = element('button', 'danger-button');
  clear.type = 'button';
  clear.textContent = 'Delete all receipts';
  actions.append(start, clear);
  workspace.append(list, actions);
  start.addEventListener('click', renderHypothesis);
  clear.addEventListener('click', async () => {
    if (!window.confirm(`Delete all ${receipts.length} saved receipts from this browser?`)) return;
    try {
      receipts = [];
      activeReceipt = null;
      await storage.set({ receipts });
      receiptCount.textContent = '0';
      renderHistory();
      setStatus('All receipts deleted.');
    } catch {
      setStatus('Receipts could not be deleted. Try again.', true);
    }
  });
}

historyButton.addEventListener('click', () => {
  if (step === 'history') {
    activeReceipt ? renderReceipt(activeReceipt) : renderHypothesis();
  } else {
    renderHistory();
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    const form = workspace.querySelector<HTMLFormElement>('form');
    if (form) {
      event.preventDefault();
      form.requestSubmit();
    }
  }
});

async function init(): Promise<void> {
  try {
    [receipts, draft] = await Promise.all([
      storage.get<Receipt[]>('receipts', []),
      storage.get<Draft>('draft', emptyDraft())
    ]);
    receiptCount.textContent = String(receipts.length);
    renderHypothesis();
  } catch {
    renderHypothesis();
    setStatus('Saved receipts could not be opened. Reload the extension and try again.', true);
  }
}

void init();
