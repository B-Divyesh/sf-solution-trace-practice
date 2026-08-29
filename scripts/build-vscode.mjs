import { cp, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = resolve(root, 'vscode-extension');
const output = resolve(source, 'dist');
const packageOutput = resolve(root, 'site/public/downloads/show-your-debugging-vscode.vsix');

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await mkdir(resolve(root, 'site/public/downloads'), { recursive: true });

run('npx', [
  'esbuild',
  'vscode-extension/src/extension.ts',
  '--bundle',
  '--platform=node',
  '--format=cjs',
  '--target=node20',
  '--external:vscode',
  '--sourcemap',
  '--outfile=vscode-extension/dist/extension.js'
]);
run('npx', [
  'esbuild',
  'vscode-extension/src/extension.ts',
  '--bundle',
  '--platform=browser',
  '--format=cjs',
  '--target=es2022',
  '--external:vscode',
  '--sourcemap',
  '--outfile=vscode-extension/dist/web-extension.js'
]);
run('npx', [
  'esbuild',
  'tests/vscode/suite/web.test.ts',
  '--bundle',
  '--platform=browser',
  '--format=cjs',
  '--target=es2022',
  '--external:vscode',
  '--outfile=vscode-extension/dist/test/suite/index.js'
]);
run('npx', [
  'vsce',
  'package',
  '--no-dependencies',
  '--allow-missing-repository',
  '--out',
  packageOutput
], source);

await rm(resolve(root, 'dist/vscode-extension'), { recursive: true, force: true });
await mkdir(resolve(root, 'dist/vscode-extension'), { recursive: true });
await cp(source, resolve(root, 'dist/vscode-extension'), {
  recursive: true,
  filter: (path) => !path.includes('/src/') && !path.endsWith('/src') && !path.includes('/dist/test')
});

console.log('Built VS Code extension: dist/vscode-extension');
console.log('Packaged VS Code extension: dist/site/downloads/show-your-debugging-vscode.vsix');
