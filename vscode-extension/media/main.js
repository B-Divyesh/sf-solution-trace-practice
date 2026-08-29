const vscode = acquireVsCodeApi();
const workspace = document.querySelector('#workspace');
const status = document.querySelector('#status');
const stepLabel = document.querySelector('#step-label');
const stepHelp = document.querySelector('#step-help');
const saved = vscode.getState() || {};

let step = saved.step || 'hypothesis';
let draft = saved.draft || { hypothesis: '', testOutput: '', fix: '', clue: '' };
let receipts = [];
let activeReceipt;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function persist() {
  vscode.setState({ step, draft });
}

function setStatus(message = '', error = false) {
  status.textContent = message;
  status.classList.toggle('error', error);
}

function setHeading(label, help) {
  stepLabel.textContent = label;
  stepHelp.textContent = help;
  const order = ['hypothesis', 'test', 'fix'];
  const current = order.includes(step) ? order.indexOf(step) : 3;
  document.querySelectorAll('[data-progress]').forEach((item, index) => {
    item.classList.toggle('current', index === current);
    item.classList.toggle('done', index < current);
  });
}

function field(tag, id, labelText, value, hintText) {
  const group = el('div', 'field');
  const label = el('label', '', labelText);
  label.htmlFor = id;
  const input = el(tag);
  input.id = id;
  input.required = true;
  input.value = value;
  if (tag === 'textarea') input.rows = 7;
  group.append(label, input);
  if (hintText) {
    const hint = el('p', 'hint', hintText);
    hint.id = `${id}-hint`;
    input.setAttribute('aria-describedby', hint.id);
    group.append(hint);
  }
  return { group, input };
}

function button(text, className = 'primary', type = 'button') {
  const node = el('button', className, text);
  node.type = type;
  return node;
}

function renderHypothesis() {
  step = 'hypothesis';
  persist();
  setHeading('Practice 1 of 3', 'Write one specific cause you can test.');
  setStatus();
  workspace.replaceChildren();
  const form = el('form');
  const { group, input } = field('input', 'hypothesis', 'My hypothesis', draft.hypothesis, 'One sentence. Name a cause, not only the error.');
  input.maxLength = 180;
  form.append(group, button('Lock in my hypothesis', 'primary', 'submit'));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    draft.hypothesis = input.value.trim();
    if (!draft.hypothesis) return input.reportValidity();
    step = 'test';
    persist();
    renderTest();
  });
  workspace.append(form);
  input.focus();
}

function renderTest() {
  step = 'test';
  persist();
  setHeading('Practice 2 of 3', 'Run one useful check, then paste what happened.');
  setStatus();
  workspace.replaceChildren();
  const pinned = el('blockquote', 'pinned', draft.hypothesis);
  const form = el('form');
  const { group, input } = field('textarea', 'test-output', 'Test output', draft.testOutput, 'Paste only what you choose. The extension does not read your editor.');
  const actions = el('div', 'actions');
  const back = button('Edit hypothesis', 'quiet');
  back.addEventListener('click', renderHypothesis);
  actions.append(back, button('Record this test', 'primary', 'submit'));
  form.append(group, actions);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    draft.testOutput = input.value.trim();
    if (!draft.testOutput) return input.reportValidity();
    step = 'fix';
    persist();
    renderFix();
  });
  workspace.append(pinned, form);
  input.focus();
}

function renderFix() {
  step = 'fix';
  persist();
  setHeading('Practice 3 of 3', 'Record the repair you chose and the clue to remember.');
  setStatus();
  workspace.replaceChildren();
  const form = el('form');
  const fix = field('textarea', 'fix', 'Fix I chose', draft.fix);
  const clue = field('input', 'clue', 'Clue for next time', draft.clue);
  clue.input.maxLength = 220;
  const actions = el('div', 'actions');
  const back = button('Edit test', 'quiet');
  back.addEventListener('click', renderTest);
  actions.append(back, button('Save my receipt', 'primary', 'submit'));
  form.append(fix.group, clue.group, actions);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    draft.fix = fix.input.value.trim();
    draft.clue = clue.input.value.trim();
    if (!draft.fix || !draft.clue) return form.reportValidity();
    persist();
    vscode.postMessage({ type: 'saveReceipt', receipt: draft });
  });
  workspace.append(form);
  fix.input.focus();
}

