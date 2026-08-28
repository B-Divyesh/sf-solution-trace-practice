import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

await rm(resolve(root, 'dist'), { recursive: true, force: true });
run('npm', ['run', 'build:site']);
run('npx', ['wxt', 'zip']);

const outputFiles = await readdir(resolve(root, '.output'), { recursive: true });
const zipName = outputFiles.find((file) => file.endsWith('.zip'));
if (!zipName) throw new Error('WXT did not produce an extension zip.');

await mkdir(resolve(root, 'dist/site/downloads'), { recursive: true });
await cp(resolve(root, '.output', zipName), resolve(root, 'dist/site/downloads/show-your-debugging-chrome.zip'));
await cp(resolve(root, '.output/chrome-mv3'), resolve(root, 'dist/extension'), { recursive: true });

console.log('Built site: dist/site');
console.log('Built extension: dist/extension');
console.log('Packaged extension: dist/site/downloads/show-your-debugging-chrome.zip');
