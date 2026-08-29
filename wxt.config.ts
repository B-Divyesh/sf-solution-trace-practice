import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'extension',
  publicDir: 'extension/public',
  outDir: '.output',
  manifest: {
    name: 'Show Your Debugging',
    description: 'Record a hypothesis, test result, fix, and clue before asking for an answer.',
    version: '1.0.0',
    permissions: ['storage'],
    action: {
      default_title: 'Open Show Your Debugging'
    },
    icons: {
      16: 'icon-16.png',
      32: 'icon-32.png',
      48: 'icon-48.png',
      128: 'icon-128.png'
    }
  }
});
