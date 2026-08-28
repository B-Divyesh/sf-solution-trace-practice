import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

await rm(resolve(root, 'dist'), { recursive: true, force: true });
run('npx', ['wxt', 'zip']);

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
await cp(resolve(root, '.output/chrome-mv3'), resolve(root, 'dist/extension'), { recursive: true });

console.log('Built site: dist/site');
console.log('Built extension: dist/extension');
console.log('Packaged extension: dist/site/downloads/show-your-debugging-chrome.zip');