function receiptPart(title, value, code = false) {
  const section = el('section', 'receipt-part');
  section.append(el('h2', '', title), el(code ? 'pre' : 'p', '', value));
  return section;
}

function renderReceipt(receipt) {
  step = 'receipt';
  activeReceipt = receipt;
  persist();
  const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(receipt.createdAt));
  setHeading('Receipt saved', `Created ${date}. Review the path, not only the patch.`);
  workspace.replaceChildren();
  const card = el('article', 'receipt');
  card.append(
    receiptPart('Hypothesis', receipt.hypothesis),
    receiptPart('Test output', receipt.testOutput, true),
    receiptPart('Fix I chose', receipt.fix),
    receiptPart('Clue for next time', receipt.clue)
  );
  const note = el('p', 'hint', 'This receipt records your process. It does not prove competence.');
  const actions = el('div', 'actions');
  const exportButton = button('Export Markdown');
  exportButton.addEventListener('click', () => vscode.postMessage({ type: 'exportReceipt', id: receipt.id }));
  const start = button('Start another bug', 'quiet');
  start.addEventListener('click', () => {
    draft = { hypothesis: '', testOutput: '', fix: '', clue: '' };
    renderHypothesis();
  });
  actions.append(exportButton, start);
  workspace.append(card, note, actions);
}

function renderHistory() {
  step = 'history';
  persist();
  setHeading('Saved receipts', receipts.length ? 'Open a receipt to review or export it.' : 'Completed receipts will appear here.');
  setStatus();
  workspace.replaceChildren();
  if (!receipts.length) {
    const empty = el('div', 'empty');
    empty.append(el('p', '', 'No receipts yet. Start with one bug and one testable cause.'));
    const start = button('Start a debugging receipt');
    start.addEventListener('click', renderHypothesis);
    empty.append(start);
    workspace.append(empty);
    return;
  }
  const list = el('ul', 'receipt-list');
  for (const receipt of receipts) {
    const item = el('li');
    const open = button('', 'receipt-link');
    open.append(el('strong', '', receipt.hypothesis), el('span', '', new Date(receipt.createdAt).toLocaleDateString()));
    open.addEventListener('click', () => renderReceipt(receipt));
    item.append(open);
    list.append(item);
  }
  const actions = el('div', 'actions');
  const start = button('Start another bug');
  start.addEventListener('click', () => {
    draft = { hypothesis: '', testOutput: '', fix: '', clue: '' };
    renderHypothesis();
  });
  const clear = button('Delete all receipts', 'danger');
  clear.addEventListener('click', () => vscode.postMessage({ type: 'deleteAll' }));
  actions.append(start, clear);
  workspace.append(list, actions);
}

window.addEventListener('message', ({ data }) => {
  if (data.type === 'state') {
    receipts = Array.isArray(data.receipts) ? data.receipts : [];
    setStatus(data.message || '');
    if (data.activeReceipt) {
      draft = { hypothesis: '', testOutput: '', fix: '', clue: '' };
      renderReceipt(data.activeReceipt);
      setStatus(data.message || '');
    } else if (step === 'history') {
      renderHistory();
      setStatus(data.message || '');
    }
  }
  if (data.type === 'showReceipts') renderHistory();
  if (data.type === 'error') setStatus(data.message, true);
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    const form = workspace.querySelector('form');
    if (form) {
      event.preventDefault();
      form.requestSubmit();
    }
  }
});

if (step === 'test' && draft.hypothesis) renderTest();
else if (step === 'fix' && draft.hypothesis && draft.testOutput) renderFix();
else renderHypothesis();
vscode.postMessage({ type: 'ready' });
