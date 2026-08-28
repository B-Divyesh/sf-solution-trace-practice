export type Receipt = {
  id: string;
  createdAt: string;
  hypothesis: string;
  testOutput: string;
  fix: string;
  lesson: string;
};

export type Draft = Omit<Receipt, 'id' | 'createdAt'>;

export const emptyDraft = (): Draft => ({
  hypothesis: '',
  testOutput: '',
  fix: '',
  lesson: ''
});

export function makeReceipt(draft: Draft, now = new Date()): Receipt {
  return {
    id: crypto.randomUUID(),
    createdAt: now.toISOString(),
    hypothesis: draft.hypothesis.trim(),
    testOutput: draft.testOutput.trim(),
    fix: draft.fix.trim(),
    lesson: draft.lesson.trim()
  };
}

export function receiptToMarkdown(receipt: Receipt): string {
  const date = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(receipt.createdAt));

  return `# Debugging receipt\n\nCreated ${date}\n\n## Hypothesis\n\n${receipt.hypothesis}\n\n## Test output\n\n\`\`\`text\n${receipt.testOutput}\n\`\`\`\n\n## Fix I chose\n\n${receipt.fix}\n\n## What I learned\n\n${receipt.lesson}\n\n---\nThis receipt records a process. It does not prove competence.\n`;
}

export function downloadReceipt(receipt: Receipt): void {
  const blob = new Blob([receiptToMarkdown(receipt)], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `debugging-receipt-${receipt.createdAt.slice(0, 10)}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function formatReceiptDate(value: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
}
