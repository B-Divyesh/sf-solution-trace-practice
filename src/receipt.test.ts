import { describe, expect, it, vi } from 'vitest';
import { makeReceipt, receiptToMarkdown } from './receipt';

describe('debugging receipts', () => {
  it('trims every saved answer', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'receipt-1' });
    const receipt = makeReceipt({
      hypothesis: '  The index is too high. ',
      testOutput: '  RangeError ',
      fix: '  Stop one item sooner. ',
      lesson: '  Check loop bounds. '
    }, new Date('2026-08-28T12:00:00.000Z'));

    expect(receipt).toMatchObject({
      id: 'receipt-1',
      hypothesis: 'The index is too high.',
      testOutput: 'RangeError',
      fix: 'Stop one item sooner.',
      lesson: 'Check loop bounds.'
    });
  });

  it('exports all four parts and the evidence warning', () => {
    const markdown = receiptToMarkdown({
      id: 'receipt-1',
      createdAt: '2026-08-28T12:00:00.000Z',
      hypothesis: 'The index is too high.',
      testOutput: 'RangeError',
      fix: 'Stop one item sooner.',
      lesson: 'Check loop bounds.'
    });

    expect(markdown).toContain('## Hypothesis');
    expect(markdown).toContain('## Test output');
    expect(markdown).toContain('## Fix I chose');
    expect(markdown).toContain('## What I learned');
    expect(markdown).toContain('does not prove competence');
  });
});
