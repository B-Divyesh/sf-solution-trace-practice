import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

await rm(resolve(root, 'dist'), { recursive: true, force: true });
run('npx', ['wxt', 'zip']);
run('node', ['scripts/build-vscode.mjs']);

const outputFiles = await readdir(resolve(root, '.output'), { recursive: true });
const zipName = outputFiles.find((file) => file.endsWith('.zip'));
if (!zipName) throw new Error('WXT did not produce an extension zip.');

// Stage the package in Vite's public directory before building the site. This
// means both supported static build commands produce the download rather than
// relying on a post-build copy that a deployment runner can accidentally omit.
const publicDownloads = resolve(root, 'site/public/downloads');
await mkdir(publicDownloads, { recursive: true });
await cp(resolve(root, '.output', zipName), resolve(publicDownloads, 'show-your-debugging-chrome.zip'));

run('npm', ['run', 'build:site:assets']);

const siteOutput = resolve(root, 'dist/site');
const builtIndex = await readFile(resolve(siteOutput, 'index.html'), 'utf8');
const routeMetadata = [
  {
    directory: 'demo',
    title: 'Demo — Show Your Debugging',
    description: 'Try a sample debugging receipt stored only in a separate browser demo space.',
    canonical: 'https://solution-trace-practice.sociobot.in/demo'
  },
  {
    directory: 'privacy',
    title: 'Privacy — Show Your Debugging',
    description: 'How Show Your Debugging stores receipts locally and keeps them under your control.',
    canonical: 'https://solution-trace-practice.sociobot.in/privacy'
  },
  {
    directory: 'terms',
    title: 'Terms — Show Your Debugging',
    description: 'Terms for using Show Your Debugging as a free debugging practice tool.',
    canonical: 'https://solution-trace-practice.sociobot.in/terms'
  }
];

function withMetadata(html, route) {
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${route.title}</title>`],
    [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${route.canonical}" />`],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`],
    [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${route.canonical}" />`],
    [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`],
    [/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`]
  ];
  return replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), html);
}

for (const route of routeMetadata) {
  const directory = resolve(siteOutput, route.directory);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), withMetadata(builtIndex, route));
}

await cp(resolve(root, '.output/chrome-mv3'), resolve(root, 'dist/extension'), { recursive: true });

console.log('Built site: dist/site');
console.log('Built extension: dist/extension');
console.log('Packaged extension: dist/site/downloads/show-your-debugging-chrome.zip');
console.log('Built VS Code extension: dist/vscode-extension');
console.log('Packaged VS Code extension: dist/site/downloads/show-your-debugging-vscode.vsix');
